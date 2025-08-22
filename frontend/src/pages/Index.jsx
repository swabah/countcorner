import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { IslamicCard } from "@/components/ui/islamic-card";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StatCard from "@/components/StatCard";
import { Users, Heart, Calendar, TrendingUp } from "lucide-react";
import heroImage from "@/assets/islamic-hero.jpg";
import { useCampaign } from "@/features";

const Index = () => {
  const { data: campaign } = useCampaign("68a7351580cbe659c21bfcb1");
  console.log(campaign.data.name);
  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-peaceful">
      {/* Hero Section */}
      <div
        className="relative px-6 py-16 md:py-20 h-auto  xl:h-screen w-full flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/80"></div>
        <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
          <h1 className="text-3xl md:text-6xl lg:text-7xl font-bold mb-6 leading-snug">
            {campaign.data.name}
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl mb-8 text-white/90 max-w-3xl mx-auto leading-tight">
            {campaign.data.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/join">
              <Button
                variant="hero"
                size="lg"
                className="text-lg px-8 py-4 min-w-[200px]"
              >
                Join Campaign
              </Button>
            </Link>
            <Link to="/leaderboard">
              <Button
                variant="gold"
                size="lg"
                className="text-lg px-8 py-4 min-w-[200px]"
              >
                View Leaderboard
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 px-6 max-w-5xl lg:py-24">
        <div className="flex flex-col items-center gap-10 md:gap-16  lg:gap-20 mx-auto">
          {/* Campaign Info */}
          <div className="mx-auto ">
            <CardTitle className="text-3xl lg:text-5xl font-semibold text-center">
              About This Campaign
            </CardTitle>
            <p className="text-lg leading-relaxed text-center pb-10">
              "Indeed, Allah and His angels send blessings on the Prophet. Oh
              you who believe! Send blessings on him and salute him with a
              worthy salutation." - Quran 33:56
            </p>
            <hr />
            <div className="grid md:grid-cols-2 gap-5 text-center">
              <div className="border-3 shadow-md border p-6 rounded-lg">
                <h3 className="font-semibold mb-1 text-lg">
                  Join the Movement
                </h3>
                <p className="text-muted-foreground">
                  Register your name and become part of our blessed community
                </p>
              </div>
              <div className="border-3 shadow-md border p-6 rounded-lg">
                <h3 className="font-semibold mb-1 text-lg">
                  Daily Contribution
                </h3>
                <p className="text-muted-foreground">
                  Submit your daily Salat count and track your spiritual
                  progress
                </p>
              </div>
              <div className="border-3 shadow-md border p-6 rounded-lg">
                <h3 className="font-semibold mb-1 text-lg">Community Growth</h3>
                <p className="text-muted-foreground">
                  Watch our collective blessings multiply as we unite in
                  devotion
                </p>
              </div>
            </div>
            <div className="text-center pt-12 lg:pt-20  pb-5 lg:pb-10">
              <Link to="/join">
                <Button
                  variant="hero"
                  size="lg"
                  className="text-lg w-full lg:px-10 py-4"
                >
                  Start Your Spiritual Journey
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
