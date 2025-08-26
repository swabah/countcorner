import React, { useState } from "react";
import { useLeaderboard } from "@/features/participants";
import { LoaderContainer } from "@/components/ui/loader";
import PageContainer from "@/components/PageContainer";

// Import components
import {
  SummaryCards,
  TopPodium,
  TabNavigation,
  RestRankings,
  TodaysTab,
  LeaderboardFooter,
} from "@/components/leaderboard";

const Leaderboard = () => {
  const { data: leaderboard, isLoading } = useLeaderboard();
  const [activeTab, setActiveTab] = useState("today"); // 'ranking' or 'today'

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

  // Filter participants with totalContributed > 0
  const participants = (leaderboard?.data || []).filter(
    (p) => p.totalContributed && p.totalContributed > 0
  );

  // Sort participants descending by totalContributed
  const sortedParticipants = [...participants].sort(
    (a, b) => b.totalContributed - a.totalContributed
  );

  // Top 3 podium
  const top3 = sortedParticipants.slice(0, 3);
  const rest = sortedParticipants.slice(3);

  // Today tab participants: use countToday from backend
  const todayParticipants = (leaderboard?.data || [])
    .filter((p) => p.countToday && p.countToday > 0)
    .sort((a, b) => b.countToday - a.countToday);

  const totalTodayCount = todayParticipants.reduce(
    (sum, p) => sum + (Number(p.countToday) || 0),
    0
  );

  return (
    <PageContainer
      title="Community Leaderboard"
      subtitle="Celebrating our dedicated participants in this blessed journey"
    >
      {/* Summary Cards */}
      <SummaryCards participants={participants} />

      {/* Top 3 Podium */}
      <TopPodium top3={top3} />

      {/* Tab Navigation */}
      <TabNavigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        rest={rest}
      />

      {/* Tab Content */}
      {activeTab === "ranking" && <RestRankings rest={rest} />}
      {activeTab === "today" && (
        <TodaysTab
          isLoading={isLoading}
          todayParticipants={todayParticipants}
          totalTodayCount={totalTodayCount}
        />
      )}

      {/* Footer */}
      <LeaderboardFooter />
    </PageContainer>
  );
};

export default Leaderboard;
