import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-control text-sm font-medium transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 select-none relative overflow-hidden focus-visible:overflow-visible",
  {
    variants: {
      variant: {
        primary:
          "bg-accent-gold text-primary hover:bg-accent-gold/90 active:bg-accent-gold/80 shadow-raised hover:shadow-[0_4px_25px_rgba(176,141,87,0.35)] before:absolute before:inset-0 before:translate-x-[-100%] before:skew-x-[-15deg] before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent before:transition-transform before:duration-[600ms] hover:before:translate-x-[200%]",
        secondary:
          "border border-accent-gold/30 bg-transparent text-accent-gold hover:bg-accent-gold/10 active:bg-accent-gold/20",
        ghost:
          "bg-transparent text-accent-gold hover:bg-accent-gold/10 active:bg-accent-gold/20",
        outline:
          "border border-border bg-transparent text-text-dark hover:border-accent-gold hover:text-accent-gold active:bg-accent-gold/5",
      },
      size: {
        sm: "h-9 px-3 text-xs rounded-[6px]",
        md: "h-10 px-4 text-sm",
        lg: "h-12 px-6 text-base",
        xl: "h-14 px-8 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
