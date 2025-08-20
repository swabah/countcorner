/**
 * Reusable Join Campaign Form Component
 * Uses custom form hook for logic separation and reusability
 */

import React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserPlus } from "lucide-react";
import { useJoinCampaignForm } from "@/hooks/forms/useJoinCampaignForm";
import { cn } from "@/lib/utils";

export const JoinCampaignForm = ({ className, ...props }) => {
  const {
    register,
    onSubmit,
    isSubmitting,
    isFieldInvalid,
    getFieldError,
    formState: { errors },
  } = useJoinCampaignForm();

  return (
    <form
      onSubmit={onSubmit}
      className={cn("space-y-6 pt-10", className)}
      {...props}
    >
      <div className="space-y-2">
        <Label htmlFor="name" className="text-lg font-medium">
          Your Name
        </Label>
        <Input
          id="name"
          type="text"
          placeholder="Enter your full name"
          {...register("name")}
          className={cn(
            "text-lg py-3",
            isFieldInvalid("name") &&
              "border-destructive focus:border-destructive"
          )}
          aria-invalid={isFieldInvalid("name")}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        {errors.name && (
          <p id="name-error" className="text-destructive text-sm" role="alert">
            {getFieldError("name")}
          </p>
        )}
      </div>

      <Button
        type="submit"
        variant="hero"
        size="lg"
        className="w-full text-lg py-4"
        disabled={isSubmitting}
        aria-label={isSubmitting ? "Joining campaign..." : "Join campaign"}
      >
        <UserPlus className="mr-2 h-5 w-5" aria-hidden="true" />
        {isSubmitting ? "Joining..." : "Join Campaign"}
      </Button>
    </form>
  );
};
