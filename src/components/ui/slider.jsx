"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "./utils";

const Slider = React.forwardRef(({ className, ...props }, ref) => {
  // Logic to determine how many thumbs to render.
  // If value/defaultValue is an array, render that many thumbs.
  // Otherwise, default to 1 thumb.
  const value = props.value || props.defaultValue || [props.min || 0];
  const numberOfThumbs = Array.isArray(value) ? value.length : 1;

  return (
    <SliderPrimitive.Root
      ref={ref}
      data-slot="slider"
      className={cn(
        "relative flex w-full touch-none select-none items-center",
        "data-[orientation=vertical]:h-full data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
        "data-[disabled]:opacity-50",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className={cn(
          "relative grow overflow-hidden rounded-full bg-secondary",
          "data-[orientation=horizontal]:h-2 data-[orientation=horizontal]:w-full",
          "data-[orientation=vertical]:h-full data-[orientation=vertical]:w-2"
        )}
      >
        <SliderPrimitive.Range
          data-slot="slider-range"
          className={cn(
            "absolute bg-primary",
            "data-[orientation=horizontal]:h-full",
            "data-[orientation=vertical]:w-full"
          )}
        />
      </SliderPrimitive.Track>
      
      {/* Automatically render the correct number of thumbs */}
      {Array.from({ length: numberOfThumbs }).map((_, index) => (
        <SliderPrimitive.Thumb
          key={index}
          data-slot="slider-thumb"
          className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        />
      ))}
    </SliderPrimitive.Root>
  );
});

Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };