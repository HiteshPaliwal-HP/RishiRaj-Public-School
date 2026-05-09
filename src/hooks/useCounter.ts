import { useCallback, useEffect, useRef, useState } from 'react'

export function useCounter(
  target: number,
  options: { duration?: number; enabled?: boolean } = {},
) {
  const { duration = 1800, enabled = true } = options
  const [value, setValue] = useState(0)
  const frameRef = useRef<number>(0)
  const startRef = useRef<number | null>(null)

  const start = useCallback(() => {
    if (!enabled || target <= 0) {
      setValue(target)
      return
    }
    startRef.current = null
    const step = (ts: number) => {
      if (startRef.current === null) startRef.current = ts
      const elapsed = ts - startRef.current
      const p = Math.min(1, elapsed / duration)
      const eased = 1 - (1 - p) ** 3
      setValue(Math.round(eased * target))
      if (p < 1) frameRef.current = requestAnimationFrame(step)
    }
    frameRef.current = requestAnimationFrame(step)
  }, [duration, enabled, target])

  useEffect(() => {
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [])

  useEffect(() => {
    if (!enabled) setValue(0)
  }, [enabled])

  return { value, start }
}
