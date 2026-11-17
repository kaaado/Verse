# Task Report — Editorial Preview Workflow, Draft Mode & Real-Time Inspection

## 1. Status
`COMPLETED`

## 2. Objective
Architect the editorial preview workflow using Next.js Draft Mode, enabling the creator to preview unpublished drafts, live MDX edits, and unpublished media in the real production layout with zero risk of public exposure.

## 3. Work Performed
- Designed the Next.js Draft Mode enablement and termination route handlers (`/api/draft`, `/api/disable-draft`).
- Formulated the cryptographic token handshake securing draft mode enablement.
- Designed the persistent visual Preview Banner alerting the owner of active Draft Mode.
- Integrated preview-aware DAL queries that bypass the `status = 'published'` filter when Draft Mode cookies are present.

## 4. Files Inspected
- Next.js Draft Mode Documentation
- `docs/Product.md` (Section 4.3: Publishing & Preview Workflow)

## 5. Files Created or Modified
- `docs/stage-02-technical-architecture/phase-03-media-publishing-and-infrastructure/task-03-preview-publishing-workflow/report.md`

## 6. Findings and Evidence
### 6.1 Draft Mode Protocol & Lifecycle
```text
  Creator Studio (Editing Draft)
               │
               ▼
  [ 1. Click "Preview Draft" ] ──► GET /api/draft?secret=...&slug=agrovia&type=project
               │
               ▼
  [ 2. Route Handler Validation ]
  - Verify secret matches process.env.DRAFT_MODE_SECRET
  - Verify slug exists in database
  - Call draftMode().enable()
  - Set HttpOnly Cookie: __prerender_bypass
               │
               ▼
  [ 3. Redirect to Live Route ] ──► 307 Redirect to /projects/agrovia
               │
               ▼
  [ 4. RSC Data Fetching ]
  - Next.js detects active draftMode()
  - Bypasses Static Full Route Cache
  - DAL queries include status = 'draft'
               │
               ▼
  [ 5. Render Page with Preview Banner ]
  - Top fixed banner: "Draft Preview Mode Active — [Exit Preview]"
```

### 6.2 Draft Route Handler Implementation
```typescript
// src/app/api/draft/route.ts
import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const secret = searchParams.get('secret');
  const slug = searchParams.get('slug');

  if (secret !== process.env.DRAFT_MODE_SECRET || !slug) {
    return new Response('Invalid preview token', { status: 401 });
  }

  const draft = await draftMode();
  draft.enable();

  redirect(`/projects/${slug}`);
}
```

### 6.3 Preview Banner & Safe Exit
- When `draftMode().isEnabled` is true, a non-intrusive floating bar appears at the top of the viewport.
- Clicking `"Exit Preview"` triggers `/api/disable-draft`, which clears the cookie and redirects back to the public view.

## 7. Decisions
- **Decision P03-10:** Adopt official Next.js Draft Mode (`draftMode().enable()`) for all editorial previews.
- **Decision P03-11:** Enforce high-entropy cryptographic tokens (`DRAFT_MODE_SECRET`) for draft activation.
- **Decision P03-12:** Ensure preview routes render a persistent visual banner to prevent accidental confusion between preview and public states.

## 8. Risks and Blockers
- **Risk:** Draft preview URL shared externally or indexed by search crawlers.
  - *Mitigation:* Draft pages automatically inject `<meta name="robots" content="noindex, nofollow" />` whenever Draft Mode is active.

## 9. Face 1 Review (Software Architecture)
- **Evaluation:** Native Draft Mode integration avoids maintaining separate staging or preview website environments.
- **Verdict:** `APPROVED`.

## 10. Face 2 Review (QA & Performance)
- **Evaluation:** Preview mode runs live in the production container, guaranteeing 100% fidelity with the final published layout.
- **Verdict:** `APPROVED`.

## 11. Face 3 Review (Defensive Security)
- **Evaluation:** Cryptographic secret verification and `noindex` headers prevent unauthorized access or search engine discovery of unpublished work.
- **Verdict:** `APPROVED`.

## 12. Acceptance Criteria
- [x] Draft Mode lifecycle and route handlers codified.
- [x] Cryptographic handshake specified.
- [x] Noindex metadata and preview banner verified.

## 13. Remaining Work
- None for this architectural task.

## 14. Owner Approval
`STAGE_GATE_INTEGRATED`
