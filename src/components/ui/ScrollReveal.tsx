import type { ReactNode } from 'react'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'

type Direction = 'up' | 'left' | 'right'

interface ScrollRevealProps {
  children: ReactNode
  delayMs?: number
  direction?: Direction
  className?: string
}

export function ScrollReveal({
  children,
  delayMs = 0,
  direction = 'up',
  className = '',
}: ScrollRevealProps) {
  const { ref, isVisible } = useScrollAnimation()
  const dirClass =
    direction === 'left'
      ? 'scroll-reveal--left'
      : direction === 'right'
        ? 'scroll-reveal--right'
        : ''
  const cls = `scroll-reveal ${dirClass} ${isVisible ? 'visible' : ''} ${className}`.trim()

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cls}
      style={{ transitionDelay: `${delayMs}ms` }}
    >
      {children}
    </div>
  )
}
