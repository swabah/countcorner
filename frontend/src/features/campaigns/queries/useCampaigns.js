/**
 * Campaign query hooks
 * Handles campaign data fetching using React Query
 */

import { useQuery } from "@tanstack/react-query";
import { campaignsApi } from "../api/campaigns.api";
import { queryKeys, queryOptions } from "@/lib/query/keys";

/**
 * Fetch all campaigns
 */
export const useCampaigns = () => {
  return useQuery({
    queryKey: queryKeys.campaigns(),
    queryFn: campaignsApi.getCampaigns,
  });
};

/**
 * Fetch a single campaign by ID
 */
export const useCampaign = (id) => {
  return useQuery({
    queryKey: queryKeys.campaign(id),
    queryFn: () => campaignsApi.getCampaign(id),
    enabled: !!id,
  });
};
