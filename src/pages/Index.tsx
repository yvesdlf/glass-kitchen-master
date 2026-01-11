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
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
        
        {/* Copper accent glow */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-radial from-primary/20 via-primary/5 to-transparent blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-radial from-accent/15 via-accent/5 to-transparent blur-3xl" />
        
        <div className="container mx-auto px-4 py-20 md:py-28 relative">
          <div className="max-w-3xl animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 text-primary mb-8 backdrop-blur-sm">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium tracking-wide">Glass Kitchen Master V.1</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 leading-[1.1] tracking-tight">
              Your Complete
              <span className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">Kitchen Management</span>
              Solution
            </h1>
            
            <p className="text-lg text-slate-300 mb-10 max-w-2xl leading-relaxed">
              Combine recipe management, ingredient tracking, and advanced costing in one powerful platform. 
              Take control of your kitchen operations and maximize profitability.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                asChild
                className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white shadow-lg shadow-primary/25 border-0 px-6"
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
                className="border-slate-600 text-slate-200 hover:bg-slate-800 hover:text-white hover:border-slate-500 backdrop-blur-sm"
              >
                <Link to="/upload">
                  Import Existing Data
                </Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 -mt-10 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
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
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-14 animate-fade-in">
          <p className="text-primary font-medium text-sm tracking-widest uppercase mb-3">Powerful Tools</p>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Everything You Need
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            From recipe creation to advanced cost analysis, manage every aspect of your culinary operations.
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard 
              key={feature.title} 
              {...feature} 
              delay={200 + index * 100} 
            />
          ))}
        </div>
      </section>

      {/* Quick Actions */}
      <section className="container mx-auto px-4 pb-20">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800 via-slate-800 to-slate-900 border border-slate-700/50 p-10 md:p-14 animate-fade-in">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-radial from-primary/20 to-transparent blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-radial from-accent/15 to-transparent blur-2xl" />
          
          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div>
              <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-3">
                Ready to Get Started?
              </h3>
              <p className="text-slate-400 text-lg">
                Upload your existing recipes and price lists to see the magic happen.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg"
                asChild
                className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white shadow-lg shadow-primary/25 border-0"
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
                className="border-slate-600 text-slate-200 hover:bg-slate-700 hover:text-white hover:border-slate-500"
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
