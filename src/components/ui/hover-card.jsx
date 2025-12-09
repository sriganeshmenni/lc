"use client";

import * as React from "react";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";

import { cn } from "./utils";

const HoverCard = HoverCardPrimitive.Root;

const HoverCardTrigger = HoverCardPrimitive.Trigger;

const HoverCardContent = React.forwardRef(
  ({ className, align = "center", sideOffset = 4, ...props }, ref) => (
    <HoverCardPrimitive.Portal data-slot="hover-card-portal">
      <HoverCardPrimitive.Content
        ref={ref}
        data-slot="hover-card-content"
        align={align}
        sideOffset={sideOffset}
        className={cn(
          // Enhanced: Added backdrop-blur, /95 opacity, and a stronger shadow
          "z-50 w-64 rounded-md border bg-popover/95 backdrop-blur-sm p-4 text-popover-foreground shadow-xl outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          className
        )}
        {...props}
      />
    </HoverCardPrimitive.Portal>
  )
);
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName;

// New Component: Adds a visual arrow pointing to the trigger
const HoverCardArrow = React.forwardRef(({ className, ...props }, ref) => (
  <HoverCardPrimitive.Arrow
    ref={ref}
    data-slot="hover-card-arrow"
    className={cn("fill-popover", className)}
    {...props}
  />
));
HoverCardArrow.displayName = HoverCardPrimitive.Arrow.displayName;

export { HoverCard, HoverCardTrigger, HoverCardContent, HoverCardArrow };