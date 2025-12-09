"use client";

import * as React from "react";
import { Eye, EyeOff } from "lucide-react";

import { cn } from "./utils";

const Input = React.forwardRef(
  ({ className, type, startIcon: StartIcon, endIcon: EndIcon, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    // Logic to toggle password visibility
    const isPasswordType = type === "password";
    const inputType = isPasswordType ? (showPassword ? "text" : "password") : type;

    // Logic to toggle the eye icon
    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    return (
      <div className="relative w-full">
        {/* Start Icon Rendering */}
        {StartIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            <StartIcon className="h-4 w-4" />
          </div>
        )}

        <input
          type={inputType}
          className={cn(
            // Base Styles
            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            // Padding adjustments for icons
            StartIcon ? "pl-9" : "",
            EndIcon || isPasswordType ? "pr-9" : "",
            // Error states (matches your original code's specific error styling)
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
            className
          )}
          ref={ref}
          {...props}
        />

        {/* End Icon Rendering (Generic) */}
        {EndIcon && !isPasswordType && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            <EndIcon className="h-4 w-4" />
          </div>
        )}

        {/* Password Toggle Button (Specific) */}
        {isPasswordType && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none"
            tabIndex={-1} // Prevent tabbing to this button for smoother form flow
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
            <span className="sr-only">
              {showPassword ? "Hide password" : "Show password"}
            </span>
          </button>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };