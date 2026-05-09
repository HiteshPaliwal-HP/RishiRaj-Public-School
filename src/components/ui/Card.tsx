import type { ReactNode } from 'react'
import './Card.css'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
}

export function Card({ children, className = '', hover = true }: CardProps) {
  const cls = `ui-card em-card ${hover ? 'em-card--interactive' : ''} ${className}`.trim()
  return <div className={cls}>{children}</div>
}
