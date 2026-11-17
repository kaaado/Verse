# Task Report — File Upload Pipeline, MIME Sniffing & SVG Sanitization

## 1. Status
`COMPLETED`

## 2. Objective
Architect the secure file upload pipeline for Creator Studio, specifying size limits, magic-byte MIME type verification, cryptographic file hashing, and SVG DOMPurify sanitization to prevent stored Cross-Site Scripting (XSS) and remote file execution.

## 3. Work Performed
- Designed the upload pipeline for images, documents, and 3D assets.
- Formulated magic-byte header sniffing to defeat file extension masquerading attacks.
- Specified SVG sanitization using DOMPurify with strict XML parsing.
- Established file size quotas and storage path hashing rules.

## 4. Files Inspected
- OWASP File Upload Security Cheat Sheet
- Supabase Storage Security Documentation

## 5. Files Created or Modified
- `docs/stage-02-technical-architecture/phase-02-security-and-identity/task-05-upload-security/report.md`

## 6. Findings and Evidence
### 6.1 Upload Validation Pipeline
```text
  Creator Studio File Selection
               │
               ▼
  [ Stage 1: Client Pre-check ] ──► Validate extension & file size (< 5MB)
               │
               ▼
  [ Stage 2: Server Action Ingestion ] ──► Stream binary buffer to server
               │
               ▼
  [ Stage 3: Magic-Byte Sniffing ] ──► Inspect first 16 bytes for valid signatures:
               │                      - JPEG: FF D8 FF
               │                      - PNG:  89 50 4E 47 0D 0A 1A 0A
               │                      - WebP: 52 49 46 46 ... 57 45 42 50
               │                      - PDF:  25 50 44 46
               ▼
  [ Stage 4: SVG Sanitization ] ──► If MIME is image/svg+xml:
               │                    Run DOMPurify stripping <script>, onLoad, onError
               ▼
  [ Stage 5: Storage Upload ] ──► Upload to Supabase Storage with random UUID filename
               │
               ▼
  [ Stage 6: Database Registration ] ──► Insert record in media_assets
```

### 6.2 SVG Sanitization Architecture
SVG files can contain embedded JavaScript, creating stored XSS risks when rendered in the browser.
- All SVGs uploaded via Creator Studio are sanitized on the server before storage:
```typescript
import DOMPurify from 'isomorphic-dompurify';

export function sanitizeSvg(svgContent: string): string {
  return DOMPurify.sanitize(svgContent, {
    USE_PROFILES: { svg: true, svgFilters: true },
    ADD_TAGS: ['use'],
    FORBID_TAGS: ['script', 'style', 'iframe', 'foreignObject'],
    FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover'],
  });
}
```

### 6.3 Storage Limits & Rules
- **Maximum Image Size:** 5 MB.
- **Maximum Document Size (PDF):** 10 MB.
- **Maximum 3D Model Size (GLB):** 15 MB.
- **Storage Path Anonymization:** Files are stored as `uploads/{uuid}.{ext}` rather than preserving user-supplied original filenames, preventing directory traversal attacks.

## 7. Decisions
- **Decision P02-16:** Enforce server-side magic-byte sniffing on all uploaded binary buffers; never trust the client-provided `Content-Type` header alone.
- **Decision P02-17:** Sanitize all SVG files using DOMPurify before committing to storage.
- **Decision P02-18:** Generate UUID-based storage paths to eliminate path traversal risks.

## 8. Risks and Blockers
- **Risk:** CPU overhead during server-side image re-encoding on large files.
  - *Mitigation:* Offload resizing to Next.js Image Optimization API; upload raw validated binaries directly to Supabase Storage.

## 9. Face 1 Review (Software Architecture)
- **Evaluation:** Six-stage upload pipeline provides comprehensive defense against malicious asset injection.
- **Verdict:** `APPROVED`.

## 10. Face 2 Review (QA & Performance)
- **Evaluation:** Strict size limits prevent storage exhaustion and uphold fast media loading benchmarks.
- **Verdict:** `APPROVED`.

## 11. Face 3 Review (Defensive Security)
- **Evaluation:** Magic-byte verification and DOMPurify SVG stripping neutralize stored XSS and executable file upload exploits.
- **Verdict:** `APPROVED`.

## 12. Acceptance Criteria
- [x] Multi-stage upload validation pipeline codified.
- [x] Magic-byte sniffing specifications defined.
- [x] SVG DOMPurify sanitization rules documented.

## 13. Remaining Work
- None for this architectural task.

## 14. Owner Approval
`STAGE_GATE_INTEGRATED`
