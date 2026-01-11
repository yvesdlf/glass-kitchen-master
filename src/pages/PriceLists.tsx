import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { useMemo, useState } from "react";
import { extractAllIngredients } from "@/data/recipes";
import { sampleSuppliers, IngredientSupplier } from "@/data/suppliers";
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
import { Check, ChevronDown, Plus, Star, Trash2 } from "lucide-react";
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
type IngredientSuppliersMap = Record<string, IngredientSupplier[]>;

export default function PriceLists() {
  const [selectedAllergens, setSelectedAllergens] = useState<IngredientAllergens>({});
  const [ingredientSuppliers, setIngredientSuppliers] = useState<IngredientSuppliersMap>({});

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

  const addSupplierToIngredient = (ingredientName: string, supplierId: string) => {
    setIngredientSuppliers(prev => {
      const current = prev[ingredientName] || [];
      // Check if supplier already added
      if (current.some(s => s.supplierId === supplierId)) return prev;
      
      const newSupplier: IngredientSupplier = {
        supplierId,
        price: 0,
        unit: "KG",
        packSize: "",
        isDefault: current.length === 0, // First one is default
      };
      return { ...prev, [ingredientName]: [...current, newSupplier] };
    });
  };

  const removeSupplierFromIngredient = (ingredientName: string, supplierId: string) => {
    setIngredientSuppliers(prev => {
      const current = prev[ingredientName] || [];
      const updated = current.filter(s => s.supplierId !== supplierId);
      // If we removed the default, make the first one default
      if (updated.length > 0 && !updated.some(s => s.isDefault)) {
        updated[0].isDefault = true;
      }
      return { ...prev, [ingredientName]: updated };
    });
  };

  const setDefaultSupplier = (ingredientName: string, supplierId: string) => {
    setIngredientSuppliers(prev => {
      const current = prev[ingredientName] || [];
      const updated = current.map(s => ({
        ...s,
        isDefault: s.supplierId === supplierId
      }));
      return { ...prev, [ingredientName]: updated };
    });
  };

  const updateSupplierPrice = (ingredientName: string, supplierId: string, price: number) => {
    setIngredientSuppliers(prev => {
      const current = prev[ingredientName] || [];
      const updated = current.map(s => 
        s.supplierId === supplierId ? { ...s, price } : s
      );
      return { ...prev, [ingredientName]: updated };
    });
  };

  const updateSupplierUnit = (ingredientName: string, supplierId: string, unit: string) => {
    setIngredientSuppliers(prev => {
      const current = prev[ingredientName] || [];
      const updated = current.map(s => 
        s.supplierId === supplierId ? { ...s, unit } : s
      );
      return { ...prev, [ingredientName]: updated };
    });
  };

  const updateSupplierPackSize = (ingredientName: string, supplierId: string, packSize: string) => {
    setIngredientSuppliers(prev => {
      const current = prev[ingredientName] || [];
      const updated = current.map(s => 
        s.supplierId === supplierId ? { ...s, packSize } : s
      );
      return { ...prev, [ingredientName]: updated };
    });
  };

  const getSupplierName = (supplierId: string) => {
    const supplier = sampleSuppliers.find(s => s.id === supplierId);
    return supplier?.shortName || supplier?.name || "Unknown";
  };

  const getAvailableSuppliers = (ingredientName: string) => {
    const assigned = ingredientSuppliers[ingredientName] || [];
    return sampleSuppliers.filter(s => !assigned.some(a => a.supplierId === s.id));
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
                          <TableHead className="w-[300px]">Suppliers</TableHead>
                          <TableHead className="w-[160px]">Allergens</TableHead>
                          <TableHead className="w-[80px] text-right">Used In</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {groupedIngredients[category].map(ingredient => {
                          const suppliers = ingredientSuppliers[ingredient.name] || [];
                          const availableSuppliers = getAvailableSuppliers(ingredient.name);
                          
                          return (
                            <TableRow key={ingredient.name} className="hover:bg-muted/30 align-top">
                              <TableCell className="font-medium pt-4">{ingredient.name}</TableCell>
                              <TableCell>
                                <div className="space-y-2">
                                  {/* List of assigned suppliers */}
                                  {suppliers.map(s => (
                                    <div key={s.supplierId} className="flex items-center gap-2 p-2 rounded border bg-background">
                                      <button
                                        onClick={() => setDefaultSupplier(ingredient.name, s.supplierId)}
                                        className={`p-1 rounded ${s.isDefault ? 'text-yellow-500' : 'text-muted-foreground hover:text-yellow-500'}`}
                                        title={s.isDefault ? "Default supplier" : "Set as default"}
                                      >
                                        <Star className={`h-4 w-4 ${s.isDefault ? 'fill-current' : ''}`} />
                                      </button>
                                      <Badge variant="secondary" className="text-xs shrink-0">
                                        {getSupplierName(s.supplierId)}
                                      </Badge>
                                      <Input
                                        type="number"
                                        className="h-7 text-xs w-16"
                                        placeholder="Price"
                                        value={s.price || ""}
                                        onChange={e => updateSupplierPrice(ingredient.name, s.supplierId, Number(e.target.value))}
                                      />
                                      <Select 
                                        value={s.unit} 
                                        onValueChange={v => updateSupplierUnit(ingredient.name, s.supplierId, v)}
                                      >
                                        <SelectTrigger className="h-7 text-xs w-16">
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
                                      <Input
                                        type="text"
                                        className="h-7 text-xs w-20"
                                        placeholder="Pack"
                                        value={s.packSize}
                                        onChange={e => updateSupplierPackSize(ingredient.name, s.supplierId, e.target.value)}
                                      />
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-7 w-7 text-destructive shrink-0"
                                        onClick={() => removeSupplierFromIngredient(ingredient.name, s.supplierId)}
                                      >
                                        <Trash2 className="h-3 w-3" />
                                      </Button>
                                    </div>
                                  ))}
                                  
                                  {/* Add supplier dropdown */}
                                  {availableSuppliers.length > 0 && (
                                    <Popover>
                                      <PopoverTrigger asChild>
                                        <Button variant="outline" size="sm" className="h-7 text-xs">
                                          <Plus className="h-3 w-3 mr-1" />
                                          Add Supplier
                                        </Button>
                                      </PopoverTrigger>
                                      <PopoverContent className="w-48 p-2" align="start">
                                        <div className="grid gap-1 max-h-[200px] overflow-y-auto">
                                          {availableSuppliers.map(supplier => (
                                            <button
                                              key={supplier.id}
                                              onClick={() => addSupplierToIngredient(ingredient.name, supplier.id)}
                                              className="flex items-center gap-2 px-2 py-1.5 text-xs rounded hover:bg-muted text-left"
                                            >
                                              <Badge variant="outline" className="text-[10px]">
                                                {supplier.shortName || supplier.name.slice(0, 4)}
                                              </Badge>
                                              <span className="truncate">{supplier.name}</span>
                                            </button>
                                          ))}
                                        </div>
                                      </PopoverContent>
                                    </Popover>
                                  )}
                                </div>
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
                              <TableCell className="text-right pt-4">
                                <Badge variant="secondary" className="text-xs">
                                  {ingredient.usedIn.length}
                                </Badge>
                              </TableCell>
                            </TableRow>
                          );
                        })}
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
