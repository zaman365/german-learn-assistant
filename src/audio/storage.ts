import fs from "node:fs/promises";
import path from "node:path";
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
function safeKey(key: string) {
  if (!/^[a-zA-Z0-9/_-]+\.(wav|mp3|json)$/.test(key) || key.includes(".."))
    throw new Error("Invalid storage key.");
  return key;
}
function localPath(key: string) {
  if (process.env.NODE_ENV === "production")
    throw new Error("Production recordings require durable S3 storage.");
  return path.join(
    /* turbopackIgnore: true */ path.resolve(
      /* turbopackIgnore: true */ process.env.STORAGE_LOCAL_PATH ||
        ".data/media",
    ),
    safeKey(key),
  );
}
function cloud() {
  if (!process.env.S3_BUCKET) throw new Error("S3 storage is not configured.");
  return new S3Client({
    region: process.env.S3_REGION || "auto",
    endpoint: process.env.S3_ENDPOINT || undefined,
    forcePathStyle: !!process.env.S3_ENDPOINT,
    credentials:
      process.env.S3_ACCESS_KEY_ID && process.env.S3_SECRET_ACCESS_KEY
        ? {
            accessKeyId: process.env.S3_ACCESS_KEY_ID,
            secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
          }
        : undefined,
  });
}
export async function putAsset(key: string, bytes: Buffer, mime: string) {
  safeKey(key);
  if (process.env.STORAGE_DRIVER === "s3")
    await cloud().send(
      new PutObjectCommand({
        Bucket: process.env.S3_BUCKET,
        Key: key,
        Body: bytes,
        ContentType: mime,
      }),
    );
  else {
    const target = localPath(key);
    await fs.mkdir(path.dirname(target), { recursive: true });
    await fs.writeFile(target, bytes, { mode: 0o600 });
  }
}
export async function readAsset(key: string) {
  safeKey(key);
  if (process.env.STORAGE_DRIVER === "s3") {
    const result = await cloud().send(
      new GetObjectCommand({ Bucket: process.env.S3_BUCKET, Key: key }),
    );
    if (!result.Body) throw new Error("Media not available.");
    return Buffer.from(await result.Body.transformToByteArray());
  }
  return fs.readFile(/* turbopackIgnore: true */ localPath(key));
}
export async function removeAsset(key: string) {
  safeKey(key);
  if (process.env.STORAGE_DRIVER === "s3")
    await cloud().send(
      new DeleteObjectCommand({ Bucket: process.env.S3_BUCKET, Key: key }),
    );
  else await fs.rm(localPath(key), { force: true });
}
