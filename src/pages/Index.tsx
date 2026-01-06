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
      <section className="relative overflow-hidden bg-gradient-to-br from-sidebar via-sidebar to-sidebar-accent">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtOS45NDEgMC0xOCA4LjA1OS0xOCAxOHM4LjA1OSAxOCAxOCAxOGM5Ljk0MSAwIDE4LTguMDU5IDE4LTE4cy04LjA1OS0xOC0xOC0xOHptMCAzMmMtNy43MzIgMC0xNC02LjI2OC0xNC0xNHM2LjI2OC0xNCAxNC0xNCAxNCA2LjI2OCAxNCAxNC02LjI2OCAxNC0xNCAxNHoiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjAyIi8+PC9nPjwvc3ZnPg==')] opacity-40" />
        
        <div className="container mx-auto px-4 py-16 md:py-24 relative">
          <div className="max-w-3xl animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary mb-6">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Glass Kitchen Master V.1</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-sidebar-foreground mb-6 leading-tight">
              Your Complete
              <span className="block text-gradient bg-gradient-to-r from-primary to-accent">Kitchen Management</span>
              Solution
            </h1>
            
            <p className="text-lg text-sidebar-foreground/70 mb-8 max-w-2xl leading-relaxed">
              Combine recipe management, ingredient tracking, and advanced costing in one powerful platform. 
              Take control of your kitchen operations and maximize profitability.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button variant="hero" size="lg" asChild>
                <Link to="/recipes/create">
                  Create Your First Recipe
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button variant="glass" size="lg" asChild>
                <Link to="/upload">
                  Import Existing Data
                </Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Decorative gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 -mt-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Everything You Need
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
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
      <section className="container mx-auto px-4 pb-16">
        <div className="rounded-2xl bg-gradient-to-br from-primary/10 via-accent/5 to-transparent border border-primary/20 p-8 md:p-12 animate-fade-in">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h3 className="text-2xl font-display font-bold text-foreground mb-2">
                Ready to Get Started?
              </h3>
              <p className="text-muted-foreground">
                Upload your existing recipes and price lists to see the magic happen.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button variant="hero" asChild>
                <Link to="/upload/recipes">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Recipes
                </Link>
              </Button>
              <Button variant="outline" asChild>
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
