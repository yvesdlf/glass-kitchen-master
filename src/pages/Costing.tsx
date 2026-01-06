import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, DollarSign, TrendingUp, Percent, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const costingModules = [
  {
    title: "Recipe Costing",
    description: "Calculate the total cost of your recipes based on ingredient prices and quantities.",
    icon: Calculator,
    href: "/costing/recipes",
  },
  {
    title: "Menu Pricing",
    description: "Determine optimal menu prices based on food costs and target margins.",
    icon: DollarSign,
    href: "/costing/menu",
  },
  {
    title: "Profit Analysis",
    description: "Analyze profitability across your menu items and identify opportunities.",
    icon: TrendingUp,
    href: "/costing/profit",
  },
  {
    title: "Cost Percentages",
    description: "Track and manage food cost percentages against industry benchmarks.",
    icon: Percent,
    href: "/costing/percentages",
  },
];

export default function Costing() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-display font-bold text-foreground mb-2">Advanced Costing</h1>
          <p className="text-muted-foreground">Deep dive into your kitchen economics</p>
        </div>

        {/* Quick Stats */}
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          <Card className="animate-slide-up">
            <CardContent className="p-5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Food Cost</p>
                  <p className="text-2xl font-display font-bold">0%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="animate-slide-up delay-100">
            <CardContent className="p-5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Target Margin</p>
                  <p className="text-2xl font-display font-bold">70%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="animate-slide-up delay-200">
            <CardContent className="p-5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center">
                  <Calculator className="w-6 h-6 text-warning" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Recipes Costed</p>
                  <p className="text-2xl font-display font-bold">0</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Costing Modules */}
        <div className="grid sm:grid-cols-2 gap-6">
          {costingModules.map((module, index) => (
            <Card 
              key={module.title}
              className="group hover:shadow-xl hover:border-primary/30 transition-all duration-300 animate-slide-up cursor-pointer"
              style={{ animationDelay: `${(index + 3) * 100}ms` }}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <module.icon className="w-6 h-6" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
                <CardTitle className="font-display mt-4">{module.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">{module.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Getting Started CTA */}
        <Card className="mt-8 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent border-primary/20 animate-fade-in">
          <CardContent className="p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h3 className="text-xl font-display font-bold text-foreground mb-2">
                Start with Recipe Costing
              </h3>
              <p className="text-muted-foreground">
                Add recipes and ingredients to begin calculating your food costs automatically.
              </p>
            </div>
            <Button variant="hero" asChild>
              <Link to="/recipes/create">
                Create a Recipe
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
