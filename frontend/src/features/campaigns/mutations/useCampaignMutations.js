/**
 * Campaign mutation hooks
 * Handles campaign data modifications using React Query
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { campaignsApi } from "../api/campaigns.api";
import { toast } from "sonner";
import { queryKeys } from "@/lib/query/keys";

/**
 * Create a new campaign
 */
export const useCreateCampaign = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: campaignsApi.createCampaign,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.campaigns() });
      toast.success("Campaign created successfully!");
    },
    onError: (error) => {
      toast.error(`Failed to create campaign: ${error.message}`);
    },
  });
};

/**
 * Update an existing campaign
 */
export const useUpdateCampaign = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => campaignsApi.updateCampaign(id, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.campaigns() });
      queryClient.invalidateQueries({
        queryKey: queryKeys.campaign(variables.id),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.campaignStats(variables.id),
      });
      toast.success("Campaign updated successfully!");
    },
    onError: (error) => {
      toast.error(`Failed to update campaign: ${error.message}`);
    },
  });
};

/**
 * Delete a campaign
 */
export const useDeleteCampaign = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: campaignsApi.deleteCampaign,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.campaigns() });
      toast.success("Campaign deleted successfully!");
    },
    onError: (error) => {
      toast.error(`Failed to delete campaign: ${error.message}`);
    },
  });
};
