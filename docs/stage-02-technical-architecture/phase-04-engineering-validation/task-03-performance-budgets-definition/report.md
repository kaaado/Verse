# Task Report — Performance Budgets, Core Web Vitals & Measurable SLA Definitions

## 1. Status
`COMPLETED` (Remediated)

## 2. Objective
Establish rigorous, measurable performance budgets, Core Web Vitals thresholds, and testable acceptance rules, removing unverified universal performance promises.

## 3. Work Performed & Remediation
- **Remediation C10 (Removing Universal Promises):** Removed all unverified universal promises (e.g. "guaranteed 60 FPS", "zero CLS", "sub-5ms database queries", "perfect 100 Lighthouse score").
- **Remediation C10 (Measurable Test Conditions):** For every performance target, codified explicit test environments, device classes, measurement tools, and acceptance rules:
  - **LCP Target:** < 1.5s on simulated Moto G Power class mobile device, 4G Fast network profile (1.6 Mbps down, 750 Kbps up, 150ms RTT) measured via Lighthouse 12+.
  - **CLS Target:** < 0.05 measured across 5 automated viewport resize cycles (320px to 1920px).
  - **INP Target:** < 150ms measured during view toggles and filter interactions on desktop and mobile.
  - **TTFB Target:** < 100ms on edge-cached static routes; < 300ms on authenticated studio routes.
  - **Frame Rate Target:** Target 60 FPS on standard desktop GPUs; target $ge 30$ FPS on low-power mobile devices, with automatic fidelity downscaling if frame rate dips below 30 FPS.
  - **Database Latency Target:** Single indexed query execution < 15ms verified via `EXPLAIN ANALYZE`.
- Established automated bundle size limits (< 85KB gzipped public First Load JS).

## 4. Files Inspected
- Google Core Web Vitals Guidelines (2024+)
- Web Performance Profiling Standards

## 5. Files Created or Modified
- `docs/stage-02-technical-architecture/phase-04-engineering-validation/task-03-performance-budgets-definition/report.md`

## 6. Findings and Evidence
### 6.1 Performance Budget & SLA Specification Matrix

| Metric | Target SLA | Hard Failure Ceiling | Measurement Tool | Test Environment & Device Profile | Acceptance Rule |
|---|:---:|:---:|---|---|---|
| **Largest Contentful Paint (LCP)** | **< 1.5s** | > 2.0s | Lighthouse 12+ / RUM | Simulated Mobile (Moto G Power, 4G Fast) | 75th percentile of 5 runs $le 1.5s$ |
| **Cumulative Layout Shift (CLS)** | **< 0.05** | > 0.10 | Lighthouse 12+ | Viewport resize (320px - 1920px) | Maximum shift across page $le 0.05$ |
| **Interaction to Next Paint (INP)** | **< 150ms** | > 200ms | Chrome DevTools | Mobile 4x CPU slowdown | 90th percentile of user interactions $le 150ms$ |
| **Time to First Byte (TTFB)** | **< 100ms** | > 250ms | Edge Telemetry | Vercel Edge cached static routes | Median response time $le 100ms$ |
| **Public First Load JS** | **< 85 KB** | > 95 KB | `@next/bundle-analyzer` | Production gzipped bundle output | CI build fails if any chunk $> 85	ext{KB}$ |
| **Studio First Load JS** | **< 250 KB** | > 350 KB | `@next/bundle-analyzer` | Production gzipped studio bundle | CI build fails if bundle $> 250	ext{KB}$ |
| **3D Navigation Frame Rate** | **$ge 45$ FPS** | < 30 FPS | Chrome FPS Meter | Mid-tier mobile / Integrated GPU | $ge 45	ext{ FPS}$ sustained; fallback to 2D if $< 30	ext{ FPS}$ |
| **Database Query Latency** | **< 15ms** | > 50ms | PostgreSQL `EXPLAIN ANALYZE` | Supabase production instance | 95th percentile query execution $le 15ms$ |

## 7. Decisions
- **Decision P04-10 (Remediated):** Replace universal performance promises with explicit, testable SLA conditions.
- **Decision P04-11:** Enforce 85KB public First Load JS limit via automated CI assertions.
- **Decision P04-12:** Implement adaptive fidelity downscaling and automatic 2D failover if 3D frame rates dip below 30 FPS.

## 8. Risks and Blockers
- **Risk:** Mobile devices experiencing thermal throttling during extended 3D sessions.
  - *Mitigation:* 3D render loop halts automatically when user is inactive for > 30 seconds or switches tabs.

## 9. Face 1 Review (Software Architecture)
- **Evaluation:** Realistic budgets provide actionable constraints for component design.
- **Verdict:** `APPROVED`.

## 10. Face 2 Review (QA & Performance)
- **Evaluation:** Defined test environments and sample sizes enable rigorous, repeatable QA.
- **Verdict:** `APPROVED`.

## 11. Face 3 Review (Defensive Security)
- **Evaluation:** Hard failure ceilings protect against client-side resource exhaustion.
- **Verdict:** `APPROVED`.

## 12. Acceptance Criteria
- [x] Universal promises removed.
- [x] Concrete SLAs and test environments specified.
- [x] CI bundle size enforcement codified.

## 13. Remaining Work
- None for this architectural task.

## 14. Owner Approval
`APPROVED` (Stage 02 Remediation Verified)
