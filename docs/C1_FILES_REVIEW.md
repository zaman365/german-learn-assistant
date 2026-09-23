# Review of the supplied C1 files

**Reviewed:** 23 September 2026. **Input:** `C1_files.zip`, six Markdown/JSON files. **Conclusion:** useful educational and exam detail that improves the existing specifications, after adapting the chat-project workflow and correcting several claims.

This review changes requirements and supplies reference content. It does not implement the application, publish the full course, assess the learner, or establish exam eligibility. The supplied learning record is an empty template, not evidence of current attainment.

## File-by-file decisions

| Supplied file | Useful contribution | Applied change |
|---|---|---|
| `README_setup.md` | Clear setup, continuity and study workflow | Preserve a simple start/resume experience; replace mandatory external project setup and manual file replacement with app onboarding and automatic persistence |
| `project_instructions.md` | Diagnostic rounds, correction protocol, error taxonomy, session/weekly reviews and context discipline | Add resumable diagnostics, placement routes, root-cause probes, focused feedback and durable history with bounded tutor context |
| `learning_record.json` | Stable module IDs, route decisions, error patterns, samples, BSK status and provenance needs | Add a validated legacy adapter and optional profile fields; do not treat its descriptive `_schema` as JSON Schema or import summary labels as verified evidence |
| `syllabus_map.md` | Twelve bridge, eighteen C1 and ten exam modules; article/pronunciation tracks and exit tasks | Create [CURRICULUM_MAP.md](CURRICULUM_MAP.md), preserve useful IDs, add real listening diagnostics, improve stage checkpoints and retain original in-app mocks |
| `exam_spec_dtb_c1.md` | Detailed task map, administrative blocks, integrated score allocation and public speaking themes | Create [DTB_C1_EXAM_BLUEPRINT.md](DTB_C1_EXAM_BLUEPRINT.md), verify against official telc sources, add mode/date applicability and mark unresolved boundaries |
| `reference_articles_cases.md` | Substantive tables, noun packages, gender patterns and error examples | Create corrected [GRAMMAR_REFERENCE.md](GRAMMAR_REFERENCE.md) with actual tables, a decision diagram, examples and content checks |

## Conflicts resolved in favor of the intended product

- **Native learning:** Anki, an external dictionary, downloaded listening material, manual JSON replacement and finding a human partner are optional supplements. Required lessons, three original full mocks, audio, review queues and saved history belong inside the app.
- **Authored core:** The fixed map organizes preauthored and quality-reviewed course batches. AI-generated variants supplement those batches; generating every lesson on demand does not replace the content-delivery requirement.
- **Progress semantics:** Placement, lesson completion and mastery remain separate. Imported `demonstrated` labels are mapped, then checked against evidence. Preserve `mastery-v1` and `review-v1`; do not mix the archive's alternative intervals or immediate-demotion rule into them.
- **History:** Limits such as three evidence entries, three writing samples or 25 open errors are suitable context-selection ideas, not database deletion policies. Preserve history and expose compact summaries with source IDs.
- **Learner control:** Keep three brief onboarding question groups, optional additional profile fields, gradual language switching and English clarification. An explicit solution request during study is allowed and marked assisted. Earlier exam practice is available with evidence gaps shown.
- **Target and readiness:** Do not automatically change exams when registration status is unknown. Keep three complete original mocks with playable audio, distinct from an optional official benchmark. Track exposure and separate public topic preparation from reserved task exposure.
- **Pronunciation:** Real audio-capable coaching is permitted with limitations made visible. A human review is useful additional evidence, not a mandatory external dependency. Typed text remains insufficient evidence of sound.

## Factual and assessment corrections

