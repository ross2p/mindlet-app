"use client"

import { cva, type VariantProps } from "class-variance-authority"
import { type ReactNode, useState, useRef, useEffect } from "react"
import { cn } from "@/shared/utils"

const tooltipVariants = cva(
  [
    "absolute z-50 px-3 py-1.5 text-sm rounded-md",
    "bg-foreground text-background",
    "shadow-lg",
    "transition-all duration-150",
    "pointer-events-none",
    "animate-fade-in",
  ].join(" "),
  {
    variants: {
      placement: {
        top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
        bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
        left: "right-full top-1/2 -translate-y-1/2 mr-2",
        right: "left-full top-1/2 -translate-y-1/2 ml-2",
      },
    },
    defaultVariants: {
      placement: "top",
    },
  }
)

const arrowVariants = cva(
  "absolute w-2 h-2 bg-foreground rotate-45",
  {
    variants: {
      placement: {
        top: "top-full left-1/2 -translate-x-1/2 -mt-1",
        bottom: "bottom-full left-1/2 -translate-x-1/2 -mb-1",
        left: "left-full top-1/2 -translate-y-1/2 -ml-1",
        right: "right-full top-1/2 -translate-y-1/2 -mr-1",
      },
    },
    defaultVariants: {
      placement: "top",
    },
  }
)

export interface TooltipProps extends VariantProps<typeof tooltipVariants> {
  children: ReactNode
  title: ReactNode
  arrow?: boolean
  enterDelay?: number
  leaveDelay?: number
  className?: string
}

export const Tooltip = ({
  children,
  title,
  placement = "top",
  arrow = true,
  enterDelay = 100,
  leaveDelay = 0,
  className,
}: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const enterTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const leaveTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnter = () => {
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current)
      leaveTimeoutRef.current = null
    }
    enterTimeoutRef.current = setTimeout(() => {
      setIsVisible(true)
    }, enterDelay)
  }

  const handleMouseLeave = () => {
    if (enterTimeoutRef.current) {
      clearTimeout(enterTimeoutRef.current)
      enterTimeoutRef.current = null
    }
    leaveTimeoutRef.current = setTimeout(() => {
      setIsVisible(false)
    }, leaveDelay)
  }

  const handleFocus = () => {
    setIsVisible(true)
  }

  const handleBlur = () => {
    setIsVisible(false)
  }

  useEffect(() => {
    return () => {
      if (enterTimeoutRef.current) clearTimeout(enterTimeoutRef.current)
      if (leaveTimeoutRef.current) clearTimeout(leaveTimeoutRef.current)
    }
  }, [])

  if (!title) {
    return <>{children}</>
  }

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      {children}
      
      {isVisible && (
        <span 
          role="tooltip"
          className={cn(tooltipVariants({ placement }), className)}
        >
          {title}
          {arrow && <span className={cn(arrowVariants({ placement }))} />}
        </span>
      )}
    </span>
  )
}

Tooltip.displayName = "Tooltip"
