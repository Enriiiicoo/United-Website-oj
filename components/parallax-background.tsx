"use client"

import { useEffect, useState } from "react"

export function ParallaxBackground() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Layer 1 - Slowest */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          transform: `translateY(${scrollY * 0.1}px)`,
          background: `radial-gradient(circle at 20% 80%, rgba(255, 165, 0, 0.1) 0%, transparent 50%)`,
        }}
      />
      {/* Layer 2 - Medium */}
      <div
        className="absolute inset-0 opacity-15"
        style={{
          transform: `translateY(${scrollY * 0.3}px)`,
          background: `radial-gradient(circle at 80% 20%, rgba(255, 140, 0, 0.15) 0%, transparent 60%)`,
        }}
      />
      {/* Layer 3 - Fastest */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
          background: `radial-gradient(circle at 50% 50%, rgba(255, 165, 0, 0.08) 0%, transparent 70%)`,
        }}
      />
    </div>
  )
}
