"use client"

import { useEffect, useState } from "react"

interface Orb {
  id: number
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
  hue: number
}

export function GlowingOrbs() {
  const [orbs, setOrbs] = useState<Orb[]>([])

  useEffect(() => {
    const createOrbs = () => {
      const newOrbs: Orb[] = []
      for (let i = 0; i < 8; i++) {
        newOrbs.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 200 + 100,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          opacity: Math.random() * 0.3 + 0.1,
          hue: Math.random() * 60 + 15, // Orange hues
        })
      }
      setOrbs(newOrbs)
    }

    createOrbs()

    const animateOrbs = () => {
      setOrbs((prev) =>
        prev.map((orb) => ({
          ...orb,
          x: orb.x + orb.speedX,
          y: orb.y + orb.speedY,
          x:
            orb.x > window.innerWidth + orb.size ? -orb.size : orb.x < -orb.size ? window.innerWidth + orb.size : orb.x,
          y:
            orb.y > window.innerHeight + orb.size
              ? -orb.size
              : orb.y < -orb.size
                ? window.innerHeight + orb.size
                : orb.y,
          opacity: 0.1 + Math.sin(Date.now() * 0.001 + orb.id) * 0.2,
        })),
      )
    }

    const interval = setInterval(animateOrbs, 50)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {orbs.map((orb) => (
        <div
          key={orb.id}
          className="absolute rounded-full blur-xl"
          style={{
            left: orb.x - orb.size / 2,
            top: orb.y - orb.size / 2,
            width: orb.size,
            height: orb.size,
            background: `radial-gradient(circle, hsla(${orb.hue}, 100%, 60%, ${orb.opacity}) 0%, transparent 70%)`,
          }}
        />
      ))}
    </div>
  )
}
