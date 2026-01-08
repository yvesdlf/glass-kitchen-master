import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { useMemo, useState } from "react";
import { extractAllIngredients } from "@/data/recipes";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Check, ChevronDown } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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

const allergensList = [
  "Milk", "Eggs", "Fish", "Crustacean", "Tree nuts", "Peanuts",
  "Wheat", "Soy", "Sesame", "Gluten", "Celery", "Lupin",
  "Mollusks", "Mustard", "Sulfites"
];

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
};

type IngredientAllergens = Record<string, string[]>;

export default function PriceLists() {
  const [selectedAllergens, setSelectedAllergens] = useState<IngredientAllergens>({});

  const allIngredients = useMemo(() => {
    return extractAllIngredients().map(ing => ({
      ...ing,
      category: categoryMap[ing.category?.toUpperCase() || ""] || ing.category?.toUpperCase() || "OTHER"
    }));
  }, []);

  const groupedIngredients = useMemo(() => {
    const groups: Record<string, typeof allIngredients> = {};
    allIngredients.forEach(ingredient => {
      if (!groups[ingredient.category]) groups[ingredient.category] = [];
      groups[ingredient.category].push(ingredient);
    });
    return groups;
  }, [allIngredients]);

  const toggleAllergen = (ingredientName: string, allergen: string) => {
    setSelectedAllergens(prev => {
      const current = prev[ingredientName] || [];
      const updated = current.includes(allergen)
        ? current.filter(a => a !== allergen)
        : [...current, allergen];
      return { ...prev, [ingredientName]: updated };
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-display font-bold mb-8">Price List</h1>
        
        <div className="space-y-8">
          {customCategories.map(category => (
            groupedIngredients[category]?.length ? (
              <div key={category}>
                <h2 className="text-lg font-semibold mb-3 text-primary">{category}</h2>
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-muted/50">
                          <TableHead className="w-[180px]">Ingredient</TableHead>
                          <TableHead className="w-[140px]">Supplier</TableHead>
                          <TableHead className="w-[100px]">Price</TableHead>
                          <TableHead className="w-[80px]">Unit</TableHead>
                          <TableHead className="w-[140px]">Package</TableHead>
                          <TableHead className="w-[160px]">Allergens</TableHead>
                          <TableHead className="w-[80px] text-right">Used In</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {groupedIngredients[category].map(ingredient => (
                          <TableRow key={ingredient.name} className="hover:bg-muted/30">
                            <TableCell className="font-medium">{ingredient.name}</TableCell>
                            <TableCell>
                              <Select>
                                <SelectTrigger className="h-8 text-xs">
                                  <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="supplier-a">Supplier A</SelectItem>
                                  <SelectItem value="supplier-b">Supplier B</SelectItem>
                                  <SelectItem value="supplier-c">Supplier C</SelectItem>
                                </SelectContent>
                              </Select>
                            </TableCell>
                            <TableCell>
                              <Input 
                                type="number" 
                                className="h-8 text-xs w-20" 
                                placeholder="0.00" 
                              />
                            </TableCell>
                            <TableCell>
                              <Select defaultValue="KG">
                                <SelectTrigger className="h-8 text-xs w-16">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="KG">KG</SelectItem>
                                  <SelectItem value="G">G</SelectItem>
                                  <SelectItem value="L">L</SelectItem>
                                  <SelectItem value="ML">ML</SelectItem>
                                  <SelectItem value="EACH">EA</SelectItem>
                                </SelectContent>
                              </Select>
                            </TableCell>
                            <TableCell>
                              <Input 
                                type="text" 
                                className="h-8 text-xs" 
                                placeholder="e.g. 12x500ml" 
                              />
                            </TableCell>
                            <TableCell>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="h-8 text-xs w-full justify-between"
                                  >
                                    <span className="truncate">
                                      {(selectedAllergens[ingredient.name]?.length || 0) > 0
                                        ? `${selectedAllergens[ingredient.name].length} selected`
                                        : "None"}
                                    </span>
                                    <ChevronDown className="h-3 w-3 ml-1 opacity-50" />
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-48 p-2" align="start">
                                  <div className="grid gap-1 max-h-[200px] overflow-y-auto">
                                    {allergensList.map(allergen => {
                                      const isSelected = selectedAllergens[ingredient.name]?.includes(allergen);
                                      return (
                                        <button
                                          key={allergen}
                                          onClick={() => toggleAllergen(ingredient.name, allergen)}
                                          className="flex items-center gap-2 px-2 py-1.5 text-xs rounded hover:bg-muted text-left"
                                        >
                                          <div className={`w-4 h-4 border rounded flex items-center justify-center ${
                                            isSelected ? 'bg-primary border-primary' : 'border-input'
                                          }`}>
                                            {isSelected && <Check className="h-3 w-3 text-primary-foreground" />}
                                          </div>
                                          {allergen}
                                        </button>
                                      );
                                    })}
                                  </div>
                                </PopoverContent>
                              </Popover>
                            </TableCell>
                            <TableCell className="text-right">
                              <Badge variant="secondary" className="text-xs">
                                {ingredient.usedIn.length}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            ) : null
          ))}
        </div>
      </div>
    </Layout>
  );
}
