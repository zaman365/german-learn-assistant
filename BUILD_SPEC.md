# German Learn Assistant — Build Specification

**Repository:** `zaman365/german-learn-assistant`  
**Specification date:** 23 September 2026  
**Purpose:** Implementation instructions for Codex, Claude Code, or another coding agent.  
**Current baseline:** Documentation only. Application, database, course assets, and integrations remain to be implemented.

## 1. Mandate and interpretation

Build a working, responsive German-learning web application for a learner progressing through **B2–C1 bridge → comprehensive professional C1 → DTB C1 exam preparation → C2 development**. Implement the interface, curriculum delivery, exercises, persistent progress, adaptive daily planning, AI coaching, audio practice, and examination simulator.

Read [docs/COURSE_SPEC.md](docs/COURSE_SPEC.md) in full and preserve its complete educational scope. This document supplies the software architecture, implementation sequence, and acceptance criteria. The supporting contracts are [CURRICULUM_MAP.md](docs/CURRICULUM_MAP.md), [DTB_C1_EXAM_BLUEPRINT.md](docs/DTB_C1_EXAM_BLUEPRINT.md), and [GRAMMAR_REFERENCE.md](docs/GRAMMAR_REFERENCE.md). The [archive review](docs/C1_FILES_REVIEW.md) records how the supplied material was adapted.

Use the course spec for educational scope, this build spec for application behavior and versioned learning policies, the curriculum map for stable module IDs, and the exam blueprint for source-qualified exam facts. The grammar reference is corrected seed content, not a completed grammar atlas. Resolve a factual conflict by checking the cited primary source and updating affected documents together; never silently replace DTB C1 with another examination.

Interpret the course specification correctly:

- Instructions to ask the learner questions, start a diagnostic, teach a lesson, or run a conversation describe behavior **inside the implemented product**. Do not start tutoring the repository owner in the coding conversation.
- Its conditional persistence and interface fallbacks describe a generic conversational environment. For this application, a real UI and PostgreSQL persistence are mandatory; a chat transcript or local-storage-only prototype does not satisfy them.
- The product must include actual authored learning materials. A shell containing lesson titles, generated sample cards, or links to external lessons is incomplete.
- All six milestones below are required scope. Staging controls delivery order; it does not make later capabilities optional.
- Explicit user instructions govern scope changes. Within this mandate, resolve routine implementation decisions and record them rather than repeatedly stopping for permission.

The primary user journey is: sign in → establish learning goals → complete a diagnostic → receive a suitable bridge lesson → practise → receive feedback → save evidence → see an updated plan → return later and continue correctly.

### Fixed decisions

Use the stack and learning contracts below. English is the initial explanation/UI language, German is the learning language, and English clarification remains available. Default the learner timezone to `Europe/Berlin`, allowing an override. Do not assume an exam date, a passed B2 examination, or uniform proficiency across skills.

Design for a private individual learning account initially, with ownership boundaries that also work for two test accounts. Subscription billing, public communities, school administration, a content marketplace, and native mobile apps are outside this build. Responsive mobile use is required.

## 2. Architecture and stack

Use a modular application in one repository. Share domain services between the web process and the background worker. Avoid adding independent microservices for features that fit in the application.

| Concern | Implementation decision |
|---|---|
| Runtime/tooling | Node.js 24 LTS, TypeScript in strict mode, pnpm; pin actual supported package versions and commit the lockfile |
| Web application | Next.js App Router with React; server-rendered pages and server-side route handlers/actions; Node runtime for database/AI work |
| UI | Tailwind CSS, accessible component primitives, Lucide icons; semantic HTML and keyboard support |
| Data | PostgreSQL, Drizzle ORM and versioned migrations; PostgreSQL is authoritative for user data |
| Validation | Zod at external boundaries, content import, environment parsing, and AI output parsing |
| Authentication | Better Auth with the Drizzle PostgreSQL adapter; email/password login; closed registration and an explicit owner-bootstrap procedure |
| Text AI | Server-side OpenAI adapter using the Responses API and structured outputs where supported; model IDs set by configuration |
| Audio | Server-side speech generation/transcription adapters; browser recording/playback; separate audio-analysis capability for feedback that actually requires sound |
| Assets | S3-compatible storage adapter; local filesystem adapter for development only; private storage for learner recordings |
| Jobs | PostgreSQL-backed pg-boss worker for media generation, durable AI jobs, and exam finalization; idempotent handlers |
| Verification | Vitest for domain rules, PostgreSQL integration tests, Playwright for essential browser journeys |
| Packaging | Docker web and worker targets, development Compose services, CI, and a documented deployment procedure |

Confirm current official APIs at implementation time. Record installed versions and compatibility decisions in `docs/IMPLEMENTATION_STATUS.md`. Do not copy obsolete framework examples or use unbounded `latest` tags in production images. If this repository already contains implementation when you begin, inspect it first and preserve valid work; document any justified deviation from this initial stack.

Use modules under `src/` for `auth`, `db`, `content`, `learning`, `reviews`, `planning`, `assessment`, `ai`, `audio`, `exams`, and `exports`. Keep domain rules callable without the UI. Keep provider clients, answer keys, signing credentials, and database access server-only.

Content lives in validated, version-controlled files under `content/`; a deterministic import step creates immutable published versions in PostgreSQL. Learner events and evaluations live only in the database. Do not mix personal learning records into committed curriculum files.

## 3. Product surfaces and interaction design

