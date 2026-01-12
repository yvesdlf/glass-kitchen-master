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
  primary: "from-amber-500/15 via-amber-500/5 to-transparent",
  accent: "from-orange-500/15 via-orange-500/5 to-transparent",
  success: "from-emerald-500/15 via-emerald-500/5 to-transparent",
  warning: "from-yellow-500/15 via-yellow-500/5 to-transparent",
};

const iconColorVariants = {
  primary: "text-amber-400 bg-gradient-to-br from-amber-500/25 via-amber-500/15 to-orange-500/10 border-amber-500/40",
  accent: "text-orange-400 bg-gradient-to-br from-orange-500/25 via-orange-500/15 to-amber-500/10 border-orange-500/40",
  success: "text-emerald-400 bg-gradient-to-br from-emerald-500/25 via-emerald-500/15 to-teal-500/10 border-emerald-500/40",
  warning: "text-yellow-400 bg-gradient-to-br from-yellow-500/25 via-yellow-500/15 to-amber-500/10 border-yellow-500/40",
};

const hoverIconVariants = {
  primary: "group-hover:bg-gradient-to-br group-hover:from-amber-500 group-hover:to-orange-500 group-hover:text-slate-950 group-hover:border-amber-400 group-hover:shadow-lg group-hover:shadow-amber-500/30",
  accent: "group-hover:bg-gradient-to-br group-hover:from-orange-500 group-hover:to-amber-500 group-hover:text-slate-950 group-hover:border-orange-400 group-hover:shadow-lg group-hover:shadow-orange-500/30",
  success: "group-hover:bg-gradient-to-br group-hover:from-emerald-500 group-hover:to-teal-500 group-hover:text-slate-950 group-hover:border-emerald-400 group-hover:shadow-lg group-hover:shadow-emerald-500/30",
  warning: "group-hover:bg-gradient-to-br group-hover:from-yellow-500 group-hover:to-amber-500 group-hover:text-slate-950 group-hover:border-yellow-400 group-hover:shadow-lg group-hover:shadow-yellow-500/30",
};

const borderHoverVariants = {
  primary: "hover:border-amber-500/50",
  accent: "hover:border-orange-500/50",
  success: "hover:border-emerald-500/50",
  warning: "hover:border-yellow-500/50",
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
        "group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-700/50 p-8",
        "transition-all duration-500 ease-out",
        "hover:shadow-2xl hover:shadow-slate-950/50 hover:-translate-y-2",
        "animate-slide-up opacity-0",
        borderHoverVariants[color]
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
      
      {/* Top accent line with color */}
      <div className={cn(
        "absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500",
        color === "primary" && "bg-gradient-to-r from-transparent via-amber-500 to-transparent",
        color === "accent" && "bg-gradient-to-r from-transparent via-orange-500 to-transparent",
        color === "success" && "bg-gradient-to-r from-transparent via-emerald-500 to-transparent",
        color === "warning" && "bg-gradient-to-r from-transparent via-yellow-500 to-transparent"
      )} />
      
      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-6">
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
          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-slate-800/80 text-slate-500 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300 border border-slate-700/50">
            <ArrowUpRight className="w-5 h-5" />
          </div>
        </div>
        
        <h3 className={cn(
          "font-display text-xl font-semibold text-white mb-3 transition-colors duration-300",
          color === "primary" && "group-hover:text-amber-400",
          color === "accent" && "group-hover:text-orange-400",
          color === "success" && "group-hover:text-emerald-400",
          color === "warning" && "group-hover:text-yellow-400"
        )}>
          {title}
        </h3>
        
        <p className="text-slate-400 text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </Link>
  );
}
