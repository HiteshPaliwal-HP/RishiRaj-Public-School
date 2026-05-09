import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

import './FormSubmitFeedback.css'

export type FormFeedbackVariant = 'success' | 'error' | 'notice'

type Props = {
  variant: FormFeedbackVariant
  children: ReactNode
  className?: string
}

export function FormSubmitFeedback({ variant, children, className = '' }: Props) {
  const rootClass =
    variant === 'success'
      ? 'form-feedback form-feedback--success'
      : variant === 'notice'
        ? 'form-feedback form-feedback--notice'
        : 'form-feedback form-feedback--error'

  const role =
    variant === 'success' ? 'status' : variant === 'notice' ? 'status' : 'alert'

  return (
    <motion.div
      className={`${rootClass} ${className}`.trim()}
      role={role}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
    >
      {variant === 'success' ? (
        <svg className="form-feedback__check" viewBox="0 0 24 24" aria-hidden>
          <circle cx="12" cy="12" r="11" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M8 12.5l2.5 2.5L16 9"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : variant === 'notice' ? (
        <svg className="form-feedback__notice-ico" viewBox="0 0 24 24" aria-hidden>
          <path
            d="M4 4h16v16H4z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path d="M8 9h8M8 12h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ) : (
        <svg className="form-feedback__warn-ico" viewBox="0 0 24 24" aria-hidden>
          <circle cx="12" cy="12" r="11" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M12 8v5M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )}
      <div className="form-feedback__text">{children}</div>
    </motion.div>
  )
}
