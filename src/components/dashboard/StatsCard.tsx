import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    positive: boolean;
  };
  delay?: number;
}

export function StatsCard({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  trend,
  delay = 0 
}: StatsCardProps) {
  return (
    <div 
      className={cn(
        "relative overflow-hidden rounded-2xl bg-card/80 backdrop-blur-sm border border-border/50 p-6",
        "transition-all duration-500 ease-out",
        "hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/30 hover:-translate-y-1",
        "animate-slide-up opacity-0"
      )}
      style={{ animationDelay: `${delay}ms`, animationFillMode: "forwards" }}
    >
      {/* Subtle gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground font-medium tracking-wide">{title}</p>
          <p className="text-4xl font-display font-bold text-foreground tracking-tight">{value}</p>
          {subtitle && (
            <p className="text-xs text-muted-foreground/80 mt-2">{subtitle}</p>
          )}
          {trend && (
            <div className={cn(
              "flex items-center mt-3 text-xs font-medium",
              trend.positive ? "text-success" : "text-destructive"
            )}>
              <svg 
                className={cn("w-3 h-3 mr-1", !trend.positive && "rotate-180")} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
              {trend.positive ? "+" : ""}{trend.value}% from last month
            </div>
          )}
        </div>
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center border border-primary/20">
          <Icon className="w-7 h-7 text-primary" />
        </div>
      </div>
    </div>
  );
}
