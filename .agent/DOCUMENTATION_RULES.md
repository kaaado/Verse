# Documentation Rules — THE YACINEVERSE

## 1. Allowed Planning & Management Markdown Files
To prevent scattered documentation, duplicated requirements, and conflicting plans, ONLY the following three Markdown filenames are permitted across the project-management hierarchy:

1. `Product.md` (Root level only — Global Product Source of Truth)
2. `readme.md` (Operating specification in every Stage, Phase, and Task folder)
3. `report.md` (Evidence, findings, and review record in every Stage, Phase, and Task folder)

> **Prohibited File Names:** Do not create planning files such as `Architecture.md`, `Research.md`, `Roadmap.md`, `Design.md`, `Notes.md`, or `Summary.md` inside `product-management/`. All architectural, UX, security, and research findings must reside in the appropriate `readme.md` or `report.md`.

## 2. Directory Hierarchy Standard
The management structure follows a strict three-tier hierarchy:
```text
product-management/
├── stage-XX-[name]/
│   ├── readme.md
│   ├── report.md
│   └── phase-XX-[name]/
│       ├── readme.md
│       ├── report.md
│       └── task-XX-[name]/
│           ├── readme.md
│           └── report.md
```

## 3. Status Vocabulary
Status fields across all management documents must strictly use:
- `NOT_STARTED`: Scoped, planned, but execution has not begun.
- `IN_PROGRESS`: Actively executing under approved stage authorization.
- `BLOCKED`: Unable to proceed due to missing dependency, decision, or environment constraint.
- `REVIEW_REQUIRED`: Deliverable produced; awaiting Three-Face engineering review or verification.
- `APPROVED`: Passed Three-Face review or Product Owner approval gate.
- `COMPLETED`: Fully executed with concrete evidence and all acceptance criteria met.
- `REJECTED`: Fails review criteria; returned for remediation.
- `DEFERRED`: Postponed to a later lifecycle milestone.

## 4. Evidence Classification
Every factual statement in reports must be explicitly marked:
- `VERIFIED`: Proven by direct observation, inspected files, or CLI commands.
- `REPORTED`: Provided by Product Owner or client brief without independent verification.
- `ASSUMPTION`: Engineering hypothesis awaiting validation.
- `UNKNOWN`: Missing data or inaccessible source.
- `DECISION`: Formally approved Product Owner choice.
