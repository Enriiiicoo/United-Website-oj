"use client"

import { useEffect, useState } from "react"

interface Star {
  id: number
  x: number
  y: number
  size: number
  brightness: number
}

interface Connection {
  from: number
  to: number
  opacity: number
}

export function Constellation() {
  const [stars, setStars] = useState<Star[]>([])
  const [connections, setConnections] = useState<Connection[]>([])

  useEffect(() => {
    const createStars = () => {
      const newStars: Star[] = []
      for (let i = 0; i < 30; i++) {
        newStars.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 3 + 1,
          brightness: Math.random(),
        })
      }
      setStars(newStars)

      // Create connections between nearby stars
      const newConnections: Connection[] = []
      for (let i = 0; i < newStars.length; i++) {
        for (let j = i + 1; j < newStars.length; j++) {
          const distance = Math.sqrt(
            Math.pow(newStars[i].x - newStars[j].x, 2) + Math.pow(newStars[i].y - newStars[j].y, 2),
          )
          if (distance < 200) {
            newConnections.push({
              from: i,
              to: j,
              opacity: Math.max(0, 1 - distance / 200),
            })
          }
        }
      }
      setConnections(newConnections)
    }

    createStars()

    const animateStars = () => {
      setStars((prev) =>
        prev.map((star) => ({
          ...star,
          brightness: 0.3 + Math.sin(Date.now() * 0.001 + star.id) * 0.7,
        })),
      )
    }

    const interval = setInterval(animateStars, 100)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <svg width="100%" height="100%" className="absolute inset-0">
        {/* Draw connections */}
        {connections.map((connection, index) => {
          const fromStar = stars[connection.from]
          const toStar = stars[connection.to]
          if (!fromStar || !toStar) return null

          return (
            <line
              key={index}
              x1={fromStar.x}
              y1={fromStar.y}
              x2={toStar.x}
              y2={toStar.y}
              stroke="rgba(255, 165, 0, 0.3)"
              strokeWidth="1"
              opacity={connection.opacity * 0.5}
            />
          )
        })}

        {/* Draw stars */}
        {stars.map((star) => (
          <circle
            key={star.id}
            cx={star.x}
            cy={star.y}
            r={star.size}
            fill="rgba(255, 165, 0, 0.8)"
            opacity={star.brightness}
          />
        ))}
      </svg>
    </div>
  )
}
