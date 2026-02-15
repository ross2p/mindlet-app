"use client"

import { cva, type VariantProps } from "class-variance-authority"
import { forwardRef, type InputHTMLAttributes } from "react"
import { cn } from "@/shared/utils"

const switchContainerVariants = cva(
  "inline-flex items-center gap-3 cursor-pointer group",
  {
    variants: {
      disabled: {
        true: "cursor-not-allowed opacity-60",
        false: "",
      },
    },
    defaultVariants: {
      disabled: false,
    },
  }
)

const switchTrackVariants = cva(
  [
    "relative inline-flex items-center shrink-0 rounded-full",
    "transition-all duration-200 ease-out",
    "bg-muted-foreground/30",
    "peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2",
    "peer-disabled:opacity-60 peer-disabled:cursor-not-allowed",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "h-5 w-9",
        default: "h-6 w-11",
        lg: "h-7 w-14",
      },
      colorScheme: {
        primary: "peer-checked:bg-primary peer-focus-visible:ring-primary/30",
        secondary: "peer-checked:bg-secondary peer-focus-visible:ring-secondary/30",
        success: "peer-checked:bg-success peer-focus-visible:ring-success/30",
        warning: "peer-checked:bg-warning peer-focus-visible:ring-warning/30",
        destructive: "peer-checked:bg-destructive peer-focus-visible:ring-destructive/30",
      },
    },
    defaultVariants: {
      size: "default",
      colorScheme: "primary",
    },
  }
)

const switchThumbVariants = cva(
  [
    "absolute bg-white rounded-full shadow-md",
    "transition-all duration-200 ease-out",
    "peer-checked:translate-x-full",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "h-4 w-4 left-0.5 peer-checked:left-[calc(100%-18px)]",
        default: "h-5 w-5 left-0.5 peer-checked:left-[calc(100%-22px)]",
        lg: "h-6 w-6 left-0.5 peer-checked:left-[calc(100%-26px)]",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

const labelVariants = cva(
  "select-none text-foreground transition-colors duration-200",
  {
    variants: {
      size: {
        sm: "text-xs",
        default: "text-sm",
        lg: "text-base",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  label?: string
  labelPosition?: "start" | "end"
  size?: "sm" | "default" | "lg"
  colorScheme?: "primary" | "secondary" | "success" | "warning" | "destructive"
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ 
    className, 
    size = "default", 
    colorScheme = "primary", 
    label, 
    labelPosition = "end", 
    disabled,
    ...props 
  }, ref) => {
    const labelElement = label && (
      <span className={cn(labelVariants({ size }))}>
        {label}
      </span>
    )

    return (
      <label className={cn(switchContainerVariants({ disabled: !!disabled }), className)}>
        {labelPosition === "start" && labelElement}
        
        <span className="relative inline-flex">
          <input
            ref={ref}
            type="checkbox"
            role="switch"
            className="peer sr-only"
            disabled={disabled}
            {...props}
          />
          
          <span className={cn(switchTrackVariants({ size, colorScheme }))}>
            <span className={cn(switchThumbVariants({ size }))} />
          </span>
        </span>
        
        {labelPosition === "end" && labelElement}
      </label>
    )
  }
)

Switch.displayName = "Switch"