Create a calm, legible learning workspace with a neutral palette and restrained semantic accents. Prioritize readable German text, full-width tables when necessary, obvious exercise states, and one primary next action. Progress graphics must reflect stored evidence. Avoid a marketing landing page becoming the main deliverable.

Use five primary navigation groups: **Today, Course, Practice, Exam, Progress**. Place reference material and settings within those groups rather than exposing a long, flat navigation list.

| Route/surface | Required behavior |
|---|---|
| `/login` | Sign in, useful errors, working session handling; no public self-registration unless deliberately enabled later |
| `/onboarding` | Three short question groups from the course spec, editable time budget, timezone, explanation language, optional exam date, saved draft; optional first languages and current Berufssprachkurs status/schedule |
| `/diagnostic` | Resumable D1–D5 rounds; objective and productive evidence; per-module placement routes; explicit skipped/unassessed audio skills |
| `/today` | Current stage, available time selector, continue session, due reviews, recommended tasks, reasons, minutes, completion state |
| `/course` | Bridge/C1/exam/C2 roadmap, prerequisites, availability, lesson status, accessible next lesson |
| `/learn/[lessonId]` | Objectives, structured lesson blocks, examples, visuals, vocabulary support, exercises, feedback, exit check; save and resume |
| `/reference` | Searchable article/case toolkit, grammar atlas, bilingual terminology, exceptions, directly linked exercises |
| `/vocabulary` | Search/filter lexical entries, gender/plural and verb patterns, recognition versus recall, personal review queue |
| `/practice` | Article drill, grammar clinic, reading/listening, conversation, writing, and mediation practice |
| `/exam` | Verified format guide, section practice, available mock exams, prior attempts, clearly separated practice and simulation modes |
| `/errors` | Original response, correction, explanation, category, recurrence, repair exercise, retest status |
| `/progress` | Coverage, demonstrated competence, retention, and exam evidence; distinct metrics with denominators and dates |
| `/settings` | Goals, study schedule, language preference, recording retention, data export/import, account controls |

Lesson vocabulary support must be accessible by keyboard and tap. Place tutor help in the lesson context. Implement the course commands as real actions, including a 20-minute session, practice-my-mistakes, explain-more-simply, and resume.

Distinguish `not_started`, `in_progress`, and `completed` from learning mastery. Show accurate loading, empty, error, unavailable, saved, and saving states. Never present an unimplemented route as a functioning feature. Preserve typed work during ordinary navigation and show a recovery path after a network error.

Keep lesson interaction focused on one actionable task at a time, with the full outline available. End a session with demonstrated gains, priority repairs, due reviews, the next action, and the actual last-saved time. A saved indicator requires a successful server acknowledgment. Study mode permits an explicit solution request and records assistance; exam simulation follows its separate reveal restrictions. Increase German explanations gradually according to demonstrated comprehension and learner preference, without removing English help during study.

Responsive layouts must work at 390px, 768px, and 1440px widths. Use labels alongside gender/status colors, support reduced motion, and keep controls usable with keyboard navigation. Use English explanations initially, with a German UI option as part of the completed product. Mark German content with the appropriate language attribute.

## 4. Curriculum and content contracts

### Structure and publishing

Represent stages, modules, lessons, reference entries, lexical entries, skills, exercise versions, and media explicitly. Give them stable IDs that survive title edits. Maintain a prerequisite graph and reject missing references and cycles.

Each lesson must contain: stage/module ID, version, German title, English explanation title where useful, objectives, prerequisites, target skills, estimated time, ordered content blocks, lexical/reference links, exercise IDs, exit check, and source/provenance metadata.

Use typed blocks such as `explanation`, `example`, `comparison`, `table`, `diagram`, `image`, `reading`, `audio`, `exercise`, and `reflection`. Prefer validated JSON plus safe Markdown fields. Do not evaluate model-generated MDX or arbitrary HTML/JavaScript. Sanitize rendered content.

Each exercise needs a type, clear task, stimulus, target skill(s), difficulty/stage, assistance rules, accepted responses or versioned rubric, explanation, and a transfer-family ID. Support multiple choice, matching, gaps, sentence ordering/transformation, short constructed answers, longer writing, listening responses, spoken responses, and mediation. Add types by milestone; all required types must exist by release.

Separate learner payloads from grading data. Do not include hidden solutions or exam transcripts in the initial client payload and merely hide them with CSS. Expose answers when the task's reveal policy permits it. Opening a solution or using a hint must label the attempt as assisted; reopening it must not create independent evidence.

Use the publishing lifecycle `draft → validated → published → archived`. Keep a separate quality record showing automated checks, language review method, review date, and unresolved issues. Schema validation alone is not a language-quality review, and AI review must not be labeled human review.

Published lessons/exercises are immutable versions. Editing creates a new version. Existing attempts retain their original content and rubric versions. Content seeding is idempotent and never resets learner progress.

### Coverage and minimum usable batches

Create a coverage matrix mapping every educational requirement in `COURSE_SPEC.md` to module/lesson IDs in `docs/CURRICULUM_MAP.md`, practice, reference support, and status. Include objectives, exit-rubric IDs, input modality, required assets, and content quality state. Completion counts never substitute for coverage or language quality.

M1 must contain six fully authored bridge lessons:

1. Gender versus case; learning article–noun–plural packages.
2. Cases, determiners, and useful workplace sentence patterns.
3. Adjective endings with definite, indefinite, and zero articles.
4. Verb position, sentence brackets, and subordinate clauses.
5. Prepositions and verb government in workplace communication.
6. A clear professional email and a B2-to-C1 improvement comparison.

