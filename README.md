# German Learn Assistant

A personal German-learning application progressing through a B2–C1 bridge, comprehensive professional C1, DTB C1 exam preparation, and a pathway toward C2.

**Status:** Build specifications are ready. The application has not yet been implemented.

## Start here

| Document | Purpose |
|---|---|
| [BUILD_SPEC.md](BUILD_SPEC.md) | Coding-agent mandate, architecture, product screens, persistent data, learning rules, AI/audio contracts, milestones, tests, and deployment handoff |
| [docs/COURSE_SPEC.md](docs/COURSE_SPEC.md) | Complete educational requirements, grammar/article toolkit, learning methods, curriculum, personalization, and exam-preparation requirements |

Read both documents before implementation. Learner-directed instructions in the course specification describe the tutor behavior to implement inside the app.

## Implementation brief

Paste this into Codex or Claude Code with this repository open:

> Read `BUILD_SPEC.md` and `docs/COURSE_SPEC.md` in full. Implement German Learn Assistant according to both specifications. Begin with the next incomplete milestone. Deliver M1 as a complete working learning journey: onboarding, diagnostic, real bridge lessons, practice, feedback, persistent progress, and a correct next-day recommendation. Continue M2–M6 in order, verify each acceptance gate, and maintain `docs/IMPLEMENTATION_STATUS.md`. Resolve routine implementation decisions yourself, preserve existing work, and identify unavailable credentials or services precisely while completing independent work.

## Planned delivery

1. **M1:** First complete learning session with real bridge content and saved progress.
2. **M2:** Comprehensive bridge/C1 curriculum, vocabulary, grammar, articles, and visual references.
3. **M3:** Adaptive copilot, writing feedback, error repair, and evidence-based progress.
4. **M4:** Listening, recording, speaking practice, and appropriate audio-based feedback.
5. **M5:** Verified DTB C1 preparation, timed sections, and three original full mocks.
6. **M6:** C2 starter pathway, recovery/export, accessibility, deployment package, and release verification.

The planned stack is Next.js/TypeScript, PostgreSQL/Drizzle, Better Auth, and server-side AI/audio adapters. The build specification defines the details and gates. Do not treat this plan as evidence that those capabilities already exist.
