"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cn } from "./utils";

const Label = React.forwardRef(({ className, required, children, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    data-slot="label"
    className={cn(
      "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
      // Include the specific group selectors from your original code for robustness
      "group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50", 
      className
    )}
    {...props}
  >
    {children}
    {required && <span className="text-destructive ml-0.5">*</span>}
  </LabelPrimitive.Root>
));

Label.displayName = LabelPrimitive.Root.displayName;

export { Label };