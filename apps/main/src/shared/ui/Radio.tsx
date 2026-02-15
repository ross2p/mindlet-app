"use client"

import { cva, type VariantProps } from "class-variance-authority"
import { forwardRef, type InputHTMLAttributes, type ReactNode, createContext, useContext } from "react"
import { cn } from "@/shared/utils"

// Radio Group Context
interface RadioGroupContextValue {
  name?: string
  value?: string
  onChange?: (value: string) => void
  size?: "sm" | "default" | "lg"
  colorScheme?: "primary" | "secondary" | "success" | "warning" | "destructive"
}

const RadioGroupContext = createContext<RadioGroupContextValue>({})

const useRadioGroup = () => useContext(RadioGroupContext)

// Radio Group Component
const radioGroupVariants = cva(
  "flex",
  {
    variants: {
      orientation: {
        horizontal: "flex-row gap-4",
        vertical: "flex-col gap-2",
      },
    },
    defaultVariants: {
      orientation: "vertical",
    },
  }
)

export interface RadioGroupProps {
  children: ReactNode
  name?: string
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  orientation?: "horizontal" | "vertical"
  size?: "sm" | "default" | "lg"
  colorScheme?: "primary" | "secondary" | "success" | "warning" | "destructive"
  className?: string
}

export const RadioGroup = ({
  children,
  name,
  value,
  onChange,
  orientation = "vertical",
  size = "default",
  colorScheme = "primary",
  className,
}: RadioGroupProps) => {
  return (
    <RadioGroupContext.Provider value={{ name, value, onChange, size, colorScheme }}>
      <div 
        role="radiogroup"
        className={cn(radioGroupVariants({ orientation }), className)}
      >
        {children}
      </div>
    </RadioGroupContext.Provider>
  )
}

// Radio Button Component
const radioContainerVariants = cva(
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

const radioWrapperVariants = cva(
  [
    "relative inline-flex items-center justify-center",
    "rounded-full transition-all duration-200",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "h-8 w-8",
        default: "h-10 w-10",
        lg: "h-12 w-12",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

const radioVisualVariants = cva(
  [
    "relative flex items-center justify-center rounded-full border-2 transition-all duration-200 ease-out",
    "border-muted-foreground",
    "group-hover:border-primary",
    "peer-focus-visible:ring-2 peer-focus-visible:ring-primary/30 peer-focus-visible:ring-offset-2",
    "peer-disabled:opacity-60 peer-disabled:cursor-not-allowed",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "h-4 w-4",
        default: "h-5 w-5",
        lg: "h-6 w-6",
      },
      colorScheme: {
        primary: "peer-checked:border-primary",
        secondary: "peer-checked:border-secondary",
        success: "peer-checked:border-success",
        warning: "peer-checked:border-warning",
        destructive: "peer-checked:border-destructive",
      },
    },
    defaultVariants: {
      size: "default",
      colorScheme: "primary",
    },
  }
)

const radioDotVariants = cva(
  [
    "absolute rounded-full",
    "opacity-0 scale-0 transition-all duration-200 ease-out",
    "peer-checked:opacity-100 peer-checked:scale-100",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "w-2 h-2",
        default: "w-2.5 h-2.5",
        lg: "w-3 h-3",
      },
      colorScheme: {
        primary: "bg-primary",
        secondary: "bg-secondary",
        success: "bg-success",
        warning: "bg-warning",
        destructive: "bg-destructive",
      },
    },
    defaultVariants: {
      size: "default",
      colorScheme: "primary",
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

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  label?: string
  labelPosition?: "start" | "end"
  size?: "sm" | "default" | "lg"
  colorScheme?: "primary" | "secondary" | "success" | "warning" | "destructive"
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ 
    className, 
    size: propSize, 
    colorScheme: propColorScheme, 
    label, 
    labelPosition = "end", 
    disabled,
    name: propName,
    value,
    checked,
    onChange,
    ...props 
  }, ref) => {
    const group = useRadioGroup()
    
    const size = propSize || group.size || "default"
    const colorScheme = propColorScheme || group.colorScheme || "primary"
    const name = propName || group.name
    const isChecked = group.value !== undefined ? group.value === value : checked
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (group.onChange && value) {
        group.onChange(value as string)
      }
      onChange?.(e)
    }

    const labelElement = label && (
      <span className={cn(labelVariants({ size }))}>
        {label}
      </span>
    )

    return (
      <label className={cn(radioContainerVariants({ disabled: !!disabled }), className)}>
        {labelPosition === "start" && labelElement}
        
        <span className={cn(radioWrapperVariants({ size }))}>
          {/* Ripple background */}
          <span className={cn(rippleVariants({ colorScheme }))} />
          
          <input
            ref={ref}
            type="radio"
            name={name}
            value={value}
            checked={isChecked}
            className="peer sr-only"
            disabled={disabled}
            onChange={handleChange}
            {...props}
          />
          
          {/* Visual radio */}
          <span className={cn(radioVisualVariants({ size, colorScheme }))}>
            <span className={cn(radioDotVariants({ size, colorScheme }))} />
          </span>
        </span>
        
        {labelPosition === "end" && labelElement}
      </label>
    )
  }
)

Radio.displayName = "Radio"
RadioGroup.displayName = "RadioGroup"
