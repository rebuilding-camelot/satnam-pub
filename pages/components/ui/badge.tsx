import * as React from "react"
import { cn } from "../../../lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline"
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        variant === "default" && "bg-satnam-purple text-white border-transparent",
        variant === "secondary" && "bg-satnam-orange text-white border-transparent",
        variant === "destructive" && "bg-red-500 text-white border-transparent",
        variant === "outline" && "border-satnam-purple text-satnam-purple",
        className
      )}
      {...props}
    />
  )
}

export { Badge }
