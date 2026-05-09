/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MAP_EMBED_URL?: string
  readonly VITE_LOGO_SRC?: string
  /** Web3Forms access key — Contact + Admissions (see formsAdapter). */
  readonly VITE_WEB3FORMS_ACCESS_KEY?: string
  /** Optional: POST endpoint for custom serverless handler when Web3Forms key unset */
  readonly VITE_FORM_API_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
