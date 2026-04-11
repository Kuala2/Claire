import { forwardRef } from "react";
import { cn } from "../../lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement | HTMLAnchorElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
}

export const Button = forwardRef<any, ButtonProps>(
  ({ className, variant = "primary", size = "md", href, ...props }, ref) => {
    const Component = href ? "a" : "button";

    return (
      <Component
        ref={ref}
        href={href}
        className={cn(
          "inline-flex items-center justify-center rounded-2xl font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
          {
            "bg-primary text-white hover:bg-primary-hover": variant === "primary",
            "bg-secondary text-white hover:bg-secondary-light": variant === "secondary",
            "border-2 border-primary text-primary hover:bg-primary/5": variant === "outline",
            "hover:bg-gray-100": variant === "ghost",
            "h-9 px-4 text-sm": size === "sm",
            "h-12 px-6 text-base": size === "md",
            "h-14 px-8 text-lg": size === "lg",
          },
          className
        )}
        {...(props as any)}
      />
    );
  }
);
Button.displayName = "Button";
