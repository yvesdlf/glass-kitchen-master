import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Package, Save, Upload, Trash2 } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { extractAllIngredients, INGREDIENT_CATEGORIES } from "@/data/recipes";

// Storage locations
const storageLocations = [
  { id: "veg-fridge", label: "Veg Store → Veg Fridge" },
  { id: "meat-freezer", label: "Meat Freez → M Freezer" },
  { id: "mix-chill", label: "Mix Chill → Veg&Fruit" },
  { id: "meat-chill", label: "Meat Chill → M Fridge" },
  { id: "fish-freezer", label: "Fish Freez → F Freezer" },
  { id: "brassa", label: "Brassa → BRASSA" },
  { id: "batches", label: "Brassa → Batches" },
  { id: "pastry", label: "Pastry → Pastry" },
  { id: "ceviche", label: "Ceviche → CIVICE" },
  { id: "dry-store", label: "Dry Store → Dry Store" },
  { id: "main-kitch", label: "Main Kitch → Main Kitch" },
  { id: "fish-prep", label: "Fish Prep → Fish Chiller" },
];

// Allergen icons with labels
const allergens = [
  { id: "gluten", label: "Gluten", icon: "🌾" },
  { id: "crustacean", label: "Crustacean", icon: "🦐" },
  { id: "eggs", label: "Eggs", icon: "🥚" },
  { id: "fish", label: "Fish", icon: "🐟" },
  { id: "peanuts", label: "Peanuts", icon: "🥜" },
  { id: "soy", label: "Soy", icon: "🫛" },
  { id: "milk", label: "Milk", icon: "🥛" },
  { id: "tree-nuts", label: "Tree Nuts", icon: "🌰" },
  { id: "celery", label: "Celery", icon: "🥬" },
  { id: "mustard", label: "Mustard", icon: "🟡" },
  { id: "sesame", label: "Sesame", icon: "⚪" },
  { id: "sulfites", label: "Sulfites", icon: "🍷" },
  { id: "lupin", label: "Lupin", icon: "🌸" },
  { id: "mollusks", label: "Mollusks", icon: "🐚" },
];

// Sample suppliers
const suppliers = [
  { id: "1", name: "Admiral Foodstuff Trading" },
  { id: "2", name: "AFRICAN & EASTERN" },
  { id: "3", name: "AL ALIA BEVERAGES" },
  { id: "4", name: "Barakat Vegetables & Fruits" },
  { id: "5", name: "Bidfood" },
];

// Units for order
const orderUnits = ["KG", "G", "L", "ML", "EA", "Box", "Case", "Pack"];