Include at least 60 meaningful scored items across those lessons and the diagnostic, 80 complete lexical entries, and eight substantive reference entries. Supply actual tables and at least one accurate grammar diagram per lesson where it aids understanding. Include original reading passages, complete answer explanations, and constructed-answer exercises. These are initial delivery floors, not a sufficient complete C1 curriculum.

Map the six M1 lessons respectively to `B2-02-L01`, `B2-02-L02`, `B2-03-L01`, `B2-01-L01`, `B2-06-L01`, and `B2-08-L01`. Their supporting references may introduce targeted prerequisites before the full prerequisite module is published. Do not make M1 depend on unavailable later modules.

M2 covers all eight bridge areas through `B2-01`–`B2-12`, then publishes the 18 C1 modules `C1-01`–`C1-18` with at least 48 substantial C1 lessons in total, distributed by actual learning need. Every module needs real instruction, practice, transfer, and an exit check; expand beyond this floor wherever the coverage matrix shows a gap. Keep the parallel `ART-01`–`ART-05` and `PR-01`–`PR-05` tracks. The map supplies concrete outcomes and dependency order; do not substitute a count of titles for authored content.

Every published lesson must include the vocabulary and prerequisites needed to use it. Add all necessary lexical entries as the curriculum grows; do not use arbitrary vocabulary totals as proof of C1. Publish complete study batches, not dozens of nearly identical short templates. Listening-dependent blocks remain unavailable until their audio exists; do not label the complete course ready until those gaps are resolved in M4.

The article toolkit must include all four cases, singular/plural, indefinite/possessive/negative/zero articles, contractions, gender patterns and exceptions, weak nouns, plural patterns, adjective agreement, compounds, and a lookup decision guide. Use `docs/GRAMMAR_REFERENCE.md` as the corrected initial source. Test common overgeneralizations explicitly, including temporal case, dative plural, weak/mixed noun genitives, and suffix look-alikes. Store rule scope, lexical sense, certainty label, and exception links. Required lesson vocabulary must be available in the internal lexicon; an unfamiliar entry cannot send the learner to an external dictionary as a prerequisite.

Use precise SVG/HTML diagrams for grammar. Use original or appropriately licensed workplace images with provenance and alt text. Author core lesson explanations, answer keys, and reference material in advance; AI supplies personal feedback and supplementary variants without replacing the published curriculum.

### Diagnostic and placement contract

Implement the D1–D5 tasks and modality requirements in the curriculum map. The estimated round lengths are divisible into short resumable segments, not a compulsory 90-minute onboarding test. Start useful teaching after D1 while collecting remaining evidence. In M1, assess the available objective/constructed-answer items and retain productive work for evaluation; leave unavailable AI/audio assessments explicitly pending until M3/M4. Do not label ungraded writing or missing audio as a failure or completed diagnostic evidence.

Persist a placement decision for each bridge module: `skip`, `check`, `repair`, or `full`, with evidence IDs, target objectives, reason, date, and policy version. `skip` waives redundant instruction; it does not mark lessons completed or award retained mastery. `check` schedules a transfer probe, `repair` assigns specific prerequisite work, and `full` recommends the complete module. Unassessed modalities remain unassessed. Progress distinguishes completed lessons from placement waivers, with both denominators explained. Use objective-level prerequisite satisfaction so a placement waiver can unlock appropriate work without fabricating a mastery state. Revisit a waiver when contradictory evidence appears.

Recommend stage transitions from checkpoint evidence and carry open repairs forward. The learner may enter exam practice earlier; record gaps and adjust the plan. Module access and placement are distinct from claims of C1 competence or exam readiness.

## 5. Persistent data model

Implement migrations and constraints. The following are logical entities; combine tables only when the same guarantees remain clear.

| Entity | Required data and invariants |
|---|---|
| Auth user/session/account | Better Auth schema; server-validated sessions; never trust a browser-supplied owner ID |
| Learner profile | User ID, goals, optional first/other languages, explanation preference, time budget, study days, timezone, optional exam date, BSK status/schedule, exam eligibility verification status, diagnostic state |
| Curriculum/content versions | Stable identity, immutable version, stage/module, payload, publish state, dependencies, provenance |
| Skills/objectives | Stable IDs, skill family, evidence modality, prerequisite links, mastery policy version |
| Diagnostic/placement | Round/task evidence, skipped/unavailable state, per-module route and rationale, objective-level waivers, checkpoint results, placement policy version |
| Lexical/reference entries | Full noun/verb/expression schema, examples, rule links, pronunciation support, content version |
| Learning session | User, plan/version, start/end, actual completed tasks, resumable position |
| Attempt | User, session, exercise version, submitted response, modality, hint/solution exposure, timestamps, local study date/timezone snapshot, idempotency key |
| Evaluation | Attempt, scorer type, model/prompt/rubric versions if applicable, status, criterion results, evidence excerpts, corrections, supersession link |
| Skill evidence/state | Evidence IDs and source evaluations; derived state, last demonstrated date, next check, algorithm version |
| Review card/schedule | User, lexical/skill target, retrieval mode, interval step, due local date, review history, last outcome |
| Error occurrence/pattern | Attempt/evaluation reference, taxonomy tag, original/corrected text, root-cause certainty and probe, pattern ID, recurrence count, repair/retest links, resolution evidence |
| Daily plan/task | User, study date, budget, plan version, recommendation reasons, referenced activity, completion/skip state |
| Media asset | Asset key, type, owner or curriculum scope, checksum, content version, duration, source/voice, retention and processing state |
| AI usage/job | User, operation, request/job ID, status, bounded usage reservation, actual usage if known, retry count, sanitized error |
| Exam definition/attempt | Source/version, verification state, delivery mode and effective dates, block/task rules, mock version, practice/simulation mode, deadlines, responses, exposure/integrity flags, rubric and four skill totals |
| Export/import record | Schema version, owner, export/import timestamp, validation report, ID mapping and deduplication status |

