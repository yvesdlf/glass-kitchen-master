import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";
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
  primary: "from-primary/20 to-primary/5 group-hover:from-primary/30 group-hover:to-primary/10",
  accent: "from-accent/20 to-accent/5 group-hover:from-accent/30 group-hover:to-accent/10",
  success: "from-success/20 to-success/5 group-hover:from-success/30 group-hover:to-success/10",
  warning: "from-warning/20 to-warning/5 group-hover:from-warning/30 group-hover:to-warning/10",
};

const iconColorVariants = {
  primary: "text-primary bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground",
  accent: "text-accent bg-accent/10 group-hover:bg-accent group-hover:text-accent-foreground",
  success: "text-success bg-success/10 group-hover:bg-success group-hover:text-success-foreground",
  warning: "text-warning bg-warning/10 group-hover:bg-warning group-hover:text-warning-foreground",
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
        "group relative overflow-hidden rounded-2xl bg-card border border-border p-6",
        "transition-all duration-300 ease-out",
        "hover:shadow-xl hover:border-primary/30 hover:-translate-y-1",
        "animate-slide-up opacity-0"
      )}
      style={{ animationDelay: `${delay}ms`, animationFillMode: "forwards" }}
    >
      {/* Background gradient */}
      <div 
        className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300",
          colorVariants[color]
        )} 
      />
      
      {/* Content */}
      <div className="relative z-10">
        <div 
          className={cn(
            "w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-all duration-300",
            iconColorVariants[color]
          )}
        >
          <Icon className="w-7 h-7" />
        </div>
        
        <h3 className="font-display text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        
        <p className="text-muted-foreground text-sm leading-relaxed">
          {description}
        </p>
        
        {/* Arrow indicator */}
        <div className="mt-4 flex items-center text-primary font-medium text-sm opacity-0 group-hover:opacity-100 translate-x-0 group-hover:translate-x-1 transition-all duration-300">
          Open module
          <svg 
            className="w-4 h-4 ml-1" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M17 8l4 4m0 0l-4 4m4-4H3" 
            />
          </svg>
        </div>
      </div>
    </Link>
  );
}
