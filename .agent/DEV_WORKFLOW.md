# Engineering Development Workflow — THE YACINEVERSE

## 1. 10-Step Lifecycle
Every task and stage in this project must strictly execute the following sequential cycle:

1. **Inspect:** Examine the actual repository, working tree, dependencies, and documentation.
2. **Analyze:** Identify runtime behavior, edge cases, data risks, and unknowns.
3. **Plan:** Produce a scoped written plan with exact file operations, validation checks, rollback steps, and acceptance criteria in the task `readme.md`.
4. **Approval Gate:** Stop and obtain Product Owner authorization before:
   - Advancing between stages or phases.
   - Modifying architecture, frameworks, or database schemas.
   - Performing destructive or irreversible operations.
5. **Implement:** Execute only the approved, scoped changes (authorized in Stage 04+).
6. **Test:** Run relevant automated checks and manual validation; record exact results.
7. **Senior Review:** Review the full `git diff` for regressions, style consistency, and boundary violations.
8. **Final QA:** Verify acceptance criteria against the target environment.
9. **Document:** Update task `report.md`, phase `report.md`, stage `report.md`, and `.agent/CURRENT_STATE.md`.
10. **Report:** Provide the Product Owner with an evidence-backed summary of changes, test outcomes, remaining risks, and next decisions.

## 2. Hard Governance Rules
- **No Task = No Implementation.**
- **No Approval = No Advance.** A completed stage does not automatically authorize the next stage.
- **Diff Hygiene:** Inspect `git status` and staged diffs before any commit or handoff.
- **Three-Face Review Mandatory:** Every deliverable must be evaluated through Face 1 (Architecture), Face 2 (QA & Performance), and Face 3 (Defensive Security).
