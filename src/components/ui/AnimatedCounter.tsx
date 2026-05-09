import { useEffect, useRef } from 'react'
import { useCounter } from '../../hooks/useCounter'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import './AnimatedCounter.css'

interface AnimatedCounterProps {
  end: number
  suffix?: string
  label: string
  duration?: number
}

export function AnimatedCounter({
  end,
  suffix = '',
  label,
  duration = 2000,
}: AnimatedCounterProps) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.25 })
  const { value, start } = useCounter(end, { duration, enabled: isVisible })
  const started = useRef(false)

  useEffect(() => {
    if (isVisible && !started.current) {
      started.current = true
      start()
    }
  }, [isVisible, start])

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className="animated-counter">
      <div className="animated-counter__value">
        {value}
        {suffix}
      </div>
      <div className="animated-counter__label">{label}</div>
    </div>
  )
}