Store instants in UTC and retain learner-local study dates where scheduling depends on a day. Test date boundaries and daylight-saving transitions. Use foreign keys, scoped uniqueness, and indexes for ownership, due reviews, active sessions, and recent errors.

Submitted attempts are immutable. Corrections or regrading create linked records rather than overwriting historical evidence. Derived mastery must be rebuildable. Keep draft autosaves separate from submitted attempts. A duplicate submission, retry, or job execution must not count twice or charge twice within the application's control.

Durable history has no arbitrary “last three samples” or “25 errors” deletion cap. Bound what is passed to the tutor with summaries and source IDs, while preserving the complete owner-controlled history. Store missing/unassessed scores as `null`, separately from a measured zero.

## 6. Exercise grading and mastery rules

Implement objective grading in deterministic application code. Normalize only what the exercise permits: do not silently equate umlauts, `ss/ß`, case, or punctuation when that distinction is the learning target. Store explicit accepted variants. Free writing uses a rubric and AI-assisted evaluation, with task completion and meaning assessed alongside form.

Evaluation states are `pending`, `completed`, `inconclusive`, and `failed`. Pending, failed, or inconclusive work does not receive a passing score. Preserve the response and provide retry/review options. Self-reported confidence and flashcard ratings can help scheduling but cannot independently establish mastery.

Use these pedagogical state rules, versioned as `mastery-v1`:

- `not_assessed`: no usable evidence; distinguish never attempted from skipped.
- `introduced`: teaching material viewed, with no performance claim.
- `practising`: relevant assessed attempts exist but independence criteria are unmet.
- `independently_demonstrated`: at least two successful unaided transfer tasks from different task families on separate learner-local days.
- `retained`: an additional successful delayed transfer check at least seven days after independent demonstration, with no unresolved recurring-error flag for that target.

For productive grammar, vocabulary, writing, mediation, and speaking, recognition alone cannot establish independence. For reading/listening, use unfamiliar comprehension tasks with the correct input modality. Pronunciation evidence requires actual accessible audio. Short single-item guesses must not award a broad skill: each authored transfer check specifies adequate coverage, an explicit success rule, and the skills it can support.

Attach `review_due` and `needs_repair` flags separately. Two failed independent checks among the last three relevant checks trigger repair and return the current state to practising; preserve the earlier achievement in history. A later mistake must be able to reduce the displayed current confidence/state.

AI evaluation may supply coaching evidence only after schema validation and the rubric's success rules are applied by domain code. Store its source and limitations. Model self-confidence is not a calibrated mastery probability. Do not let a chat reply directly set a skill to retained, change an exam score, or mark a lesson completed.

Report three separate measures: curriculum completion with its published-lesson denominator; demonstrated/retained objectives with evidence counts; and exam readiness from distinct exam attempts. Never collapse them into an unexplained “C1: 83%” badge.

### Error diagnosis and correction contract

Use `GEN` (lexical gender), `CASE`, `NOUN` (noun inflection), `ADJ`, `VPOS`, `VFORM`, `PREP`, `CONN`, `LEX`, `REG`, and `ORTH` as the initial taxonomy. Keep communicative task/rubric weaknesses alongside these language tags; vocabulary accuracy alone does not describe communication. An error may have several affected spans but one shared causal pattern. Do not count predictable agreement consequences as several independent failures of the same skill.

Do not infer a GEN/CASE root cause from an ambiguous article alone. Ask a short gender-and-case probe or store an unresolved classification until evidence distinguishes them. Log actual mistakes separately from optional `C1-Variante` suggestions. In writing, initially expand the 5–7 most useful corrections and summarize remaining patterns; speaking feedback normally follows the turn with 3–5 priority corrections. Let the learner expand the full review. Each priority pattern links to a reference, a repair task, and a later independent retest. The display limit does not limit what is stored. A single corrected repetition does not erase a recurring error or override `mastery-v1`.

## 7. Spaced review and daily planning

Implement pure, clock-injectable functions for scheduling and planning; persist their results and policy versions. The AI can explain a plan or suggest a candidate task, while application rules decide what becomes a scheduled task.

### Review policy: `review-v1`

Use initial successful intervals of 1, 3, 7, 14, and 30 learner-local days. Advance one step after a successful scheduled unaided retrieval. A same-session repair does not advance the day-based interval. A failed retrieval resets the step and schedules a next-day review, with an optional immediate repair exercise. An assisted correct response schedules another short review without establishing independent mastery.

Calculate due dates with calendar-day arithmetic in the learner's timezone rather than adding 24-hour durations. Record the timezone used. A timezone change affects future planning while preserving historical local dates and evidence. Track different retrieval modes separately where recognition and production differ.

### Planner policy: `planner-v1`

