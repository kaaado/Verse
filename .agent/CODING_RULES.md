# Coding Rules — THE YACINEVERSE

## 1. Core Architecture & Next.js Paradigms
- **Next.js App Router Standard:**
  - Structure by feature modules under `src/app/` and `src/components/`.
  - Default to **React Server Components (RSC)** for data fetching, static layouts, and SEO-critical content.
  - Isolate `"use client"` directives strictly to leaf components that require browser APIs, event listeners, Framer Motion, Canvas, or interactive state.
  - Never import server-only modules or Supabase service keys into client components.
- **TypeScript Strictness:**
  - Strict type checking enabled (`strict: true`, `noImplicitAny: true`).
  - Zero `any` types in domain entities, database schemas, and API responses. Define explicit interfaces or types for all data contracts.
- **Modular Component Design (Rule 0):**
  - Aim for high cohesion and single responsibility. Keep components under `< 200 lines` where practical. Break large views into subcomponents.

## 2. Styling, Tokens & Modern Web Guidance
- **Tailwind CSS & Design Tokens:**
  - Standardize all colors, typography, spacing, border radii, and shadows through semantic design tokens.
  - Support automatic dark/light theme switching with smooth transitions.
- **Modern Web Standards:**
  - Always consult `modern-web-guidance` (`npx -y modern-web-guidance@latest search "<query>"`) before introducing complex CSS or ad-hoc JavaScript UI solutions.
  - Use modern web platform primitives: native `<dialog>` for modals, native Popover API, CSS Grid, container queries, CSS subgrid, and semantic HTML5 tags (`<main>`, `<article>`, `<section>`, `<nav>`, `<aside>`).
- **Creator Studio Dashboard Conventions:**
  - Follow `dashboard-design` skill standards: quiet, calm interfaces; clear visual hierarchy; KPI cards with comparison context; tabular figures with right alignment; wordless data cards; zero sentences outside tooltips and empty states.

## 3. Motion, 3D & Accessibility Rules
- **Hybrid 2D + Selective 3D:**
  - Motion must serve narrative meaning, spatial depth, and orientation—never arbitrary decoration.
  - 3D elements (Three.js / WebGL / Canvas) must be selectively applied, lazily loaded, and feature-detected.
  - Mobile devices and low-tier GPUs must automatically receive an optimized 2D fallback or simplified canvas rendering.
- **Motion Accessibility (`prefers-reduced-motion`):**
  - All Framer Motion animations and CSS transitions must detect and respect user motion preferences. When reduced motion is requested, disable parallax, camera fly-throughs, and looping floating animations; replace with simple instantaneous opacity cuts.

## 4. Supabase Data Access & Mutations
- **Server Actions & Route Handlers:**
  - Perform all content mutations via typed Next.js Server Actions or Route Handlers with server-side validation (Zod).
  - Never allow direct client-side database writes bypassing application-level invariants.
- **Cache Invalidation & ISR:**
  - Use `revalidatePath` and `revalidateTag` on content publication, updates, or deletions to ensure instantaneous cache freshness without full site redeploys.
