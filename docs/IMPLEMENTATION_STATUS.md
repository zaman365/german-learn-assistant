# Implementation record

Branch: `codex/build-learning-copilot`. Started 23 September 2026.

## Working checkpoint

M1 has real bridge content, owner login, profiles, diagnostic placement, draft autosave, immutable attempts, deterministic grading, feedback, error records, calendar reviews, daily plans, curriculum navigation, references, vocabulary and progress views. Content validation: six bridge lessons, 63 scored items including the diagnostic, 80 lexical entries, 12 references. Seed operations reject changed published versions and preserve learner work.

Integration checks exercise two separate owners, duplicate submissions, foreign review rejection with transaction rollback, persistent assistance, stale draft rejection, error-count idempotency, exit checks, and reopening the database. Domain checks cover independent transfer, delayed retention, recurring errors, timezone arithmetic, review intervals, exact German orthography, private keys and plan budgets.

This is an implementation checkpoint, not a claim that the complete course has shipped. Subsequent content and provider milestones are being implemented on this branch. Provider credentials are not configured in this workspace. Productive answers remain saved and unscored until validated evaluation is available.

## Technical decisions

- Node 24.19.0; pnpm 11.19.0. Exact dependency versions are pinned in `package.json` and `pnpm-lock.yaml`.
- Next 16.3.6 / React 19.3.0; TypeScript 7.0.2; Drizzle 0.45.3; Better Auth 1.7.5; OpenAI SDK 7.21.0; pg-boss 12.33.4.
- Production uses PostgreSQL via `DATABASE_URL`. A development-only PGlite adapter runs the same PostgreSQL schema when a native server is unavailable. This does not replace the native PostgreSQL CI integration gate.
- Registration is disabled. The owner CLI creates an account or resets its password and revokes sessions. No account password is committed.
- The dev wrapper translates a preview supervisor's `--host` argument into Next's `--hostname`; the application remains Next.js.
- No infrastructure has been provisioned and no public deployment has been made.

## Verification limits

The unauthenticated page renders in the preview browser. Authenticated browser QA is not yet verified. Automated integration checks use disposable accounts and never expose their credentials. Microphone, actual provider calls, object storage, the production worker and a deployed restore test need their own recorded gates before release.
