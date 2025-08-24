/**
 * Join campaign form hook
 * Encapsulates form logic, validation, and submission for joining campaigns
 */

import React from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useParticipantMutation } from "@/features/participants/mutations/useParticipantMutations";
import { useCampaign } from "@/features";

const joinCampaignSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .regex(
      /^[a-zA-Z\s\u0600-\u06FF]+$/,
      "Name can only contain letters and spaces"
    )
    .refine((name) => name.trim().length >= 2, {
      message: "Name cannot be just spaces",
    })
    .transform((name) => name.trim()),
});

export const useJoinCampaignForm = () => {
  const navigate = useNavigate();
  const { createParticipantAsync, isCreating } = useParticipantMutation();
  const { data: campaign } = useCampaign("68a7351580cbe659c21bfcb1");

  const campaignId = campaign?.data._id;

  const form = useForm({
    resolver: zodResolver(joinCampaignSchema),
    defaultValues: {
      name: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const handleSubmit = async (data) => {
    try {
      await createParticipantAsync({ ...data, campaignId });
      form.reset();
      return { success: true };
    } catch (error) {
      console.error("Failed to join campaign:", error);
      console.log("Error details:", {
        message: error?.message,
        response: error?.response?.data,
        status: error?.response?.status,
      });

      // Check if it's a duplicate name error from the backend response
      if (
        error?.response?.data?.message &&
        error.response.data.message.includes("unique")
      ) {
        return {
          success: false,
          error:
            "Someone with this name is already in the campaign. Please use a different name.",
        };
      }

      // Check if it's a duplicate name error from the error message
      if (error?.message && error.message.includes("unique")) {
        return {
          success: false,
          error:
            "Someone with this name is already in the campaign. Please use a different name.",
        };
      }

      // Check for other specific error types
      if (error?.response?.status === 400) {
        return {
          success: false,
          error: "Invalid data provided. Please check your name and try again.",
        };
      }

      if (error?.response?.status === 500) {
        return {
          success: false,
          error: "Server error. Please try again later.",
        };
      }

      // Generic error
      return {
        success: false,
        error:
          "Unable to join campaign. Please check your connection and try again.",
      };
    }
  };

  return {
    // Form methods
    ...form,

    // Submission
    onSubmit: form.handleSubmit(handleSubmit),

    // State
    isSubmitting: isCreating,

    // Helpers
    isFieldInvalid: (fieldName) => {
      const fieldState = form.getFieldState(fieldName);
      return !!(fieldState.invalid && fieldState.isTouched);
    },

    getFieldError: (fieldName) => {
      const fieldState = form.getFieldState(fieldName);
      return fieldState.error?.message;
    },

    // Enhanced validation helpers
    isFieldValid: (fieldName) => {
      const fieldState = form.getFieldState(fieldName);
      return fieldState.isTouched && !fieldState.invalid;
    },

    getFieldStatus: (fieldName) => {
      const fieldState = form.getFieldState(fieldName);
      if (!fieldState.isTouched) return "idle";
      if (fieldState.invalid) return "error";
      return "valid";
    },
  };
};
