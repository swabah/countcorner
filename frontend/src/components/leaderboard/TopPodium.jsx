import React from "react";
import { IslamicCard } from "@/components/ui/islamic-card";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Crown } from "lucide-react";

const TopPodium = ({ top3 }) => {
  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-accent" />;
      case 2:
        return <Trophy className="h-6 w-6 text-primary-glow" />;
      case 3:
        return <Medal className="h-6 w-6 text-accent-light" />;
      default:
        return null;
    }
  };

  const getRankBadgeVariant = (rank) => {
    switch (rank) {
      case 1:
        return "default";
      case 2:
        return "secondary";
      case 3:
        return "outline";
      default:
        return "outline";
    }
  };

  const getCardClassName = (rank) => {
    switch (rank) {
      case 1:
        return "border-accent shadow-gold bg-gradient-gold/5";
      case 2:
        return "border-primary-glow shadow-peaceful bg-gradient-primary/5";
      case 3:
        return "border-accent-light shadow-peaceful bg-gradient-peaceful";
      default:
        return "";
    }
  };

  return (
    <div className="grid md:grid-cols-3 gap-6 mb-12">
      {top3.map((participant, idx) => {
        const rank = idx + 1;
        return (
          <IslamicCard
            key={participant.id || participant._id}
            className={`text-center transform transition-all duration-300 ${getCardClassName(
              rank
            )}`}
          >
            <CardHeader className="pb-2">
              <div className="flex justify-center mb-2">
                {getRankIcon(rank)}
              </div>
              <Badge
                variant={getRankBadgeVariant(rank)}
                className="mx-auto mb-2"
              >
                Rank #{rank}
              </Badge>
              <CardTitle className="text-xl">{participant.name}</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-primary mb-2">
                {participant.totalContributed}
              </div>
              <p className="text-sm text-muted-foreground">Total Salawat</p>
            </CardContent>
          </IslamicCard>
        );
      })}
    </div>
  );
};

export default TopPodium;
