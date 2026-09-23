# German Learn Assistant

A private learning copilot for the B2 → C1 bridge, professional German, DTB C1 preparation and a C2 starter pathway.

**Status: implemented development build, with production verification gates still open.** Persistent learning journeys and authored content work without an AI key. Productive coaching needs configured models. Audio-dependent lessons stay unavailable until their original recordings have been generated and reviewed. Official exam pass/fail and complete readiness remain unresolved while applicable rules are incompletely verified.

## What is built

- 89 authored lessons: 13 bridge lessons across 12 modules, 52 professional C1 lessons across 18 modules, 10 exam-preparation lessons, 5 article lessons, 5 pronunciation lessons and 4 C2 starter lessons.
- Five diagnostic rounds, 125 lexical entries with native retrieval practice, and internal grammar/article references with tables and decision diagrams.
- Owner-only login, onboarding, resumable drafts, immutable attempts, objective checking, errors, spaced reviews, daily recommendations and evidence-based progress.
- Structured writing coaching, conversational tutor, microphone recording, private playback/deletion, transcription and audio-based coaching adapters.
- Three original DTB C1 sets, each with 60 tasks and 14 listening scripts. Sections save to the server. Full paper-reference rehearsal uses shared blocks, a continuous audio timeline and a spoken AI partner when configured. The third set is reserved.
- JSON export, readable summary, vocabulary/review CSV, transactional merge and a named learning_record.json legacy adapter.
- Docker web/worker targets, local PostgreSQL/MinIO Compose, migrations, owner recovery and CI/browser tests.

See [the implementation record](docs/IMPLEMENTATION_STATUS.md) and [coverage matrix](docs/CONTENT_COVERAGE.md) for scope and verification limits.

To continue the remaining acceptance work with Codex or Claude Code, use the [implementation handoff prompt](docs/FINISH_IMPLEMENTATION_PROMPT.md).

## Start locally

Install Node 24 and pnpm 11.19.0. From this repository:

    pnpm install --frozen-lockfile
    cp .env.example .env
    docker compose up -d db storage bucket

Set a random BETTER_AUTH_SECRET of at least 32 characters in .env. The example DATABASE_URL matches the loopback-only development database. Generate a secret locally:

    node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"

Initialize the database:

    pnpm db:migrate
    pnpm db:seed

Set OWNER_EMAIL and OWNER_NAME in .env. Provide OWNER_PASSWORD privately through your shell or secret manager; it must contain 12–128 characters. In Bash:

    read -rsp "Owner password: " OWNER_PASSWORD
    export OWNER_PASSWORD
    pnpm owner:create
    unset OWNER_PASSWORD
    pnpm dev

Open http://localhost:4173 and sign in. Public registration is disabled.

Without Docker, remove DATABASE_URL from .env and set DEV_DATABASE_PATH=.data/development. This development-only PGlite option uses the same PostgreSQL schema. Run migrate, seed and the app sequentially; never let multiple processes open the same directory. Production and the durable worker require native PostgreSQL.

## Enable the copilot and audio

Configure OPENAI_API_KEY and explicit supported model IDs: OPENAI_TEXT_MODEL, OPENAI_TRANSCRIPTION_MODEL, OPENAI_SPEECH_MODEL and OPENAI_AUDIO_ANALYSIS_MODEL. No model ID is silently guessed. In production, set WORKER_ENABLED=true and run the worker against the same PostgreSQL database.

    pnpm worker

AI is not required to read lessons or perform objective practice. Productive answers remain saved and unscored until usable rubric feedback exists. Audio generation is an explicit admin action using your provider account. See [the runbook](docs/RUNBOOK.md).

## Verify changes

    pnpm content:validate
    pnpm typecheck
    pnpm lint
    pnpm test
    pnpm test:integration
    pnpm build

Integration tests use disposable PGlite storage if DATABASE_URL is absent, otherwise disposable users in that PostgreSQL database. Use a dedicated test database. CI adds native PostgreSQL and desktop/mobile Playwright checks. Consult the implementation record for tests actually run.

## Product and course contracts

| Document | Purpose |
|---|---|
| [BUILD_SPEC.md](BUILD_SPEC.md) | Product, architecture, policies and acceptance gates |
| [COURSE_SPEC.md](docs/COURSE_SPEC.md) | Educational requirements and teaching behavior |
| [CURRICULUM_MAP.md](docs/CURRICULUM_MAP.md) | Stable modules, diagnostics and exit outcomes |
| [DTB_C1_EXAM_BLUEPRINT.md](docs/DTB_C1_EXAM_BLUEPRINT.md) | Source-qualified exam rules and transition |
| [GRAMMAR_REFERENCE.md](docs/GRAMMAR_REFERENCE.md) | Article, case and grammar reference |
| [C1_FILES_REVIEW.md](docs/C1_FILES_REVIEW.md) | Decisions from the supplied course archive |
| [RUNBOOK.md](docs/RUNBOOK.md) | Installation, operations, audio and recovery |

All authored mocks are original and unofficial. Official papers and recordings are not redistributed.
