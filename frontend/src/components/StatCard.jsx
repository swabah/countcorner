import { IslamicCard } from "@/components/ui/islamic-card";
import { CardContent } from "@/components/ui/card";

const StatCard = ({ title, value, subtitle, icon: Icon, gradient = false }) => {
  return (
    <IslamicCard gradient={gradient} className="overflow-hidden">
      <CardContent className="p-6 lg:p-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-md mb-1 font-medium text-muted-foreground">
              {title}
            </p>
            <p className="text-3xl xl:text-4xl font-bold text-foreground">
              {value}
            </p>
            {subtitle && (
              <p className="text-sm text-muted-foreground">{subtitle}</p>
            )}
          </div>
          {Icon && (
            <div className="p-3 bg-gradient-primary rounded-full">
              <Icon className="h-6 w-6 text-primary-foreground" />
            </div>
          )}
        </div>
      </CardContent>
    </IslamicCard>
  );
};

export default StatCard;