export default function IngredientDetail() {
  const { name } = useParams();
  const navigate = useNavigate();
  const decodedName = decodeURIComponent(name || "");
  
  const allIngredients = useMemo(() => extractAllIngredients(), []);
  const ingredient = allIngredients.find(i => i.name === decodedName);

  // Form state
  const [form, setForm] = useState({
    productName: decodedName,
    productCategory: ingredient?.category || "",
    bin: "",
    storageLocations: [] as string[],
    selectedAllergens: [] as string[],
    supplier: "",
    packSize: "",
    orderUnit: "KG",
    containsApprox: "",
    netPrice: "",
    taxPercent: "",
    yieldPercent: "100",
    productCode: "",
    minimumOrderQty: "",
    parLevel: "",
    defaultCount: "",
    defaultUsage: "",
    defaultOrder: "",
    defaultPackSize: false,
    notes: "",
  });

  const handleChange = (field: string, value: string | boolean | string[]) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const toggleStorageLocation = (locationId: string) => {
    const current = form.storageLocations;
    const updated = current.includes(locationId)
      ? current.filter(l => l !== locationId)
      : [...current, locationId];
    handleChange("storageLocations", updated);
  };

  const toggleAllergen = (allergenId: string) => {
    const current = form.selectedAllergens;
    const updated = current.includes(allergenId)
      ? current.filter(a => a !== allergenId)
      : [...current, allergenId];
    handleChange("selectedAllergens", updated);
  };

  if (!ingredient) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <Package className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-display font-bold mb-2">Ingredient Not Found</h2>
            <p className="text-muted-foreground mb-6">The ingredient you're looking for doesn't exist.</p>
            <Button variant="outline" asChild>
              <Link to="/ingredients">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Ingredients
              </Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 animate-fade-in">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/ingredients">
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl font-display font-bold text-foreground">
                {ingredient.name}
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="secondary">{ingredient.category}</Badge>
                <span className="text-sm text-muted-foreground">
                  Used in {ingredient.usedIn.length} recipes
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="text-destructive">
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>
            <Button variant="hero">
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left column - Main details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <Card className="animate-slide-up">
              <CardHeader>
                <CardTitle className="text-lg font-display">Product Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="productName">Product Name</Label>
                    <Input 
                      id="productName" 
                      value={form.productName}
                      onChange={e => handleChange("productName", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="productCode">Product Code</Label>
                    <Input 
                      id="productCode" 
                      value={form.productCode}
                      onChange={e => handleChange("productCode", e.target.value)}
                      placeholder="SKU / Code"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="productCategory">Product Category</Label>
                    <Select 
                      value={form.productCategory} 
                      onValueChange={v => handleChange("productCategory", v)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {INGREDIENT_CATEGORIES.map(cat => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bin">Bin / Location Code</Label>
                    <Input 
                      id="bin" 
                      value={form.bin}
                      onChange={e => handleChange("bin", e.target.value)}
                      placeholder="Bin #"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Storage Locations */}
            <Card className="animate-slide-up delay-100">
              <CardHeader>
                <CardTitle className="text-lg font-display">Select Store</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {storageLocations.map(loc => (
                    <label 
                      key={loc.id}
                      className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-colors ${
                        form.storageLocations.includes(loc.id) 
                          ? "bg-primary/10 border-primary" 
                          : "hover:bg-muted"
                      }`}
                    >
                      <Checkbox 
                        checked={form.storageLocations.includes(loc.id)}
                        onCheckedChange={() => toggleStorageLocation(loc.id)}
                      />
                      <span className="text-sm">{loc.label}</span>
                    </label>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Allergens */}
            <Card className="animate-slide-up delay-200">
              <CardHeader>
                <CardTitle className="text-lg font-display">Allergens</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 md:grid-cols-7 gap-2">
                  {allergens.map(allergen => (
                    <button
                      key={allergen.id}
                      type="button"
                      onClick={() => toggleAllergen(allergen.id)}
                      className={`flex flex-col items-center gap-1 p-3 rounded-lg border transition-colors ${
                        form.selectedAllergens.includes(allergen.id)
                          ? "bg-destructive/10 border-destructive text-destructive"
                          : "hover:bg-muted border-border"
                      }`}
                      title={allergen.label}
                    >
                      <span className="text-2xl">{allergen.icon}</span>
                      <span className="text-[10px] font-medium truncate w-full text-center">
                        {allergen.label}
                      </span>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Supplier & Pricing */}
            <Card className="animate-slide-up delay-300">
              <CardHeader>
                <CardTitle className="text-lg font-display">Supplier & Pricing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Select Supplier</Label>
                  <Select value={form.supplier} onValueChange={v => handleChange("supplier", v)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select supplier" />
                    </SelectTrigger>
                    <SelectContent>
                      {suppliers.map(s => (
                        <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="packSize">Pack-size</Label>
                    <Input 
                      id="packSize" 
                      value={form.packSize}
                      onChange={e => handleChange("packSize", e.target.value)}
                      placeholder="e.g. 12x500g"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="orderUnit">Optional Order Unit</Label>
                    <Select value={form.orderUnit} onValueChange={v => handleChange("orderUnit", v)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {orderUnits.map(unit => (
                          <SelectItem key={unit} value={unit}>{unit}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="containsApprox">Contains Approx</Label>
                    <Input 
                      id="containsApprox" 
                      value={form.containsApprox}
                      onChange={e => handleChange("containsApprox", e.target.value)}
                      placeholder="e.g. 6kg"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="netPrice">Net Price (€)</Label>
                    <Input 
                      id="netPrice" 
                      type="number"
                      value={form.netPrice}
                      onChange={e => handleChange("netPrice", e.target.value)}
                      placeholder="0.00"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="taxPercent">Tax %</Label>
                    <Input 
                      id="taxPercent" 
                      type="number"
                      value={form.taxPercent}
                      onChange={e => handleChange("taxPercent", e.target.value)}
                      placeholder="0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="yieldPercent">Yield %</Label>
                    <Input 
                      id="yieldPercent" 
                      type="number"
                      value={form.yieldPercent}
                      onChange={e => handleChange("yieldPercent", e.target.value)}
                      placeholder="100"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Inventory & Ordering */}
            <Card className="animate-slide-up delay-400">
              <CardHeader>
                <CardTitle className="text-lg font-display">Inventory & Ordering</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="minimumOrderQty">Minimum Order Qty</Label>
                    <Input 
                      id="minimumOrderQty" 
                      type="number"
                      value={form.minimumOrderQty}
                      onChange={e => handleChange("minimumOrderQty", e.target.value)}
                      placeholder="0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="parLevel">Par Level</Label>
                    <Input 
                      id="parLevel" 
                      type="number"
                      value={form.parLevel}
                      onChange={e => handleChange("parLevel", e.target.value)}
                      placeholder="0"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="defaultCount">Default Count</Label>
                    <Select value={form.defaultCount} onValueChange={v => handleChange("defaultCount", v)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="unit">Per Unit</SelectItem>
                        <SelectItem value="weight">By Weight</SelectItem>
                        <SelectItem value="volume">By Volume</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="defaultUsage">Default Usage</Label>
                    <Select value={form.defaultUsage} onValueChange={v => handleChange("defaultUsage", v)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="defaultOrder">Default Order</Label>
                    <Select value={form.defaultOrder} onValueChange={v => handleChange("defaultOrder", v)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="auto">Auto</SelectItem>
                        <SelectItem value="manual">Manual</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <Checkbox 
                    id="defaultPackSize"
                    checked={form.defaultPackSize}
                    onCheckedChange={(checked) => handleChange("defaultPackSize", Boolean(checked))}
                  />
                  <Label htmlFor="defaultPackSize" className="cursor-pointer">
                    Default Pack-size
                  </Label>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right column - Image & Summary */}
          <div className="space-y-6">
            {/* Product Image */}
            <Card className="animate-slide-up">
              <CardHeader>
                <CardTitle className="text-lg font-display">Product Image</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                  <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-sm text-primary font-medium mb-1">
                    Select a file here
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Max file size: 3MB
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Used In Recipes */}
            <Card className="animate-slide-up delay-100">
              <CardHeader>
                <CardTitle className="text-lg font-display">
                  Used In ({ingredient.usedIn.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {ingredient.usedIn.map(recipeName => (
                    <div 
                      key={recipeName}
                      className="text-sm p-2 rounded bg-muted/50 hover:bg-muted transition-colors"
                    >
                      {recipeName}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Notes */}
            <Card className="animate-slide-up delay-200">
              <CardHeader>
                <CardTitle className="text-lg font-display">Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea 
                  placeholder="Add any notes about this ingredient..."
                  value={form.notes}
                  onChange={e => handleChange("notes", e.target.value)}
                  rows={4}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
