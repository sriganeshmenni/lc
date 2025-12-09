"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

const Toaster = ({ ...props }) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      // Enhanced: mapped internal Sonner elements to Shadcn UI tokens
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          error: "group-[.toaster]:text-destructive",
          success: "group-[.toaster]:text-emerald-600 dark:group-[.toaster]:text-emerald-400",
          warning: "group-[.toaster]:text-amber-600 dark:group-[.toaster]:text-amber-400",
          info: "group-[.toaster]:text-blue-600 dark:group-[.toaster]:text-blue-400",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
