"use client";

import * as React from "react";
import { GripVertical } from "lucide-react";
import * as ResizablePrimitive from "react-resizable-panels";

import { cn } from "./utils";

const ResizablePanelGroup = ({ className, ...props }) => (
  <ResizablePrimitive.PanelGroup
    className={cn(
      "flex h-full w-full data-[panel-group-direction=vertical]:flex-col",
      className
    )}
    {...props}
  />
);

const ResizablePanel = ResizablePrimitive.Panel;

const ResizableHandle = ({ withHandle, className, ...props }) => (
  <ResizablePrimitive.PanelResizeHandle
    className={cn(
      // Base styles
      "relative flex w-px items-center justify-center bg-border transition-colors",
      // Hover & Active states (Enhanced visual feedback)
      "hover:bg-ring/50 data-[resize-handle-active=true]:bg-ring",
      // Focus styles
      "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1",
      // Hit area (Enhanced: expanded from w-1 to w-4 for easier grabbing)
      "after:absolute after:inset-y-0 after:left-1/2 after:w-4 after:-translate-x-1/2",
      // Vertical orientation specific styles
      "data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-4 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0",
      // Icon rotation for vertical
      "[&[data-panel-group-direction=vertical]>div]:rotate-90",
      className
    )}
    {...props}
  >
    {withHandle && (
      <div className="z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border shadow-sm">
        <GripVertical className="h-2.5 w-2.5" />
      </div>
    )}
  </ResizablePrimitive.PanelResizeHandle>
);

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };