"use client"

import { useEffect, useState } from "react"

export function SoundWave() {
  const [bars, setBars] = useState<number[]>(Array.from({ length: 20 }, () => Math.random()))

  useEffect(() => {
    const interval = setInterval(() => {
      setBars((prev) => prev.map(() => Math.random()))
    }, 150)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed bottom-4 left-4 pointer-events-none z-10 opacity-30">
      <div className="flex items-end gap-1 h-20">
        {bars.map((height, index) => (
          <div
            key={index}
            className="bg-gradient-to-t from-orange-600 to-orange-400 w-2 transition-all duration-150 ease-out"
            style={{
              height: `${height * 100}%`,
              minHeight: "4px",
            }}
          />
        ))}
      </div>
    </div>
  )
}
