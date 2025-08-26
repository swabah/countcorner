import React from "react";
import { IslamicCard } from "@/components/ui/islamic-card";
import { CardContent } from "@/components/ui/card";

const LeaderboardFooter = () => {
  return (
    <div className="mt-16 text-center">
      <IslamicCard>
        <CardContent className="p-8">
          <h3 className="text-xl font-semibold mb-3">
            May Allah Accept Your Efforts
          </h3>
          <p className="text-muted-foreground text-md lg:text-lg leading-relaxed">
            "And whoever does righteous deeds, whether male or female, while
            being a believer - those will enter Paradise and will not be
            wronged, [even as much as] the speck on a date seed."
            <br />
            <span className="text-sm">- Quran 4:124</span>
          </p>
        </CardContent>
      </IslamicCard>
    </div>
  );
};

export default LeaderboardFooter;
