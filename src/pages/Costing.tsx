import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calculator,
  Package,
  TrendingUp,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ingredientCostings, getCostingSummary } from "@/data/costingData";

export default function Costing() {
  const summary = getCostingSummary();

  const formatCurrency = (value: number) => `€${value.toFixed(2)}`;
  const formatPercent = (value: number) => `${value.toFixed(1)}%`;

  const getWastageColor = (percent: number) => {
    if (percent >= 50) return "destructive";
    if (percent >= 25) return "secondary";
    return "outline";
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
            Ingredient costing with wastage-adjusted true costs
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid sm:grid-cols-4 gap-4 mb-8">
          <Card className="animate-slide-up">
            <CardContent className="p-5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Package className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Ingredients</p>
                  <p className="text-2xl font-display font-bold">
                    {summary.totalIngredients}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-slide-up delay-100">
            <CardContent className="p-5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                  <Calculator className="w-6 h-6 text-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Categories</p>
                  <p className="text-2xl font-display font-bold">
                    {summary.totalCategories}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-slide-up delay-200">
            <CardContent className="p-5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-warning" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Wastage</p>
                  <p className="text-2xl font-display font-bold">
                    {formatPercent(summary.avgWastage)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-slide-up delay-300">
            <CardContent className="p-5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-destructive" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">High Wastage Items</p>
                  <p className="text-2xl font-display font-bold">
                    {summary.highWastageItems}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Formula Info */}
        <Card className="mb-6 border-primary/20 bg-primary/5">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium text-sm">True Cost Calculation</p>
                <p className="text-sm text-muted-foreground">
                  <strong>Wastage% = Waste Weight ÷ Initial Weight</strong> | <strong>True Cost = Unit Cost ÷ (1 - Wastage%)</strong>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Ingredient Costing Table */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="font-display">Ingredient Costing Sheet</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="w-[80px]">Code</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Ingredient Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right">Unit Cost</TableHead>
                    <TableHead className="text-center">Unit</TableHead>
                    <TableHead className="text-right">Initial Wt</TableHead>
                    <TableHead className="text-right">Waste Wt</TableHead>
                    <TableHead className="text-right">Yield</TableHead>
                    <TableHead className="text-center">Wastage %</TableHead>
                    <TableHead className="text-right">True Cost</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ingredientCostings.map((ing) => (
                    <TableRow key={ing.itemCategoryCode}>
                      <TableCell className="font-mono text-xs text-muted-foreground">
                        {ing.itemCategoryCode}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="text-xs whitespace-nowrap">
                          {ing.category}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">{ing.ingredientName}</TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {ing.description}
                      </TableCell>
                      <TableCell className="text-right font-mono">
                        {formatCurrency(ing.unitCost)}
                      </TableCell>
                      <TableCell className="text-center text-xs font-medium">
                        {ing.baseUnitOfMeasure}
                      </TableCell>
                      <TableCell className="text-right font-mono text-sm">
                        {ing.initialWeight}
                      </TableCell>
                      <TableCell className="text-right font-mono text-sm">
                        {ing.wasteWeight}
                      </TableCell>
                      <TableCell className="text-right font-mono text-sm">
                        {ing.yield}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant={getWastageColor(ing.wastagePercent)} className="text-xs">
                          {formatPercent(ing.wastagePercent)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-mono font-semibold text-warning">
                        {formatCurrency(ing.trueCost)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
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
