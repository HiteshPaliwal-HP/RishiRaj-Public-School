# Project Handover - Rishi Raj Public School Website

Last updated: 2026-05-09

## 1) Project at a glance

- Project name: `rishi-raj-public-school`
- Type: React + TypeScript single-page website
- Build tool: Vite
- Routing: React Router
- i18n: `react-i18next` (`en` + partial `hi`)
- UI motion: `framer-motion`
- Main pages: Home, About, Academics, Admissions, Faculty, Gallery, Contact

This is a school marketing/information website with inquiry forms and media/gallery content.

## 2) Run and build

From project root:

- Dev: `npm run dev`
- Build: `npm run build`
- Preview build: `npm run preview`
- Lint: `npm run lint`

## 3) Key architecture and files

- App routes: `src/App.tsx`
- Site constants/contact details: `src/config/site.ts`
- Navigation config: `src/config/nav.ts`
- Form submission logic (single adapter): `src/services/formsAdapter.ts`
- Contact page UI/form: `src/pages/Contact.tsx`
- Admissions page + quick inquiry form: `src/pages/Admissions.tsx`
- Gallery data source: `src/data/gallery.ts`
- Core value icons: `src/components/about/CoreValueIcon.tsx`
- Shared animated form feedback: `src/components/forms/FormSubmitFeedback.tsx`
- Env typing: `src/vite-env.d.ts`
- Env template: `.env.example`

## 4) What has been completed

### A) Gallery rework (section-based + random all view)

Implemented in `src/data/gallery.ts`:

- Images are loaded by folder from project root `Images/`:
  - `Images/Events/`
  - `Images/Classrooms/`
  - `Images/Sports/`
  - `Images/Annual Day/`
- "All" gallery mixes all categories and shuffles order.
- `School.jpg` in `Images/` root is excluded from gallery (reserved for home hero).
- Notes are added in file comments for content managers.
- Important Vite behavior handled: glob strings are literal (not template strings), so bundling works.

### B) About page core value icons

Implemented with inline SVG icon mapping:

- File: `src/components/about/CoreValueIcon.tsx`
- About values now show icons matching each heading:
  - Excellence
  - Integrity
  - Discipline
  - Respect
  - Innovation
  - Community

### C) Web3Forms integration for both forms

Centralized in `src/services/formsAdapter.ts`.

Submission precedence:

1. `VITE_WEB3FORMS_ACCESS_KEY` -> submit to `https://api.web3forms.com/submit` using `FormData`
2. Else `VITE_FORM_API_URL` -> JSON POST to custom endpoint
3. Else fallback to `mailto:` (opens mail client)

Applies to:

- `submitSimpleContactPayload` (Contact page)
- `submitAdmissionPayload` (Admissions quick enquiry)
- `submitContactPayload` (legacy full payload path)

### D) Form UX improvements

- Shared animated component: `FormSubmitFeedback`
- Contact page:
  - validation, sending, success, error states
  - explicit `mailto` notice state
- Admissions page:
  - moved from basic boolean success to status-based flow:
    - `idle | sending | ok | err | mailto`
  - animated success/error/notice feedback

### E) Diagnostics for troubleshooting form submission

Added logs in `formsAdapter.ts`:

- `console.info` on successful Web3Forms POST
- `console.warn` when Web3Forms rejects or fetch fails
- `console.warn` when app uses `mailto` fallback, with explicit setup instructions

This helps debug when Network shows red `mailto:` instead of HTTP POST.

## 5) Current status right now

- Core integration work is implemented and build was successful after changes.
- Forms can submit via Web3Forms if env is correctly configured.
- If Web3Forms key is missing at runtime, forms intentionally fall back to mail client.
- UI now clearly warns user when fallback happens (instead of showing false success).

## 6) Required environment setup

Use local `.env` at project root:

```env
VITE_WEB3FORMS_ACCESS_KEY=YOUR_ACCESS_KEY_HERE
```

Optional custom backend:

```env
VITE_FORM_API_URL=https://your-endpoint.example.com
```

Important operational note:

- After changing `.env`, restart dev server (`npm run dev`).
- Vite reads env values at startup time.

## 7) Known issue / risk to address next

Security hygiene:

- `.env.example` should not contain real secrets.
- Keep only placeholder values in `.env.example`.
- Keep real keys only in local `.env` and production environment variables.
- Rotate exposed Web3Forms key if it was shared in chat/screenshots/committed anywhere.

## 8) How to verify forms quickly

1. Start app: `npm run dev`
2. Open Contact page and submit form
3. Browser devtools -> Network:
   - Expected when configured: request to `https://api.web3forms.com/submit`
   - If you see `mailto:` in red, env key is not loaded
4. Check browser console:
   - success log for Web3Forms POST, or
   - warning telling fallback reason

Repeat same for Admissions quick enquiry form.

## 9) Suggested next tasks

1. Sanitize `.env.example` to placeholder only (if not already sanitized)
2. Add anti-spam fields for Web3Forms (`botcheck`, optional redirect URL/captcha settings)
3. Add tiny integration smoke tests for forms adapter (mock `fetch`)
4. Compress/resize gallery source images to improve performance on mobile
5. Optional: split thumbnail vs full-size images for gallery/lightbox

## 10) Quick prompt for next AI session

Use this text in next chat:

```text
Read PROJECT_HANDOVER.md first.
Then continue from section "Current status right now".
Do not change architecture unless necessary.
Preserve form submission precedence in src/services/formsAdapter.ts.
```

