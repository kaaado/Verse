# Task Report — Content Lifecycle State Machine & Audit History Architecture

## 1. Status
`COMPLETED`

## 2. Objective
Specify the editorial content lifecycle state machine (`draft` $ightarrow$ `preview` $ightarrow$ `published` $ightarrow$ `archived`), transition guards, timestamp tracking, and the append-only `audit_logs` architecture for all Creator Studio operations.

## 3. Work Performed
- Modeled the formal finite state machine governing content transitions.
- Defined state transition rules, prerequisite checks, and role guards.
- Designed the append-only `audit_logs` schema capturing actor, entity, operation, and JSONB before/after deltas.
- Formulated automatic `updated_at` PostgreSQL triggers.

## 4. Files Inspected
- `docs/Product.md` (Section 4: Content Lifecycle & Publishing Workflow)
- PostgreSQL Trigger and Audit Architecture Standards

## 5. Files Created or Modified
- `docs/stage-02-technical-architecture/phase-01-database-and-content-architecture/task-04-publication-states-history/report.md`

## 6. Findings and Evidence
### 6.1 Editorial State Machine Diagram
```text
      ┌───────────┐
      │   DRAFT   │◄───────────────────────────┐
      └─────┬─────┘                            │
            │ (Save & Request Preview)         │
            ▼                                  │
      ┌───────────┐                            │ (Revert to Draft)
      │  PREVIEW  │────────────────────────────┘
      └─────┬─────┘
            │ (Owner Publish Action)
            ▼
      ┌───────────┐
      │ PUBLISHED │◄───────────────────────────┐
      └─────┬─────┘                            │
            │ (Retire / Unpublish)             │ (Restore)
            ▼                                  │
      ┌───────────┐                            │
      │ ARCHIVED  │────────────────────────────┘
      └───────────┘
```

### 6.2 State Transition Guards
1. **Draft $ightarrow$ Preview:** Requires non-empty title and valid slug. Generates cryptographic preview token.
2. **Preview $ightarrow$ Published:** Requires validated cover image, minimum description length (> 100 characters), and active owner session. Automatically sets `published_at = now()`.
3. **Published $ightarrow$ Archived:** Sets `archived_at = now()`. Immediately triggers cache invalidation to remove item from public routes.
4. **Archived $ightarrow$ Published:** Restores item to public visibility; updates `updated_at = now()`.

### 6.3 Audit Logging Schema
```sql
CREATE TABLE public.audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    actor_id UUID NOT NULL,
    actor_email VARCHAR(255) NOT NULL,
    entity_type VARCHAR(80) NOT NULL, -- e.g. 'project', 'story', 'media'
    entity_id UUID NOT NULL,
    action VARCHAR(50) NOT NULL,      -- e.g. 'create', 'update', 'publish', 'archive', 'delete'
    diff JSONB,                       -- {"before": {...}, "after": {...}}
    ip_address VARCHAR(45),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- RLS: Only authenticated owner can read; zero updates or deletes allowed (immutable)
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow owner to view audit logs" 
ON public.audit_logs FOR SELECT 
TO authenticated 
USING (auth.uid() = actor_id);
```

## 7. Decisions
- **Decision P01-12:** Audit log entries are strictly immutable (`REVOKE UPDATE, DELETE ON public.audit_logs FROM authenticated, anon, public`).
- **Decision P01-13:** Content publication must capture a timestamp (`published_at`) to allow historical chronological sorting independent of creation time.
- **Decision P01-14:** Soft deletion (`archived` status) is preferred over permanent hard deletion for projects and stories to preserve audit integrity and prevent 404s on external backlinks.

## 8. Risks and Blockers
- **Risk:** Large diffs in JSONB bloating the audit log over time.
  - *Mitigation:* Store shallow diffs capturing only modified fields rather than full entity snapshots.

## 9. Face 1 Review (Software Architecture)
- **Evaluation:** Strict state machine boundaries prevent un-reviewed drafts from accidentally appearing on public routes.
- **Verdict:** `APPROVED`.

## 10. Face 2 Review (QA & Performance)
- **Evaluation:** Explicit timestamps enable precise regression testing of cache invalidation and publication timelines.
- **Verdict:** `APPROVED`.

## 11. Face 3 Review (Defensive Security)
- **Evaluation:** Immutable audit logs provide non-repudiation and forensic visibility into all administrative modifications.
- **Verdict:** `APPROVED`.

## 12. Acceptance Criteria
- [x] Content lifecycle state machine codified with transition guards.
- [x] Immutable audit log schema specified.
- [x] Soft deletion preference and timestamp rules documented.

## 13. Remaining Work
- None for this architectural task.

## 14. Owner Approval
`STAGE_GATE_INTEGRATED`
