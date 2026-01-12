import { 
  BookOpen, 
  Calculator, 
  DollarSign, 
  Upload, 
  ChefHat, 
  TrendingUp,
  Package,
  FileSpreadsheet,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { FeatureCard } from "@/components/dashboard/FeatureCard";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const features = [
  {
    title: "Recipe Book",
    description: "Browse, search and manage your complete recipe collection with detailed instructions and photos.",
    icon: BookOpen,
    to: "/recipes",
    color: "primary" as const,
  },
  {
    title: "Create Recipe",
    description: "Build new recipes with our intuitive editor. Add ingredients, steps, and calculate costs automatically.",
    icon: ChefHat,
    to: "/recipes/create",
    color: "accent" as const,
  },
  {
    title: "Ingredients",
    description: "Manage your ingredient database with current prices, suppliers, and nutritional information.",
    icon: Package,
    to: "/ingredients",
    color: "success" as const,
  },
  {
    title: "Advanced Costing",
    description: "Deep dive into recipe costs with labor, overhead, and profit margin calculations.",
    icon: Calculator,
    to: "/costing",
    color: "warning" as const,
  },
  {
    title: "Price Lists",
    description: "View and manage supplier price lists. Track price changes and compare vendors.",
    icon: DollarSign,
    to: "/price-lists",
    color: "primary" as const,
  },
  {
    title: "Suppliers",
    description: "Add and manage your suppliers, contacts, and business details.",
    icon: FileSpreadsheet,
    to: "/suppliers",
    color: "success" as const,
  },
  {
    title: "Upload Data",
    description: "Import recipes and price lists from spreadsheets. Bulk upload your existing data.",
    icon: Upload,
    to: "/upload",
    color: "accent" as const,
  },
];

const stats = [
  { title: "Total Recipes", value: "0", icon: BookOpen, subtitle: "In your collection" },
  { title: "Ingredients", value: "0", icon: Package, subtitle: "In database" },
  { title: "Avg. Food Cost", value: "0%", icon: TrendingUp, subtitle: "Target: 28-32%" },
  { title: "Price Lists", value: "0", icon: FileSpreadsheet, subtitle: "From suppliers" },
];

export default function Index() {
  return (
    <Layout>
      {/* Hero Section - Deep slate with prominent copper accents */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 min-h-[520px]">
        {/* Animated copper gradient orbs */}
        <div className="absolute top-[-150px] right-[-100px] w-[700px] h-[700px] rounded-full bg-gradient-radial from-amber-500/30 via-orange-600/15 to-transparent blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-[-100px] left-[-50px] w-[500px] h-[500px] rounded-full bg-gradient-radial from-amber-600/25 via-orange-500/10 to-transparent blur-3xl animate-pulse" style={{ animationDuration: '6s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-gradient-radial from-slate-700/20 to-transparent blur-3xl" />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
        
        <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
          <div className="max-w-3xl">
            {/* Badge with copper glow */}
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500/20 via-orange-500/15 to-amber-500/20 border border-amber-500/40 text-amber-400 mb-10 backdrop-blur-sm shadow-lg shadow-amber-500/10 animate-fade-in">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-semibold tracking-wider uppercase">Glass Kitchen Master V.1</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-8 leading-[1.05] tracking-tight animate-fade-in">
              Your Complete
              <span className="block mt-2 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent drop-shadow-lg">
                Kitchen Management
              </span>
              <span className="block mt-2">Solution</span>
            </h1>
            
            <p className="text-xl text-slate-300/90 mb-12 max-w-2xl leading-relaxed animate-fade-in" style={{ animationDelay: '100ms' }}>
              Combine recipe management, ingredient tracking, and advanced costing in one powerful platform. 
              Take control of your kitchen operations and maximize profitability.
            </p>
            
            <div className="flex flex-wrap gap-5 animate-fade-in" style={{ animationDelay: '200ms' }}>
              <Button 
                size="lg" 
                asChild
                className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:via-orange-400 hover:to-amber-500 text-slate-950 font-semibold shadow-xl shadow-amber-500/30 border-0 px-8 py-6 text-base transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/40"
              >
                <Link to="/recipes/create">
                  Create Your First Recipe
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                asChild
                className="border-2 border-slate-500/50 text-slate-200 hover:bg-slate-800/50 hover:text-white hover:border-amber-500/50 backdrop-blur-sm px-8 py-6 text-base transition-all duration-300"
              >
                <Link to="/upload">
                  Import Existing Data
                </Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Bottom gradient fade with copper hint */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background via-background/80 to-transparent" />
      </section>

      {/* Stats Section - Floating cards with copper accents */}
      <section className="container mx-auto px-4 -mt-16 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
          {stats.map((stat, index) => (
            <StatsCard 
              key={stat.title} 
              {...stat} 
              delay={index * 100} 
            />
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-24">
        <div className="text-center mb-16 animate-fade-in">
          <p className="text-amber-500 font-semibold text-sm tracking-[0.2em] uppercase mb-4">Powerful Tools</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-5">
            Everything You Need
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            From recipe creation to advanced cost analysis, manage every aspect of your culinary operations.
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard 
              key={feature.title} 
              {...feature} 
              delay={200 + index * 80} 
            />
          ))}
        </div>
      </section>

      {/* CTA Section - Rich slate with copper glow */}
      <section className="container mx-auto px-4 pb-24">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-850 to-slate-950 border border-slate-700/60 p-12 md:p-16 animate-fade-in shadow-2xl">
          {/* Decorative copper glows */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-radial from-amber-500/25 via-orange-500/10 to-transparent blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-radial from-amber-600/20 via-orange-500/5 to-transparent blur-2xl" />
          <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-gradient-radial from-amber-400/15 to-transparent blur-xl" />
          
          {/* Subtle border glow */}
          <div className="absolute inset-0 rounded-3xl border border-amber-500/10" />
          
          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-10">
            <div>
              <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
                Ready to Get Started?
              </h3>
              <p className="text-slate-300 text-lg max-w-lg">
                Upload your existing recipes and price lists to see the magic happen.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg"
                asChild
                className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:via-orange-400 hover:to-amber-500 text-slate-950 font-semibold shadow-xl shadow-amber-500/30 border-0 transition-all duration-300 hover:scale-105"
              >
                <Link to="/upload/recipes">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Recipes
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                asChild
                className="border-2 border-slate-500/50 text-slate-200 hover:bg-slate-800/50 hover:text-white hover:border-amber-500/50 transition-all duration-300"
              >
                <Link to="/upload/prices">
                  <FileSpreadsheet className="w-4 h-4 mr-2" />
                  Upload Price List
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
