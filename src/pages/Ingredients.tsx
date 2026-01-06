  const [editingIngredient, setEditingIngredient] = useState<any | null>(null);
  const [editValue, setEditValue] = useState<string>("");

  const handleEdit = (ingredient: any) => {
    setEditingIngredient(ingredient);
    setEditValue(ingredient.name);
  };

  const handleEditSave = () => {
    if (!editingIngredient) return;
    fetch(`/api/ingredients/${editingIngredient.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...editingIngredient, name: editValue })
    })
      .then(res => res.json())
      .then(updated => {
        setAllIngredients(allIngredients.map((i: any) => i.id === updated.id ? updated : i));
        setEditingIngredient(null);
      });
  };

  const handleDelete = (id: string) => {
    fetch(`/api/ingredients/${id}`, { method: "DELETE" })
      .then(() => setAllIngredients(allIngredients.filter((i: any) => i.id !== id)));
  };
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Package, Plus, Search, Filter, Upload, Grid3X3, List } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import { extractAllIngredients } from "@/data/recipes";

export default function Ingredients() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");

  // Custom category order
  const customCategories = [
    "BEEF",
    "BREAD & OTHER",
    "CAVIAR",
    "CHICKEN",
    "CRESS",
    "DAIRY & EGGS",
    "DRY",
    "DUCK",
    "FISH",
    "FRUIT",
    "HERBS",
    "JAPANESE",
    "PERUVIAN",
    "KOREAN",
    "BALINESE",
    "LAMB",
    "MOLLUSC",
    "PORK",
    "SHELLFISH",
    "SPICES",
    "TRUFFLE",
    "VEGETABLE",
    "OIL / VINEGAR"
  ];

  // Map ingredient categories to custom categories
  const categoryMap: Record<string, string> = {
    "Protein": "BEEF",
    "Pantry": "BREAD & OTHER",
    "Seasoning": "SPICES",
    "Herbs": "HERBS",
    "Garnish": "HERBS",
    "Produce": "VEGETABLE",
    "Dairy": "DAIRY & EGGS",
    "Eggs": "DAIRY & EGGS",
    "Spices": "SPICES",
    "Truffle": "TRUFFLE",
    "Oil": "OIL / VINEGAR",
    "Vinegar": "OIL / VINEGAR",
    // Add more mappings as needed
  };

  const [allIngredients, setAllIngredients] = useState([]);

  // Fetch ingredients from backend API
  useEffect(() => {
    fetch("/api/ingredients")
      .then(res => res.json())
      .then(data => {
        // Remap categories to custom
        setAllIngredients(data.map((ing: any) => ({
          ...ing,
          category: categoryMap[ing.category?.toUpperCase() || ""] || ing.category?.toUpperCase() || "OTHER"
        })));
      });
  }, []);

  const categories = useMemo(() => {
    // Only show custom categories that have ingredients
    return customCategories.filter(cat => allIngredients.some(i => i.category === cat));
  }, [allIngredients]);

  // Group ingredients by category
  const groupedIngredients = useMemo(() => {
    const groups: Record<string, typeof allIngredients> = {};
    allIngredients.forEach(ingredient => {
      if (!groups[ingredient.category]) groups[ingredient.category] = [];
      groups[ingredient.category].push(ingredient);
    });
    return groups;
  }, [allIngredients]);

  const filteredIngredients = useMemo(() => {
    return allIngredients.filter(ingredient => {
      const matchesSearch = ingredient.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || ingredient.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [allIngredients, searchQuery, selectedCategory]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div className="animate-fade-in">
            <h1 className="text-3xl font-display font-bold text-foreground mb-2">Ingredients</h1>
            <p className="text-muted-foreground">
              {allIngredients.length} unique ingredients extracted from {filteredIngredients.reduce((acc, ing) => acc + ing.usedIn.length, 0)} recipe uses
            </p>
          </div>
          <div className="flex gap-3 animate-fade-in">
            <Button variant="outline" asChild>
              <Link to="/upload/prices">
                <Upload className="w-4 h-4 mr-2" />
                Import
              </Link>
            </Button>
            <Button variant="hero">
              <Plus className="w-4 h-4 mr-2" />
              Add Ingredient
            </Button>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6 animate-slide-up">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search ingredients..." 
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button 
              variant={viewMode === "list" ? "default" : "outline"} 
              size="icon"
              onClick={() => setViewMode("list")}
            >
              <List className="w-4 h-4" />
            </Button>
            <Button 
              variant={viewMode === "grid" ? "default" : "outline"} 
              size="icon"
              onClick={() => setViewMode("grid")}
            >
              <Grid3X3 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 mb-8 animate-slide-up">
          <Badge 
            variant={selectedCategory === null ? "default" : "outline"}
            className="cursor-pointer hover:bg-primary/80 transition-colors"
            onClick={() => setSelectedCategory(null)}
          >
            All ({allIngredients.length})
          </Badge>
          {categories.map((category) => {
            const count = allIngredients.filter(i => i.category === category).length;
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

        {/* Ingredients Display - Grouped by Category */}
        {filteredIngredients.length > 0 ? (
          viewMode === "list" ? (
            categories.map(category => (
              groupedIngredients[category]?.length ? (
                <div key={category} className="mb-8">
                  <h2 className="text-xl font-bold mb-2 mt-6">{category}</h2>
                  <Card className="animate-fade-in">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[300px]">Ingredient</TableHead>
                          <TableHead className="text-right">Used In</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {groupedIngredients[category].filter(ingredient => filteredIngredients.includes(ingredient)).map((ingredient, index) => (
                          <TableRow 
                            key={ingredient.name}
                            className="animate-fade-in"
                            style={{ animationDelay: `${index * 20}ms` }}
                          >
                            <TableCell className="font-medium">
                              {editingIngredient && editingIngredient.id === ingredient.id ? (
                                <div className="flex gap-2">
                                  <Input value={editValue} onChange={e => setEditValue(e.target.value)} size={"sm" as any} />
                                  <Button size="sm" variant="hero" onClick={handleEditSave}>Save</Button>
                                  <Button size="sm" variant="outline" onClick={() => setEditingIngredient(null)}>Cancel</Button>
                                </div>
                              ) : (
                                <div className="flex gap-2 items-center">
                                  {ingredient.name}
                                  <Button size="sm" variant="outline" onClick={() => handleEdit(ingredient)}>Edit</Button>
                                  <Button size="sm" variant="destructive" onClick={() => handleDelete(ingredient.id)}>Delete</Button>
                                </div>
                              )}
                            </TableCell>
                            <TableCell className="text-right">
                              <span className="text-muted-foreground">{ingredient.usedIn.length} recipes</span>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Card>
                </div>
              ) : null
            ))
          ) : (
            categories.map(category => (
              groupedIngredients[category]?.length ? (
                <div key={category} className="mb-8">
                  <h2 className="text-xl font-bold mb-2 mt-6">{category}</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {groupedIngredients[category].filter(ingredient => filteredIngredients.includes(ingredient)).map((ingredient, index) => (
                      <Card 
                        key={ingredient.name}
                        className="hover:shadow-md transition-all animate-fade-in cursor-pointer"
                        style={{ animationDelay: `${index * 20}ms` }}
                      >
                        <CardContent className="p-4">
                          <h4 className="font-medium text-sm mb-2 line-clamp-1">{ingredient.name}</h4>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">{ingredient.usedIn.length} uses</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ) : null
            ))
          )
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in">
            <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center mb-6">
              <Package className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-display font-semibold text-foreground mb-2">
              No ingredients found
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              Try adjusting your search or filters.
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
