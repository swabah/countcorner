import React from "react";

const SummaryCards = ({ participants }) => {
  const totalSalawat = participants.reduce(
    (sum, p) => sum + (p.totalContributed || 0),
    0
  );
  const averagePerPerson = Math.round(totalSalawat / participants.length);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-6 pt-6">
      <div className="bg-gradient-primary/10 border border-primary/20 rounded-lg p-4 lg:p-6 text-center">
        <div className="text-2xl lg:text-3xl font-bold text-primary mb-1">
          {participants.length}
        </div>
        <div className="text-sm text-muted-foreground">Total Participants</div>
      </div>

      <div className="bg-gradient-accent/10 border border-accent/20 rounded-lg p-4 lg:p-6 text-center">
        <div className="text-2xl lg:text-3xl font-bold text-accent mb-1">
          {totalSalawat}
        </div>
        <div className="text-sm text-muted-foreground">Total Salawat</div>
      </div>

      <div className="bg-gradient-peaceful/10 border border-peaceful/20 rounded-lg p-4 lg:p-6 text-center sm:col-span-2 lg:col-span-1">
        <div className="text-2xl lg:text-3xl font-bold text-primary-glow mb-1">
          {averagePerPerson}
        </div>
        <div className="text-sm text-muted-foreground">Average Per Person</div>
      </div>
    </div>
  );
};

export default SummaryCards;
