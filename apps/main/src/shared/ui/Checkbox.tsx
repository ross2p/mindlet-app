"use client"

import { cva, type VariantProps } from "class-variance-authority"
import { forwardRef, type InputHTMLAttributes, useState } from "react"
import { cn } from "@/shared/utils"

const checkboxContainerVariants = cva(
  "inline-flex items-center gap-2.5 cursor-pointer group",
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

const checkboxWrapperVariants = cva(
  [
    "relative inline-flex items-center justify-center",
    "rounded-sm transition-all duration-200",
  ].join(" "),
  {
    variants: {
      size: {
        default: "h-10 w-10",
        sm: "h-8 w-8",
        lg: "h-12 w-12",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

const checkboxInputVariants = cva(
  [
    "peer absolute opacity-0 w-full h-full cursor-pointer",
    "disabled:cursor-not-allowed",
  ].join(" "),
  {
    variants: {
      size: {
        default: "",
        sm: "",
        lg: "",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

const checkboxVisualVariants = cva(
  [
    "relative flex items-center justify-center rounded-sm border-2 transition-all duration-200 ease-out",
    "border-muted-foreground",
    "group-hover:border-primary",
    "peer-focus-visible:ring-2 peer-focus-visible:ring-primary/30 peer-focus-visible:ring-offset-2",
    "peer-checked:bg-primary peer-checked:border-primary",
    "peer-disabled:opacity-60 peer-disabled:cursor-not-allowed",
  ].join(" "),
  {
    variants: {
      size: {
        default: "h-5 w-5",
        sm: "h-4 w-4",
        lg: "h-6 w-6",
      },
      colorScheme: {
        primary: "peer-checked:bg-primary peer-checked:border-primary",
        secondary: "peer-checked:bg-secondary peer-checked:border-secondary",
        success: "peer-checked:bg-success peer-checked:border-success",
        warning: "peer-checked:bg-warning peer-checked:border-warning",
        destructive: "peer-checked:bg-destructive peer-checked:border-destructive",
      },
    },
    defaultVariants: {
      size: "default",
      colorScheme: "primary",
    },
  }
)

const checkIconVariants = cva(
  [
    "stroke-white stroke-[3] fill-none",
    "opacity-0 scale-0 transition-all duration-200 ease-out",
    "peer-checked:opacity-100 peer-checked:scale-100",
  ].join(" "),
  {
    variants: {
      size: {
        default: "w-3 h-3",
        sm: "w-2.5 h-2.5",
        lg: "w-4 h-4",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

const rippleVariants = cva(
  [
    "absolute inset-0 rounded-full transition-all duration-200",
    "bg-primary/0 group-hover:bg-primary/10",
    "group-active:bg-primary/20",
  ].join(" "),
  {
    variants: {
      colorScheme: {
        primary: "group-hover:bg-primary/10 group-active:bg-primary/20",
        secondary: "group-hover:bg-secondary/10 group-active:bg-secondary/20",
        success: "group-hover:bg-success/10 group-active:bg-success/20",
        warning: "group-hover:bg-warning/10 group-active:bg-warning/20",
        destructive: "group-hover:bg-destructive/10 group-active:bg-destructive/20",
      },
    },
    defaultVariants: {
      colorScheme: "primary",
    },
  }
)

const labelVariants = cva(
  "select-none text-foreground transition-colors duration-200",
  {
    variants: {
      size: {
        default: "text-sm",
        sm: "text-xs",
        lg: "text-base",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'color'> {
  label?: string
  labelPosition?: "start" | "end"
  size?: "default" | "sm" | "lg"
  colorScheme?: "primary" | "secondary" | "success" | "warning" | "destructive"
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, size = "default", colorScheme = "primary", label, labelPosition = "end", disabled, ...props }, ref) => {
    const [isRippling, setIsRippling] = useState(false)

    const handleClick = () => {
      setIsRippling(true)
      setTimeout(() => setIsRippling(false), 300)
    }

    const labelElement = label && (
      <span className={cn(labelVariants({ size }))}>
        {label}
      </span>
    )

    return (
      <label 
        className={cn(checkboxContainerVariants({ disabled: !!disabled }), className)}
        onClick={handleClick}
      >
        {labelPosition === "start" && labelElement}
        
        <span className={cn(checkboxWrapperVariants({ size }))}>
          {/* Ripple background */}
          <span className={cn(rippleVariants({ colorScheme }))} />
          
          <input
            ref={ref}
            type="checkbox"
            className={cn(checkboxInputVariants({ size }))}
            disabled={disabled}
            {...props}
          />
          
          {/* Visual checkbox */}
          <span className={cn(checkboxVisualVariants({ size, colorScheme }))}>
            <svg 
              viewBox="0 0 12 10" 
              className={cn(checkIconVariants({ size }))}
            >
              <polyline 
                points="1.5 5.5 4.5 8.5 10.5 1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </span>
        
        {labelPosition === "end" && labelElement}
      </label>
    )
  }
)

Checkbox.displayName = "Checkbox"
