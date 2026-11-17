# Task Report — Testing Pyramid, Quality Assurance Strategy & CI Integration

## 1. Status
`COMPLETED`

## 2. Objective
Codify the comprehensive testing pyramid, QA automation strategy, test coverage thresholds, and Continuous Integration test pipelines across unit, integration, end-to-end (E2E), accessibility, and visual regression testing.

## 3. Work Performed
- Designed the 4-tier testing pyramid (Unit $ightarrow$ Integration $ightarrow$ E2E $ightarrow$ Lighthouse/A11y).
- Selected Vitest and React Testing Library for lightning-fast unit and component testing.
- Configured Playwright for multi-browser End-to-End (E2E) automation covering critical user journeys.
- Formulated automated Lighthouse CI assertions and test threshold gates in GitHub Actions.

## 4. Files Inspected
- `.agent/QA_RULES.md` (Quality assurance and testing standards)
- Playwright and Vitest Best Practices for Next.js

## 5. Files Created or Modified
- `docs/stage-02-technical-architecture/phase-04-engineering-validation/task-02-testing-strategy-definition/report.md`

## 6. Findings and Evidence
### 6.1 Testing Pyramid Architecture
```text
                 ┌─────────────────────────┐
                 │      Lighthouse CI      │ ──► CWV, Performance, SEO, A11y (Score > 90)
                 ├─────────────────────────┤
                 │     Playwright E2E      │ ──► Recruiter Journey, Dossier, Studio CMS Flow
                 ├─────────────────────────┤
                 │   Integration Tests     │ ──► Server Actions, DAL Queries, RLS Policies
                 ├─────────────────────────┤
                 │   Unit Tests (Vitest)   │ ──► Utilities, State Stores, Zod Schemas
                 └─────────────────────────┘
```

### 6.2 Test Coverage Targets & Frameworks

| Test Level | Tooling | Scope | Target Coverage | Execution Trigger |
|---|---|---|:---:|---|
| **Unit** | Vitest | Zod schemas, formatting utils, Zustand stores | > 85% | Pre-commit & CI PR |
| **Integration** | Vitest + Supabase Test DB | Server Actions, DAL queries, database RLS | > 80% | CI PR |
| **End-to-End** | Playwright | Recruiter view-toggle (<45s), CMS publish workflow, WebGL fallback | Core Flows (100%) | Merge to main & Nightly |
| **Performance / A11y** | Lighthouse CI | Home, Projects, Story, Contact, Dossier | Score $ge 90$ | Deployment Gate |

### 6.3 Critical Playwright E2E Test Scenarios
1. **Recruiter Evaluation Journey:**
   - Navigate to `/`.
   - Toggle to Dossier view via `?view=dossier` or hotkey `D`.
   - Filter projects by `AI/ML` tag in < 150ms.
   - Click "Download Dossier PDF"; verify binary download initiates.
   - Total journey completion time: $< 30	ext{ seconds}$.
2. **Creator Studio Publishing Journey:**
   - Log in to `/studio/login` with test credentials.
   - Create new project draft with MDX content and image asset.
   - Click "Preview Draft"; verify Next.js Draft Mode renders draft in production layout.
   - Click "Publish"; verify on-demand ISR revalidates public `/projects` page immediately.

## 7. Decisions
- **Decision P04-07:** Adopt Vitest for unit testing due to native ESM support and instantaneous execution speed.
- **Decision P04-08:** Adopt Playwright for cross-browser E2E testing (Chromium, Firefox, WebKit, Mobile Safari).
- **Decision P04-09:** Integrate Lighthouse CI with strict pass/fail assertions directly into the pull request pipeline.

## 8. Risks and Blockers
- **Risk:** Flaky E2E tests caused by WebGL canvas rendering timing.
  - *Mitigation:* Use deterministic canvas readiness event listeners (`canvas-ready`) and mock WebGL context where appropriate.

## 9. Face 1 Review (Software Architecture)
- **Evaluation:** Testing pyramid distributes verification across all architectural layers, maximizing coverage while minimizing CI execution time.
- **Verdict:** `APPROVED`.

## 10. Face 2 Review (QA & Performance)
- **Evaluation:** Automated E2E recruiter journey guarantees that primary product success metrics are continuously tested.
- **Verdict:** `APPROVED`.

## 11. Face 3 Review (Defensive Security)
- **Evaluation:** Integration testing with ephemeral test databases directly verifies RLS enforcement before deployment.
- **Verdict:** `APPROVED`.

## 12. Acceptance Criteria
- [x] Testing pyramid codified with toolchain selections.
- [x] Coverage targets and test levels specified.
- [x] Critical E2E test scenarios documented.

## 13. Remaining Work
- None for this architectural task.

## 14. Owner Approval
`STAGE_GATE_INTEGRATED`
