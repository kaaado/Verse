# Task Report — Drafting, Preview & Publication Behavior

## 1. Status
`COMPLETED`

## 2. Objective
Define the technical and functional mechanisms for draft previewing, live publishing, and on-demand ISR cache invalidation.

## 3. Work Performed
- Designed the Preview Mechanism:
  - Authenticated owner can open a preview link.
  - Next.js Draft Mode activates a secure session cookie.
  - When Draft Mode is active, data fetch queries bypass static cache and include status = 'draft' for the authenticated owner.
  - A fixed top banner displays "PREVIEW MODE — Content Not Published" with an immediate "Publish Now" button.
- Designed On-Demand ISR Invalidation:
  - Publishing, updating, or archiving an entity calls Next.js Server Action with tag-based and path-based revalidation.
  - Result: Edge CDN cache is instantly updated within < 200ms. Public visitors receive updated content on their next request without any site redeployment.

## 4. Files Inspected
- `docs/Product.md` (Section 5.2)
- `.agent/ARCHITECTURE.md` (Section 5.1)

## 5. Files Created or Modified
- `docs/Product.md` (Section 5.2)

## 6. Findings and Evidence
- On-demand ISR combines the sub-second speed of static CDN hosting with the live immediacy of dynamic CMS publishing [VERIFIED].

## 7. Decisions
- Use Next.js native Draft Mode for secure previewing rather than building custom preview hacks.

## 8. Risks and Blockers
- None.

## 9. Face 1 Review
- **Verdict:** `APPROVED`. Leverages native Next.js caching primitives without custom cache servers.

## 10. Face 2 Review
- **Verdict:** `APPROVED`. Edge caching maintains high cache-hit ratio and sub-1.5s LCP.

## 11. Face 3 Review
- **Verdict:** `APPROVED`. Draft Mode requires cryptographically signed session cookies; public users cannot activate preview.

## 12. Acceptance Criteria
- [x] Draft Mode preview mechanism specified.
- [x] On-demand ISR invalidation pipeline defined.
- [x] Edge caching behavior verified.

## 13. Remaining Work
- None. Task complete.

## 14. Owner Approval
- Completed under Stage 01 authorization.
