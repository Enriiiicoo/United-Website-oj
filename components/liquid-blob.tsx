"use client"

import { useEffect, useState } from "react"

export function LiquidBlob() {
  const [time, setTime] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => prev + 0.02)
    }, 50)

    return () => clearInterval(interval)
  }, [])

  const createPath = (offset: number) => {
    const points = []
    const numPoints = 8
    const centerX = 200
    const centerY = 200
    const baseRadius = 150

    for (let i = 0; i <= numPoints; i++) {
      const angle = (i / numPoints) * Math.PI * 2
      const radius = baseRadius + Math.sin(time * 2 + angle * 3 + offset) * 30
      const x = centerX + Math.cos(angle) * radius
      const y = centerY + Math.sin(angle) * radius
      points.push(`${x},${y}`)
    }

    return `M${points.join(" L")}Z`
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <svg width="100%" height="100%" className="absolute inset-0">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Multiple blobs at different positions */}
        <g transform="translate(10%, 20%)">
          <path d={createPath(0)} fill="rgba(255, 165, 0, 0.1)" filter="url(#glow)" />
        </g>
        <g transform="translate(70%, 60%)">
          <path d={createPath(Math.PI)} fill="rgba(255, 140, 0, 0.08)" filter="url(#glow)" />
        </g>
        <g transform="translate(30%, 80%)">
          <path d={createPath(Math.PI / 2)} fill="rgba(255, 165, 0, 0.06)" filter="url(#glow)" />
        </g>
      </svg>
    </div>
  )
}
