import React from "react";
import { IslamicCard } from "@/components/ui/islamic-card";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { JoinCampaignForm } from "@/components/forms/JoinCampaignForm";
import { Heart, UserPlus } from "lucide-react";
import PageContainer from "@/components/PageContainer";
import { useCampaignConfig } from "@/utils/campaignUtils";
import { useCampaign } from "@/features";
import { LoaderContainer } from "@/components/ui/loader";

const JoinCampaign = () => {
  const { data: campaign, isLoading } = useCampaign("68a7351580cbe659c21bfcb1");
  const campaignId = campaign?.data._id;
  
  const { CAMPAIGN_CONFIG, formatCampaignDate } = useCampaignConfig(campaignId);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-peaceful py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Register Your Participation</h1>
          </div>
          <LoaderContainer
            isLoading
            loadingText="Loading Campaign Data..."
            size="lg"
            variant="accent"
            className="min-h-[400px]"
          />
        </div>
      </div>
    );
  }
  
  return (
    <PageContainer title={"Join the Blessed Campaign"}>
      <IslamicCard gradient className="mb-6 mt-12 p-6 md:p-8">
        <CardHeader className="text-center p-5">
          <CardTitle className="flex flex-col md:flex-row items-center justify-center gap-2 text-2xl">
            <UserPlus className="h-6 w-6 hidden" />
            Register Your Participation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <JoinCampaignForm campaignId={campaignId} />
        </CardContent>
      </IslamicCard>

      <IslamicCard>
        <CardContent className="p-8 py-12">
          <div className="text-center space-y-4">
            <Heart className="h-12 w-12 text-accent mx-auto" />
            <h3 className="text-xl font-semibold">The Reward of Salawat</h3>
            <p className="text-muted-foreground leading-relaxed">
              "Whoever sends blessings upon me once, Allah will send blessings
              upon him ten times." <br /> - Prophet Muhammad ﷺ (Sahih Muslim)
            </p>
            <div className="grid md:grid-cols-2 gap-4 pt-10 text-sm">
              <div className="p-4 py-8 bg-secondary rounded-lg">
                <h4 className="font-semibold text-lg mb-1">
                  Campaign Duration
                </h4>
                <p className="text-muted-foreground">
                  {formatCampaignDate(CAMPAIGN_CONFIG.START_DATE)} -{" "}
                  {formatCampaignDate(CAMPAIGN_CONFIG.END_DATE)}
                </p>
              </div>
              <div className="p-4 py-8 bg-secondary rounded-lg">
                <h4 className="font-semibold text-lg mb-1">Community Goal</h4>
                <p className="text-muted-foreground">
                  1 million collective Salawat
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </IslamicCard>
    </PageContainer>
  );
};

export default JoinCampaign;
