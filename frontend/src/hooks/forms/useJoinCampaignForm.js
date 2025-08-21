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
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .regex(
      /^[a-zA-Z\s\u0600-\u06FF]+$/,
      "Name can only contain letters and spaces"
    ),
});

export const useJoinCampaignForm = () => {
  const navigate = useNavigate();
  const { createParticipant, isCreating } = useParticipantMutation();
  const { data: campaign } = useCampaign("68a7351580cbe659c21bfcb1");

  const campaignId = campaign?.data._id;

  const form = useForm({
    resolver: zodResolver(joinCampaignSchema),
    defaultValues: {
      name: "",
    },
    mode: "onChange",
  });

  const handleSubmit = async (data) => {
    try {
      await createParticipant({ ...data, campaignId });
      form.reset();
      setTimeout(() => navigate("/add-count"), 500);
    } catch (error) {
      console.error("Failed to join campaign:", error);
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
  };
};
