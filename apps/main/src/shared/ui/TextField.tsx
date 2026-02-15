"use client"

import { cva, type VariantProps } from "class-variance-authority"
import { forwardRef, type TextareaHTMLAttributes, useState, useId, useEffect, useRef } from "react"
import { cn } from "@/shared/utils"

const textFieldContainerVariants = cva(
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

const textFieldVariants = cva(
  [
    "peer w-full bg-transparent text-foreground transition-all duration-200 ease-out",
    "outline-none resize-none",
    "disabled:cursor-not-allowed disabled:opacity-60",
    "placeholder-transparent",
  ].join(" "),
  {
    variants: {
      variant: {
        default: [
          "border-b-2 border-border",
          "focus:border-primary",
          "px-0 pt-6 pb-2",
        ].join(" "),
        filled: [
          "bg-muted/50 rounded-t-lg border-b-2 border-border",
          "hover:bg-muted/80",
          "focus:border-primary focus:bg-muted/60",
          "px-3 pt-6 pb-2",
        ].join(" "),
        outlined: [
          "border-2 border-border rounded-lg bg-transparent",
          "hover:border-foreground/50",
          "focus:border-primary focus:border-2",
          "px-3.5 pt-4 pb-2",
        ].join(" "),
      },
      size: {
        default: "text-base min-h-[100px]",
        sm: "text-sm min-h-[80px]",
        lg: "text-lg min-h-[120px]",
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
    "peer-[:not(:placeholder-shown)]:scale-75",
  ].join(" "),
  {
    variants: {
      variant: {
        default: [
          "top-4 px-0",
          "peer-focus:-translate-y-[100%]",
          "peer-[:not(:placeholder-shown)]:-translate-y-[100%]",
        ].join(" "),
        filled: [
          "top-4 px-3",
          "peer-focus:-translate-y-[60%]",
          "peer-[:not(:placeholder-shown)]:-translate-y-[60%]",
        ].join(" "),
        outlined: [
          "top-4 px-1 mx-2.5",
          "peer-focus:-translate-y-[110%] peer-focus:bg-background peer-focus:px-1",
          "peer-[:not(:placeholder-shown)]:-translate-y-[110%] peer-[:not(:placeholder-shown)]:bg-background peer-[:not(:placeholder-shown)]:px-1",
        ].join(" "),
      },
      isError: {
        true: "text-destructive peer-focus:text-destructive",
        false: "",
      },
    },
    defaultVariants: {
      variant: "outlined",
      isError: false,
    },
  }
)

const helperTextVariants = cva(
  "text-xs mt-1.5 px-3.5 transition-all duration-200 animate-fade-in flex justify-between",
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

export interface TextFieldProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  label?: string
  helperText?: string
  error?: boolean
  variant?: "default" | "filled" | "outlined"
  size?: VariantProps<typeof textFieldVariants>['size']
  autoResize?: boolean
  maxLength?: number
  showCount?: boolean
}

export const TextField = forwardRef<HTMLTextAreaElement, TextFieldProps>(
  ({ 
    className, 
    label, 
    helperText, 
    error = false, 
    variant = "outlined", 
    size = "default",
    autoResize = false,
    maxLength,
    showCount = false,
    value,
    defaultValue,
    id: propId,
    onChange,
    ...props 
  }, ref) => {
    const generatedId = useId()
    const id = propId || generatedId
    const [charCount, setCharCount] = useState(0)
    const textareaRef = useRef<HTMLTextAreaElement | null>(null)
    
    // Handle auto-resize
    useEffect(() => {
      if (autoResize && textareaRef.current) {
        textareaRef.current.style.height = 'auto'
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
      }
    }, [autoResize, value])

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCharCount(e.target.value.length)
      
      if (autoResize && textareaRef.current) {
        textareaRef.current.style.height = 'auto'
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
      }
      
      onChange?.(e)
    }

    const setRefs = (element: HTMLTextAreaElement | null) => {
      textareaRef.current = element
      if (typeof ref === 'function') {
        ref(element)
      } else if (ref) {
        ref.current = element
      }
    }
    
    return (
      <div className="w-full">
        <div className={cn(textFieldContainerVariants({ variant }), error && "animate-shake")}>
          <textarea
            ref={setRefs}
            id={id}
            value={value}
            defaultValue={defaultValue}
            maxLength={maxLength}
            className={cn(
              textFieldVariants({ variant, size, isError: error }),
              className
            )}
            placeholder=" "
            aria-invalid={error}
            aria-describedby={helperText ? `${id}-helper` : undefined}
            onChange={handleChange}
            {...props}
          />
          
          {label && (
            <label 
              htmlFor={id}
              className={cn(labelVariants({ variant, isError: error }))}
            >
              {label}
            </label>
          )}
        </div>
        
        {(helperText || showCount) && (
          <div className={cn(helperTextVariants({ variant: error ? "error" : "default" }))}>
            <span id={`${id}-helper`}>{helperText}</span>
            {showCount && (
              <span className="text-muted-foreground">
                {charCount}{maxLength ? `/${maxLength}` : ''}
              </span>
            )}
          </div>
        )}
      </div>
    )
  }
)

TextField.displayName = "TextField"
