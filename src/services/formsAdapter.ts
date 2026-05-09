/**
 * Form submission adapter.
 *
 * Precedence:
 * 1. VITE_WEB3FORMS_ACCESS_KEY → POST FormData to https://api.web3forms.com/submit
 * 2. VITE_FORM_API_URL → JSON POST to your serverless handler
 * 3. mailto: fallback (opens mail client)
 */

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit'

/** Returned by all submit* functions — check usedMailtoFallback when debugging Network tab. */
export type FormSubmitResult = {
  ok: boolean
  error?: string
  /** True: no API key / endpoint — opened mail client instead of HTTP POST (see console warn). */
  usedMailtoFallback?: boolean
}

export interface ContactFormPayload {
  fullName: string
  phone: string
  email: string
  childName: string
  classApplying: string
  message: string
}

export interface AdmissionFormPayload {
  parentName: string
  phone: string
  email: string
  childName: string
  classApplying: string
  message: string
}

/** Emergent-style contact form (name, email, subject, message). */
export interface SimpleContactPayload {
  name: string
  email: string
  subject: string
  message: string
}

function web3FormsKey(): string | undefined {
  const k = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY
  return typeof k === 'string' && k.trim().length > 0 ? k.trim() : undefined
}

function logMailtoFallback(context: string): void {
  console.warn(
    `[formsAdapter:${context}] mailto fallback — VITE_WEB3FORMS_ACCESS_KEY is missing or empty. ` +
      `Network tab will show mailto: (red), not ${WEB3FORMS_ENDPOINT}. ` +
      `Fix: create rishi-raj-public-school/.env with VITE_WEB3FORMS_ACCESS_KEY=your_key and restart npm run dev.`,
  )
}

async function submitWeb3Forms(entries: Record<string, string>): Promise<FormSubmitResult> {
  const accessKey = web3FormsKey()
  if (!accessKey) return { ok: false, error: 'Missing Web3Forms key' }

  const fd = new FormData()
  fd.append('access_key', accessKey)
  for (const [key, value] of Object.entries(entries)) {
    fd.append(key, value)
  }

  try {
    const res = await fetch(WEB3FORMS_ENDPOINT, { method: 'POST', body: fd })
    const data = (await res.json()) as { success?: boolean; message?: string }
    if (data.success === true) {
      console.info(`[formsAdapter] Web3Forms POST succeeded → ${WEB3FORMS_ENDPOINT}`)
      return { ok: true }
    }
    console.warn('[formsAdapter] Web3Forms rejected:', data.message ?? res.status)
    return { ok: false, error: data.message ?? 'Request failed' }
  } catch (e) {
    console.warn('[formsAdapter] Web3Forms fetch error:', e)
    return { ok: false, error: 'Network error' }
  }
}

function buildMailtoContact(p: ContactFormPayload): string {
  const subject = encodeURIComponent(`Website enquiry — ${p.childName} (${p.classApplying})`)
  const body = encodeURIComponent(
    `Name: ${p.fullName}\nPhone: ${p.phone}\nEmail: ${p.email}\nChild: ${p.childName}\nClass: ${p.classApplying}\n\n${p.message}`,
  )
  return `mailto:info@rishirajschool.in?subject=${subject}&body=${body}`
}

function buildMailtoSimpleContact(p: SimpleContactPayload): string {
  const subject = encodeURIComponent(p.subject.trim() || 'Website contact')
  const body = encodeURIComponent(`From: ${p.name}\nEmail: ${p.email}\n\n${p.message}`)
  return `mailto:info@rishirajschool.in?subject=${subject}&body=${body}`
}

function buildMailtoAdmission(p: AdmissionFormPayload): string {
  const subject = encodeURIComponent(`Admission enquiry — ${p.childName}`)
  const body = encodeURIComponent(
    `Parent: ${p.parentName}\nPhone: ${p.phone}\nEmail: ${p.email}\nChild: ${p.childName}\nClass: ${p.classApplying}\n\n${p.message}`,
  )
  return `mailto:admissions@rishirajschool.in?subject=${subject}&body=${body}`
}

async function postCustomJson(path: string, body: unknown): Promise<FormSubmitResult> {
  try {
    const res = await fetch(path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    if (!res.ok) return { ok: false, error: 'Request failed' }
    return { ok: true }
  } catch {
    return { ok: false, error: 'Network error' }
  }
}

export async function submitContactPayload(payload: ContactFormPayload): Promise<FormSubmitResult> {
  if (web3FormsKey()) {
    return submitWeb3Forms({
      name: payload.fullName,
      email: payload.email,
      phone: payload.phone,
      subject: `Website enquiry — ${payload.childName} (${payload.classApplying})`,
      message: [
        `Phone: ${payload.phone}`,
        `Child: ${payload.childName}`,
        `Class: ${payload.classApplying}`,
        '',
        payload.message,
      ].join('\n'),
      child_name: payload.childName,
      class_applying: payload.classApplying,
      form_name: 'Website — Contact (legacy)',
    })
  }
  const api = import.meta.env.VITE_FORM_API_URL
  if (api) {
    return postCustomJson(api, { type: 'contact', ...payload })
  }
  logMailtoFallback('submitContactPayload')
  window.location.href = buildMailtoContact(payload)
  return { ok: true, usedMailtoFallback: true }
}

export async function submitSimpleContactPayload(payload: SimpleContactPayload): Promise<FormSubmitResult> {
  if (web3FormsKey()) {
    return submitWeb3Forms({
      name: payload.name,
      email: payload.email,
      subject: payload.subject.trim() || 'Website contact',
      message: payload.message,
      form_name: 'Website — Contact',
    })
  }
  const api = import.meta.env.VITE_FORM_API_URL
  if (api) {
    return postCustomJson(api, { type: 'contact-simple', ...payload })
  }
  logMailtoFallback('submitSimpleContactPayload')
  window.location.href = buildMailtoSimpleContact(payload)
  return { ok: true, usedMailtoFallback: true }
}

export async function submitAdmissionPayload(payload: AdmissionFormPayload): Promise<FormSubmitResult> {
  if (web3FormsKey()) {
    const body = [
      `Parent / guardian: ${payload.parentName}`,
      `Phone: ${payload.phone}`,
      `Email: ${payload.email}`,
      `Child: ${payload.childName}`,
      `Class applying: ${payload.classApplying}`,
      '',
      'Message:',
      payload.message || '—',
    ].join('\n')
    return submitWeb3Forms({
      name: payload.parentName,
      email: payload.email.trim(),
      phone: payload.phone,
      subject: `Admission enquiry — ${payload.childName}`,
      message: body,
      child_name: payload.childName,
      class_applying: payload.classApplying,
      form_name: 'Website — Admission',
    })
  }
  const api = import.meta.env.VITE_FORM_API_URL
  if (api) {
    return postCustomJson(api, { type: 'admission', ...payload })
  }
  logMailtoFallback('submitAdmissionPayload')
  window.location.href = buildMailtoAdmission(payload)
  return { ok: true, usedMailtoFallback: true }
}
