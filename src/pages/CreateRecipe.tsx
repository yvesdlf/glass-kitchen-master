import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Plus, Trash2, Save, Image } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

interface Ingredient {
  id: string;
  name: string;
  quantity: string;
  unit: string;
  cost: string;
}

export default function CreateRecipe() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { id: "1", name: "", quantity: "", unit: "", cost: "" }
  ]);

  const addIngredient = () => {
    setIngredients([
      ...ingredients,
      { id: Date.now().toString(), name: "", quantity: "", unit: "", cost: "" }
    ]);
  };

  const removeIngredient = (id: string) => {
    if (ingredients.length > 1) {
      setIngredients(ingredients.filter(i => i.id !== id));
    }
  };

  const updateIngredient = (id: string, field: keyof Ingredient, value: string) => {
    setIngredients(ingredients.map(i => 
      i.id === id ? { ...i, [field]: value } : i
    ));
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8 animate-fade-in">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/recipes">
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground">Create Recipe</h1>
            <p className="text-muted-foreground">Add a new recipe to your collection</p>
          </div>
        </div>

        <div className="grid gap-6 animate-slide-up">
          {/* Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle className="font-display">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Recipe Name</Label>
                <Input id="name" placeholder="e.g., Classic Beef Bourguignon" />
              </div>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input id="category" placeholder="e.g., Main Course" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="yield">Yield (servings)</Label>
                  <Input id="yield" type="number" placeholder="4" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Brief description of the dish..."
                  rows={3}
                />
              </div>

              <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                <Image className="w-10 h-10 mx-auto text-muted-foreground mb-3" />
                <p className="text-sm text-muted-foreground">
                  Click or drag to upload a recipe photo
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Ingredients */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="font-display">Ingredients</CardTitle>
              <Button variant="outline" size="sm" onClick={addIngredient}>
                <Plus className="w-4 h-4 mr-1" />
                Add
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {ingredients.map((ingredient, index) => (
                  <div 
                    key={ingredient.id} 
                    className="grid grid-cols-12 gap-2 items-center p-3 rounded-lg bg-muted/50"
                  >
                    <div className="col-span-12 sm:col-span-4">
                      <Input 
                        placeholder="Ingredient name"
                        value={ingredient.name}
                        onChange={(e) => updateIngredient(ingredient.id, 'name', e.target.value)}
                      />
                    </div>
                    <div className="col-span-4 sm:col-span-2">
                      <Input 
                        placeholder="Qty"
                        value={ingredient.quantity}
                        onChange={(e) => updateIngredient(ingredient.id, 'quantity', e.target.value)}
                      />
                    </div>
                    <div className="col-span-4 sm:col-span-2">
                      <Input 
                        placeholder="Unit"
                        value={ingredient.unit}
                        onChange={(e) => updateIngredient(ingredient.id, 'unit', e.target.value)}
                      />
                    </div>
                    <div className="col-span-3 sm:col-span-3">
                      <Input 
                        placeholder="Cost"
                        value={ingredient.cost}
                        onChange={(e) => updateIngredient(ingredient.id, 'cost', e.target.value)}
                      />
                    </div>
                    <div className="col-span-1">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => removeIngredient(ingredient.id)}
                        disabled={ingredients.length === 1}
                      >
                        <Trash2 className="w-4 h-4 text-muted-foreground" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Instructions */}
          <Card>
            <CardHeader>
              <CardTitle className="font-display">Instructions</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea 
                placeholder="Enter step-by-step cooking instructions..."
                rows={8}
              />
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <Button variant="outline" asChild>
              <Link to="/recipes">Cancel</Link>
            </Button>
            <Button variant="hero">
              <Save className="w-4 h-4 mr-2" />
              Save Recipe
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
