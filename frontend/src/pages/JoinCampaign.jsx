import React from "react";
import { IslamicCard } from "@/components/ui/islamic-card";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { JoinCampaignForm } from "@/components/forms/JoinCampaignForm";
import { Heart, UserPlus } from "lucide-react";

const JoinCampaign = () => {
  return (
    <div className="min-h-screen bg-gradient-peaceful py-16 lg:py-24">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center ">
          <h1 className="text-4xl font-bold ">Join the Blessed Campaign</h1>
        </div>

        <IslamicCard gradient className="mb-6 mt-12 p-6 md:p-8">
          <CardHeader className="text-center p-5">
            <CardTitle className="flex flex-col md:flex-row items-center justify-center gap-2 text-2xl">
              <UserPlus className="h-6 w-6 hidden" />
              Register Your Participation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <JoinCampaignForm />
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
                    August 15 - September 15, 2025
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
      </div>
    </div>
  );
};

export default JoinCampaign;
