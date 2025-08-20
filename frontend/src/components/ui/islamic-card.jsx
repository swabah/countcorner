import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const IslamicCard = ({ children, className, gradient = false, ...props }) => {
  return (
    <Card 
      className={cn(
        "transition-elegant hover:shadow-elevated",
        gradient && "bg-gradient-peaceful",
        className
      )} 
      {...props}
    >
      {children}
    </Card>
  );
};

export { IslamicCard };