1. Load current profile, in-progress session, published activities, prerequisites, due reviews, recent errors, evidence gaps, and weekly skill exposure.
2. Resume unfinished work first when it fits the available time. Retain completed task IDs when replanning.
3. Allocate a bounded review block, prioritizing overdue targets and repeated errors. Do not fill the whole day with accumulated reviews.
4. Repair unmet prerequisites and recurring high-impact weaknesses before advancing dependent lessons.
5. Select the next published lesson or a meaningful lesson segment that fits the remaining budget.
6. Add appropriate comprehension/production tasks, correcting neglected skills over the week.
7. Reserve a short exit check and reflection; sum all task estimates and keep them within the budget.

Use a default 60-minute allocation of 10 review, 15 new learning, 15 comprehension, 15 production, and 5 feedback minutes. A 20-minute mode uses a smaller complete learning activity, not a truncated full lesson. Adapt allocations to evidence; explain the reason in ordinary language.

Start with 8–12 new lexical items/chunks on a standard study day. Reduce to 0–4 when overdue reviews exceed twice the session's review capacity or recent scheduled unaided recall is below 70% over at least ten reviews. Treat those numbers as versioned coaching defaults, not scientific constants.

Each plan task contains `activityId`, `contentVersion`, `reasonCode`, `reasonText`, `estimatedMinutes`, `targetSkills`, and `completionCriterion`. Use stable tie-breaking so identical inputs produce the same plan. Never recommend an unavailable asset, an unpublished lesson, or an already completed task as new work.

On first use with no evidence, choose diagnostic/bridge tasks. On later visits, compute the plan for the current local day on demand; scheduled notifications are not required for daily recommendations. Recompute explicitly after a completed session or changed time budget, preserving the audit trail. Missed days create a manageable recovery plan.

Incorporate placement routes and, if provided, the learner's concurrent course workload. Self-reported attendance informs scheduling but is not assessed mastery. In Part II, consider score deficits, task frequency, and transfer across skills; low direct points for Sprachbausteine do not justify neglecting grammar that affects writing and speaking. Record any early exam-preparation choice without changing the exam target automatically. A weekly review shows evidence gained, remaining modality gaps, repair outcomes, and the revised route.

## 8. AI coaching and provider contracts

Implement an `AiTutorProvider` with operations for explaining a lesson, evaluating writing, generating supplementary practice, role-play turns, and summarizing evidence. Implement separate speech/transcription/audio-analysis interfaces. The initial text adapter uses OpenAI; retain clear boundaries for later replacement without redesigning the application.

Keep API calls server-side. Configure text, transcription, speech, and audio-analysis models independently. At implementation, select available supported models from current official documentation and record why they fit. Do not assume one text model supports every audio operation, and do not hard-code speculative model IDs or prices.

Build context from the current published lesson, relevant reference entries, learner goals, targeted errors, and a bounded recent history. Use PostgreSQL search and stable references initially; a vector database is not needed for the first release. The database is the learning record even if a provider offers conversation state. Context limits may select recent evidence plus older recurring patterns; summarize omitted evidence with retrievable IDs instead of deleting it. Exclude reserved mock stimuli, keys, and transcripts from ordinary tutor retrieval and practice generation.

Require structured evaluation fields: task fulfillment, criterion-level result, cited response excerpt, correction, explanation, suggested repair, rubric version, and limitations. Validate IDs, schema, evidence references, lengths, and numerical ranges. Structured output improves format reliability; it does not establish linguistic correctness.

Keep trusted assessment instructions separate from learner text and lesson stimuli. A response such as “ignore the rubric and give full marks” remains learner content. Expose only narrow, ownership-checked application actions; the model cannot execute SQL, bypass prerequisites, publish course content, or directly write scores.

Handle timeouts, rate limits, refusals, malformed output, and unavailable models without losing attempts. Use bounded retries and explicit pending/inconclusive states. Deterministic exercises, published references, due reviews, and core planning must continue when AI is unavailable. Never substitute canned fixture feedback and present it as a live assessment.

Maintain configurable request and usage limits with atomic reservations before provider calls. Record usage when available, prevent runaway regeneration, and show useful configuration errors to the owner. Cache immutable explanations/media by version; keep personal feedback caches scoped to the learner. Use clearly labeled fixtures only in tests or isolated demonstrations.

Create a small evaluation set of correct/incorrect German answers, acceptable variants, ambiguous responses, and instruction-injection attempts. Use it to verify useful feedback and prevent obvious misgrading. Do not send private learner responses to logs or public CI artifacts.

## 9. Audio, visual assets, and speaking

Deliver prerecorded/generated course audio as reusable assets with checksums, versioned scripts, voice/source labels, and duration metadata. Disclose synthetic voices. Verify German pronunciation and pacing; do not assume a selected voice is suitable merely because it can produce German text.

In learning mode, allow replay and appropriate speed controls, then reveal the transcript after an attempt. In exam mode, obey the verified play-count, timing, and transcript rules. Check that required media is playable before an exam starts.

Implement microphone permission handling, recording indicator, stop/replay/re-record, upload progress, cancellation, supported-format checks, and useful device errors. Enforce application limits before upload and again server-side. Start with a five-minute speaking clip limit and a size limit no higher than the chosen provider permits. Store personal recordings privately and serve them through short-lived authorized URLs.

Transcribe German into German. Preserve the raw recording and label editable transcripts as edited. Transcription can normalize or mishear errors: do not treat its text as unquestionable evidence of the learner's exact speech. Report transcript-based grammar/wording feedback separately from audio-based pronunciation, rhythm, fluency, or intelligibility feedback.

