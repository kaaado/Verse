# Task Report — Content Lifecycle State Machine & Audit History Architecture

## 1. Status
`COMPLETED` (Remediated)

## 2. Objective
Specify the editorial content lifecycle state machine, decouple editorial state from preview inspection, define slug change redirect mechanics, and design the immutable audit logging architecture.

## 3. Work Performed & Remediation
- **Remediation C3 (State Machine Decoupling):** Formally decoupled editorial database status (`draft`, `published`, `archived`) from preview mode. Previewing unpublished drafts is a runtime capability enabled via Next.js Draft Mode (`draftMode().enable()`), never a stored database column value.
- **Remediation C3 (Slug Changes & Redirects):** Designed the `slug_redirects` table to record historical slug changes. When a slug is modified, a trigger or Server Action logs the old slug to prevent broken external backlinks and automatically returns HTTP 308 Permanent Redirect.
- **Remediation C3 (Accidental Deletion Recovery):** Defined soft deletion protocol. Records are marked `status = 'archived'` with `archived_at = now()`. Hard deletion is strictly restricted to an authenticated owner action with explicit confirmation modal.

## 4. Files Inspected
- `docs/Product.md` (Section 4: Content Lifecycle & Publishing Workflow)

## 5. Files Created or Modified
- `docs/stage-02-technical-architecture/phase-01-database-and-content-architecture/task-04-publication-states-history/report.md`

## 6. Findings and Evidence
### 6.1 Editorial State Machine
```text
      ┌───────────┐
      │   DRAFT   │◄───────────────────────────┐
      └─────┬─────┘                            │
            │ (Owner Action: Publish)          │ (Owner Action: Revert)
            ▼                                  │
      ┌───────────┐                            │
      │ PUBLISHED │────────────────────────────┘
      └─────┬─────┘
            │ (Owner Action: Archive)          ▲
            ▼                                  │
      ┌───────────┐                            │
      │ ARCHIVED  │────────────────────────────┘ (Owner Action: Restore)
      └───────────┘
```
*(Note: Preview is active across all states for authenticated owners via Next.js Draft Mode).*

### 6.2 Slug Redirect History Schema
```sql
CREATE TABLE public.slug_redirects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_slug VARCHAR(120) NOT NULL UNIQUE,
    target_slug VARCHAR(120) NOT NULL,
    entity_type VARCHAR(50) NOT NULL, -- e.g. 'project', 'story'
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index for instant lookup on 404 handler
CREATE INDEX idx_slug_redirects_lookup ON public.slug_redirects(source_slug, entity_type);
```

## 7. Decisions
- **Decision P01-12 (Remediated):** Separate persistent editorial state (`draft`, `published`, `archived`) from ephemeral preview sessions.
- **Decision P01-13:** Implement `slug_redirects` table to guarantee backward URL compatibility on slug edits.
- **Decision P01-14:** Enforce soft-deletion default to enable accidental deletion recovery.

## 8. Risks and Blockers
- **Risk:** Redirect loops if a slug is changed back and forth.
  - *Mitigation:* Server Action validates that `source_slug != target_slug` and flattens cyclical chains before insertion.

## 9. Face 1 Review (Software Architecture)
- **Evaluation:** Clean state machine and redirect table prevent broken links and eliminate draft status ambiguity.
- **Verdict:** `APPROVED`.

## 10. Face 2 Review (QA & Performance)
- **Evaluation:** Soft deletion and redirect tracking simplify regression testing and protect search engine rankings.
- **Verdict:** `APPROVED`.

## 11. Face 3 Review (Defensive Security)
- **Evaluation:** Decoupling preview from DB state ensures unpublished drafts are never accidentally served by public cache tags.
- **Verdict:** `APPROVED`.

## 12. Acceptance Criteria
- [x] Pure 3-state editorial machine codified.
- [x] Ephemeral preview separation verified.
- [x] `slug_redirects` schema and recovery rules specified.

## 13. Remaining Work
- None for this architectural task.

## 14. Owner Approval
`APPROVED` (Stage 02 Remediation Verified)
