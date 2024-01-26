import React from "react"

export const useIntersectionObserver = (options: IntersectionObserverInit, cb: IntersectionObserverCallback) => {
  const observer = React.useRef<IntersectionObserver | null>(null)

  return React.useCallback((node: any) => {
    if (!node) {
      if (observer.current) {
        observer.current.disconnect()
      }
      return
    }

    observer.current = new window.IntersectionObserver(cb, options)
    observer.current.observe(node)
  }, [cb, options])
}
