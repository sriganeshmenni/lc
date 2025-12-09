"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check, Minus } from "lucide-react";

import { cn } from "./utils";

const Checkbox = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <CheckboxPrimitive.Root
      ref={ref}
      data-slot="checkbox"
      className={cn(
        // Base Layout & Colors
        "peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        // Checked/Indeterminate State Colors
        "data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
        "data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground",
        // Animations
        "transition-all duration-200 active:scale-95",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className={cn("flex items-center justify-center text-current")}
      >
        {/* Radix UI handles the rendering of the Indicator based on state.
          We use CSS logic (hidden/block) based on the data-state attribute
          to swap icons without complex JS logic here.
        */}
        <Check className="h-3.5 w-3.5 hidden data-[state=checked]:block" />
        <Minus className="h-3.5 w-3.5 hidden data-[state=indeterminate]:block" />
        
        {/* Fallback for simple usage if CSS selectors fail in specific environments, 
            though the CSS above is the robust way. 
            If props.checked === 'indeterminate', the Minus shows. 
        */}
        {props.checked === "indeterminate" && <Minus className="h-3.5 w-3.5 absolute" />}
        {props.checked === true && <Check className="h-3.5 w-3.5 absolute" />}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
});

Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };