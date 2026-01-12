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
        "relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-700/50 p-6",
        "transition-all duration-500 ease-out",
        "hover:shadow-2xl hover:shadow-amber-500/10 hover:border-amber-500/30 hover:-translate-y-1",
        "animate-slide-up opacity-0",
        "backdrop-blur-xl"
      )}
      style={{ animationDelay: `${delay}ms`, animationFillMode: "forwards" }}
    >
      {/* Subtle copper glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-orange-500/5 opacity-0 hover:opacity-100 transition-opacity duration-500" />
      
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="relative flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm text-slate-400 font-medium tracking-wide uppercase">{title}</p>
          <p className="text-4xl font-display font-bold text-white tracking-tight">{value}</p>
          {subtitle && (
            <p className="text-xs text-slate-500 mt-2">{subtitle}</p>
          )}
          {trend && (
            <div className={cn(
              "flex items-center mt-3 text-xs font-medium",
              trend.positive ? "text-emerald-400" : "text-red-400"
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
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/20 via-orange-500/15 to-amber-600/10 flex items-center justify-center border border-amber-500/30 shadow-lg shadow-amber-500/10">
          <Icon className="w-7 h-7 text-amber-400" />
        </div>
      </div>
    </div>
  );
}
