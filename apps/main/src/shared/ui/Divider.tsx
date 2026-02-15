"use client"

import { cva, type VariantProps } from "class-variance-authority"
import { type HTMLAttributes } from "react"
import { cn } from "@/shared/utils"

const dividerVariants = cva(
  "shrink-0 transition-all duration-200",
  {
    variants: {
      orientation: {
        horizontal: "w-full",
        vertical: "h-full",
      },
      variant: {
        solid: "bg-border",
        dashed: "border-dashed",
        dotted: "border-dotted",
        gradient: "bg-gradient-to-r from-transparent via-border to-transparent",
      },
      thickness: {
        thin: "",
        default: "",
        thick: "",
      },
      spacing: {
        none: "",
        sm: "",
        default: "",
        lg: "",
      },
    },
    compoundVariants: [
      // Horizontal + thickness
      { orientation: "horizontal", thickness: "thin", className: "h-px" },
      { orientation: "horizontal", thickness: "default", className: "h-[2px]" },
      { orientation: "horizontal", thickness: "thick", className: "h-1" },
      
      // Vertical + thickness
      { orientation: "vertical", thickness: "thin", className: "w-px" },
      { orientation: "vertical", thickness: "default", className: "w-[2px]" },
      { orientation: "vertical", thickness: "thick", className: "w-1" },
      
      // Horizontal + spacing
      { orientation: "horizontal", spacing: "sm", className: "my-2" },
      { orientation: "horizontal", spacing: "default", className: "my-4" },
      { orientation: "horizontal", spacing: "lg", className: "my-6" },
      
      // Vertical + spacing
      { orientation: "vertical", spacing: "sm", className: "mx-2" },
      { orientation: "vertical", spacing: "default", className: "mx-4" },
      { orientation: "vertical", spacing: "lg", className: "mx-6" },
    ],
    defaultVariants: {
      orientation: "horizontal",
      variant: "solid",
      thickness: "default",
      spacing: "default",
    },
  }
)

export interface DividerProps extends Omit<HTMLAttributes<HTMLHRElement>, 'children'>, VariantProps<typeof dividerVariants> {
  children?: React.ReactNode
}

export const Divider = ({ 
  className, 
  orientation = "horizontal", 
  variant, 
  thickness,
  spacing,
  children,
  ...props 
}: DividerProps) => {
  const ariaOrientation = orientation ?? "horizontal"
  
  if (children) {
    return (
      <div 
        className={cn(
          "flex items-center gap-4",
          orientation === "horizontal" ? "w-full flex-row" : "h-full flex-col",
          spacing === "sm" && "my-2",
          spacing === "default" && "my-4",
          spacing === "lg" && "my-6",
          className
        )}
        role="separator"
        aria-orientation={ariaOrientation}
      >
        <div className={cn(
          dividerVariants({ orientation, variant, thickness, spacing: "none" }),
          "flex-1"
        )} />
        <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider px-2">
          {children}
        </span>
        <div className={cn(
          dividerVariants({ orientation, variant, thickness, spacing: "none" }),
          "flex-1"
        )} />
      </div>
    )
  }

  return (
    <hr
      className={cn(dividerVariants({ orientation, variant, thickness, spacing }), className)}
      role="separator"
      aria-orientation={ariaOrientation}
      {...props}
    />
  )
}
