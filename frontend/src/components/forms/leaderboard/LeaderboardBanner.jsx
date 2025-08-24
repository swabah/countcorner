import { IslamicCard } from "@/components/ui/islamic-card";
import { CardContent } from "@/components/ui/card";

const LeaderboardBanner = ({ totalParticipants, totalCount }) => {
  return (
    <IslamicCard className="mb-10 bg-gradient-to-r from-accent/10 via-primary/5 to-accent-light/10 border border-accent ">
      <CardContent className="py-6 text-center grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Total Salawat */}
        <div>
          <p className="text-muted-foreground text-sm uppercase tracking-wide mb-1">
            Total Salawat
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            {totalCount.toLocaleString()}
          </h2>
        </div>

        {/* Total Participants */}
        <div>
          <p className="text-muted-foreground text-sm uppercase tracking-wide mb-1">
            Participants
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-accent">
            {totalParticipants}
          </h2>
        </div>
      </CardContent>
    </IslamicCard>
  );
};

export default LeaderboardBanner;
