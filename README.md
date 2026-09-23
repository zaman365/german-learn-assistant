# German Learn Assistant

A personal German-learning application progressing through a B2–C1 bridge, comprehensive professional C1, DTB C1 exam preparation, and a pathway toward C2.

**Status:** Build specifications are ready. The application has not yet been implemented.

## Start here

| Document | Purpose |
|---|---|
| [BUILD_SPEC.md](BUILD_SPEC.md) | Coding-agent mandate, architecture, product screens, persistent data, learning rules, AI/audio contracts, milestones, tests, and deployment handoff |
| [docs/COURSE_SPEC.md](docs/COURSE_SPEC.md) | Complete educational requirements, grammar/article toolkit, learning methods, curriculum, personalization, and exam-preparation requirements |
| [docs/CURRICULUM_MAP.md](docs/CURRICULUM_MAP.md) | Stable IDs, diagnostic routes, twelve bridge modules, eighteen C1 modules, exam and parallel tracks, exit checks |
| [docs/DTB_C1_EXAM_BLUEPRINT.md](docs/DTB_C1_EXAM_BLUEPRINT.md) | Source-qualified exam tasks, administration blocks, scoring, public speaking themes, and digital transition |
| [docs/GRAMMAR_REFERENCE.md](docs/GRAMMAR_REFERENCE.md) | Corrected article, case, adjective, noun and preposition seed material with tables and a decision diagram |
| [docs/C1_FILES_REVIEW.md](docs/C1_FILES_REVIEW.md) | Analysis of the six supplied files, adopted improvements, corrections, and remaining verification points |

Read the two main specifications and their three supporting contracts before implementation. Learner-directed instructions in the course specification describe the tutor behavior to implement inside the app. The archive review explains the latest design decisions; none of these documents is a claim that the application or full course assets already exist.

## Implementation brief

Paste this into Codex or Claude Code with this repository open:

> Read `BUILD_SPEC.md`, `docs/COURSE_SPEC.md`, `docs/CURRICULUM_MAP.md`, `docs/DTB_C1_EXAM_BLUEPRINT.md`, and `docs/GRAMMAR_REFERENCE.md` in full. Implement German Learn Assistant according to these contracts. Begin with the next incomplete milestone. Deliver M1 as a complete working learning journey: onboarding, diagnostic, real bridge lessons, practice, feedback, persistent progress, and a correct next-day recommendation. Continue M2–M6 in order, verify each acceptance gate, and maintain `docs/IMPLEMENTATION_STATUS.md`. Resolve routine implementation decisions yourself, preserve existing work, and identify unavailable credentials or services precisely while completing independent work.

## Planned delivery

1. **M1:** First complete learning session with real bridge content and saved progress.
2. **M2:** Comprehensive bridge/C1 curriculum, vocabulary, grammar, articles, and visual references.
3. **M3:** Adaptive copilot, writing feedback, error repair, and evidence-based progress.
4. **M4:** Listening, recording, speaking practice, and appropriate audio-based feedback.
5. **M5:** Verified DTB C1 preparation, timed sections, and three original full mocks.
6. **M6:** C2 starter pathway, recovery/export, accessibility, deployment package, and release verification.

The planned stack is Next.js/TypeScript, PostgreSQL/Drizzle, Better Auth, and server-side AI/audio adapters. The build specification defines the details and gates. Do not treat this plan as evidence that those capabilities already exist.
