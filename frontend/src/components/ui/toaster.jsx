import * as React from "react";

// ---- Tailwind Merge Utility ----
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Import the useToast hook from the proper location
import { useToast } from "@/hooks/use-toast";

// ---- Toast UI Components ----
function Toast({ children, className, ...props }) {
  return (
    <div
      className={cn(
        "flex items-start gap-4 rounded-md border bg-white p-4 shadow-md",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function ToastTitle({ children }) {
  return <div className="font-bold">{children}</div>;
}

function ToastDescription({ children }) {
  return <div className="text-sm text-gray-600">{children}</div>;
}

function ToastClose() {
  return (
    <button
      onClick={() => {
        // Add close logic if needed
      }}
      className="ml-auto text-gray-400 hover:text-gray-700"
    >
      ✕
    </button>
  );
}

function ToastViewport({ children }) {
  return <div className="fixed bottom-4 right-4 space-y-2">{children}</div>;
}

// ---- Toaster Component ----
export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastViewport>
      {toasts.map(({ id, title, description, action, ...props }) => (
        <Toast key={id} {...props}>
          <div className="grid gap-1">
            {title && <ToastTitle>{title}</ToastTitle>}
            {description && <ToastDescription>{description}</ToastDescription>}
          </div>
          {action}
          <ToastClose />
        </Toast>
      ))}
    </ToastViewport>
  );
}
