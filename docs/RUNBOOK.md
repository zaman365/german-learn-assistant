# Installation and operations

## Configuration

The web process is Next.js on Node 24. PostgreSQL holds learner evidence and immutable content. A separate pg-boss worker executes paid operations. Private S3-compatible storage holds recordings; playback requires the authenticated owner and a short-lived signature.

| Variable | Use |
|---|---|
| DATABASE_URL | Native PostgreSQL; mandatory in production and for the worker |
| DEV_DATABASE_PATH | Single-process development fallback if DATABASE_URL is absent |
| APP_URL | Exact browser origin including scheme and port |
| BETTER_AUTH_SECRET | At least 32 random characters; sessions, playback and export signatures |
| OPENAI_API_KEY | Server-side credential; never NEXT_PUBLIC |
| OPENAI_TEXT_MODEL | Responses API model supporting structured output |
| OPENAI_TRANSCRIPTION_MODEL | German WAV transcription model |
| OPENAI_SPEECH_MODEL | Speech generation with WAV output |
| OPENAI_AUDIO_ANALYSIS_MODEL | Chat Completions model accepting input_audio WAV and text output |
| AI_DAILY_REQUEST_LIMIT | Product allowance; default 40, maximum 200 |
| WORKER_ENABLED | true for queued production operations |
| STORAGE_DRIVER | s3 in production; local only in development |
| S3_ENDPOINT / S3_REGION / S3_BUCKET | Private storage location; endpoint optional for AWS |
| S3_ACCESS_KEY_ID / S3_SECRET_ACCESS_KEY | Server credentials, or a supported credential chain |
| STORAGE_LOCAL_PATH | Development media directory |
| OWNER_EMAIL / OWNER_NAME / OWNER_PASSWORD | Account bootstrap/recovery only |

A nonempty model setting is configuration evidence, not proof of provider compatibility. Make real capability checks before release. The local Compose file has known development credentials and loopback ports. Its moving MinIO tags are development conveniences; pin reviewed digests and use managed credentials/storage in production.

## Initialization and recovery

Follow README.md. Migrate before seeding. The seed refuses changed payloads under existing IDs/versions. Increase the new content version instead of deleting published history. Seeding does not reset progress.

Stop a PGlite development server before running CLI commands against the same directory. Production uses native PostgreSQL.

Public signup is disabled. To recover an account, provide OWNER_EMAIL and a new OWNER_PASSWORD privately, then run:

    pnpm owner:reset-password

Better Auth hashes the new password and the command revokes previous sessions. There is no public reset endpoint. Remove bootstrap passwords from the service environment after use.

## Audio preparation

Course scripts, including pronunciation models, live in content/audio.ts. Each original exam has 14 listening scripts under content/exams.

Generate a selected clip:

    pnpm audio generate audio-phone-01
    pnpm audio generate MOCK-01-v2-A01

Existing IDs are not regenerated automatically. Output remains private and pending_review. Listen to the complete clip through your private storage client or local media path. Check German, names, numbers, speaker distinctions, pace and fidelity. Dialogue role labels must not distort the task. Revise/version an unsuitable asset. After review:

    AUDIO_REVIEW_CONFIRMED=true pnpm audio approve audio-phone-01
    AUDIO_REVIEW_CONFIRMED=true pnpm audio approve MOCK-01-v2-A01

After all 14 mock clips are approved:

    pnpm exam:audio compose MOCK-01
    AUDIO_REVIEW_CONFIRMED=true pnpm exam:audio approve MOCK-01

The composer builds a 25-minute original sequence with reading/response intervals and rejects overlap. Review the entire timeline. These original cues and difficulty are not calibrated to an official exam. The app labels synthetic audio and keeps unreviewed sound unavailable.

## Speaking, feedback and retries

The microphone starts only after Record. PCM is encoded to WAV; the server checks bytes, duration, owner and task. Maximum learner upload: 20 MB and five minutes per take. Replay, re-record, upload progress, cancellation, private playback and deletion are included. Recording needs HTTPS or localhost.

