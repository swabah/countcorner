import React, { useState } from "react";
import { IslamicCard } from "@/components/ui/islamic-card";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLeaderboard } from "@/features/participants";
import { Trophy, Medal, Award, Crown } from "lucide-react";
import { LoaderContainer } from "@/components/ui/loader";
import PageContainer from "@/components/PageContainer";

const Leaderboard = () => {
  const { data: leaderboard, isLoading } = useLeaderboard();
  const [activeTab, setActiveTab] = useState("ranking"); // 'ranking' or 'today'

  // Loading state UI
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

  // Filter participants with countTotal > 0
  const participants = (leaderboard?.data || []).filter(
    (p) => p.countTotal && p.countTotal > 0
  );

  // Sort participants descending by countTotal
  const sortedParticipants = [...participants].sort(
    (a, b) => b.countTotal - a.countTotal
  );

  // Top 3 podium
  const top3 = sortedParticipants.slice(0, 3);
  const rest = sortedParticipants.slice(3);

  // Ranking Tab UI helpers
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

  // Today tab participants (assuming countToday field exists)
  // If your data structure differs, adjust accordingly
  const todayParticipants = (leaderboard?.data || []).filter(
    (p) => p.countToday && p.countToday > 0
  );

  return (
    <PageContainer
      title="Community Leaderboard"
      subtitle={
        "Celebrating our dedicated participants in this blessed journey"
      }
    >
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
                  {participant.countTotal}
                </div>
                <p className="text-sm text-muted-foreground">Total Salawat</p>
              </CardContent>
            </IslamicCard>
          );
        })}
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-4  pt-5 mb-8 border-b-2 border-gray-300">
        <button
          onClick={() => setActiveTab("ranking")}
          className={`px-6 py-2 font-semibold rounded-t-md ${
            activeTab === "ranking"
              ? "bg-gray-300 text-black border-t-2 border-accent"
              : "text-gray-500 hover:text-gray-800"
          }`}
        >
          Ranking
        </button>
        <button
          onClick={() => setActiveTab("today")}
          className={`px-6 py-2 font-semibold rounded-t-md ${
            activeTab === "today"
              ? "bg-gray-300 text-black border-t-2 border-accent"
              : "text-gray-500 hover:text-gray-800"
          }`}
        >
          Today
        </button>
      </div>

      {/* Tab content */}
      {activeTab === "ranking" && (
        <>
          {/* Remaining participants list */}
          {rest.length > 0 && (
            <CardContent>
              <div className="space-y-3">
                {rest.map((participant, idx) => {
                  const rank = idx + 4; // because top 3 handled separately
                  return (
                    <div
                      key={participant.id || participant._id}
                      className={`flex items-center justify-between p-4 px-6 rounded-lg transition-all duration-300 hover:shadow-peaceful ${
                        idx < 3
                          ? "bg-gradient-primary/10 border border-primary/20"
                          : "bg-secondary hover:bg-secondary/80"
                      }`}
                    >
                      <div className=" flex items-center gap-3">
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
          )}
        </>
      )}

      {activeTab === "today" && (
        <>
          {todayParticipants.length === 0 ? (
            <p className="text-center text-muted-foreground">
              No salawat recorded today yet.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="table-auto w-full border-collapse border border-gray-200 rounded-lg">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      #
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Count
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Date & Time
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {todayParticipants
                    .sort((a, b) => b.countToday - a.countToday)
                    .map((participant, idx) => {
                      // Use participant logs or timestamps if available
                      // For demo, using current date/time as placeholder for each item
                      const dateTime = participant.lastUpdated
                        ? new Date(participant.lastUpdated).toLocaleString(
                            "en-GB",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                            }
                          )
                        : new Date().toLocaleString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          });

                      return (
                        <tr
                          key={participant.id || participant._id}
                          className="border-b border-gray-200"
                        >
                          <td className="border border-gray-300 px-4 py-3">
                            {idx + 1}
                          </td>
                          <td className="border border-gray-300 px-4 py-3">
                            <span className="inline-block px-3 py-1 text-sm font-semibold text-white bg-blue-500 rounded-full">
                              {participant.countToday}
                            </span>
                          </td>
                          <td className="border border-gray-300 px-4 py-3">
                            {dateTime}
                          </td>
                          <td className="border border-gray-300 px-4 py-3">
                            <button
                              type="button"
                              className="flex items-center gap-1 px-3 py-1 text-red-600 border border-red-600 rounded hover:bg-red-600 hover:text-white transition"
                              onClick={() => {
                                // Implement delete logic here
                                alert(`Delete action for ${participant.name}`);
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                className="w-4 h-4"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

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
    </PageContainer>
  );
};

export default Leaderboard;