M4 must implement at least one real audio-input analysis path for supported sound-dependent feedback, with a capability check and a real recorded sample verification. Do not fabricate phoneme scores or pronunciation feedback from text alone. Unsupported dimensions remain unassessed, and an unresolved audio-analysis dependency must remain visible in the release status.

Use pg-boss for durable asset generation and long-running evaluations. Make publication wait for required assets, allow safe retry, and avoid duplicate generated files. Add cleanup for abandoned uploads and an owner-configurable retention policy for recordings. A deleted recording must no longer be retrievable by an old application asset endpoint.

For paired speaking practice, simulate a partner with real turn-taking and follow-up questions. Label AI partner simulations distinctly from human pair practice. Typed fallback remains useful but cannot produce audio-only assessment evidence.

## 10. DTB C1 examination engine

Implement a versioned exam definition using `docs/DTB_C1_EXAM_BLUEPRINT.md` and current official telc/BAMF materials. Verify detailed subparts, response formats, scoring weights, pass conditions, audio rules, speaking sequence, preparation rules, and the relevant delivery mode before publishing a definition. The blueprint distinguishes the checked paper baseline from the announced mandatory digital transition on 1 May 2027. A web-based simulation of paper rules is not verification of the digital examination format.

The source record must include title, URL, publication/version where available, retrieval date, page/section evidence, and unresolved details. Any unresolved scoring rule prevents an official-format pass/fail calculation; allow labeled practice without inventing the missing rule.

Store `deliveryMode`, `effectiveFrom`, `effectiveTo`, `verifiedAt`, field-level source references, and `verificationStatus`. Resolve the definition against the intended exam date and confirmed mode. With no date, show the baseline and upcoming change; with an unresolved applicable format, offer labeled skills practice and request source verification before claiming a matching full simulation. Keep old attempts attached to the definition actually used. Eligibility is separate from study access: retain unknown/learner-reported/confirmed status and never infer eligibility from living in Germany or switch exams without the learner's choice.

Provide section practice and at least three distinct complete original mocks with complete answer/rubric/audio assets. Cover the integrated reading-writing and listening-writing tasks as well as reading, listening, language elements/writing, and speaking. Preserve an unseen mock for later readiness evidence. Label original mocks as unofficial.

All three original mocks must work within the app, including their listening recordings and partner/examiner simulation. An official model test may be an optional additional benchmark when lawful access is available; it cannot replace the third original mock or become required homework. Log prior exposure to mock tasks, transcripts, model answers, and attempts. Publicly learning the twelve published speaking themes is expected preparation, distinct from seeing a reserved mock's exact stimuli and answers.

Use server-authoritative start times, administrative-block deadlines, attempt state, and finalization. For the paper baseline, the reading and integrated writing components share a 65-minute block: 45/20-minute teaching allocations must not create separate mandatory locks. Listening and note-taking use the continuous 25-minute media sequence; language elements and writing share 45 minutes. Model task navigation and answer-edit windows explicitly from verified administration rules. The browser timer is a display. Reload, duplicate tabs, clock changes, and delayed background jobs cannot extend an exam. Save drafts with sequence/version checks; retrying submission is idempotent. Grade only server-accepted responses within the permitted window.

Practice mode supports pausing and hints. Simulation mode has the verified restrictions, a media preflight, and no teaching feedback until the attempt ends. Record interruptions, assisted work, early transcript exposure, missing audio, and incomplete speaking. Such attempts cannot silently count as full readiness evidence.

For time expiry, finalize from the latest valid saved response even if the worker runs late. Explain the effect of a lost connection; never silently award more exam time. Gate solution access server-side during an active attempt.

Apply verified rubric arithmetic in deterministic code. The paper baseline has four skill totals of 60, not one total per timetable row. Writing includes phone-note and Sprachbausteine points; criteria II–IV are rated once across the two extended texts, not added twice. Use integer half-points internally for the supplied tables. Open-response ratings remain AI coaching estimates with criterion evidence. Readiness requires at least two distinct complete valid unseen-at-start mocks meeting verified applicable criteria and the separately labeled project target: at least 156/240 and at least 36/60 in every skill, with no unresolved recurring speaking/writing criterion repair. Show the underlying attempts and distances from boundaries. Missing speaking or listening evidence, unresolved applicable pass rules, or invalid simulation conditions keep overall readiness incomplete. Do not invent a statistical probability of passing.

## 11. Authentication, privacy, and recovery

Require authentication for personal learning data, drafts, recordings, exports, and provider-backed requests. Bootstrap the first owner through a documented local/admin command with secret input; close public signup at the server. Use the authentication library's password handling and session protections rather than inventing them. Include a safe owner password-recovery procedure without exposing an unauthenticated reset route.

Scope every read/write by the authenticated user and verify ownership of nested resources and signed media requests. Test with two users even though the first product serves one learner. Never accept a requested user ID as authorization. Use secure production cookies, trusted-origin checks, and request limits.

Do not commit real attempts, audio, credentials, personal exports, or provider logs. `.env.example` contains names and non-secret examples only. Synthetic test fixtures stay isolated from real accounts. Make clear in the interface when audio/text is sent to the configured AI service.

Implement user data export as a versioned JSON package plus readable progress summary and CSV vocabulary/review data. Include content and policy version references. Import into the authenticated account only, validate before mutation, preview conflicts, deduplicate by stable IDs, and perform the merge transactionally. Back up existing data before a destructive restore. Recompute derived state from evidence rather than trusting imported summary scores.

