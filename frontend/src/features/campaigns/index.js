/**
 * Campaigns feature exports
 * Centralized export point for all campaigns-related functionality
 */

// API
export { campaignsApi } from "./api/campaigns.api";

// Queries
export { useCampaigns, useCampaign } from "./queries/useCampaigns";

// Mutations
export {
  useCreateCampaign,
  useUpdateCampaign,
  useDeleteCampaign,
} from "./mutations/useCampaignMutations";
