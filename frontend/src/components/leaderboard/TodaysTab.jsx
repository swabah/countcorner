import React from "react";
import { IslamicCard } from "@/components/ui/islamic-card";
import { CardContent } from "@/components/ui/card";
import { LoaderContainer } from "@/components/ui/loader";
import { Trophy, Medal, Crown } from "lucide-react";

const TodaysTab = ({ isLoading, todayParticipants, totalTodayCount }) => {
  if (isLoading) {
    return (
      <div className="text-center py-12">
        <LoaderContainer
          isLoading
          loadingText="Loading today's data..."
          size="md"
          variant="accent"
        />
      </div>
    );
  }

  if (todayParticipants.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📿</div>
        <h3 className="text-xl font-semibold mb-2">
          No Salawat Recorded Today
        </h3>
        <p className="text-muted-foreground">
          Be the first to start your daily spiritual journey!
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Today's Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-8">
        <IslamicCard className="text-center bg-gradient-primary/10 border-primary/20">
          <CardContent className="p-4 lg:p-6">
            <div className="text-2xl lg:text-3xl font-bold text-primary mb-2">
              {todayParticipants.length}
            </div>
            <p className="text-sm text-muted-foreground">Active Today</p>
          </CardContent>
        </IslamicCard>

        <IslamicCard className="text-center bg-gradient-accent/10 border-accent/20">
          <CardContent className="p-4 lg:p-6">
            <div className="text-2xl lg:text-3xl font-bold text-accent mb-2">
              {totalTodayCount}
            </div>
            <p className="text-sm text-muted-foreground">Total Salawat Today</p>
          </CardContent>
        </IslamicCard>

        <IslamicCard className="text-center bg-gradient-peaceful/10 border-peaceful/20 sm:col-span-2 lg:col-span-1">
          <CardContent className="p-4 lg:p-6">
            <div className="text-2xl lg:text-3xl font-bold text-primary-glow mb-2">
              {Math.round(totalTodayCount / todayParticipants.length)}
            </div>
            <p className="text-sm text-muted-foreground">Average Per Person</p>
          </CardContent>
        </IslamicCard>
      </div>

      {/* Today's Participants Table */}
      <div className="w-full">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h3 className="text-lg font-semibold text-gray-900">
              Today's Top Performers
            </h3>
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block">
            <table className="w-full">
              <thead className="w-full bg-white">
                <tr className="border-b border-gray-200">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rank
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Participant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Today's Count
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total All Time
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {todayParticipants.map((participant, index) => (
                  <tr
                    key={participant.id || participant._id}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {index < 3 ? (
                          <div className="flex items-center gap-2">
                            {index === 0 && (
                              <Crown className="h-5 w-5 text-accent" />
                            )}
                            {index === 1 && (
                              <Trophy className="h-5 w-5 text-primary-glow" />
                            )}
                            {index === 2 && (
                              <Medal className="h-5 w-5 text-accent-light" />
                            )}
                            <span className="font-bold text-lg">
                              #{index + 1}
                            </span>
                          </div>
                        ) : (
                          <span className="font-medium text-gray-900">
                            #{index + 1}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {participant.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                        {participant.countToday} Salawat
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {participant.totalContributed || 0}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden">
            <div className="divide-y divide-gray-200">
              {todayParticipants.map((participant, index) => (
                <div
                  key={participant.id || participant._id}
                  className="p-4 hover:bg-gray-50"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {index < 3 ? (
                        <div className="flex items-center gap-2">
                          {index === 0 && (
                            <Crown className="h-5 w-5 text-accent" />
                          )}
                          {index === 1 && (
                            <Trophy className="h-5 w-5 text-primary-glow" />
                          )}
                          {index === 2 && (
                            <Medal className="h-5 w-5 text-accent-light" />
                          )}
                          <span className="font-bold text-lg text-gray-900">
                            #{index + 1}
                          </span>
                        </div>
                      ) : (
                        <span className="font-bold text-lg text-gray-900">
                          #{index + 1}
                        </span>
                      )}
                    </div>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      {participant.countToday} Salawat
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900">
                      {participant.name}
                    </h4>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>Total All Time:</span>
                      <span className="font-medium text-gray-900">
                        {participant.totalContributed || 0}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TodaysTab;
