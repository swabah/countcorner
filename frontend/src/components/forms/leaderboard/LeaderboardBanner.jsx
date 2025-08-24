import { IslamicCard } from "@/components/ui/islamic-card";
import { CardContent } from "@/components/ui/card";

const LeaderboardBanner = ({ totalParticipants, totalCount }) => {
  return (
    <CardContent className="bg-blue-100 text-center grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Total Salawat */}
      <div className=" bg-gradient-to-r from-accent/10 via-primary/5 to-accent-light/10 border border-accent">
        <p className="text-muted-foreground  text-sm uppercase tracking-wide mb-1">
          Total Salawat
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-primary">
          {totalCount.toLocaleString()}
        </h2>
      </div>

      {/* Total Participants */}
      <div className="bg-gradient-to-r from-accent/10 via-primary/5 to-accent-light/10 border border-accent">
        <p className="text-muted-foreground text-sm uppercase tracking-wide mb-1">
          Participants
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-accent">
          {totalParticipants}
        </h2>
      </div>
    </CardContent>
  );
};

export default LeaderboardBanner;
