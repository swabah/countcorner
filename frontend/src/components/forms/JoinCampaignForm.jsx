/**
 * Join Campaign Form
 * Handles duplicate & general errors with proper feedback
 */

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useParticipantMutation } from "@/features/participants/mutations/useParticipantMutations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserPlus, CheckCircle, AlertCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

// ---------------- Schema ----------------
const joinCampaignSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .regex(/^[a-zA-Z\s\u0600-\u06FF]+$/, "Only letters and spaces allowed")
    .transform((v) => v.trim()),
});

// ---------------- Component ----------------
export const JoinCampaignForm = ({ className, campaignId, ...props }) => {
  const { createParticipantAsync, isCreating } = useParticipantMutation();
  const [feedback, setFeedback] = useState({ type: null, message: "" });
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    getFieldState,
  } = useForm({
    resolver: zodResolver(joinCampaignSchema),
    defaultValues: { name: "" },
    mode: "onChange",
  });

  const onSubmit = async (values) => {
    try {
      await createParticipantAsync({ ...values, campaignId });

      setFeedback({ type: "success", message: "You successfully joined! Redirecting..." });

      setTimeout(() => {
        navigate("/add-count");
      }, 2000);
    } catch (error) {
      console.error("Join Campaign Error:", error);

      if (error?.response?.status === 401 || error?.message?.includes("exists")) {
        setFeedback({ type: "error", message: "This user already exists in the campaign." });
      } else {
        setFeedback({ type: "error", message: "You have already joined this campaign." });
      }
    }
  };

  const getStatus = (field) => {
    const state = getFieldState(field);
    if (!state.isTouched) return "idle";
    return state.invalid ? "error" : "valid";
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("space-y-6 pt-10", className)}
      {...props}
    >
      {/* Name Field */}
      <div className="space-y-2">
        <Label htmlFor="name" className="text-lg font-medium">
          Your Name
        </Label>
        <div className="relative">
          <Input
            id="name"
            type="text"
            placeholder="Enter your full name"
            {...register("name")}
            className={cn(
              "text-lg py-3 transition-colors",
              getStatus("name") === "error" &&
                "border-destructive focus:border-destructive focus:ring-destructive",
              getStatus("name") === "valid" &&
                "border-green-500 focus:border-green-500 focus:ring-green-500"
            )}
          />
          {getStatus("name") !== "idle" && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {getStatus("name") === "valid" && (
                <CheckCircle className="h-5 w-5 text-green-600" />
              )}
              {getStatus("name") === "error" && (
                <XCircle className="h-5 w-5 text-destructive" />
              )}
            </div>
          )}
        </div>

        {errors.name && (
          <p className="text-destructive text-sm flex items-center space-x-1" role="alert">
            <AlertCircle className="h-4 w-4" />
            <span>{errors.name.message}</span>
          </p>
        )}
      </div>

      {/* Submit button */}
      <Button
        type="submit"
        variant="hero"
        size="lg"
        className="w-full text-lg py-4"
        disabled={isCreating || !isValid || !isDirty}
      >
        <UserPlus className="mr-2 h-5 w-5" />
        {isCreating ? "Joining..." : "Join Campaign"}
      </Button>

      {/* Feedback messages */}
      {feedback.type === "success" && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-2 text-green-800">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <span>{feedback.message}</span>
        </div>
      )}

      {feedback.type === "error" && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2 text-red-800">
          <AlertCircle className="h-5 w-5 text-red-600" />
          <span>{feedback.message} </span>
        </div>
      )}
    </form>
  );
};
