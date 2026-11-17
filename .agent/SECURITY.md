# Security & Privacy Rules — THE YACINEVERSE

## 1. Secrets & Credential Protection
- **Zero Secrets in Git:** Never commit `.env`, `.env.local`, `.env.production`, private keys, service account credentials, or database connection strings.
- **Client Key Boundaries:** The Supabase Service Role Key (`SUPABASE_SERVICE_ROLE_KEY`) grants administrative bypass over all Row Level Security. It must NEVER be exposed to the browser, prefixed with `NEXT_PUBLIC_`, or bundled in client code. Only `NEXT_PUBLIC_SUPABASE_ANON_KEY` is permitted in frontend code.
- **Log Sanitization:** Automatically redact passwords, tokens, JWTs, and personal contact info in build outputs, error monitoring, and execution logs.
- **Form & Contact Protection:** Never expose raw email addresses or unauthenticated FormSubmit endpoints in public HTML. Route communications through secure, rate-limited server endpoints with bot protection.

## 2. Authentication & Authorization Boundaries
- **Supabase Auth Integration:** Utilize Supabase Auth with secure, HttpOnly, SameSite cookies for session management in Next.js Server Components and Server Actions.
- **Owner Account Isolation:** The Creator Studio CMS is single-owner initially. Administrative mutations (insert, update, delete, publish, upload) must strictly verify that `auth.uid() = [OWNER_UID]` or an explicit administrative role in database policies.
- **Server-Side Enforcement:** Never rely on frontend route hiding, layout conditional rendering, or UI disabling as security boundaries. Every database query and server action must enforce authorization at the database level via Row Level Security (RLS).

## 3. Row Level Security (RLS) Matrix
- **Mandatory RLS:** Every single table created in Supabase PostgreSQL must have `ALTER TABLE [name] ENABLE ROW LEVEL SECURITY;` enabled by default in migrations.
- **Public Read Boundaries:** Public visitors are granted `SELECT` permissions ONLY on records where `status = 'published'` and `visibility = 'public'`.
- **Private Draft Protection:** Drafts (`status = 'draft'`), archived content, internal review notes, and audit logs must NEVER be returned to unauthenticated or non-owner requests.
- **Zero Public Writes:** The public role (`anon`) has zero `INSERT`, `UPDATE`, or `DELETE` permissions on core content tables. Public interactions (e.g. comments, inquiries) must pass through validated server endpoints with rate limiting and CAPTCHA/Turnstile verification.

## 4. File Upload & Media Security
- **MIME Type Sniffing & Allowlists:** Validate file uploads using strict magic-byte MIME type inspection, not trustable client-provided headers or extensions.
- **Allowed Formats:**
  - Images: `image/jpeg`, `image/png`, `image/webp`, `image/avif`, `image/svg+xml` (sanitized).
  - Documents: `application/pdf`.
  - Videos: `video/mp4`, `video/webm` (or hosted on external CDN/Vimeo/YouTube).
- **SVG Sanitization:** SVG files can contain embedded scripts (`<script>`, `onload`). All uploaded SVGs must be strictly sanitized to prevent stored XSS before storage.
- **Bucket Isolation:**
  - `public-media`: Publicly accessible CDN assets with cache control headers.
  - `private-documents`: Restricted to authenticated owner access for confidential dossiers or unredacted transcripts.

## 5. Content Privacy & Non-Disclosure
- **Client & Hospital Confidentiality:** Hospital systems (Eph Meslem Tayeb), clinical data (El Omaraa), and proprietary commercial IP (Agrovia / FARMER ERP) must be strictly reviewed for client confidentiality. Never publish unredacted database schemas, live patient/hospital records, or private API keys.
- **Owner Consent for Personal History:** Stories, milestones, vlogs, and family references must be explicitly confirmed with the Product Owner before being marked for public publication.
