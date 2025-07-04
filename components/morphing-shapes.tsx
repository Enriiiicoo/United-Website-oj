"use client"

import { useEffect, useState } from "react"

export function MorphingShapes() {
  const [shapes, setShapes] = useState([
    { id: 1, x: 10, y: 20, scale: 1, rotation: 0 },
    { id: 2, x: 80, y: 60, scale: 1.2, rotation: 45 },
    { id: 3, x: 30, y: 80, scale: 0.8, rotation: 90 },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setShapes((prev) =>
        prev.map((shape) => ({
          ...shape,
          rotation: shape.rotation + 1,
          scale: 0.8 + Math.sin(Date.now() * 0.001 + shape.id) * 0.4,
        })),
      )
    }, 50)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {shapes.map((shape) => (
        <div
          key={shape.id}
          className="absolute"
          style={{
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            transform: `scale(${shape.scale}) rotate(${shape.rotation}deg)`,
            transition: "transform 0.1s ease-out",
          }}
        >
          <svg width="100" height="100" viewBox="0 0 100 100" className="opacity-10">
            <polygon
              points="50,10 90,90 10,90"
              fill="none"
              stroke="url(#orangeGradient)"
              strokeWidth="2"
              className="animate-pulse"
            />
            <defs>
              <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ff8c00" />
                <stop offset="100%" stopColor="#ffa500" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      ))}
    </div>
  )
}