| Issue found | Correction |
|---|---|
| Temporal uses described as always dative | Teach preposition-specific constructions: **im Mai**, but **über das Wochenende** |
| Dative plural described as always adding -n | **Verträgen**, but **Kunden**, **Teams** and relevant foreign plurals need no extra -n |
| Masculine/neuter genitives overgeneralized | Distinguish **des Vertrags**, weak **des Kunden**, and mixed **des Namens/des Herzens** |
| One stored gender per spelling | Store lexical senses and legitimate variants; **der Leiter** and **die Leiter** have different meanings |
| Broad ending guesses labeled rules | Require true derivation/scope and reclassify fallible patterns; teach full foreign plurals such as **Zentren** |
| GEN/CASE root cause inferred from a surface form | Use a short disambiguating probe or retain an unresolved cause; avoid double-counting consequential agreement errors |
| Listening omitted from initial diagnostic | Add D5 with actual audio; mark unavailable modalities unassessed |
| Paper-only exam treated as permanent | Official telc announcement specifies mandatory digital delivery from **1 May 2027**; require date/mode-aware definitions |
| Independent section timers implied by overview | Paper reading and integrated writing share **65 minutes**; listening is continuous; do not lock reading at minute 45 |
| Risk of duplicating writing language scores | Rate criteria II–IV once across both extended texts; include phone-note and language-element points in writing |
| Twelve speaking themes left as paste placeholders | Supply short internal paraphrases with linked course modules and original practice |
| Pass threshold stated unconditionally as ≥36 | Model-test prose has a boundary ambiguity; exact inclusivity requires authoritative clarification before verified pass/fail results |

## Verification status and limits

The exam blueprint contains exact source URLs, page references, checked numeric tables and remaining verification items. The grammar reference links the declension and temporal-case sources used to check corrections. Current registration eligibility and Tutul's personal eligibility were not confirmed. The future digital examination's detailed rules must be verified when available; a digital-transition announcement alone does not settle them.

The updated specs are suitable to guide implementation now. During implementation, required exam-rule verification gates remain open until resolved; general C1 learning, original task practice and numeric coaching can proceed independently. No private learner attempts or recordings were added to this public repository.

## Legacy record shape for the import adapter

The uploaded JSON is a top-level object with the following shape. Record this mapping so implementation does not depend on recovering the attachment. Validate field types, date formats, score ranges and known IDs before mutation; retain unsupported legacy values in a reported import attachment rather than treating them as instructions.

| Legacy field | Shape and import treatment |
|---|---|
| `_schema` | Descriptive object containing example states/fields and textual limits; informational only, never an executable or authoritative validator |
| `meta` | `version`, `updated`, `stage`, `sessions`; provenance only, not a source of completed-session evidence |
| `profile` | Optional `name`, `first_languages`, `other_languages`, `work`, `self_reported_level`, `hardest`; `time_budget` object; `exam` with `target`, `date`, `bsk_status`, `provisional` |
| `diagnostic` | `status`, `rounds` keyed D1–D4, `findings`, `unassessed`; absent D5 imports as unassessed |
| `skills` / `modules` | Objects keyed by skill/module ID; entries may contain `state`, `decision`, `lessons`, `next_review`, `flags`, `evidence`. Evidence may be abbreviated strings, which are retained as legacy notes unless independently resolvable |
| `errors` | Array with `id`, `tag`, `pattern`, `example`, `fix`, `count`, `last`, `status`; mark recurrence counts as imported summaries, not invented occurrences |
| `writing_samples` | Array with `date`, `task`, `bands`, `key_issues`; band summaries without the response/rubric remain reported history |
| `mocks` | Array with `id`, `date`, four skill scores, `total`, `pass_rule_met`, `conditions`; validate arithmetic but do not trust the pass flag or infer missing source/rubric/audio evidence |
| `human_checks` | Array with `date`, `who`, `pronunciation`, `speaking`, `notes`; preserve as externally reported feedback with its provenance |
| `errors_archived`, `weekly`, `history`, `next` | Summary objects/arrays and proposed next actions; retain as notes, recompute the current plan from validated evidence |

The source state set is `not_assessed`, `introduced`, `practising`, `demonstrated`, `retained`; its flags are `review_due` and `needs_repair`. A textual `demonstrated`/`retained` claim can be preserved as history without awarding the canonical current state. The actual supplied template has no attempts, errors, writing samples or mock results. Importing it must leave competence unassessed and must not recreate the obsolete dependency on Anki or human-only pronunciation scoring.
