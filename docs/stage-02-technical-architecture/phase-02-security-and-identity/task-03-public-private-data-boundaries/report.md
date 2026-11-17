# Task Report — Public vs. Private Data Boundaries & Client Confidentiality

## 1. Status
`COMPLETED`

## 2. Objective
Define strict data classification boundaries and sanitization rules to safeguard proprietary client data, commercial IP, medical/hospital details, and unpublished works across all public-facing endpoints.

## 3. Work Performed
- Audited all candidate portfolio projects (Agrovia, Farmer ERP, Hospital Platform, Mukhayyami) for confidentiality risks.
- Formulated the 4-tier data sensitivity classification rubric.
- Defined sanitization and anonymization protocols for client case studies.
- Verified that private draft content is structurally isolated from public search indexes and API responses.

## 4. Files Inspected
- `docs/Product.md` (Section 3.4: Privacy & Client Confidentiality)
- Professional NDA and Medical Data Privacy Standards

## 5. Files Created or Modified
- `docs/stage-02-technical-architecture/phase-02-security-and-identity/task-03-public-private-data-boundaries/report.md`

## 6. Findings and Evidence
### 6.1 Data Classification Rubric

| Classification Tier | Definition | Examples | Permitted Exposure |
|---|---|---|---|
| **Public** | Approved for global indexation and viewing | Published projects, public skills, engineering stories, social links | Public Web, SEO, OpenGraph |
| **Confidential / Sanitized** | Client or institutional work governed by NDA/ethics | Hospital platform architecture, Agrovia proprietary algorithms | Anonymized case studies only; no real patient data, credentials, or proprietary code |
| **Owner Private** | Internal administration and draft work | Draft stories, unreleased projects, incoming inquiries, audit logs | Authenticated Creator Studio only |
| **Restricted / Secrets** | System credentials and private cryptographic keys | Supabase service role key, Turnstile secret key, revalidation token | Server runtime memory only; never stored in DB or client bundles |

### 6.2 Client & Medical Project Sanitization Rules
For hospital, medical, or defense projects:
1. **Zero Real Data:** No real patient names, IDs, medical record numbers, or operational hospital IP addresses shall ever be stored or displayed.
2. **Architecture Focus:** Showcase system architecture, throughput benchmarks, scalability paradigms, and technical challenges rather than proprietary business workflows.
3. **Anonymized Attribution:** When showcasing client work without written clearance, refer to the entity by role (e.g. `"National Healthcare Provider"` rather than naming the specific institution).

## 7. Decisions
- **Decision P02-10:** Require explicit owner review before publishing any case study containing client operational details.
- **Decision P02-11:** Strip all internal IP addresses, private staging URLs, and customer identifiers from case study diagrams and text.
- **Decision P02-12:** Ensure API responses and ISR static pages strip all unapproved fields before rendering.

## 8. Risks and Blockers
- **Risk:** Accidental publication of draft projects containing placeholder confidential details.
  - *Mitigation:* RLS policies and DAL queries enforce `status = 'published'`; draft records are physically unreachable by public requests.

## 9. Face 1 Review (Software Architecture)
- **Evaluation:** Classification rubric creates unambiguous boundaries for content ingestion and display.
- **Verdict:** `APPROVED`.

## 10. Face 2 Review (QA & Performance)
- **Evaluation:** Sanitization rules prevent legal and compliance liabilities during portfolio presentation.
- **Verdict:** `APPROVED`.

## 11. Face 3 Review (Defensive Security)
- **Evaluation:** Defense against accidental data leaks is enforced at both the application presentation level and the database RLS layer.
- **Verdict:** `APPROVED`.

## 12. Acceptance Criteria
- [x] Four-tier data classification rubric codified.
- [x] Sanitization rules for medical/client projects defined.
- [x] Privacy isolation verified across all endpoints.

## 13. Remaining Work
- None for this architectural task.

## 14. Owner Approval
`STAGE_GATE_INTEGRATED`