Support a named legacy adapter for the supplied `learning_record.json` format. Its `_schema` field is descriptive text, not a formal validation schema. Validate it through an explicit adapter schema; preserve original imported evidence and provenance, map `demonstrated` to the canonical label `independently_demonstrated`, then recompute what is actually supported. A legacy label or aggregate mock total without underlying evidence is a reported historical claim, not newly verified mastery/readiness. The supplied empty template must import as unassessed. Map stable module IDs, dates, errors, writing samples, optional external reviewer notes, and placement decisions; quarantine unrecognized fields for review rather than silently losing them. Never accept an imported owner ID as authorization.

Native vocabulary practice and progress saving are mandatory. Optional Anki-compatible CSV export must quote delimiters, newlines, and double quotes correctly and include stable card IDs and tags; it must not require Anki installation or manual file replacement after sessions. Keep optional exports separate from the complete JSON backup contract.

Support deleting an individual recording and resetting a chosen learning area through clear user actions. Broad reset/deletion requires an explicit confirmation in the product. Document database/object-storage backup and a restore exercise. A browser refresh, expired session, failed evaluation, or content update must not erase valid learning history.

## 12. Milestones and acceptance gates

Implement in this order. Mark a gate complete only with running behavior and evidence. Maintain `docs/IMPLEMENTATION_STATUS.md` with implemented/verified/blocked items and exact remaining work. If interrupted, leave a working checkpoint and resume from that record.

| Milestone | Required outcome | Acceptance gate |
|---|---|---|
| M1 — First complete learning session | App/auth/database, onboarding, diagnostic, six real bridge lessons, article references, objective/constructed-answer grading, saved attempts, initial reviews/planner, basic progress | A learner completes the full journey, reloads and signs in again without losing data; advancing a test clock to the next local day produces the correct reviews and recommendation; core journey works without an AI key |
| M2 — Complete curriculum foundation | Twelve bridge and eighteen C1 modules, at least 48 substantive C1 lessons, parallel article/pronunciation tracks, coverage matrix, complete reference/lexical systems, search, diagrams, immutable content import | Every course requirement has a mapped location and exit rubric; all published dependencies/links resolve; corrected reference cases pass review; no placeholder lessons; audio-dependent availability is truthful |
| M3 — Adaptive copilot and writing | Live AI explanations/writing/mediation/role-play, structured evaluations, richer error repair, weekly analysis, full mastery/review rules, usage limits | A real model evaluates representative German work; malformed/failed results preserve the response; independent/retained states follow domain rules; planner reacts to errors and time budget |
| M4 — Listening and speaking | Usable course audio, recording and playback, transcription, real audio analysis for supported feedback, oral interaction, media worker/storage/retention | Real German clips play/record/process on desktop and mobile; sound-dependent feedback uses audio; missing capabilities remain unassessed; full C1 audio coverage is delivered |
| M5 — DTB C1 preparation | Verified exam definitions, section training, three complete original mocks, server timing, rubric scoring, readiness view | All sections run with correct assets and verified rules; refresh and retries do not alter deadlines or duplicate scores; incomplete modalities cannot yield complete readiness |
| M6 — Reliable personal release | C2 extension with initial usable lessons, export/import, backups, recovery, accessible responsive polish, CI, deployment package, documentation | A clean install/migrate/seed/run succeeds; cross-account access is rejected; progress round-trips through export/import; browser journey and real integration checks are recorded; launch checklist has no hidden required blockers |

The initial C2 extension must include a mapped route and at least four substantial lessons spanning source synthesis, nuance/register, advanced argument, and complex listening/discussion. Do not claim a completed C2 course or C2 certification from that starter track; label the remaining route accurately and continue expanding it through the content system.

Missing credentials must not block independent core implementation. Build and test the provider contract and honest unavailable states, record the exact configuration needed, and leave the real-provider acceptance gate open. A fixture-only success is not proof of a live integration. Unavailable hosting similarly does not prevent completing the deployable application.

## 13. Verification that matters

Create tests for important behavior rather than assertions that merely mirror markup. Required checks:

- Objective grading respects umlauts, articles, target case, allowed alternatives, and assisted attempts.
- Repeated clicks, retries, or job runs create one effective attempt/evaluation/schedule transition.
- Recognition-only practice and same-day repetition cannot award independently demonstrated/retained states.
- Diagnostic placement skips redundant instruction without marking lessons completed, fabricating retention, or assessing unavailable audio; waived prerequisites permit the intended route.
- The delayed check, recurring-error repair, and later recovery change current mastery correctly.
- Review dates and day-based evidence work over Europe/Berlin midnight, DST, and a timezone change.
- Plans fit 20/60-minute budgets, select only available content, preserve completed tasks, cap overdue work, and explain choices.
- Publishing or seeding a new content version preserves old attempts and does not reset progress.
- Owner A cannot access Owner B's drafts, attempt IDs, audio, export, evaluation, or AI actions.
- Provider failure leaves the answer saved and never produces a fabricated pass; hostile learner text cannot change the grading policy.
- Ambiguous article errors remain unresolved until diagnosed; correction limits and bounded tutor context do not delete history or count cascading agreement errors repeatedly.
- A source transcript cannot count as listening evidence; typed work cannot count as pronunciation evidence.
- Exam deadlines survive reload/clock changes; expiry finalization, draft ordering, audio preflight, and score calculations match the definition.
- Exam fixtures cover four 60-point maxima, half-point rubric values, joint writing criteria counted once, every pass boundary, incomplete modalities, exposed holdouts, and the 1 May 2027 format transition. Unresolved rules cannot produce a verified readiness verdict.
- A versioned export/import round-trip preserves history and correctly rebuilds derived state without duplicates.
- The legacy empty record creates no assessed skills; legacy summary labels cannot forge evidence; CSV exports round-trip German text, delimiters, quotes, and multiline examples.

