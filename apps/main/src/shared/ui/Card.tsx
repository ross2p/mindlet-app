"use client"

import { cva, type VariantProps } from "class-variance-authority"
import { type HTMLAttributes } from "react"
import { cn } from "@/shared/utils"

const cardVariants = cva(
  [
    "rounded-lg transition-all duration-300 ease-out",
    "animate-fade-in",
  ].join(" "),
  {
    variants: {
      variant: {
        default: [
          "bg-card text-card-foreground",
          "elevation-1",
          "hover:elevation-3",
        ].join(" "),
        elevated: [
          "bg-card text-card-foreground",
          "elevation-4",
          "hover:elevation-8",
        ].join(" "),
        outlined: [
          "bg-card text-card-foreground",
          "border-2 border-border",
          "hover:border-primary/30",
        ].join(" "),
        filled: [
          "bg-muted/50 text-card-foreground",
          "backdrop-blur-sm",
          "hover:bg-muted/70",
        ].join(" "),
        glass: [
          "bg-card/80 text-card-foreground backdrop-blur-md",
          "border border-border/50",
          "elevation-2",
          "hover:bg-card/90 hover:elevation-4",
        ].join(" "),
      },
      padding: {
        none: "",
        xs: "p-2",
        sm: "p-3",
        default: "p-4",
        lg: "p-6",
        xl: "p-8",
      },
      interactive: {
        true: "cursor-pointer active:scale-[0.98] transition-transform",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "default",
      interactive: false,
    },
  }
)

const cardHeaderVariants = cva(
  "flex flex-col space-y-1.5 pb-4 border-b border-border mb-4",
  {
    variants: {
      size: {
        default: "",
        sm: "pb-2 mb-2",
        lg: "pb-6 mb-6",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

const cardTitleVariants = cva(
  "font-semibold leading-none tracking-tight text-foreground",
  {
    variants: {
      size: {
        default: "text-lg",
        sm: "text-base",
        lg: "text-xl",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

const cardSubtitleVariants = cva(
  "text-muted-foreground",
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

const cardFooterVariants = cva(
  "flex items-center pt-4 border-t border-border mt-4",
  {
    variants: {
      align: {
        start: "justify-start",
        center: "justify-center",
        end: "justify-end",
        between: "justify-between",
      },
    },
    defaultVariants: {
      align: "end",
    },
  }
)

export interface CardProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {}

export const Card = ({ className, variant, padding, interactive, ...props }: CardProps) => {
  return (
    <div
      className={cn(cardVariants({ variant, padding, interactive }), className)}
      {...props}
    />
  )
}

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  size?: "default" | "sm" | "lg"
}

export const CardHeader = ({ className, size, ...props }: CardHeaderProps) => {
  return <div className={cn(cardHeaderVariants({ size }), className)} {...props} />
}

export interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  size?: "default" | "sm" | "lg"
}

export const CardTitle = ({ className, size, ...props }: CardTitleProps) => {
  return <h3 className={cn(cardTitleVariants({ size }), className)} {...props} />
}

export interface CardSubtitleProps extends HTMLAttributes<HTMLParagraphElement> {
  size?: "default" | "sm" | "lg"
}

export const CardSubtitle = ({ className, size, ...props }: CardSubtitleProps) => {
  return <p className={cn(cardSubtitleVariants({ size }), className)} {...props} />
}

export interface CardContentProps extends HTMLAttributes<HTMLDivElement> {}

export const CardContent = ({ className, ...props }: CardContentProps) => {
  return <div className={cn("text-card-foreground", className)} {...props} />
}

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  align?: "start" | "center" | "end" | "between"
}

export const CardFooter = ({ className, align, ...props }: CardFooterProps) => {
  return <div className={cn(cardFooterVariants({ align }), className)} {...props} />
}
