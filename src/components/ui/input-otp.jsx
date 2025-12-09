"use client";

import * as React from "react";
import { OTPInput, OTPInputContext } from "input-otp";
import { Dot } from "lucide-react"; // Changed from Minus to Dot for a modern separator

import { cn } from "./utils";

const InputOTP = React.forwardRef(
  ({ className, containerClassName, ...props }, ref) => (
    <OTPInput
      ref={ref}
      data-slot="input-otp"
      containerClassName={cn(
        "flex items-center gap-2 has-[:disabled]:opacity-50",
        containerClassName
      )}
      className={cn("disabled:cursor-not-allowed", className)}
      {...props}
    />
  )
);
InputOTP.displayName = "InputOTP";

const InputOTPGroup = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="input-otp-group"
    className={cn("flex items-center", className)}
    {...props}
  />
));
InputOTPGroup.displayName = "InputOTPGroup";

const InputOTPSlot = React.forwardRef(({ index, className, ...props }, ref) => {
  const inputOTPContext = React.useContext(OTPInputContext);
  // Robust fallback in case context is missing
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {
    char: "",
    hasFakeCaret: false,
    isActive: false,
  };

  return (
    <div
      ref={ref}
      data-slot="input-otp-slot"
      data-active={isActive}
      className={cn(
        // Base Layout
        "relative flex h-10 w-10 items-center justify-center border-y border-r text-sm transition-all outline-none",
        // Borders & Radius (Connects slots visually)
        "first:rounded-l-md first:border-l last:rounded-r-md",
        // Default Colors
        "border-input bg-background",
        // Active State (Focus)
        "data-[active=true]:z-10 data-[active=true]:border-ring data-[active=true]:ring-2 data-[active=true]:ring-ring/30 data-[active=true]:bg-accent/20",
        className
      )}
      {...props}
    >
      <span className="font-semibold">{char}</span>
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-px animate-blink bg-foreground duration-1000" />
        </div>
      )}
    </div>
  );
});
InputOTPSlot.displayName = "InputOTPSlot";

const InputOTPSeparator = React.forwardRef(({ ...props }, ref) => (
  <div
    ref={ref}
    data-slot="input-otp-separator"
    role="separator"
    className="text-muted-foreground"
    {...props}
  >
    <Dot />
  </div>
));
InputOTPSeparator.displayName = "InputOTPSeparator";

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };