import React from "react";
import { IslamicCard } from "@/components/ui/islamic-card";
import { CardContent } from "@/components/ui/card";
import { AddCountForm } from "@/components/forms/AddCountForm";
import { AlertCircle } from "lucide-react";
import { useCampaignConfig } from "@/utils/campaignUtils";
import PageContainer from "@/components/PageContainer";

const AddCount = () => {
  const {
    CAMPAIGN_CONFIG,
    isDateInCampaignPeriod,
    formatCampaignDate,
    loading,
  } = useCampaignConfig("68a7351580cbe659c21bfcb1"); // Use campaignId as needed

  // Show loading message or fallback UI while data loads
  if (loading || !CAMPAIGN_CONFIG.START_DATE || !CAMPAIGN_CONFIG.END_DATE) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="text-lg text-muted-foreground">
          Loading campaign...
        </span>
      </div>
    );
  }

  return (
    <PageContainer
      title={"Add Your Daily Count"}
      subtitle={
        <div className="flex items-center justify-center gap-2 text-muted-foreground">
          <AlertCircle className="h-4 w-4 hidden md:block" />
          <span className="text-sm">
            <strong>
              Campaign Period: <br className="md:hidden " />{" "}
            </strong>
            {formatCampaignDate(CAMPAIGN_CONFIG.START_DATE)} -{" "}
            {formatCampaignDate(CAMPAIGN_CONFIG.END_DATE)}
          </span>
        </div>
      }
    >
      <IslamicCard gradient className="mb-16 p-6">
        <CardContent>
          <AddCountForm />
        </CardContent>
      </IslamicCard>

      <IslamicCard>
        <CardContent className="p-8 text-center">
          <h3 className="text-xl font-semibold mb-3">Daily Reminder</h3>
          <p className="text-muted-foreground  lg:text-xl leading-relaxed mb-4">
            "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ"
          </p>
          <p className="text-sm lg:text-lg text-muted-foreground">
            Allahumma salli 'ala Muhammadin wa 'ala ali Muhammad
          </p>
          <p className="text-sm lg:text-md text-muted-foreground mt-2">
            "O Allah, send prayers upon Muhammad and the family of Muhammad"
          </p>
        </CardContent>
      </IslamicCard>
    </PageContainer>
  );
};

export default AddCount;
