import { useCallback, useEffect, useRef, useState } from 'react'
import { sfx } from '../audio.js'

export function useCountdown(onExpire) {
  const [seconds, setSeconds] = useState(null)
  const cb = useRef(onExpire)
  const interval = useRef(null)

  useEffect(() => { cb.current = onExpire }, [onExpire])

  const stop = useCallback(() => {
    clearInterval(interval.current)
    interval.current = null
    sfx.suspenseStop()
    setSeconds(null)
  }, [])

  const start = useCallback((n) => {
    clearInterval(interval.current)
    sfx.suspenseStart()
    setSeconds(n)
    interval.current = setInterval(() => {
      setSeconds((s) => {
        if (s === null) return null
        const nextVal = s - 1
        if (nextVal <= 0) {
          clearInterval(interval.current)
          interval.current = null
          sfx.suspenseStop()
          sfx.timeUp()
          setTimeout(() => cb.current?.(), 0)
          return null
        }
        if (nextVal <= 5) sfx.countdown()
        return nextVal
      })
    }, 1000)
  }, [])

  useEffect(() => () => { clearInterval(interval.current); sfx.suspenseStop() }, [])

  return { seconds, start, stop, running: seconds !== null }
}
