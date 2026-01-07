import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  Clock, 
  Users, 
  ChefHat, 
  UtensilsCrossed,
  Flame,
  Lightbulb,
  BookOpen
} from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getRecipeById } from "@/data/recipes";

export default function RecipeDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const recipe = id ? getRecipeById(id) : null;

  if (!recipe) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center mb-6 mx-auto">
            <BookOpen className="w-10 h-10 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-display font-bold mb-4">Recipe Not Found</h1>
          <p className="text-muted-foreground mb-6">The recipe you're looking for doesn't exist.</p>
          <Button variant="hero" onClick={() => navigate("/recipes")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Recipes
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Back Button */}
        <Button variant="ghost" asChild className="mb-6 animate-fade-in">
          <Link to="/recipes">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Recipes
          </Link>
        </Button>

        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="secondary">{recipe.cuisine}</Badge>
            <Badge variant="outline">{recipe.course}</Badge>
            <Badge variant="outline">{recipe.category}</Badge>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
            {recipe.name}
          </h1>
          
          <p className="text-lg text-muted-foreground mb-6">
            {recipe.description}
          </p>

          {/* Quick Stats */}
          <div className="flex flex-wrap gap-6 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-5 h-5 text-primary" />
              <div>
                <span className="block font-medium text-foreground">Prep Time</span>
                <span>{recipe.prepTime}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Flame className="w-5 h-5 text-primary" />
              <div>
                <span className="block font-medium text-foreground">Cook Time</span>
                <span>{recipe.cookTime}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="w-5 h-5 text-primary" />
              <div>
                <span className="block font-medium text-foreground">Portions</span>
                <span>{recipe.portionSize}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <ChefHat className="w-5 h-5 text-primary" />
              <div>
                <span className="block font-medium text-foreground">Ingredients</span>
                <span>{recipe.ingredients.length} items</span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Ingredients Column */}
          <div className="lg:col-span-1 animate-slide-up" style={{ animationDelay: "100ms" }}>
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-display">
                  <UtensilsCrossed className="w-5 h-5 text-primary" />
                  Ingredients
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li 
                      key={index} 
                      className="flex justify-between items-start py-2 border-b border-border/50 last:border-0"
                    >
                      <span className="font-medium text-foreground">{ingredient.name}</span>
                      <span className="text-muted-foreground text-sm whitespace-nowrap ml-4">
                        {ingredient.quantity} {ingredient.unit}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Method & Plating Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Method */}
            <Card className="animate-slide-up" style={{ animationDelay: "200ms" }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-display">
                  <ChefHat className="w-5 h-5 text-primary" />
                  Step-by-Step Method
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-4">
                  {recipe.method.map((step, index) => (
                    <li key={index} className="flex gap-4">
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-sm">
                        {index + 1}
                      </span>
                      <p className="text-foreground pt-1 leading-relaxed">{step}</p>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>

            {/* Plating */}
            <Card className="animate-slide-up" style={{ animationDelay: "300ms" }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-display">
                  <UtensilsCrossed className="w-5 h-5 text-primary" />
                  Plating Instructions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-4">
                  {recipe.plating.map((step, index) => (
                    <li key={index} className="flex gap-4">
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary/50 text-secondary-foreground font-bold flex items-center justify-center text-sm">
                        {index + 1}
                      </span>
                      <p className="text-foreground pt-1 leading-relaxed">{step}</p>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>

            {/* Chef Notes */}
            {recipe.chefNotes && (
              <Card className="border-primary/20 bg-primary/5 animate-slide-up" style={{ animationDelay: "400ms" }}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-display text-primary">
                    <Lightbulb className="w-5 h-5" />
                    Chef's Notes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground leading-relaxed italic">
                    "{recipe.chefNotes}"
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
