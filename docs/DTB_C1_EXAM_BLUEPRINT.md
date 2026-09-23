# DTB C1 exam blueprint

**Checked:** 23 September 2026. **Target:** Deutsch-Test für den Beruf C1. **Status:** checked paper-model reference with explicit open verification points; not a complete verified digital definition. Adapted from the user's `exam_spec_dtb_c1.md` and checked against the primary sources below.

Use with [COURSE_SPEC.md](COURSE_SPEC.md) and [BUILD_SPEC.md](../BUILD_SPEC.md). This blueprint supports original, unofficial practice. It does not authorize copying official papers/audio into the public repository or establish a calibrated prediction of an examination result.

## 1. Source register and applicability

| ID | Primary source | Evidence used |
|---|---|---|
| E1 | [telc DTB C1 Übungstest 1, © 2022, ISBN 978-3-86375-437-2](https://shop.telc.net/media/catalog/product/file/1/0/1011430_22020524_5016-b00-010102_web.pdf) | Printed p. 7 overview; pp. 8–28 tasks and speaking themes; pp. 40–43 rating criteria; pp. 44–46 administration; pp. 47–49 score arithmetic and passing conditions |
| E2 | [telc DTB C1 examination overview](https://www.telc.net/sprachpruefungen/deutsch/dtb-deutsch-test-fuer-den-beruf/deutsch-test-fuer-den-beruf-c1/) | Component durations and official practice-material starting point |
| E3 | [telc DTB digital announcement and FAQ](https://www.telc.net/sprachpruefungen/deutsch-tests-fuer-den-beruf-digital/) | Mandatory digital transition from 1 May 2027; DTB-specific technical details to be published separately |

telc announces mandatory digital DTB delivery on **1 May 2027**. Preserve E1 as a versioned paper baseline; do not assume its administration, interface or scoring is an already verified specification for the future digital exam. Recheck official releases before authoring Part II for the learner's intended exam date, before simulation publication, and before exam-day guidance. If no date is known, explain the baseline and scheduled transition without inventing a date for the learner.

Each implemented definition needs identity/version, `deliveryMode`, `effectiveFrom`, `effectiveTo`, `verifiedAt`, task/block/rubric versions, field-level source references and a verification status. Do not invent an historical effective-from date from a copyright year. After the announced transition date, the paper baseline cannot silently be selected as the applicable current format. Existing attempts retain their original definition.

Registration eligibility, fees and local arrangements are separate from learning access. The archive asserts restricted BSK participation; current eligibility rules and Tutul's status were not established by this review. Store `unknown`, learner-reported information, and confirmed information distinctly. Verify with current BAMF/provider instructions before presenting a registration conclusion. Do not automatically switch to telc C1 Beruf, Goethe C1 or another exam.

## 2. Paper baseline: tasks and administration

| Component | Task structure | Component allocation | Score destination |
|---|---|---:|---|
| Lesen | T1: five needs to eight teasers; T2: two internal texts with four items; T3: four questions to advice posts with a possible no-match choice; T4: minutes with five questions | 45 min | 18 items to reading |
| Lesen und Schreiben | Two comprehension questions on a customer/internal email chain; one appropriate customer reply | 20 min | Two items to reading; reply to writing |
| Hören | T1: three conversations/six items; T2: four conversations matched to statements; T3: presentation/four items; T4: five phone messages/five items | 20 min | 19 items to listening |
| Hören und Schreiben | Phone-message reason plus a note containing names, contact, information and action | 5 min | One item to listening; note to writing |
| Sprachbausteine und Schreiben | Two six-gap texts, first with a word bank and second with three options per gap; one management statement chosen from two topics | 45 min | Twelve items and statement to writing |
| Sprechen | Topic, follow-ups, partner explanation, informal conversation and joint problem-solving | Approximately 16 min paired | Speaking |

The paper written administration uses three blocks: **65 minutes** for Lesen plus Lesen und Schreiben; a **continuous 25-minute audio sequence** for Hören plus Hören und Schreiben; then **45 minutes** for Sprachbausteine und Schreiben. Total: **135 minutes**. The 45/20 reading split is useful for practice budgeting and must not become two compulsory locks in a full simulation. Verify navigation and answer-edit rules independently from these durations.

Use one audio play in the paper simulation. Include instructed reading/response intervals in the media timeline, keep transcripts and answer keys unavailable, and do not introduce a new pause between the listening components. Exact cues and response windows belong to the versioned audio/task definition. Oral practice follows the model's paired sequence with no preparation period: 1A about two minutes per candidate, 1B follow-ups, 1C explanation of the partner's contribution; then a roughly three-minute informal exchange and four-minute joint problem-solving task. The app simulates examiner and partner roles and labels that simulation.

Practice mode may expose help, replay and flexible timing. A full simulated result must disclose interruptions, hints, prior task exposure, unavailable media and missing oral evidence. Dates/fees, centre requirements, permitted aids and actual delivery arrangements need current verification before an exam-day checklist is presented as applicable.

## 3. Four skill scores, each out of 60

These tables preserve the numeric model in the supplied archive, checked against E1 pp. 47–49. The six timetable rows are not six independently weighted skill totals.

| Skill | Calculation | Maximum |
|---|---|---:|
| Reading | Lesen: (5 + 4 + 4 + 5) × 3; integrated comprehension: 2 × 3 | 60 |
| Listening | Hören: (6 + 4 + 4 + 5) × 3; phone-message reason: 1 × 3 | 60 |
| Writing | Email task + statement task + three joint language criteria + phone note + language elements | 60 |
| Speaking | Five task ratings + three joint language criteria | 60 |

### Writing

| Contribution | Rating values | Maximum |
|---|---|---:|
| Email, task criterion I | A: 7; B: 5; C: 3; D: 0 | 7 |
| Statement, task criterion I | A: 14; B: 10.5; C: 5.5; D: 0 | 14 |
| II: organization/cohesion, across both texts | Ordered bands: 9 / 7 / 3.5 / 0 | 9 |
| III: formal accuracy, across both texts | Ordered bands: 9 / 7 / 3.5 / 0 | 9 |
| IV: language range, across both texts | Ordered bands: 9 / 7 / 3.5 / 0 | 9 |
| Phone note | Names: 0.5; contact: 0.5; information: 4; action: 1 | 6 |
| Language elements | 12 correct/incorrect items × 0.5 | 6 |

Criteria II–IV are each rated **once across the two extended texts**. Do not score those criteria for each text and sum them twice. The ordered language bands represent stronger C1, C1, B2 and below B2 performance in the source; criterion I uses its separate A–D task descriptors. A standalone text can receive practice feedback, but it cannot alone produce the full joint writing score.

The phone note has four binary aspects: names, contact, complete information, and action. Information is one all-or-none four-point aspect, not four independently scored one-point items (official model, scoring explanation p. 40 and table p. 48). Phone-note aspects use the task's correct/incorrect answer rules; their weights are not a license to invent a generic partial-credit ladder. Publish original task keys with required facts and accepted formulations. Keep task-specific uncertainty explicit before scoring it. Word-count goals in lessons are coaching guidance, not an invented official minimum.

### Speaking

| Contribution | A / B / C / D values | Maximum |
|---|---|---:|
| Task criterion I, 1A | 5 / 3.5 / 2 / 0 | 5 |
| Task criterion I, 1B | 5 / 3.5 / 2 / 0 | 5 |
| Task criterion I, 1C | 2 / 1.5 / 1 / 0 | 2 |
| Task criterion I, part 2 | 8 / 6 / 3 / 0 | 8 |
| Task criterion I, part 3 | 10 / 7.5 / 4 / 0 | 10 |
| II: pronunciation/intonation, whole oral performance | Ordered language bands: 10 / 7.5 / 4 / 0 | 10 |
| III: formal accuracy, whole oral performance | Ordered language bands: 10 / 7.5 / 4 / 0 | 10 |
| IV: language range, whole oral performance | Ordered language bands: 10 / 7.5 / 4 / 0 | 10 |

Open-response band assignments need criterion-specific evidence and source-grounded descriptors. AI judgments remain coaching estimates. Do not produce a pronunciation rating from a transcript, treat an accent label as an assessment, or substitute a grammar percentage for the whole speaking rubric. Read E1 pp. 40–43 when implementing the band descriptors and attach the source to the rubric version.

### Passing conditions: one boundary remains unresolved

E1 p. 49 specifies an overall **144/240**, sufficient performance in at least three of the four skills, and compensation for one skill in the **40–60%** range (24–36 out of 60). Its wording describes the three-skill threshold as above 60% while also identifying **36 points**, which is exactly 60%. The archive assumes **at least 36**. This review does not silently convert that interpretation into an unambiguous verified rule.

Keep the exact 36-point inclusivity rule **unresolved pending authoritative clarification**. The candidate interpretation is total ≥144, at least three skills ≥36, and no skill below 24; store it only as provisional, not a published official pass evaluator. The production definition cannot emit a verified pass/fail or overall readiness result until all applicable pass rules, including this boundary, are verified. It may show numeric scores, criterion feedback and the separate coaching target meanwhile.

The project coaching target is at least **156/240 and every skill ≥36/60** on two distinct complete valid mocks, unseen when started, without unresolved recurring speaking/writing criterion repairs. This is a deliberate project target with no compensation, not an official rule or statistical guarantee. It must accompany, not replace, verified applicable passing conditions.

## 4. Public speaking-theme preparation

The following are brief internal paraphrases of the twelve public topic areas in E1 pp. 27–28, not copied task sheets. Supply original prompts, vocabulary, example structures, contrasting viewpoints and follow-ups for each.

| Theme | Preparation focus | Course link |
|---|---|---|
| 1 | A decision that shaped your career | C1-13 |
| 2 | Your education or vocational training | C1-13 |
| 3 | A service and its value to customers | C1-05 |
| 4 | How a product is manufactured | C1-01 |
| 5 | Qualities of effective leadership | C1-11 |
| 6 | A business idea of your own | C1-08, C1-12 |
| 7 | Self-employment compared with salaried work | C1-08, C1-13 |
| 8 | Factors behind a company's success | C1-01, C1-15 |
| 9 | Building customer loyalty | C1-05, C1-06 |
| 10 | An app useful at work | C1-15 |
| 11 | A successful advertising campaign | C1-08, C1-12 |
| 12 | A company's use of social media | C1-15 |

Prepare flexible talking points, not scripts. Vary follow-up questions and require accurate partner explanations in 1C. Knowing a public theme is expected; seeing a reserved mock's specific scenario, recording or model answer is separate exposure and must be logged.

## 5. Simulator and content acceptance checks

- Supply three complete original mocks with original in-app audio, speaking support, keys and rubrics. Reserve at least one from tutoring and ordinary practice retrieval. An optional official benchmark cannot replace any of these three.
- Separate administrative blocks, subtasks, media events, scoring contributions and four skill totals in the data model. Pin every attempt to a definition and source version.
- Use integer half-points internally. The maximum writing score is `7 + 14 + 27 + 6 + 6 = 60`; maximum speaking is `5 + 5 + 2 + 8 + 10 + 30 = 60`.
- Scoring fixtures: criterion-I B for both written texts, middle C1 language bands and all objective writing points produce **48.5/60**; criterion-I B in every oral task and middle C1 language bands produce **44.5/60**. Test correct mapping independently from the evaluator's band judgment.
- Test just below/at/above 144 total, 36 per skill and 24 compensation, as well as fewer than three qualifying skills. With unresolved boundary configuration, assert an unresolved verdict rather than guessing the passing result.
- Test the 65-minute combined block, continuous listening, half-point values, missing modalities, exposed mocks and the 1 May 2027 applicability boundary. A browser implementation of the paper baseline must not claim to reproduce DIGItelc's unverified interface.
- Before publication, close remaining verification items: exact pass-boundary inclusivity, applicable digital rules, task-specific scoring details and navigation/administration permissions. Keep learning and numeric coaching usable while those items remain open.
