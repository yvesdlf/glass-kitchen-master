import { Link } from "react-router-dom";
import { LucideIcon, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  to: string;
  color?: "primary" | "accent" | "success" | "warning";
  delay?: number;
}

const colorVariants = {
  primary: "from-primary/15 to-primary/5",
  accent: "from-accent/15 to-accent/5",
  success: "from-success/15 to-success/5",
  warning: "from-warning/15 to-warning/5",
};

const iconColorVariants = {
  primary: "text-primary bg-gradient-to-br from-primary/20 to-primary/5 border-primary/20",
  accent: "text-accent bg-gradient-to-br from-accent/20 to-accent/5 border-accent/20",
  success: "text-success bg-gradient-to-br from-success/20 to-success/5 border-success/20",
  warning: "text-warning bg-gradient-to-br from-warning/20 to-warning/5 border-warning/20",
};

const hoverIconVariants = {
  primary: "group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary",
  accent: "group-hover:bg-accent group-hover:text-accent-foreground group-hover:border-accent",
  success: "group-hover:bg-success group-hover:text-success-foreground group-hover:border-success",
  warning: "group-hover:bg-warning group-hover:text-warning-foreground group-hover:border-warning",
};

export function FeatureCard({ 
  title, 
  description, 
  icon: Icon, 
  to, 
  color = "primary",
  delay = 0 
}: FeatureCardProps) {
  return (
    <Link 
      to={to}
      className={cn(
        "group relative overflow-hidden rounded-2xl bg-card/80 backdrop-blur-sm border border-border/50 p-7",
        "transition-all duration-500 ease-out",
        "hover:shadow-2xl hover:shadow-primary/10 hover:border-slate-600/50 hover:-translate-y-2",
        "animate-slide-up opacity-0"
      )}
      style={{ animationDelay: `${delay}ms`, animationFillMode: "forwards" }}
    >
      {/* Background gradient on hover */}
      <div 
        className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-all duration-500",
          colorVariants[color]
        )} 
      />
      
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-5">
          <div 
            className={cn(
              "w-14 h-14 rounded-2xl flex items-center justify-center border transition-all duration-500",
              iconColorVariants[color],
              hoverIconVariants[color]
            )}
          >
            <Icon className="w-7 h-7" />
          </div>
          
          {/* Arrow indicator */}
          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-muted/50 text-muted-foreground opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
            <ArrowUpRight className="w-5 h-5" />
          </div>
        </div>
        
        <h3 className="font-display text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>
        
        <p className="text-muted-foreground text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </Link>
  );
}
