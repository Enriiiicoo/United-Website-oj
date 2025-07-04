"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import type { ReactNode } from "react"

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  animation?: "fadeIn" | "slideUp" | "slideLeft" | "slideRight" | "scaleIn"
  delay?: number
}

export function AnimatedSection({ children, className = "", animation = "fadeIn", delay = 0 }: AnimatedSectionProps) {
  const { ref, isVisible } = useScrollAnimation()

  const getAnimationClass = () => {
    const baseClass = "transition-all duration-1000 ease-out"

    if (!isVisible) {
      switch (animation) {
        case "fadeIn":
          return `${baseClass} opacity-0`
        case "slideUp":
          return `${baseClass} opacity-0 translate-y-10`
        case "slideLeft":
          return `${baseClass} opacity-0 translate-x-10`
        case "slideRight":
          return `${baseClass} opacity-0 -translate-x-10`
        case "scaleIn":
          return `${baseClass} opacity-0 scale-95`
        default:
          return `${baseClass} opacity-0`
      }
    }

    return `${baseClass} opacity-100 translate-x-0 translate-y-0 scale-100`
  }

  return (
    <div ref={ref} className={`${getAnimationClass()} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}
