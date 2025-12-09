// import * as React from "react";
// import { Slot } from "@radix-ui/react-slot@1.1.2";
// import { ChevronRight, MoreHorizontal } from "lucide-react@0.487.0";

// import { cn } from "./utils";

// function Breadcrumb({ ...props }: React.ComponentProps<"nav">) {
//   return <nav aria-label="breadcrumb" data-slot="breadcrumb" {...props} />;
// }

// function BreadcrumbList({ className, ...props }: React.ComponentProps<"ol">) {
//   return (
//     <ol
//       data-slot="breadcrumb-list"
//       className={cn(
//         "text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5",
//         className,
//       )}
//       {...props}
//     />
//   );
// }

// function BreadcrumbItem({ className, ...props }: React.ComponentProps<"li">) {
//   return (
//     <li
//       data-slot="breadcrumb-item"
//       className={cn("inline-flex items-center gap-1.5", className)}
//       {...props}
//     />
//   );
// }

// function BreadcrumbLink({
//   asChild,
//   className,
//   ...props
// }: React.ComponentProps<"a"> & {
//   asChild?: boolean;
// }) {
//   const Comp = asChild ? Slot : "a";

//   return (
//     <Comp
//       data-slot="breadcrumb-link"
//       className={cn("hover:text-foreground transition-colors", className)}
//       {...props}
//     />
//   );
// }

// function BreadcrumbPage({ className, ...props }: React.ComponentProps<"span">) {
//   return (
//     <span
//       data-slot="breadcrumb-page"
//       role="link"
//       aria-disabled="true"
//       aria-current="page"
//       className={cn("text-foreground font-normal", className)}
//       {...props}
//     />
//   );
// }

// function BreadcrumbSeparator({
//   children,
//   className,
//   ...props
// }: React.ComponentProps<"li">) {
//   return (
//     <li
//       data-slot="breadcrumb-separator"
//       role="presentation"
//       aria-hidden="true"
//       className={cn("[&>svg]:size-3.5", className)}
//       {...props}
//     >
//       {children ?? <ChevronRight />}
//     </li>
//   );
// }

// function BreadcrumbEllipsis({
//   className,
//   ...props
// }: React.ComponentProps<"span">) {
//   return (
//     <span
//       data-slot="breadcrumb-ellipsis"
//       role="presentation"
//       aria-hidden="true"
//       className={cn("flex size-9 items-center justify-center", className)}
//       {...props}
//     >
//       <MoreHorizontal className="size-4" />
//       <span className="sr-only">More</span>
//     </span>
//   );
// }

// export {
//   Breadcrumb,
//   BreadcrumbList,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
//   BreadcrumbEllipsis,
// };

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { ChevronRight, MoreHorizontal } from "lucide-react";

import { cn } from "./utils";

function Breadcrumb({ ...props }) {
  return <nav aria-label="breadcrumb" data-slot="breadcrumb" {...props} />;
}

function BreadcrumbList({ className, ...props }) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn(
        "text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5",
        className
      )}
      {...props}
    />
  );
}

function BreadcrumbItem({ className, ...props }) {
  return (
    <li
      data-slot="breadcrumb-item"
      className={cn("inline-flex items-center gap-1.5", className)}
      {...props}
    />
  );
}

function BreadcrumbLink({ asChild, className, ...props }) {
  const Comp = asChild ? Slot : "a";

  return (
    <Comp
      data-slot="breadcrumb-link"
      className={cn(
        // Enhanced: Added underline offset and hover animation
        "hover:text-foreground hover:underline hover:underline-offset-4 transition-colors",
        className
      )}
      {...props}
    />
  );
}

function BreadcrumbPage({ className, ...props }) {
  return (
    <span
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn("text-foreground font-medium", className)}
      {...props}
    />
  );
}

function BreadcrumbSeparator({ children, className, ...props }) {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn("[&>svg]:size-3.5 opacity-50", className)}
      {...props}
    >
      {children ?? <ChevronRight />}
    </li>
  );
}

function BreadcrumbEllipsis({ className, ...props }) {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={cn(
        // Enhanced: Styled to look like a button (ghost style) for potential dropdown usage
        "flex size-9 items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground transition-colors",
        className
      )}
      {...props}
    >
      <MoreHorizontal className="size-4" />
      <span className="sr-only">More</span>
    </span>
  );
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
};