"use client"

import { cva, type VariantProps } from "class-variance-authority"
import { type HTMLAttributes } from "react"
import { cn } from "@/shared/utils"

const spinnerVariants = cva(
  "inline-block rounded-full animate-spin",
  {
    variants: {
      size: {
        xs: "h-4 w-4",
        sm: "h-5 w-5",
        default: "h-8 w-8",
        lg: "h-12 w-12",
        xl: "h-16 w-16",
      },
      variant: {
        default: "border-2 border-primary/30 border-t-primary",
        secondary: "border-2 border-secondary/30 border-t-secondary",
        white: "border-2 border-white/30 border-t-white",
        dots: "", // Different rendering
      },
      thickness: {
        thin: "border",
        default: "border-2",
        thick: "border-4",
      },
    },
    compoundVariants: [
      { size: "xs", thickness: "thick", className: "border-2" },
      { size: "sm", thickness: "thick", className: "border-2" },
    ],
    defaultVariants: {
      size: "default",
      variant: "default",
      thickness: "default",
    },
  }
)

const containerVariants = cva(
  "flex items-center justify-center",
  {
    variants: {
      fullscreen: {
        true: "fixed inset-0 bg-background/80 backdrop-blur-sm z-50",
        false: "",
      },
      centered: {
        true: "min-h-[200px]",
        false: "",
      },
    },
    defaultVariants: {
      fullscreen: false,
      centered: false,
    },
  }
)

// Dots loading animation
const DotsSpinner = ({ size = "default", color = "primary" }: { size?: string; color?: string }) => {
  const dotSizes: Record<string, string> = {
    xs: "h-1.5 w-1.5",
    sm: "h-2 w-2",
    default: "h-3 w-3",
    lg: "h-4 w-4",
    xl: "h-5 w-5",
  }

  const gapSizes: Record<string, string> = {
    xs: "gap-1",
    sm: "gap-1.5",
    default: "gap-2",
    lg: "gap-3",
    xl: "gap-4",
  }

  return (
    <div className={cn("flex items-center", gapSizes[size])}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={cn(
            dotSizes[size],
            "rounded-full bg-primary animate-pulse",
            color === "secondary" && "bg-secondary",
            color === "white" && "bg-white"
          )}
          style={{
            animationDelay: `${i * 150}ms`,
            animationDuration: "600ms",
          }}
        />
      ))}
    </div>
  )
}

// Linear progress bar
const LinearProgress = ({ 
  value, 
  color = "primary",
  indeterminate = false,
}: { 
  value?: number; 
  color?: "primary" | "secondary" | "success" | "warning" | "destructive";
  indeterminate?: boolean;
}) => {
  const colorClasses: Record<string, string> = {
    primary: "bg-primary",
    secondary: "bg-secondary",
    success: "bg-success",
    warning: "bg-warning",
    destructive: "bg-destructive",
  }

  return (
    <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
      <div 
        className={cn(
          "h-full rounded-full transition-all duration-300",
          colorClasses[color],
          indeterminate && "animate-[indeterminate_1.5s_ease-in-out_infinite] w-1/3"
        )}
        style={!indeterminate ? { width: `${Math.min(100, Math.max(0, value || 0))}%` } : undefined}
      />
      <style jsx>{`
        @keyframes indeterminate {
          0% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(200%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  )
}

export interface LoadingProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof spinnerVariants> {
  centered?: boolean
  fullscreen?: boolean
  label?: string
  showLabel?: boolean
}

export const Loading = ({ 
  className, 
  size = "default", 
  variant = "default",
  thickness,
  centered = false, 
  fullscreen = false,
  label = "Loading...",
  showLabel = false,
  ...props 
}: LoadingProps) => {
  const spinner = variant === "dots" ? (
    <DotsSpinner size={size || "default"} />
  ) : (
    <div
      className={cn(spinnerVariants({ size, variant, thickness }), className)}
      role="status"
      aria-label={label}
      {...props}
    />
  )

  const content = (
    <div className="flex flex-col items-center gap-3">
      {spinner}
      {showLabel && (
        <p className="text-sm text-muted-foreground animate-pulse">{label}</p>
      )}
      <span className="sr-only">{label}</span>
    </div>
  )

  if (fullscreen || centered) {
    return (
      <div className={cn(containerVariants({ fullscreen, centered }))}>
        {content}
      </div>
    )
  }

  return content
}

export { LinearProgress, DotsSpinner }
