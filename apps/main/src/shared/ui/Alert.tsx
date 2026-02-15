"use client"

import { cva, type VariantProps } from "class-variance-authority"
import { type HTMLAttributes, type ReactNode } from "react"
import { cn } from "@/shared/utils"

const alertVariants = cva(
  [
    "relative flex items-start gap-3 p-4 rounded-lg",
    "transition-all duration-200 animate-slide-up",
  ].join(" "),
  {
    variants: {
      severity: {
        info: "",
        success: "",
        warning: "",
        error: "",
      },
      variant: {
        standard: "",
        filled: "",
        outlined: "bg-transparent border",
      },
    },
    compoundVariants: [
      // Standard variants
      { variant: "standard", severity: "info", className: "bg-primary/10 text-primary" },
      { variant: "standard", severity: "success", className: "bg-success/10 text-success" },
      { variant: "standard", severity: "warning", className: "bg-warning/10 text-warning" },
      { variant: "standard", severity: "error", className: "bg-destructive/10 text-destructive" },
      
      // Filled variants
      { variant: "filled", severity: "info", className: "bg-primary text-primary-foreground" },
      { variant: "filled", severity: "success", className: "bg-success text-success-foreground" },
      { variant: "filled", severity: "warning", className: "bg-warning text-warning-foreground" },
      { variant: "filled", severity: "error", className: "bg-destructive text-destructive-foreground" },
      
      // Outlined variants
      { variant: "outlined", severity: "info", className: "border-primary text-primary" },
      { variant: "outlined", severity: "success", className: "border-success text-success" },
      { variant: "outlined", severity: "warning", className: "border-warning text-warning" },
      { variant: "outlined", severity: "error", className: "border-destructive text-destructive" },
    ],
    defaultVariants: {
      severity: "info",
      variant: "standard",
    },
  }
)

const iconContainerVariants = cva(
  "shrink-0 mt-0.5",
  {
    variants: {
      severity: {
        info: "",
        success: "",
        warning: "",
        error: "",
      },
    },
    defaultVariants: {
      severity: "info",
    },
  }
)

// Default icons for each severity
const defaultIcons: Record<string, ReactNode> = {
  info: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
    </svg>
  ),
  success: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
    </svg>
  ),
  warning: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
    </svg>
  ),
  error: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
    </svg>
  ),
}

export interface AlertProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof alertVariants> {
  title?: string
  icon?: ReactNode
  action?: ReactNode
  onClose?: () => void
}

export const Alert = ({
  className,
  children,
  title,
  icon,
  action,
  onClose,
  severity = "info",
  variant = "standard",
  ...props
}: AlertProps) => {
  const displayIcon = icon !== undefined ? icon : defaultIcons[severity || "info"]

  return (
    <div
      role="alert"
      className={cn(alertVariants({ severity, variant }), className)}
      {...props}
    >
      {displayIcon && (
        <span className={cn(iconContainerVariants({ severity }))}>
          {displayIcon}
        </span>
      )}
      
      <div className="flex-1 min-w-0">
        {title && (
          <div className="font-medium mb-0.5">{title}</div>
        )}
        <div className="text-sm opacity-90">{children}</div>
      </div>
      
      {(action || onClose) && (
        <div className="flex items-center gap-2 shrink-0">
          {action}
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded-full hover:bg-black/10 transition-colors"
              aria-label="Close alert"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              </svg>
            </button>
          )}
        </div>
      )}
    </div>
  )
}

Alert.displayName = "Alert"
