import { useCampaign } from "@/features";

/**
 * Custom hook for campaign configuration & utilities
 * @param {string} campaignId
 */
export const useCampaignConfig = (campaignId) => {
  const { data: campaign } = useCampaign(campaignId);

  // Loading state if campaign is not yet available
  const loading = !campaign;

  // Empty config as fallback
  const CAMPAIGN_CONFIG = campaign
    ? {
        START_DATE: new Date(campaign.data.startDate),
        END_DATE: new Date(campaign.data.endDate),
        TOTAL_DAYS: 30,
      }
    : {
        START_DATE: null,
        END_DATE: null,
        TOTAL_DAYS: 30,
      };

  // Helpers inside hook
  const isDateInCampaignPeriod = (date) => {
    if (!date || !CAMPAIGN_CONFIG.START_DATE || !CAMPAIGN_CONFIG.END_DATE)
      return false;
    const dateOnly = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
    const startDate = new Date(
      CAMPAIGN_CONFIG.START_DATE.getFullYear(),
      CAMPAIGN_CONFIG.START_DATE.getMonth(),
      CAMPAIGN_CONFIG.START_DATE.getDate()
    );
    const endDate = new Date(
      CAMPAIGN_CONFIG.END_DATE.getFullYear(),
      CAMPAIGN_CONFIG.END_DATE.getMonth(),
      CAMPAIGN_CONFIG.END_DATE.getDate()
    );
    return dateOnly >= startDate && dateOnly <= endDate;
  };

  const getRemainingDays = () => {
    if (!CAMPAIGN_CONFIG.END_DATE) return 0;

    const today = new Date();
    const endDate = new Date(CAMPAIGN_CONFIG.END_DATE);

    // Use UTC dates (year, month, day) to avoid daylight saving issues
    const utcToday = Date.UTC(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    const utcEndDate = Date.UTC(
      endDate.getFullYear(),
      endDate.getMonth(),
      endDate.getDate()
    );

    const diffMilliseconds = utcEndDate - utcToday;
    const diffDays = Math.ceil(diffMilliseconds / (1000 * 60 * 60 * 24));

    return Math.max(0, diffDays);
  };

  const formatCampaignDate = (date) => {
    if (!date) return "";
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return {
    campaign,
    loading,
    CAMPAIGN_CONFIG,
    isDateInCampaignPeriod,
    getRemainingDays,
    formatCampaignDate,
  };
};
