import * as React from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
} from "lucide-react";

import { cn } from "./utils";
import { buttonVariants } from "./button";

const Pagination = React.forwardRef(({ className, ...props }, ref) => (
  <nav
    ref={ref}
    role="navigation"
    aria-label="pagination"
    data-slot="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
));
Pagination.displayName = "Pagination";

const PaginationContent = React.forwardRef(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    data-slot="pagination-content"
    className={cn("flex flex-row items-center gap-1", className)}
    {...props}
  />
));
PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef(({ className, ...props }, ref) => (
  <li
    ref={ref}
    data-slot="pagination-item"
    className={cn("", className)}
    {...props}
  />
));
PaginationItem.displayName = "PaginationItem";

const PaginationLink = React.forwardRef(
  ({ className, isActive, size = "icon", ...props }, ref) => (
    <a
      ref={ref}
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={cn(
        buttonVariants({
          variant: isActive ? "outline" : "ghost",
          size,
        }),
        // Enhanced: Added transition for smooth hover effects
        "transition-colors",
        className
      )}
      {...props}
    />
  )
);
PaginationLink.displayName = "PaginationLink";

const PaginationPrevious = React.forwardRef(
  ({ className, ...props }, ref) => (
    <PaginationLink
      ref={ref}
      aria-label="Go to previous page"
      size="default"
      className={cn("gap-1 pl-2.5 pr-4", className)}
      {...props}
    >
      <ChevronLeft className="h-4 w-4" />
      <span className="hidden sm:block">Previous</span>
    </PaginationLink>
  )
);
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = React.forwardRef(
  ({ className, ...props }, ref) => (
    <PaginationLink
      ref={ref}
      aria-label="Go to next page"
      size="default"
      className={cn("gap-1 pl-4 pr-2.5", className)}
      {...props}
    >
      <span className="hidden sm:block">Next</span>
      <ChevronRight className="h-4 w-4" />
    </PaginationLink>
  )
);
PaginationNext.displayName = "PaginationNext";

// New Component: Go to first page
const PaginationFirst = React.forwardRef(
  ({ className, ...props }, ref) => (
    <PaginationLink
      ref={ref}
      aria-label="Go to first page"
      size="default"
      className={cn("gap-1 px-2.5 hidden sm:flex", className)}
      {...props}
    >
      <ChevronsLeft className="h-4 w-4" />
      <span className="sr-only">First</span>
    </PaginationLink>
  )
);
PaginationFirst.displayName = "PaginationFirst";

// New Component: Go to last page
const PaginationLast = React.forwardRef(
  ({ className, ...props }, ref) => (
    <PaginationLink
      ref={ref}
      aria-label="Go to last page"
      size="default"
      className={cn("gap-1 px-2.5 hidden sm:flex", className)}
      {...props}
    >
      <ChevronsRight className="h-4 w-4" />
      <span className="sr-only">Last</span>
    </PaginationLink>
  )
);
PaginationLast.displayName = "PaginationLast";

const PaginationEllipsis = React.forwardRef(({ className, ...props }, ref) => (
  <span
    ref={ref}
    aria-hidden
    data-slot="pagination-ellipsis"
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
));
PaginationEllipsis.displayName = "PaginationEllipsis";

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationFirst, // Exported new component
  PaginationLast,  // Exported new component
  PaginationEllipsis,
};