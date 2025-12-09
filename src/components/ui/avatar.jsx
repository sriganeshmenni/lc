// "use client";

// import * as React from "react";
// import * as AvatarPrimitive from "@radix-ui/react-avatar@1.1.3";

// import { cn } from "./utils";

// function Avatar({
//   className,
//   ...props
// }: React.ComponentProps<typeof AvatarPrimitive.Root>) {
//   return (
//     <AvatarPrimitive.Root
//       data-slot="avatar"
//       className={cn(
//         "relative flex size-10 shrink-0 overflow-hidden rounded-full",
//         className,
//       )}
//       {...props}
//     />
//   );
// }

// function AvatarImage({
//   className,
//   ...props
// }: React.ComponentProps<typeof AvatarPrimitive.Image>) {
//   return (
//     <AvatarPrimitive.Image
//       data-slot="avatar-image"
//       className={cn("aspect-square size-full", className)}
//       {...props}
//     />
//   );
// }

// function AvatarFallback({
//   className,
//   ...props
// }: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
//   return (
//     <AvatarPrimitive.Fallback
//       data-slot="avatar-fallback"
//       className={cn(
//         "bg-muted flex size-full items-center justify-center rounded-full",
//         className,
//       )}
//       {...props}
//     />
//   );
// }

// export { Avatar, AvatarImage, AvatarFallback };

"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cva } from "class-variance-authority";

import { cn } from "./utils";

// Enhanced: Added CVA to handle different sizes effortlessly
const avatarVariants = cva(
  "relative flex shrink-0 overflow-hidden rounded-full transition-opacity hover:opacity-90",
  {
    variants: {
      size: {
        sm: "h-8 w-8 text-xs",
        default: "h-10 w-10 text-sm",
        lg: "h-14 w-14 text-base",
        xl: "h-20 w-20 text-xl",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

function Avatar({ className, size, ...props }) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(avatarVariants({ size }), className)}
      {...props}
    />
  );
}

function AvatarImage({ className, ...props }) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      // Enhanced: Added object-cover to prevent distortion on non-square images
      className={cn("aspect-square size-full object-cover", className)}
      {...props}
    />
  );
}

function AvatarFallback({ className, ...props }) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        // Enhanced: Added font-medium and better background contrast
        "bg-muted text-muted-foreground flex size-full items-center justify-center rounded-full font-medium",
        className
      )}
      {...props}
    />
  );
}

// New Component: Helper for stacking multiple avatars
function AvatarGroup({ className, children, ...props }) {
  return (
    <div
      className={cn("flex -space-x-3 hover:space-x-1 transition-all", className)}
      {...props}
    >
      {React.Children.map(children, (child) => {
        // We clone the child to force a ring (border) so they separate visually when stacked
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            className: cn("ring-2 ring-background", child.props.className),
          });
        }
        return child;
      })}
    </div>
  );
}

export { Avatar, AvatarImage, AvatarFallback, AvatarGroup };