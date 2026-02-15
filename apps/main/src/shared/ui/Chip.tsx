"use client"

import { cva, type VariantProps } from "class-variance-authority"
import { type HTMLAttributes, type ReactNode, type MouseEvent } from "react"
import { cn } from "@/shared/utils"

const chipVariants = cva(
  [
    "inline-flex items-center justify-center gap-1.5",
    "font-medium rounded-full",
    "transition-all duration-200 ease-out",
    "select-none",
  ].join(" "),
  {
    variants: {
      variant: {
        filled: "",
        outlined: "bg-transparent border",
      },
      color: {
        default: "",
        primary: "",
        secondary: "",
        success: "",
        warning: "",
        destructive: "",
      },
      size: {
        sm: "h-6 px-2 text-xs gap-1",
        default: "h-8 px-3 text-sm",
        lg: "h-10 px-4 text-base gap-2",
      },
      clickable: {
        true: "cursor-pointer",
        false: "",
      },
    },
    compoundVariants: [
      // Filled variants
      { variant: "filled", color: "default", className: "bg-muted text-foreground hover:bg-muted/80" },
      { variant: "filled", color: "primary", className: "bg-primary text-primary-foreground hover:bg-primary-dark" },
      { variant: "filled", color: "secondary", className: "bg-secondary text-secondary-foreground hover:bg-secondary-dark" },
      { variant: "filled", color: "success", className: "bg-success text-success-foreground hover:bg-success/90" },
      { variant: "filled", color: "warning", className: "bg-warning text-warning-foreground hover:bg-warning/90" },
      { variant: "filled", color: "destructive", className: "bg-destructive text-destructive-foreground hover:bg-destructive/90" },
      
      // Outlined variants
      { variant: "outlined", color: "default", className: "border-border text-foreground hover:bg-muted" },
      { variant: "outlined", color: "primary", className: "border-primary text-primary hover:bg-primary/10" },
      { variant: "outlined", color: "secondary", className: "border-secondary text-secondary hover:bg-secondary/10" },
      { variant: "outlined", color: "success", className: "border-success text-success hover:bg-success/10" },
      { variant: "outlined", color: "warning", className: "border-warning text-warning hover:bg-warning/10" },
      { variant: "outlined", color: "destructive", className: "border-destructive text-destructive hover:bg-destructive/10" },
      
      // Clickable hover effects
      { clickable: true, className: "active:scale-95" },
    ],
    defaultVariants: {
      variant: "filled",
      color: "default",
      size: "default",
      clickable: false,
    },
  }
)

const deleteButtonVariants = cva(
  [
    "inline-flex items-center justify-center rounded-full",
    "transition-all duration-150",
    "hover:bg-black/20 active:scale-90",
    "-mr-0.5",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "h-4 w-4",
        default: "h-5 w-5",
        lg: "h-6 w-6",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

export interface ChipProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'color'>, VariantProps<typeof chipVariants> {
  label: string
  icon?: ReactNode
  deleteIcon?: ReactNode
  onDelete?: (e: MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean
}

export const Chip = ({
  className,
  label,
  icon,
  deleteIcon,
  onDelete,
  variant = "filled",
  color = "default",
  size = "default",
  disabled = false,
  onClick,
  ...props
}: ChipProps) => {
  const isClickable = Boolean(onClick) && !disabled

  return (
    <span
      role={isClickable ? "button" : undefined}
      tabIndex={isClickable ? 0 : undefined}
      className={cn(
        chipVariants({ variant, color, size, clickable: isClickable }),
        disabled && "opacity-50 pointer-events-none",
        className
      )}
      onClick={!disabled ? onClick : undefined}
      onKeyDown={(e) => {
        if (isClickable && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault()
          onClick?.(e as unknown as MouseEvent<HTMLSpanElement>)
        }
      }}
      {...props}
    >
      {icon && (
        <span className="inline-flex shrink-0 -ml-0.5">
          {icon}
        </span>
      )}
      
      <span className="truncate">{label}</span>
      
      {onDelete && (
        <button
          type="button"
          className={cn(deleteButtonVariants({ size }))}
          onClick={(e) => {
            e.stopPropagation()
            if (!disabled) onDelete(e)
          }}
          disabled={disabled}
          aria-label="Remove"
        >
          {deleteIcon || (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-[70%] h-[70%]">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          )}
        </button>
      )}
    </span>
  )
}

Chip.displayName = "Chip"
