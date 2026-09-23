# Implementation record

Branch: codex/build-learning-copilot. Updated 23 September 2026.

**A runnable development build is implemented. Production course/exam verification is not complete.** No public deployment or infrastructure provisioning has been performed.

## Milestones

| Milestone | Implemented | Open acceptance evidence |
|---|---|---|
| M1 — First journey | Owner login, onboarding, diagnostics, real bridge content, autosave, immutable submissions, errors, reviews and progress | Authenticated target-browser/host checks |
| M2 — Curriculum | 89 authored lessons; all 12 bridge and 18 C1 modules; 10 exam modules; article/pronunciation tracks; 125 lexical entries with native retrieval; references, tables and diagrams | Independent German/content review and learner validation |
| M3 — Copilot | Structured text rubric, bounded tutor, correction taxonomy, superseding evaluations, quota/idempotency, daily/weekly recommendations and explicit retries | Real configured-model calls and recovery checks; planner calibration |
| M4 — Audio | Microphone capture, WAV validation, private playback/deletion/retention, transcription and sound adapters; original scripts | Generate/review recordings; real microphone, model, S3 and worker tests |
| M5 — Exam | Three distinct 60-task sets and 14 listening scripts each; section practice, full paper-reference rehearsal engine, continuous timeline composer, spoken partner, whole-performance coaching and half-point scoring | Official rule clarification, genre/difficulty/timeline review and a real full run; verified-simulation mode blocked |
| M6 — Release | Four C2 starter lessons, JSON/CSV/summary export, merge/legacy import, recovery, Docker/Compose, CI/Playwright and runbook | Native PostgreSQL/browser CI result, container/worker/S3 smoke checks, staging restore and accessibility review |

Course totals exclude five diagnostic rounds and 125 separate vocabulary practice packages. Course/diagnostic objective items: 390. Official exam papers/audio are not redistributed.

## Verification recorded locally

- TypeScript and ESLint passed during implementation.
- Production Next.js build passed with the application/API routes after clearing a corrupt generated Turbopack cache. Standalone output is scrubbed of environment files; the final package and browser bundles passed the local secret-file/content check.
- 26 unit checks passed for mastery/review/date policies, grading, AI evidence validation, WAV handling, mock counts/score destinations/half-points, incomplete readiness, legacy claims and CSV quoting.
- 11 integration checks passed on disposable PGlite: retries, owner isolation, stale drafts, assistance, error idempotency, completion/reopen, deadlines/expiry, recording ownership/deletion, import/deduplication, bounded spoken turns, support markers and the empty legacy template.
- Clean isolated migration, content seed and idempotent reseed passed for the full catalog.
- The public login screen rendered in the managed browser. Authenticated browser, actual microphone and real provider calls have not been verified here.
- Native PostgreSQL and Playwright CI are supplied; record their remote result separately. Containers, production worker, S3 and disaster-recovery restore have not been run in this workspace.

## Evidence boundaries

Configuration is not a successful provider call. A transcript is not pronunciation evidence. A script without reviewed sound is not listening evidence. Completion, independent demonstration, delayed retention and exam readiness are separate.

The original matching texts and short audio scripts still require genre, length and interaction review against the source format; their task counts alone do not establish authentic exam difficulty.

The versioned paper-reference definition has explicit verification/applicability gaps. Exact pass-boundary inclusivity and digital details need authoritative clarification. Full rehearsal remains original coaching with integrity/quality flags, without official pass/fail or a probability of passing.

## Technical decisions

Node 24 / pnpm 11.19.0; Next 16.3.6 / React 19.3.0; Drizzle 0.45.3; Better Auth 1.7.5; OpenAI SDK 7.21.0; pg-boss 12.33.4. Exact versions are locked.

TypeScript 6.0.3 is pinned because the installed TypeScript-ESLint parser rejects TypeScript 7. The lint compatibility layer accommodates older React plugin rule APIs.

Production requires PostgreSQL and private S3-compatible storage. PGlite is a single-process development fallback. Seed transactions preserve immutable content and learner data. No real attempts, recordings, passwords or provider credentials are committed.

## Release actions

1. Run native PostgreSQL/browser CI and resolve failures.
2. Configure models, private storage and worker; verify real text, transcription, sound and partner calls.
3. Generate/review original audio clips and full mock timelines.
4. Review German and difficulty; resolve official rule gates and version changed definitions.
5. Verify staging deployment, real microphone behavior and full restore before personal production use.
