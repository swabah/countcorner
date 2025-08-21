import React from "react";
import { IslamicCard } from "@/components/ui/islamic-card";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLeaderboard } from "@/features/participants";
import { Trophy, Medal, Award, Crown } from "lucide-react";
import { LoaderContainer } from "@/components/ui/loader";

const Leaderboard = () => {
  const { data: leaderboard, isLoading } = useLeaderboard();

  // Defensive: If no data, show loading or empty
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-peaceful py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Community Leaderboard</h1>
            <p className="text-xl text-muted-foreground">
              Celebrating our dedicated participants in this blessed journey
            </p>
          </div>
          <LoaderContainer
            isLoading
            loadingText="Loading leaderboard data..."
            size="lg"
            variant="accent"
            className="min-h-[400px]"
          />
        </div>
      </div>
    );
  }

  const filteredParticipants = (leaderboard?.data || []).filter(
    (p) => p.countTotal && p.countTotal > 0
  );

  // Sort participants by countTotal DESCending
  const sortedParticipants = [...filteredParticipants].sort(
    (a, b) => b.countTotal - a.countTotal
  );

  // Take top 3, then remaining
  const top3 = sortedParticipants.slice(0, 3);
  const rest = sortedParticipants.slice(3);

  // Rank icon helper
  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-accent" />;
      case 2:
        return <Trophy className="h-6 w-6 text-primary-glow" />;
      case 3:
        return <Medal className="h-6 w-6 text-accent-light" />;
      default:
        return <Award className="h-5 w-5 text-muted-foreground" />;
    }
  };

  // Badge variant helper
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

  // Card style helper for top 3
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
    <div className="min-h-screen bg-gradient-peaceful py-16">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Community Leaderboard</h1>
        </div>

        {/* Top 3 Podium */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
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
                <CardContent>
                  <div className="text-3xl font-bold text-primary mb-2">
                    {participant.countTotal}
                  </div>
                  <p className="text-sm text-muted-foreground">Total Salawat</p>
                </CardContent>
              </IslamicCard>
            );
          })}
        </div>

        {/* Remaining Participants */}
        {rest.length && (
          <IslamicCard gradient>
            <CardHeader>
              <CardTitle className="text-2xl text-center">
                Complete Rankings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {rest.map((participant, idx) => {
                  // Overall rank = 3 + idx + 1
                  const rank = 3 + idx + 1;
                  return (
                    <div
                      key={participant.id || participant._id}
                      className={`flex items-center justify-between p-4 rounded-lg transition-all duration-300 hover:shadow-peaceful ${
                        rank <= 3
                          ? "bg-gradient-primary/10 border border-primary/20"
                          : "bg-secondary hover:bg-secondary/80"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 min-w-[60px]">
                          {getRankIcon(rank)}
                          <span className="font-bold text-lg">#{rank}</span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">
                            {participant.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Avg: {Math.round(participant.countTotal / 30)} per
                            day
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">
                          {participant.countTotal}
                        </div>
                        <p className="text-sm text-muted-foreground">Salawat</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </IslamicCard>
        )}

        <div className="mt-8 text-center">
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
      </div>
    </div>
  );
};

export default Leaderboard;
