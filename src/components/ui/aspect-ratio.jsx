// "use client";

// import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio@1.1.2";

// function AspectRatio({
//   ...props
// }: React.ComponentProps<typeof AspectRatioPrimitive.Root>) {
//   return <AspectRatioPrimitive.Root data-slot="aspect-ratio" {...props} />;
// }

// export { AspectRatio };

"use client";

import * as React from "react";
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio";

import { cn } from "./utils";

const AspectRatio = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <AspectRatioPrimitive.Root
      ref={ref}
      data-slot="aspect-ratio"
      className={cn("relative", className)}
      {...props}
    />
  );
});

AspectRatio.displayName = AspectRatioPrimitive.Root.displayName || "AspectRatio";

export { AspectRatio };