/** Quiesce web/worker first and pair this snapshot with pg_dump. No credentials enter the manifest. */
import "dotenv/config";
import fs from "node:fs/promises";
import path from "node:path";
import { createHash } from "node:crypto";
import {
  S3Client,
  ListObjectsV2Command,
  GetObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
const [mode, directory] = process.argv.slice(2);
if (!directory || !["backup", "restore"].includes(mode))
  throw new Error("Use storage-snapshot.ts backup|restore PRIVATE_DIRECTORY.");
const client = new S3Client({
  region: process.env.S3_REGION || "auto",
  endpoint: process.env.S3_ENDPOINT,
  forcePathStyle: !!process.env.S3_ENDPOINT,
  credentials:
    process.env.S3_ACCESS_KEY_ID && process.env.S3_SECRET_ACCESS_KEY
      ? {
          accessKeyId: process.env.S3_ACCESS_KEY_ID,
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
        }
      : undefined,
});
const Bucket = process.env.S3_BUCKET;
if (!Bucket) throw new Error("Configure the private bucket.");
type Entry = { key: string; file: string; checksum: string; mime: string };
async function main() {
  if (mode === "backup") {
    await fs.mkdir(directory, { mode: 0o700 }); // Refuse to overwrite a previous snapshot.
    const entries: Entry[] = [];
    let continuation: string | undefined;
    do {
      const page = await client.send(
        new ListObjectsV2Command({ Bucket, ContinuationToken: continuation }),
      );
      for (const item of page.Contents || []) {
        if (!item.Key) continue;
        const object = await client.send(
          new GetObjectCommand({ Bucket, Key: item.Key }),
        );
        const bytes = Buffer.from(await object.Body!.transformToByteArray());
        const file = createHash("sha256").update(item.Key).digest("hex");
        await fs.writeFile(path.join(directory, file), bytes, { mode: 0o600 });
        entries.push({
          key: item.Key,
          file,
          checksum: createHash("sha256").update(bytes).digest("hex"),
          mime: object.ContentType || "application/octet-stream",
        });
      }
      continuation = page.IsTruncated ? page.NextContinuationToken : undefined;
    } while (continuation);
    await fs.writeFile(
      path.join(directory, "manifest.json"),
      JSON.stringify(entries, null, 2),
      { mode: 0o600 },
    );
    console.log(`Backed up ${entries.length} private objects with checksums.`);
  } else {
    const existing = await client.send(
      new ListObjectsV2Command({ Bucket, MaxKeys: 1 }),
    );
    if (existing.Contents?.length)
      throw new Error("Restore requires a separate empty bucket.");
    const entries: Entry[] = JSON.parse(
      await fs.readFile(path.join(directory, "manifest.json"), "utf8"),
    );
    // Verify the entire snapshot before writing any restored object.
    const verified = await Promise.all(
      entries.map(async (entry) => {
        if (!/^[a-f0-9]{64}$/.test(entry.file))
          throw new Error("Invalid snapshot filename.");
        const bytes = await fs.readFile(path.join(directory, entry.file));
        if (createHash("sha256").update(bytes).digest("hex") !== entry.checksum)
          throw new Error("Snapshot checksum mismatch.");
        return { entry, bytes };
      }),
    );
    for (const { entry, bytes } of verified)
      await client.send(
        new PutObjectCommand({
          Bucket,
          Key: entry.key,
          Body: bytes,
          ContentType: entry.mime,
        }),
      );
    console.log(
      `Restored ${entries.length} private objects to the empty bucket.`,
    );
  }
}
main().finally(() => client.destroy());
