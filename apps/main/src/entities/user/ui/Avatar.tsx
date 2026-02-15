"use client"

import { cva, type VariantProps } from "class-variance-authority"
import { type HTMLAttributes, type ReactNode } from "react"
import { cn } from "@/shared/utils"

const avatarVariants = cva(
  [
    "relative inline-flex items-center justify-center",
    "overflow-hidden bg-muted",
    "text-muted-foreground font-medium uppercase",
    "select-none shrink-0",
    "transition-all duration-200",
  ].join(" "),
  {
    variants: {
      variant: {
        circular: "rounded-full",
        rounded: "rounded-lg",
        square: "rounded-none",
      },
      size: {
        xs: "h-6 w-6 text-xs",
        sm: "h-8 w-8 text-sm",
        default: "h-10 w-10 text-base",
        lg: "h-12 w-12 text-lg",
        xl: "h-16 w-16 text-xl",
        "2xl": "h-20 w-20 text-2xl",
      },
      colorScheme: {
        default: "bg-muted text-muted-foreground",
        primary: "bg-primary/20 text-primary",
        secondary: "bg-secondary/20 text-secondary",
        success: "bg-success/20 text-success",
        warning: "bg-warning/20 text-warning",
        destructive: "bg-destructive/20 text-destructive",
      },
    },
    defaultVariants: {
      variant: "circular",
      size: "default",
      colorScheme: "default",
    },
  }
)

const statusIndicatorVariants = cva(
  [
    "absolute rounded-full border-2 border-background",
    "transition-all duration-200",
  ].join(" "),
  {
    variants: {
      size: {
        xs: "h-2 w-2",
        sm: "h-2.5 w-2.5",
        default: "h-3 w-3",
        lg: "h-3.5 w-3.5",
        xl: "h-4 w-4",
        "2xl": "h-5 w-5",
      },
      status: {
        online: "bg-success",
        offline: "bg-muted-foreground",
        busy: "bg-destructive",
        away: "bg-warning",
      },
      position: {
        "bottom-right": "bottom-0 right-0",
        "bottom-left": "bottom-0 left-0",
        "top-right": "top-0 right-0",
        "top-left": "top-0 left-0",
      },
    },
    defaultVariants: {
      size: "default",
      status: "online",
      position: "bottom-right",
    },
  }
)

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof avatarVariants> {
  src?: string
  alt?: string
  name?: string
  icon?: ReactNode
  status?: "online" | "offline" | "busy" | "away"
  statusPosition?: "bottom-right" | "bottom-left" | "top-right" | "top-left"
}

const getInitials = (name: string): string => {
  const parts = name.trim().split(/\s+/)
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`
  }
  return parts[0]?.slice(0, 2) || ""
}

export const Avatar = ({
  className,
  src,
  alt,
  name,
  icon,
  variant = "circular",
  size = "default",
  colorScheme = "default",
  status,
  statusPosition = "bottom-right",
  ...props
}: AvatarProps) => {
  const initials = name ? getInitials(name) : ""

  return (
    <span 
      className={cn(avatarVariants({ variant, size, colorScheme }), className)}
      {...props}
    >
      {src ? (
        <img
          src={src}
          alt={alt || name || "Avatar"}
          className="h-full w-full object-cover"
          onError={(e) => {
            // Hide broken image
            e.currentTarget.style.display = "none"
          }}
        />
      ) : icon ? (
        <span className="flex items-center justify-center">
          {icon}
        </span>
      ) : initials ? (
        <span>{initials}</span>
      ) : (
        // Default user icon
        <svg 
          viewBox="0 0 24 24" 
          fill="currentColor" 
          className="w-[60%] h-[60%]"
        >
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        </svg>
      )}
      
      {status && (
        <span 
          className={cn(statusIndicatorVariants({ 
            size, 
            status, 
            position: statusPosition 
          }))}
          aria-label={`Status: ${status}`}
        />
      )}
    </span>
  )
}

Avatar.displayName = "Avatar"
