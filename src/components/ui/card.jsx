import * as React from "react";

import { cn } from "./utils";

function Card({ className, ...props }) {
  return (
    <div
      data-slot="card"
      className={cn(
        // Enhanced: Added transition and hover shadow for better interactivity
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border shadow-sm transition-all duration-200 hover:shadow-md",
        className
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        // The grid logic here handles the positioning of the CardAction automatically
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 pt-6 has-[[data-slot=card-action]]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...props}
    />
  );
}

// Enhanced: Added 'as' prop to allow changing the heading level (h2, h3, h4)
function CardTitle({ className, as: Component = "h3", ...props }) {
  return (
    <Component
      data-slot="card-title"
      className={cn("font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }) {
  return (
    <p
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

function CardAction({ className, ...props }) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6 [&:last-child]:pb-6", className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 pb-6 [.border-t]:pt-6", className)}
      {...props}
    />
  );
}

// New Component: Handles cover images nicely within the rounded borders
function CardImage({ className, src, alt, ...props }) {
  return (
    <div className="relative w-full overflow-hidden first:rounded-t-xl last:rounded-b-xl">
       <img
        src={src}
        alt={alt}
        className={cn("h-48 w-full object-cover transition-transform duration-300 hover:scale-105", className)}
        {...props}
      />
    </div>
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
  CardImage,
};