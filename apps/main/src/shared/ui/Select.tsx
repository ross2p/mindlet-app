"use client"

import { cva, type VariantProps } from "class-variance-authority"
import { forwardRef, type SelectHTMLAttributes, useState, useId, type ReactNode } from "react"
import { cn } from "@/shared/utils"

const selectContainerVariants = cva(
  "relative w-full group",
  {
    variants: {
      variant: {
        default: "",
        filled: "",
        outlined: "",
      },
    },
    defaultVariants: {
      variant: "outlined",
    },
  }
)

const selectVariants = cva(
  [
    "peer w-full bg-transparent text-foreground transition-all duration-200 ease-out",
    "outline-none appearance-none cursor-pointer",
    "disabled:cursor-not-allowed disabled:opacity-60",
  ].join(" "),
  {
    variants: {
      variant: {
        default: [
          "border-b-2 border-border",
          "focus:border-primary",
          "px-0 pt-6 pb-2 pr-8",
        ].join(" "),
        filled: [
          "bg-muted/50 rounded-t-lg border-b-2 border-border",
          "hover:bg-muted/80",
          "focus:border-primary focus:bg-muted/60",
          "px-3 pt-6 pb-2 pr-10",
        ].join(" "),
        outlined: [
          "border-2 border-border rounded-lg bg-transparent",
          "hover:border-foreground/50",
          "focus:border-primary focus:border-2",
          "px-3.5 pt-4 pb-2 pr-10",
        ].join(" "),
      },
      size: {
        default: "text-base h-14",
        sm: "text-sm h-12",
        lg: "text-lg h-16",
      },
      isError: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        variant: "default",
        isError: true,
        className: "border-destructive focus:border-destructive",
      },
      {
        variant: "filled",
        isError: true,
        className: "border-destructive focus:border-destructive bg-destructive/5",
      },
      {
        isError: true,
        className: "border-destructive hover:border-destructive focus:border-destructive",
      },
    ],
    defaultVariants: {
      variant: "outlined",
      size: "default",
      isError: false,
    },
  }
)

const labelVariants = cva(
  [
    "absolute left-0 text-muted-foreground pointer-events-none",
    "transition-all duration-200 ease-out origin-left",
    "peer-focus:text-primary peer-focus:scale-75",
  ].join(" "),
  {
    variants: {
      variant: {
        default: [
          "top-1/2 -translate-y-1/2 px-0",
          "peer-focus:-translate-y-[140%]",
        ].join(" "),
        filled: [
          "top-1/2 -translate-y-1/2 px-3",
          "peer-focus:-translate-y-[85%]",
        ].join(" "),
        outlined: [
          "top-1/2 -translate-y-1/2 px-1 mx-2.5",
          "peer-focus:-translate-y-[160%] peer-focus:bg-background peer-focus:px-1",
        ].join(" "),
      },
      hasValue: {
        true: "",
        false: "",
      },
      isError: {
        true: "text-destructive peer-focus:text-destructive",
        false: "",
      },
    },
    compoundVariants: [
      {
        variant: "default",
        hasValue: true,
        className: "scale-75 -translate-y-[140%]",
      },
      {
        variant: "filled",
        hasValue: true,
        className: "scale-75 -translate-y-[85%]",
      },
      {
        variant: "outlined",
        hasValue: true,
        className: "scale-75 -translate-y-[160%] bg-background px-1",
      },
    ],
    defaultVariants: {
      variant: "outlined",
      hasValue: false,
      isError: false,
    },
  }
)

const helperTextVariants = cva(
  "text-xs mt-1.5 px-3.5 transition-all duration-200 animate-fade-in",
  {
    variants: {
      variant: {
        default: "text-muted-foreground",
        error: "text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const chevronVariants = cva(
  [
    "absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none",
    "transition-transform duration-200 text-muted-foreground",
    "peer-focus:text-primary peer-focus:rotate-180",
  ].join(" "),
  {
    variants: {
      isError: {
        true: "text-destructive",
        false: "",
      },
    },
    defaultVariants: {
      isError: false,
    },
  }
)

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string
  helperText?: string
  error?: boolean
  variant?: "default" | "filled" | "outlined"
  size?: VariantProps<typeof selectVariants>['size']
  options: SelectOption[]
  placeholder?: string
  startAdornment?: ReactNode
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ 
    className, 
    label, 
    helperText, 
    error = false, 
    variant = "outlined", 
    size = "default",
    options,
    placeholder,
    startAdornment,
    value,
    defaultValue,
    id: propId,
    ...props 
  }, ref) => {
    const generatedId = useId()
    const id = propId || generatedId
    const [internalValue, setInternalValue] = useState(defaultValue || "")
    const hasValue = Boolean(value !== undefined ? value : internalValue)
    
    return (
      <div className="w-full">
        <div className={cn(selectContainerVariants({ variant }), error && "animate-shake")}>
          {startAdornment && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground z-10">
              {startAdornment}
            </div>
          )}
          
          <select
            ref={ref}
            id={id}
            value={value}
            defaultValue={defaultValue}
            className={cn(
              selectVariants({ variant, size, isError: error }),
              startAdornment && "pl-10",
              className
            )}
            aria-invalid={error}
            aria-describedby={helperText ? `${id}-helper` : undefined}
            onChange={(e) => {
              setInternalValue(e.target.value)
              props.onChange?.(e)
            }}
            {...props}
          >
            {placeholder && (
              <option value="" disabled hidden>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option 
                key={option.value} 
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>
          
          {label && (
            <label 
              htmlFor={id}
              className={cn(labelVariants({ variant, hasValue, isError: error }))}
            >
              {label}
            </label>
          )}
          
          {/* Chevron icon */}
          <svg 
            className={cn(chevronVariants({ isError: error }))}
            width="20" 
            height="20" 
            viewBox="0 0 20 20" 
            fill="none"
          >
            <path 
              d="M5 7.5L10 12.5L15 7.5" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </div>
        
        {helperText && (
          <p 
            id={`${id}-helper`}
            className={cn(helperTextVariants({ variant: error ? "error" : "default" }))}
          >
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

Select.displayName = "Select"
