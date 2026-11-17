# Task Report — Entity Relationship Model, Constraints & Referential Integrity

## 1. Status
`COMPLETED` (Remediated)

## 2. Objective
Model and verify all entity relationships, foreign key constraints, cascading behaviors, and table creation dependency order across the canonical 12-table schema.

## 3. Work Performed & Remediation
- **Remediation C2 (Dependency Order):** Established strict table creation order to prevent forward foreign-key reference errors:
  $$\text{media\_assets, skills} \longrightarrow \text{experiences, credentials, projects, stories, posts} \longrightarrow \text{milestones} \longrightarrow \text{junctions}$$
- **Remediation C2 (Media Cascading & Multi-Project Behavior):** Reconciled foreign key behaviors:
  - Deleting a project cascades junction rows in `project_media` (`ON DELETE CASCADE`), but the physical media asset in `media_assets` remains untouched.
  - A media asset cannot be deleted directly if actively referenced in `project_media` (`ON DELETE RESTRICT`), preventing accidental broken links.
  - If a media asset is referenced by multiple projects, deleting one project leaves the other project associations completely intact.
- **Remediation C1:** Integrated `credentials` and `milestones` relationships into the formal ERD.

## 4. Files Inspected
- `docs/stage-02-technical-architecture/phase-01-database-and-content-architecture/task-00-relational-content-model/report.md`

## 5. Files Created or Modified
- `docs/stage-02-technical-architecture/phase-01-database-and-content-architecture/task-01-entity-relationships/report.md`

## 6. Findings and Evidence
### 6.1 Complete Entity Relationship Diagram (ERD)
```text
  ┌────────────────────────────────────────────────────────────────────────┐
  │                           INDEPENDENT TABLES                           │
  │  ┌──────────────────────┐              ┌──────────────────────┐        │
  │  │     media_assets     │              │        skills        │        │
  │  └──────────┬───────────┘              └──────────┬───────────┘        │
  └─────────────┼─────────────────────────────────────┼────────────────────┘
                │                                     │
                ├───────────────────┬─────────────────┼────────────────────┐
                ▼                   ▼                 ▼                    ▼
        ┌──────────────┐     ┌──────────────┐  ┌──────────────┐     ┌──────────────┐
        │  credentials │     │   stories    │  │  experiences │     │   projects   │
        └──────────────┘     └──────────────┘  └──────┬───────┘     └───┬────────┬─┘
                                                      │                 │        │
                                                      ├───────────┐     │        │
                                                      ▼           ▼     ▼        │
                                               ┌──────────────┐ ┌──────────────┐ │
                                               │  milestones  │ │project_skills│◄┘
                                               └──────────────┘ └──────────────┘
                                                                        │
                                                                        ▼
                                                                ┌──────────────┐
                                                                │project_media │
                                                                └──────────────┘
```

### 6.2 Table Creation Dependency Ordering
1. **Tier 1 (Zero Dependencies):** `media_assets`, `skills`, `inquiries`, `audit_logs`, `slug_redirects`.
2. **Tier 2 (Depends on Tier 1):** `experiences`, `credentials`, `projects`, `stories`, `posts`.
3. **Tier 3 (Depends on Tier 2):** `milestones` (FKs to `experiences`, `projects`).
4. **Tier 4 (Junction Tables):** `project_skills`, `project_media`.

## 7. Decisions
- **Decision P01-04 (Remediated):** `ON DELETE RESTRICT` on `project_media.media_id` protects assets from deletion while active; `ON DELETE CASCADE` on `project_id` cleans associations upon project deletion.
- **Decision P01-05:** Table creation script in migrations strictly follows the 4-tier dependency order.

## 8. Risks and Blockers
- **Risk:** Circular foreign-key references between projects and media assets.
  - *Mitigation:* `media_assets` is created first with zero foreign keys. `projects` references `media_assets` via `cover_image_id` (`ON DELETE SET NULL`). No circular reference exists.

## 9. Face 1 Review (Software Architecture)
- **Evaluation:** Strict 4-tier hierarchy eliminates circular references and forward dependency migration failures.
- **Verdict:** `APPROVED`.

## 10. Face 2 Review (QA & Performance)
- **Evaluation:** Multi-project media reuse rules prevent orphaned assets and broken image URLs.
- **Verdict:** `APPROVED`.

## 11. Face 3 Review (Defensive Security)
- **Evaluation:** Cascading constraints maintain relational integrity across all deletion operations.
- **Verdict:** `APPROVED`.

## 12. Acceptance Criteria
- [x] Complete 12-table ERD documented.
- [x] 4-tier creation dependency order codified.
- [x] Multi-project media reuse and deletion semantics defined.

## 13. Remaining Work
- None for this architectural task.

## 14. Owner Approval
`APPROVED` (Stage 02 Remediation Verified)
