"use client"

import { cva, type VariantProps } from "class-variance-authority"
import { forwardRef, type ButtonHTMLAttributes, type ReactNode, useState } from "react"
import { cn } from "@/shared/utils"

const iconButtonVariants = cva(
  [
    "relative inline-flex items-center justify-center",
    "rounded-full",
    "transition-all duration-200 ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    "active:scale-95",
    "overflow-hidden",
  ].join(" "),
  {
    variants: {
      size: {
        xs: "h-7 w-7",
        sm: "h-8 w-8",
        default: "h-10 w-10",
        lg: "h-12 w-12",
      },
      color: {
        default: [
          "text-foreground",
          "hover:bg-muted",
          "focus-visible:ring-foreground/30",
        ].join(" "),
        primary: [
          "text-primary",
          "hover:bg-primary/10",
          "focus-visible:ring-primary/30",
        ].join(" "),
        secondary: [
          "text-secondary",
          "hover:bg-secondary/10",
          "focus-visible:ring-secondary/30",
        ].join(" "),
        success: [
          "text-success",
          "hover:bg-success/10",
          "focus-visible:ring-success/30",
        ].join(" "),
        warning: [
          "text-warning",
          "hover:bg-warning/10",
          "focus-visible:ring-warning/30",
        ].join(" "),
        destructive: [
          "text-destructive",
          "hover:bg-destructive/10",
          "focus-visible:ring-destructive/30",
        ].join(" "),
      },
      variant: {
        default: "",
        contained: "",
        outlined: "border",
      },
    },
    compoundVariants: [
      // Contained variants
      { variant: "contained", color: "default", className: "bg-muted text-foreground hover:bg-muted/80" },
      { variant: "contained", color: "primary", className: "bg-primary text-primary-foreground hover:bg-primary-dark" },
      { variant: "contained", color: "secondary", className: "bg-secondary text-secondary-foreground hover:bg-secondary-dark" },
      { variant: "contained", color: "success", className: "bg-success text-success-foreground hover:bg-success/90" },
      { variant: "contained", color: "warning", className: "bg-warning text-warning-foreground hover:bg-warning/90" },
      { variant: "contained", color: "destructive", className: "bg-destructive text-destructive-foreground hover:bg-destructive/90" },
      
      // Outlined variants
      { variant: "outlined", color: "default", className: "border-border hover:bg-muted" },
      { variant: "outlined", color: "primary", className: "border-primary hover:bg-primary/10" },
      { variant: "outlined", color: "secondary", className: "border-secondary hover:bg-secondary/10" },
      { variant: "outlined", color: "success", className: "border-success hover:bg-success/10" },
      { variant: "outlined", color: "warning", className: "border-warning hover:bg-warning/10" },
      { variant: "outlined", color: "destructive", className: "border-destructive hover:bg-destructive/10" },
    ],
    defaultVariants: {
      size: "default",
      color: "default",
      variant: "default",
    },
  }
)

const iconSizeVariants = cva(
  "",
  {
    variants: {
      size: {
        xs: "[&_svg]:w-4 [&_svg]:h-4",
        sm: "[&_svg]:w-5 [&_svg]:h-5",
        default: "[&_svg]:w-6 [&_svg]:h-6",
        lg: "[&_svg]:w-7 [&_svg]:h-7",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

export interface IconButtonProps 
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'>,
    VariantProps<typeof iconButtonVariants> {
  children: ReactNode
  "aria-label": string
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ 
    className, 
    size = "default", 
    color = "default",
    variant = "default",
    children,
    onClick,
    ...props 
  }, ref) => {
    const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([])

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      const rect = e.currentTarget.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const id = Date.now()
      
      setRipples(prev => [...prev, { x, y, id }])
      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== id))
      }, 600)
      
      onClick?.(e)
    }

    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          iconButtonVariants({ size, color, variant }),
          iconSizeVariants({ size }),
          className
        )}
        onClick={handleClick}
        {...props}
      >
        {children}
        
        {/* Ripple effects */}
        {ripples.map(({ x, y, id }) => (
          <span
            key={id}
            className="absolute pointer-events-none bg-current/20 rounded-full animate-[ripple_600ms_ease-out_forwards]"
            style={{
              left: x,
              top: y,
              width: 0,
              height: 0,
              transform: 'translate(-50%, -50%)',
            }}
          />
        ))}
      </button>
    )
  }
)

IconButton.displayName = "IconButton"
