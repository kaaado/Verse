# Quality Assurance & Verification Rules — THE YACINEVERSE

## 1. Truth in Reporting
- **Accurate Claims:** Never mark a check as `VERIFIED` unless the command was run in the active environment and the output observed.
- **Classification Standard:** Use `VERIFIED`, `REPORTED`, `ASSUMPTION`, `UNKNOWN`, and `DECISION` strictly according to evidence.
- **Build ≠ Correctness:** A successful compilation (`next build`) proves syntax, bundling, and type contracts, but does not prove responsive fidelity, accessibility, or business logic correctness.

## 2. Check Hierarchy by Change Type
1. **Workspace & Documentation Changes:**
   - Verify file locations and git status (`git status --short`).
   - Validate structure against Stage → Phase → Task hierarchy.
   - Enforce three-file rule (`Product.md`, `readme.md`, `report.md`).
2. **Component & Layout Changes:**
   - Verify responsive layout across viewports: Mobile (375px), Tablet (768px), Desktop (1280px), Ultrawide (1920px+).
   - Test accessibility: keyboard focus states, screen reader ARIA roles, color contrast ($\ge 4.5:1$).
   - Test `prefers-reduced-motion`: verify smooth fallback without disorienting 3D or intense parallax.
3. **Database Schema & RLS Changes:**
   - Execute migration test verifying schema syntax and rollback safety.
   - Verify RLS policies: test public unauthenticated read (only published records return), test owner write (succeeds), test unauthorized write (fails closed with 403).
4. **Creator Studio & Form Workflows:**
   - Test all input validation: required fields, URL format, slug uniqueness, file size/type rejection.
   - Verify all operational states: Empty, Loading skeleton, Error toast, and Success feedback.

## 3. Evidence Standard
Every verification report must record:
- Exact CLI command executed.
- Working directory.
- Environment details (Node.js version, Next.js version, OS).
- Raw output summary, exit codes, or Lighthouse audit scores.
- Known limitations, untested viewports, or skipped platform checks.