Sound analysis receives actual audio. Automatic transcription is separate and may normalize or misrecognize speech. Typed words never establish pronunciation. The app does not invent phoneme percentages or a CEFR certificate.

The exam partner transcribes a recorded turn, creates a bounded German reply and synthesizes its voice. Dialogue phases need multiple learner turns. Whole-performance coaching uses saved audio and timestamps; incomplete interaction leaves speaking unassessed. Combined learner audio above twelve minutes is retained but not automatically analyzed as a whole.

Jobs are durable and owner-scoped. Ambiguous provider failures and crashes are not automatically replayed as paid requests. The learner may explicitly retry a failed request up to three processing attempts. Allowance units are charged again: text 1, audio/coaching 2, spoken partner 3. They are product units, not currency estimates.

## Exam behavior

Section practice has a persisted server timer. Full paper-reference rehearsal uses written blocks of 65, 25 and 45 minutes, followed by an oral block. Reading and the reply share the first block. Listening reconnects at elapsed server time without restarting. Prior blocks are locked. Repeated starts preserve the deadline; stale autosaves are rejected.

This is original coaching with an AI partner and digital controls. It does not claim to reproduce an official room or the future digital exam. Pass-boundary inclusivity, applicable navigation/break rules and future digital details remain open. Verified-simulation mode is blocked. Numeric coaching uses half-points; writing language criteria are applied once across both extended texts.

Missing modalities keep scores null. Unverified applicable rules keep overall readiness incomplete even with a coaching total. The third mock is reserved; opening it records exposure. The paper reference is historical after 30 April 2027 and must remain labeled accordingly. Verify and version new official definitions before releasing a current simulation.

## Container deployment

No infrastructure is provisioned by this repository.

    docker build --target web -t german-learning-web .
    docker build --target worker -t german-learning-worker .

Web listens on 4173; use an HTTPS route and readiness probe /api/health. Worker has no public route. Both need the same PostgreSQL database, private bucket, application origin and secrets; enable WORKER_ENABLED. The health endpoint proves database reachability only.

Run release operations from the worker image before routing users to a changed schema:

    node --import tsx scripts/migrate.ts
    node --import tsx scripts/seed.ts

For Northflank or another container host, use two services from those targets, managed PostgreSQL and private S3-compatible storage. Keep a worker running. Do not use a container-local recording directory in production.

Local container rehearsal:

    docker compose --profile app build
    docker compose run --rm worker node --import tsx scripts/migrate.ts
    docker compose run --rm worker node --import tsx scripts/seed.ts
    docker compose --profile app up -d web worker

Bootstrap the owner through a one-off worker container with private environment input before signing in.

## Export, import and full backups

The authenticated JSON export contains attempts, evaluations, content/policy references, drafts, plans, exam history, media metadata and provenance. Recording bytes and authentication secrets are excluded. CSV correctly quotes German text, delimiters, quotes and multiline examples.

Import previews the exact file, rejects evidence conflicts and merges transactionally. The authenticated account owns every imported row; a file's owner ID never grants access. Existing profile/drafts are preserved; supported unused draft contexts can be restored. Exams become submitted historical attempts. Objective work is regraded against matching content. Signed prior text coaching may be preserved; unverified AI ratings and missing sound remain historical/unassessed. Original evaluations, legacy claims and unknown fields are archived rather than discarded.

For disaster recovery, back up PostgreSQL and the private bucket together. Keep matching application secrets in a separate secret manager.

    pg_dump --format=custom --file=private-backup.dump "$DATABASE_URL"

Use your storage provider's private versioning/snapshot tools for objects referenced by media metadata. Encrypt backups and store them outside running containers. Restore to a separate staging database first:

    pg_restore --no-owner --dbname="$RESTORE_DATABASE_URL" private-backup.dump