Use real PostgreSQL for migration/ownership/persistence integration tests. Mock external AI in routine CI; document separately the opt-in real-provider checks and the models used. Inspect the essential screens at the three target widths and verify keyboard navigation. Do not claim real AI, audio, deployment, or exam calibration was tested when only fixtures were exercised.

## 14. Developer operations and deployment handoff

Provide functioning project commands by the milestone that needs them: `pnpm dev`, `build`, `start`, `lint`, `typecheck`, `test`, `test:integration`, `test:e2e`, `db:migrate`, `db:seed`, `content:validate`, `worker`, and owner bootstrap. Do not list nonexistent commands as finished setup instructions.

Provide `.env.example` and validation for: `DATABASE_URL`, auth secret/base URL, app URL, AI key and separate model IDs, request/usage limits, storage driver and S3 configuration, worker settings, and any optional mail/recovery settings actually implemented. Document which features each missing value affects. Keep provider credentials out of client bundles.

Development setup uses PostgreSQL and optional S3-compatible local storage through Compose. Production uses the Docker web process, a worker process, managed PostgreSQL, and durable object storage. Do not assume the web container filesystem survives redeployment. Document a concrete container deployment path, including Northflank as a suitable target if no alternative has been selected by the owner.

Run migrations as a controlled release step, not competitively from every replica. Document application/database compatibility, rollback of application code, forward fixes for destructive schema changes, asset backups, environment validation, readiness checks, and worker monitoring. Health endpoints must not expose credentials or learner data.

Set up GitHub Actions for dependency installation, lint/type checks, content validation, build, domain/integration tests, and the essential browser flow. Keep expensive real-provider tests opt-in. Do not provision paid infrastructure or represent deployment as completed as part of a local build without an actual requested deployment and verification.

## 15. Coding-agent execution protocol

1. Read both specifications and their three supporting contracts, repository instructions, and existing code. Identify the next incomplete milestone from actual behavior and the implementation record.
2. Work in a feature branch from the current `main` unless the owner specifies another workflow. Preserve unrelated changes. Do not force-push or reset existing work.
3. Make a short implementation plan and begin coding. Create reusable contracts and enough real content to exercise the complete user journey; do not spend the first delivery on an empty dashboard.
4. Complete and verify M1 before expanding breadth. Continue M2–M6 in order within the authorized implementation task. Do not silently reduce the requested product to M1.
5. Keep software and content progress separate in the status record. Record source verification dates, package/model versions, actual verification results, unavailable integrations, and the next actionable task.
6. When context or execution limits require a stop, leave a runnable checkpoint and a concrete continuation note. Do not claim the whole platform is finished or promise unstarted background work.
7. At handoff, state what runs, how to run it, what was tested, and any remaining required gate. Include the relevant commit/PR and screenshots when produced.

### Ready-to-use implementation instruction

> Read `BUILD_SPEC.md`, `docs/COURSE_SPEC.md`, `docs/CURRICULUM_MAP.md`, `docs/DTB_C1_EXAM_BLUEPRINT.md`, and `docs/GRAMMAR_REFERENCE.md` in full. Implement German Learn Assistant according to these contracts. Begin with the next incomplete milestone and deliver M1 as a complete working learning journey with real bridge material, persistent progress, and a correct next-day plan. Continue the required milestones in order, verifying each gate and updating `docs/IMPLEMENTATION_STATUS.md`. Resolve routine decisions yourself. Preserve existing work. Report unavailable credentials or services precisely while completing independent work. Teach the learner through the application you build.

## 16. Official implementation references

These sources were inspected on 23 September 2026 to ground the architecture. They describe technologies and exam requirements; the product design and pedagogical policy numbers above are project decisions. Recheck version-sensitive details when implementing.

- [Next.js installation and App Router setup](https://nextjs.org/docs/app/getting-started/installation)
- [Node.js release support](https://nodejs.org/en/about/previous-releases)
- [Better Auth installation and database/framework adapters](https://better-auth.com/docs/installation)
- [Drizzle ORM overview](https://orm.drizzle.team/docs/overview)
- [pg-boss project and worker documentation](https://github.com/timgit/pg-boss)
- [OpenAI structured outputs](https://developers.openai.com/api/docs/guides/structured-outputs)
- [OpenAI speech generation](https://developers.openai.com/api/docs/guides/text-to-speech)
- [OpenAI recorded-speech transcription](https://developers.openai.com/api/docs/guides/speech-to-text)
- [Official DTB C1 overview and linked practice materials](https://www.telc.net/sprachpruefungen/deutsch/dtb-deutsch-test-fuer-den-beruf/deutsch-test-fuer-den-beruf-c1/)
- [telc — mandatory DTB digital transition from 1 May 2027](https://www.telc.net/sprachpruefungen/deutsch-tests-fuer-den-beruf-digital/)

Look up the current audio-input analysis endpoint/model separately when implementing sound-dependent assessment; transcription documentation alone does not establish that capability. Record the chosen source and a successful real sample check in M4.
