import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calculator,
  DollarSign,
  TrendingUp,
  Percent,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { costedRecipes, getCostingSummary, calculateTrueCost } from "@/data/costingData";

export default function Costing() {
  const [expandedRecipe, setExpandedRecipe] = useState<string | null>(null);
  const summary = getCostingSummary();

  const formatCurrency = (value: number) => `AED ${value.toFixed(2)}`;
  const formatPercent = (value: number) => `${value.toFixed(0)}%`;

  const getFoodCostColor = (percent: number) => {
    if (percent <= 25) return "text-success";
    if (percent <= 35) return "text-warning";
    return "text-destructive";
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-display font-bold text-foreground mb-2">
            Advanced Costing
          </h1>
          <p className="text-muted-foreground">
            Deep dive into your kitchen economics with wastage-adjusted true costs
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid sm:grid-cols-4 gap-4 mb-8">
          <Card className="animate-slide-up">
            <CardContent className="p-5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Food Cost</p>
                  <p className="text-2xl font-display font-bold">
                    {formatPercent(summary.avgFoodCostPercent)}
                  </p>
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
                  <p className="text-sm text-muted-foreground">Avg. GP Margin</p>
                  <p className="text-2xl font-display font-bold">
                    {formatPercent(summary.avgGrossProfitPercent)}
                  </p>
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
                  <p className="text-2xl font-display font-bold">
                    {summary.totalRecipes}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-slide-up delay-300">
            <CardContent className="p-5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                  <Percent className="w-6 h-6 text-accent-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Target FC%</p>
                  <p className="text-2xl font-display font-bold">30%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Wastage Formula Info */}
        <Card className="mb-6 border-primary/20 bg-primary/5">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium text-sm">True Cost Calculation</p>
                <p className="text-sm text-muted-foreground">
                  True Cost = Cost Price ÷ (1 - Wastage%). This accounts for trim loss, 
                  spoilage, and unusable portions to reflect actual ingredient costs.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recipe Costing Table */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="font-display">Recipe Cost Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="w-[40px]"></TableHead>
                  <TableHead>Recipe</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead className="text-right">Portions</TableHead>
                  <TableHead className="text-right">Total Cost</TableHead>
                  <TableHead className="text-right">Cost/Portion</TableHead>
                  <TableHead className="text-right">Suggested Price</TableHead>
                  <TableHead className="text-right">Food Cost %</TableHead>
                  <TableHead className="text-right">Gross Profit</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {costedRecipes.map((recipe) => (
                  <Collapsible
                    key={recipe.recipeId}
                    open={expandedRecipe === recipe.recipeId}
                    onOpenChange={() =>
                      setExpandedRecipe(
                        expandedRecipe === recipe.recipeId ? null : recipe.recipeId
                      )
                    }
                  >
                    <CollapsibleTrigger asChild>
                      <TableRow className="cursor-pointer hover:bg-muted/30">
                        <TableCell>
                          {expandedRecipe === recipe.recipeId ? (
                            <ChevronUp className="w-4 h-4 text-muted-foreground" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-muted-foreground" />
                          )}
                        </TableCell>
                        <TableCell className="font-medium">
                          {recipe.recipeName}
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{recipe.course}</Badge>
                        </TableCell>
                        <TableCell className="text-right">{recipe.portions}</TableCell>
                        <TableCell className="text-right font-mono">
                          {formatCurrency(recipe.totalCost)}
                        </TableCell>
                        <TableCell className="text-right font-mono">
                          {formatCurrency(recipe.costPerPortion)}
                        </TableCell>
                        <TableCell className="text-right font-mono font-medium">
                          {formatCurrency(recipe.suggestedPrice)}
                        </TableCell>
                        <TableCell
                          className={`text-right font-bold ${getFoodCostColor(
                            recipe.foodCostPercent
                          )}`}
                        >
                          {formatPercent(recipe.foodCostPercent)}
                        </TableCell>
                        <TableCell className="text-right font-mono text-success">
                          {formatCurrency(recipe.grossProfit)}
                        </TableCell>
                      </TableRow>
                    </CollapsibleTrigger>
                    <CollapsibleContent asChild>
                      <tr>
                        <td colSpan={9} className="p-0">
                          <div className="bg-muted/20 p-4 border-t">
                            <h4 className="text-sm font-semibold mb-3">
                              Ingredient Breakdown
                            </h4>
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Ingredient</TableHead>
                                  <TableHead className="text-right">Qty</TableHead>
                                  <TableHead>Unit</TableHead>
                                  <TableHead className="text-right">Unit Cost</TableHead>
                                  <TableHead className="text-right">Wastage</TableHead>
                                  <TableHead className="text-right">True Cost/Unit</TableHead>
                                  <TableHead className="text-right">Line Total</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {recipe.ingredients.map((ing, idx) => (
                                  <TableRow key={idx}>
                                    <TableCell>{ing.ingredient}</TableCell>
                                    <TableCell className="text-right font-mono">
                                      {ing.quantity.toFixed(3)}
                                    </TableCell>
                                    <TableCell>{ing.unit}</TableCell>
                                    <TableCell className="text-right font-mono">
                                      {formatCurrency(ing.unitCost)}
                                    </TableCell>
                                    <TableCell className="text-right">
                                      <Badge
                                        variant={
                                          ing.wastagePercent >= 40
                                            ? "destructive"
                                            : ing.wastagePercent >= 20
                                            ? "secondary"
                                            : "outline"
                                        }
                                        className="text-xs"
                                      >
                                        {formatPercent(ing.wastagePercent)}
                                      </Badge>
                                    </TableCell>
                                    <TableCell className="text-right font-mono text-warning">
                                      {formatCurrency(ing.trueCost)}
                                    </TableCell>
                                    <TableCell className="text-right font-mono font-medium">
                                      {formatCurrency(ing.lineCost)}
                                    </TableCell>
                                  </TableRow>
                                ))}
                                <TableRow className="bg-muted/30 font-semibold">
                                  <TableCell colSpan={6} className="text-right">
                                    Recipe Total:
                                  </TableCell>
                                  <TableCell className="text-right font-mono">
                                    {formatCurrency(recipe.totalCost)}
                                  </TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </div>
                        </td>
                      </tr>
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Getting Started CTA */}
        <Card className="bg-gradient-to-br from-primary/10 via-accent/5 to-transparent border-primary/20 animate-fade-in">
          <CardContent className="p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h3 className="text-xl font-display font-bold text-foreground mb-2">
                Update Ingredient Prices
              </h3>
              <p className="text-muted-foreground">
                Keep your costing accurate by updating supplier prices in the Price List.
              </p>
            </div>
            <Button variant="hero" asChild>
              <Link to="/price-lists">
                Go to Price Lists
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
