/**
 * Centralized Loader Component
 * Provides a rounded, animated loading indicator
 */

import React from "react";
import { cn } from "@/lib/utils";

export const Loader = ({ 
  size = "default", 
  variant = "default",
  className,
  ...props 
}) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    default: "w-8 h-8", 
    lg: "w-12 h-12",
    xl: "w-16 h-16"
  };

  const variantClasses = {
    default: "border-primary border-t-transparent",
    secondary: "border-secondary border-t-transparent",
    accent: "border-accent border-t-transparent"
  };

  return (
    <div
      className={cn(
        "animate-spin rounded-full border-2",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      {...props}
    />
  );
};

export const LoaderContainer = ({ 
  children,
  isLoading = false,
  loadingText = "Loading...",
  size = "default",
  variant = "default",
  className,
  ...props 
}) => {
  if (!isLoading) {
    return children;
  }

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center min-h-[200px] w-full",
        "bg-background/50 backdrop-blur-sm rounded-lg border",
        "animate-fade-in",
        className
      )}
      {...props}
    >
      <Loader size={size} variant={variant} />
      {loadingText && (
        <p className="mt-4 text-sm text-muted-foreground animate-pulse">
          {loadingText}
        </p>
      )}
    </div>
  );
};

export const PageLoader = ({ 
  loadingText = "Loading page...",
  size = "lg",
  className,
  ...props 
}) => {
  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex flex-col items-center justify-center",
        "bg-background/80 backdrop-blur-sm animate-fade-in",
        className
      )}
      {...props}
    >
      <div className="flex flex-col items-center justify-center p-8 bg-card rounded-xl border shadow-lg">
        <Loader size={size} variant="accent" />
        {loadingText && (
          <p className="mt-4 text-muted-foreground animate-pulse">
            {loadingText}
          </p>
        )}
      </div>
    </div>
  );
};

export const CardLoader = ({ 
  lines = 3,
  className,
  ...props 
}) => {
  return (
    <div
      className={cn(
        "p-6 bg-card rounded-lg border animate-fade-in",
        className
      )}
      {...props}
    >
      <div className="space-y-3">
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-4 bg-muted rounded animate-pulse",
              i === 0 && "w-3/4",
              i === 1 && "w-full", 
              i === 2 && "w-1/2"
            )}
          />
        ))}
      </div>
    </div>
  );
};