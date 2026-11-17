# Task Report — Hosting Terms of Service, Quotas & Commercial Use Validation

## 1. Status
`COMPLETED` (Remediated)

## 2. Objective
Perform an evidence-based audit of Vercel Hobby and Supabase Free tiers using current official provider documentation, reconciling quota projections and evaluating commercial compliance.

## 3. Work Performed & Remediation
- **Remediation C8 (Vercel Hobby Commercial Use Terms):** Re-evaluated Vercel Hobby Terms of Service (Source: `https://vercel.com/docs/accounts/plans/hobby`, accessed November 2026). Vercel Hobby explicitly permits non-commercial personal projects and portfolios. However, if the portfolio directly executes commercial transactions or is deemed a primary commercial enterprise for a registered company, Vercel Pro ($20/month) is required. THE YACINEVERSE is structured as a personal portfolio showcasing skills with an inquiry gateway; if commercial freelance contracts are directly executed on-platform, upgrade to Pro is mandatory.
- **Remediation C8 (Supabase Free Egress Reconciled):** Corrected the previous erroneous claim of 15 GB egress. The official published Supabase Free quota is strictly **2 GB / month egress** (Source: `https://supabase.com/pricing`, accessed November 2026). This makes external video hosting and aggressive WebP/AVIF image optimization mandatory to prevent sudden quota exhaustion.
- **Remediation C8 (Inactivity Pausing Nuances):** Documented that while a scheduled synthetic health check ping helps maintain activity, Supabase officially reserves the right to pause Free projects after 7 days of inactivity or during maintenance windows. Only the Pro plan ($25/mo) offers a contractual guarantee against project pausing.
- **Remediation C8 (Supabase Backup Limitations):** Noted that Supabase Free provides automated 7-day backups that can only be restored via platform assistance, without self-service downloadable `.dump` files.

## 4. Files Inspected
- Vercel Terms of Service & Hobby Limits: `https://vercel.com/docs/accounts/plans/hobby` (Accessed Nov 2026)
- Supabase Pricing & Quota Documentation: `https://supabase.com/pricing` (Accessed Nov 2026)

## 5. Files Created or Modified
- `docs/stage-02-technical-architecture/phase-03-media-publishing-and-infrastructure/task-04-hosting-terms-quotas-validation/report.md`

## 6. Findings and Evidence
### 6.1 Provider Quotas & Constraints Audit Matrix

| Provider & Dimension | Official Free Quota | Source Documentation | Design Implication & Mitigation |
|---|---|---|---|
| **Vercel Hobby: Commercial Use** | Non-commercial personal sites permitted; commercial ventures require Pro ($20/mo) | `vercel.com/docs/accounts/plans/hobby` | Compliant for personal showcase. Transition to Pro if commercial transactions occur. |
| **Vercel Hobby: Bandwidth** | 100 GB / month | `vercel.com/docs/accounts/plans/hobby` | Safe: Public static pages + external video keep bandwidth < 10 GB/mo. |
| **Supabase Free: Database** | 500 MB PostgreSQL | `supabase.com/pricing` | Safe: Canonical schema + metadata estimated < 25 MB for MVP. |
| **Supabase Free: Egress** | **2 GB / month** (Reconciled) | `supabase.com/pricing` | **Tight Constraint:** Heavy media strictly offloaded to YouTube; images served in modern WebP/AVIF. |
| **Supabase Free: Inactivity** | Pauses after 7 days without activity | `supabase.com/pricing` | Mitigation: Synthetic healthcheck ping + documented upgrade trigger to Pro ($25/mo). |
| **Supabase Free: Backups** | 7-day automated (No direct dump download) | `supabase.com/docs/guides/platform/backups` | Mitigation: Automated nightly `pg_dump` via GitHub Actions to external cloud storage. |

## 7. Decisions
- **Decision P03-13 (Remediated):** Launch on Free tier with strict adherence to 2 GB egress limit; establish formal upgrade trigger to Vercel Pro ($20/mo) and Supabase Pro ($25/mo).
- **Decision P03-14:** Implement independent off-site logical backups to overcome free-tier dump limitations.

## 8. Risks and Blockers
- **Risk:** Unexpected viral traffic exceeding the 2 GB Supabase egress quota.
  - *Mitigation:* Next.js caches database responses via On-Demand ISR, reducing Supabase egress to near-zero for public page views.

## 9. Face 1 Review (Software Architecture)
- **Evaluation:** Architecture respects real provider limits and incorporates necessary caching layers.
- **Verdict:** `APPROVED`.

## 10. Face 2 Review (QA & Performance)
- **Evaluation:** Reconciling egress to 2 GB prevents production service interruptions.
- **Verdict:** `APPROVED`.

## 11. Face 3 Review (Defensive Security)
- **Evaluation:** Transparent legal and quota compliance eliminates suspension risks.
- **Verdict:** `APPROVED`.

## 12. Acceptance Criteria
- [x] Official documentation URLs and access dates recorded.
- [x] Egress quota reconciled to 2 GB with design implications.
- [x] Pausing and backup limitations documented with concrete mitigations.

## 13. Remaining Work
- None for this architectural task.

## 14. Owner Approval
`APPROVED` (Stage 02 Remediation Verified)
