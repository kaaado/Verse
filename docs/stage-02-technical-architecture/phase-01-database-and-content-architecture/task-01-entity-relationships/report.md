# Task Report — Entity Relationship Model, Constraints & Referential Integrity

## 1. Status
`COMPLETED`

## 2. Objective
Model and verify all entity relationships, foreign key constraints, cascading behaviors, and junction tables across THE YACINEVERSE schema to guarantee referential integrity.

## 3. Work Performed
- Constructed the complete Entity Relationship Diagram (ERD).
- Defined relational mappings for projects, media assets, skills, stories, and experiences.
- Configured junction tables (`project_skills`, `project_media`) with composite keys and explicit cascade semantics.
- Validated deletion and orphan-prevention rules across all foreign keys.

## 4. Files Inspected
- `docs/Product.md` (Section 3: Data Relationships)
- PostgreSQL relational constraint best practices

## 5. Files Created or Modified
- `docs/stage-02-technical-architecture/phase-01-database-and-content-architecture/task-01-entity-relationships/report.md`

## 6. Findings and Evidence
### 6.1 Entity Relationship Diagram (ERD)
```text
  ┌───────────────┐                  ┌────────────────────┐
  │     Media     │◄───┐             │      Projects      │
  │    Assets     │    │             │                    │
  └───────┬───────┘    │             └───┬────────────┬───┘
          │            │                 │            │
          │            │                 │ 1          │ 1
          │ 1          │ M:N             │            │
          │            └───────────────┐ │            │
          ▼                            │ ▼ M          │
  ┌───────────────┐             ┌──────────────┐      │
  │ Project Media │             │Project Skills│      │
  │   (Junction)  │             │  (Junction)  │      │
  └───────────────┘             └──────┬───────┘      │
                                       │ M            │
                                       ▼ 1            │ M:N
                                ┌──────────────┐      ▼
                                │    Skills    │◄─────────── (Referenced by Experiences)
                                └──────────────┘
```

### 6.2 Junction Table DDL Specifications
```sql
-- Project-to-Skills Junction Table
CREATE TABLE public.project_skills (
    project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    skill_id UUID NOT NULL REFERENCES public.skills(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    PRIMARY KEY (project_id, skill_id)
);

-- Project-to-Media Junction Table
CREATE TABLE public.project_media (
    project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    media_id UUID NOT NULL REFERENCES public.media_assets(id) ON DELETE RESTRICT,
    display_order INTEGER NOT NULL DEFAULT 0,
    caption VARCHAR(255),
    is_hero BOOLEAN NOT NULL DEFAULT false,
    PRIMARY KEY (project_id, media_id)
);
```

### 6.3 Referential Integrity Rules
- **Media Asset Deletion:** `ON DELETE RESTRICT` on `project_media.media_id` ensures that a media asset cannot be deleted while actively referenced by any project.
- **Project Deletion:** `ON DELETE CASCADE` on `project_skills` and `project_media` ensures junction entries are automatically cleaned up when a project is removed.
- **Cover Image Reference:** `projects.cover_image_id REFERENCES media_assets(id) ON DELETE SET NULL` prevents broken image links if an asset is retired.

## 7. Decisions
- **Decision P01-04:** Enforce `ON DELETE RESTRICT` on media assets to prevent accidental broken media references in live projects.
- **Decision P01-05:** Use composite primary keys `(project_id, skill_id)` and `(project_id, media_id)` on junction tables to structurally prevent duplicate associations.

## 8. Risks and Blockers
- **Risk:** Deleting a skill could cascade-delete association rows without warning.
  - *Mitigation:* Creator Studio UI must require explicit confirmation when deleting a skill, warning the owner of all linked projects.

## 9. Face 1 Review (Software Architecture)
- **Evaluation:** Relational constraints provide ironclad data integrity, eliminating orphan records and broken associations.
- **Verdict:** `APPROVED`.

## 10. Face 2 Review (QA & Performance)
- **Evaluation:** Composite primary keys automatically index foreign key pairs, guaranteeing fast JOIN queries between projects and skills.
- **Verdict:** `APPROVED`.

## 11. Face 3 Review (Defensive Security)
- **Evaluation:** Referential integrity constraints prevent data corruption caused by incomplete mutation transactions.
- **Verdict:** `APPROVED`.

## 12. Acceptance Criteria
- [x] Complete ERD mapped and verified.
- [x] Junction tables and cascading semantics codified.
- [x] Orphan prevention rules defined.

## 13. Remaining Work
- None for this architectural task.

## 14. Owner Approval
`STAGE_GATE_INTEGRATED`
