import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Plus, Search, Filter, Clock, Users, ChefHat } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import { recipes, getAllCategories } from "@/data/recipes";

export default function Recipes() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const categories = getAllCategories();
  
  const filteredRecipes = useMemo(() => {
    return recipes.filter(recipe => {
      const matchesSearch = recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           recipe.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           recipe.cuisine.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || recipe.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div className="animate-fade-in">
            <h1 className="text-3xl font-display font-bold text-foreground mb-2">Recipe Book</h1>
            <p className="text-muted-foreground">
              {recipes.length} signature dishes from the Global & Bali Fusion Master Cookbook
            </p>
          </div>
          <Button variant="hero" asChild className="animate-fade-in">
            <Link to="/recipes/create">
              <Plus className="w-4 h-4 mr-2" />
              New Recipe
            </Link>
          </Button>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6 animate-slide-up">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search recipes by name, cuisine, or description..." 
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 mb-8 animate-slide-up">
          <Badge 
            variant={selectedCategory === null ? "default" : "outline"}
            className="cursor-pointer hover:bg-primary/80 transition-colors"
            onClick={() => setSelectedCategory(null)}
          >
            All ({recipes.length})
          </Badge>
          {categories.map((category) => {
            const count = recipes.filter(r => r.category === category).length;
            return (
              <Badge 
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary/80 transition-colors"
                onClick={() => setSelectedCategory(category)}
              >
                {category} ({count})
              </Badge>
            );
          })}
        </div>

        {/* Recipe Grid */}
        {filteredRecipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecipes.map((recipe, index) => (
              <Card 
                key={recipe.id} 
                className="group hover:shadow-lg transition-all duration-300 animate-fade-in cursor-pointer overflow-hidden"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-lg font-display group-hover:text-primary transition-colors line-clamp-2">
                      {recipe.name}
                    </CardTitle>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                    {recipe.description}
                  </p>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="secondary" className="text-xs">
                      {recipe.cuisine}
                    </Badge>
                    {/* Show course badge, and if course is 'Desserts' or 'Specials', highlight */}
                    <Badge variant={['Desserts', 'Specials'].includes(recipe.course) ? "default" : "outline"} className="text-xs">
                      {recipe.course}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{recipe.prepTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" />
                      <span>{recipe.portionSize}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1 mt-3 text-xs text-muted-foreground">
                    <ChefHat className="w-3.5 h-3.5" />
                    <span>{recipe.ingredients.length} ingredients</span>
                  </div>

                  {/* Allergens - placeholder logic, replace with real allergen data from PriceLists */}
                  <div className="flex flex-wrap gap-1 mt-2">
                    {/* Example: show allergens for demo purposes. Replace with real logic to pull allergens for recipe ingredients. */}
                    {["Milk","Eggs","Fish","Crustacean shellfish","Tree nuts","Peanuts","Wheat","Soybeans","Sesame","Gluten-containing cereals (wheat, barley, rye, oats)","Celery","Lupin","Mollusks","Mustard","Sulfites/sulphur dioxide"].map((allergen, idx) => (
                      <Badge key={allergen+idx} variant="outline" className="text-xxs" style={{ display: Math.random() > 0.95 ? 'inline-block' : 'none' }}>{allergen}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in">
            <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center mb-6">
              <BookOpen className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-display font-semibold text-foreground mb-2">
              No recipes found
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              Try adjusting your search or filters to find what you're looking for.
            </p>
            <Button variant="outline" onClick={() => { setSearchQuery(""); setSelectedCategory(null); }}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
}