Attach a restored private bucket and matching secrets. Verify login, a saved lesson, an export, a recording, deletion and an expired/completed exam before changing production routing. JSON merge is not a full database/object-store restore.

## Release verification

CI uses a dedicated PostgreSQL service and synthetic test credentials, then exercises desktop/mobile login, saved practice, export and exam resume. Paid models are not invoked.

Before personal production use, record real model calls, microphone behavior, S3 ownership/deletion, worker recovery, complete audio review and a staging restore. Review German and mock difficulty independently. Record each outcome in IMPLEMENTATION_STATUS.md. An unrun check is not a success.

The build command removes environment files copied by Next.js into standalone output. Supply secrets at runtime. Do not distribute the local development database or recording directory.

## Rehearsal and staging additions (23 September 2026)

`deploy/compose.staging.yaml` runs the tested web and worker images against externally supplied PostgreSQL and private S3. Copy `deploy/staging.env.example` outside the repository, fill it through the host's secret management, and restrict its file permissions. Set `WEB_IMAGE` and `WORKER_IMAGE` to tested image digests and `STAGING_ENV_FILE` to that protected file. Route an HTTPS reverse proxy to the loopback web port and set APP_URL to its exact origin. The worker has no public port. Supply OWNER_PASSWORD only to the one-off owner CLI, then remove that bootstrap environment.

    docker compose -f deploy/compose.staging.yaml run --rm worker node --import tsx scripts/migrate.ts
    docker compose -f deploy/compose.staging.yaml run --rm worker node --import tsx scripts/seed.ts
    docker compose -f deploy/compose.staging.yaml up -d

The root Compose file is for disposable local use. Its previously unavailable Docker Hub MinIO images have been replaced by pinned Quay images used in the rehearsal. Those frozen test images are not a production-storage recommendation; staging/production use an operated private S3 service with current security maintenance. `docker-compose` can substitute for `docker compose` where only the standalone client is installed.

For a disposable recovery test, set REHEARSAL_ONLY=true, use an OWNER_EMAIL ending in @example.test, create that synthetic owner, and omit provider credentials. Set REHEARSAL_RECEIPT to a protected local JSON path. Run the following against the disposable database and S3 bucket:

    node --import tsx scripts/rehearsal.ts prepare
    # Start the worker and let its startup maintenance and queue processing finish.
    node --import tsx scripts/rehearsal.ts check

The script records a test tone, never speech evidence. It checks orphaned queued work, interrupted running work, stale uploads, retention, deletion retry, signed expiry, owner isolation and saved lesson/exam/export data. Do not run it against a real learner account. If a check fails while the worker is still starting, inspect the worker log before retrying; do not re-run prepare and create more fixtures.

Stop web and worker before taking the paired full backup. Use the pg_dump command above and snapshot objects into a new private directory:

    node --import tsx scripts/storage-snapshot.ts backup /private/backup/objects

The tool refuses an existing backup directory and records SHA-256 checksums without credentials. Treat the directory and database dump as private learner data: encrypt them using the deployment's backup facility. Restore the dump into a separate empty staging database, create a separate empty private bucket, switch the environment to those restored services and use:

    node --import tsx scripts/storage-snapshot.ts restore /private/backup/objects
    node --import tsx scripts/rehearsal.ts restore-check

`restore-check` applies only to the synthetic receipt from this rehearsal and deletes its restored test recording after verifying it. For a real backup, verify login, original saved work/exam/export and authorized private playback/deletion manually instead. Start the restored web instance with the matching authentication secret and its own APP_URL. The browser suite can target a running standalone container with E2E_EXTERNAL_SERVER=true and APP_URL set to that origin.

Current mock audio IDs include the script version, for example `MOCK-01-v2-A01`; see the versioned definitions in `content/exams` for the current IDs. Archived v1 media/definitions are retained for old attempts. Generate and approve only the intended version. No script approval or media-review flag was set by this implementation pass.
