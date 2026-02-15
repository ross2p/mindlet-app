"use client"

import { cva, type VariantProps } from "class-variance-authority"
import { type HTMLAttributes, type ReactNode } from "react"
import { cn } from "@/shared/utils"

const badgeWrapperVariants = cva(
  "relative inline-flex shrink-0",
  {
    variants: {},
    defaultVariants: {},
  }
)

const badgeVariants = cva(
  [
    "absolute flex items-center justify-center",
    "font-medium text-white",
    "transition-all duration-200 ease-out",
    "animate-scale-in",
  ].join(" "),
  {
    variants: {
      variant: {
        standard: "min-w-[20px] h-5 px-1.5 text-xs rounded-full",
        dot: "w-2.5 h-2.5 rounded-full",
      },
      color: {
        primary: "bg-primary",
        secondary: "bg-secondary",
        success: "bg-success",
        warning: "bg-warning",
        destructive: "bg-destructive",
      },
      position: {
        "top-right": "top-0 right-0 translate-x-1/2 -translate-y-1/2",
        "top-left": "top-0 left-0 -translate-x-1/2 -translate-y-1/2",
        "bottom-right": "bottom-0 right-0 translate-x-1/2 translate-y-1/2",
        "bottom-left": "bottom-0 left-0 -translate-x-1/2 translate-y-1/2",
      },
      invisible: {
        true: "scale-0 opacity-0",
        false: "",
      },
    },
    defaultVariants: {
      variant: "standard",
      color: "primary",
      position: "top-right",
      invisible: false,
    },
  }
)

export interface BadgeProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'color' | 'content'>, VariantProps<typeof badgeVariants> {
  content?: ReactNode
  max?: number
  showZero?: boolean
  children: ReactNode
}

export const Badge = ({
  className,
  children,
  content,
  variant = "standard",
  color = "primary",
  position = "top-right",
  max = 99,
  showZero = false,
  ...props
}: BadgeProps) => {
  const isNumber = typeof content === "number"
  const displayContent = isNumber && content > max ? `${max}+` : content
  const invisible = variant === "standard" && (content === undefined || (content === 0 && !showZero))

  return (
    <span className={cn(badgeWrapperVariants(), className)}>
      {children}
      <span
        className={cn(badgeVariants({ variant, color, position, invisible }))}
        {...props}
      >
        {variant === "standard" && displayContent}
      </span>
    </span>
  )
}

Badge.displayName = "Badge"
