"use client"

import { useEffect, useState } from "react"

interface Drop {
  id: number
  x: number
  y: number
  speed: number
  chars: string[]
  opacity: number
}

export function MatrixRain() {
  const [drops, setDrops] = useState<Drop[]>([])

  useEffect(() => {
    const chars = "01UNITED".split("")
    const createDrops = () => {
      const newDrops: Drop[] = []
      const columns = Math.floor(window.innerWidth / 20)

      for (let i = 0; i < columns; i++) {
        if (Math.random() > 0.95) {
          // Only create drops occasionally
          newDrops.push({
            id: Math.random(),
            x: i * 20,
            y: -Math.random() * 100,
            speed: Math.random() * 3 + 1,
            chars: Array.from({ length: 10 }, () => chars[Math.floor(Math.random() * chars.length)]),
            opacity: Math.random() * 0.5 + 0.3,
          })
        }
      }
      setDrops((prev) => [...prev.slice(-50), ...newDrops]) // Keep only recent drops
    }

    const animateDrops = () => {
      setDrops((prev) =>
        prev
          .map((drop) => ({
            ...drop,
            y: drop.y + drop.speed,
          }))
          .filter((drop) => drop.y < window.innerHeight + 200),
      )
    }

    const createInterval = setInterval(createDrops, 100)
    const animateInterval = setInterval(animateDrops, 50)

    return () => {
      clearInterval(createInterval)
      clearInterval(animateInterval)
    }
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {drops.map((drop) => (
        <div
          key={drop.id}
          className="absolute text-orange-500 font-mono text-sm"
          style={{
            left: drop.x,
            top: drop.y,
            opacity: drop.opacity,
          }}
        >
          {drop.chars.map((char, index) => (
            <div
              key={index}
              style={{
                opacity: 1 - index * 0.1,
              }}
            >
              {char}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
