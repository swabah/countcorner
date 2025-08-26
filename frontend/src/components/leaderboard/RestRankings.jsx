import React from "react";
import { Award } from "lucide-react";

const RestRankings = ({ rest }) => {
  const getRankIcon = (rank) => {
    return <Award className="h-5 w-5 text-muted-foreground" />;
  };

  if (rest.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h4 className="text-lg font-semibold text-gray-900">
            Rankings #4 - #{rest.length + 3}
          </h4>
        </div>

        <div className="divide-y divide-gray-200">
          {rest.map((participant, idx) => {
            const rank = idx + 4; // because top 3 handled separately
            return (
              <div
                key={participant.id || participant._id}
                className={`flex items-center justify-between p-6 transition-all duration-300 hover:bg-gray-50 ${
                  idx < 3
                    ? "bg-gradient-primary/5 border-l-4 border-l-primary/30"
                    : "bg-white"
                }`}
              >
                <div className="flex items-center gap-4">
                  {/* Rank with Icon */}
                  <div className="flex items-center gap-3 min-w-[80px]">
                    {getRankIcon(rank)}
                    <div className="text-center">
                      <span className="font-bold text-xl text-gray-900">
                        #{rank}
                      </span>
                      <div className="text-xs text-muted-foreground">Rank</div>
                    </div>
                  </div>

                  {/* Participant Info */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-900 mb-1">
                      {participant.name}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Total: {participant.totalContributed} Salawat</span>
                      <span>•</span>
                      <span>
                        Avg: {Math.round(participant.totalContributed / 30)} per
                        day
                      </span>
                    </div>
                  </div>
                </div>

                {/* Stats Display */}
                <div className="text-right">
                  <div className="text-3xl font-bold text-primary mb-1">
                    {participant.totalContributed}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Total Salawat
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RestRankings;
