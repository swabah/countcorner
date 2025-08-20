/**
 * Daily Count mutation hooks
 * Handles daily count data modifications using React Query
 */

import React from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { dailyCountsApi } from "../api/daily-counts.api";
import { toast } from "sonner";
import { queryKeys } from "@/lib/query/keys";

/**
 * Create a new daily count
 */
export const useDailyCountMutation = () => {
  const queryClient = useQueryClient();

  const createDailyCountMutation = useMutation({
    mutationFn: dailyCountsApi.createDailyCount,
    onSuccess: () => {
      // Invalidate queries to ensure fresh data
      queryClient.invalidateQueries({ queryKey: queryKeys.dailyCounts() });
      queryClient.invalidateQueries({ queryKey: queryKeys.participants() });
      queryClient.invalidateQueries({ queryKey: queryKeys.leaderboard() });
      queryClient.invalidateQueries({ queryKey: queryKeys.campaignStats(1) });

      toast.success(
        "Daily count added successfully! Keep up the great work! 🤲"
      );
    },
  });

  const updateDailyCountMutation = useMutation({
    mutationFn: ({ id, data }) => dailyCountsApi.updateDailyCount(id, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.dailyCounts() });
      queryClient.invalidateQueries({
        queryKey: queryKeys.dailyCount(variables.id),
      });
      queryClient.invalidateQueries({ queryKey: queryKeys.participants() });
      queryClient.invalidateQueries({ queryKey: queryKeys.leaderboard() });
      queryClient.invalidateQueries({ queryKey: queryKeys.campaignStats(1) });

      toast.success("Daily count updated successfully!");
    },
    onError: (error) => {
      toast.error(`Failed to update daily count: ${error.message}`);
    },
  });

  const deleteDailyCountMutation = useMutation({
    mutationFn: ({ id, data }) => dailyCountsApi.updateDailyCount(id, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.dailyCounts() });
      queryClient.invalidateQueries({
        queryKey: queryKeys.dailyCount(variables.id),
      });
      queryClient.invalidateQueries({ queryKey: queryKeys.participants() });
      queryClient.invalidateQueries({ queryKey: queryKeys.leaderboard() });
      queryClient.invalidateQueries({ queryKey: queryKeys.campaignStats(1) });

      toast.success("Daily count updated successfully!");
    },
    onError: (error) => {
      toast.error(`Failed to update daily count: ${error.message}`);
    },
  });

  return {
    createDailyCount: createDailyCountMutation.mutate,
    createDailyCountAsync: createDailyCountMutation.mutateAsync,
    isCreating: createDailyCountMutation.isPending,
    createError: createDailyCountMutation.error,

    updateDailyCount: updateDailyCountMutation.mutate,
    updateDailyCountAsync: updateDailyCountMutation.mutateAsync,
    isUpdating: updateDailyCountMutation.isPending,
    updateError: updateDailyCountMutation.error,

    deleteDailyCount: deleteDailyCountMutation.mutate,
    deleteDailyCountAsync: deleteDailyCountMutation.mutateAsync,
    isDeleting: deleteDailyCountMutation.isPending,
    deleteError: deleteDailyCountMutation.error,
  };
};
