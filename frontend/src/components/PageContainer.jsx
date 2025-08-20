import { cn } from "@/lib/utils";

const PageContainer = ({ 
  children, 
  className,
  title,
  subtitle,
  maxWidth = "max-w-4xl",
  ...props 
}) => {
  return (
    <div className="min-h-screen bg-gradient-peaceful py-16">
      <div className={cn("container mx-auto px-4", maxWidth)}>
        {(title || subtitle) && (
          <div className="text-center mb-8">
            {title && (
              <h1 className="text-4xl font-bold mb-4">{title}</h1>
            )}
            {subtitle && (
              <p className="text-xl text-muted-foreground">{subtitle}</p>
            )}
          </div>
        )}
        <div className={cn(className)} {...props}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default PageContainer;