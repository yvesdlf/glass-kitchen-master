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
import { ArrowLeft, Package, Save, Upload, Trash2, Plus, Star } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { extractAllIngredients, INGREDIENT_CATEGORIES } from "@/data/recipes";
import { sampleSuppliers, IngredientSupplier } from "@/data/suppliers";

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
    productCode: "",
    minimumOrderQty: "",
    parLevel: "",
    defaultCount: "",
    defaultUsage: "",
    defaultOrder: "",
    defaultPackSize: false,
    notes: "",
  });

  // Multi-supplier state
  const [ingredientSuppliers, setIngredientSuppliers] = useState<IngredientSupplier[]>([]);

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

  // Supplier management functions
  const addSupplier = (supplierId: string) => {
    if (ingredientSuppliers.some(s => s.supplierId === supplierId)) return;
    
    const newSupplier: IngredientSupplier = {
      supplierId,
      price: 0,
      unit: "KG",
      packSize: "",
      isDefault: ingredientSuppliers.length === 0,
    };
    setIngredientSuppliers([...ingredientSuppliers, newSupplier]);
  };

  const removeSupplier = (supplierId: string) => {
    const updated = ingredientSuppliers.filter(s => s.supplierId !== supplierId);
    // If we removed the default, make the first one default
    if (updated.length > 0 && !updated.some(s => s.isDefault)) {
      updated[0].isDefault = true;
    }
    setIngredientSuppliers(updated);
  };

  const setDefaultSupplier = (supplierId: string) => {
    setIngredientSuppliers(ingredientSuppliers.map(s => ({
      ...s,
      isDefault: s.supplierId === supplierId
    })));
  };

  const updateSupplier = (supplierId: string, field: keyof IngredientSupplier, value: string | number | boolean) => {
    setIngredientSuppliers(ingredientSuppliers.map(s =>
      s.supplierId === supplierId ? { ...s, [field]: value } : s
    ));
  };

  const getSupplierById = (supplierId: string) => {
    return sampleSuppliers.find(s => s.id === supplierId);
  };

  const availableSuppliers = sampleSuppliers.filter(
    s => !ingredientSuppliers.some(is => is.supplierId === s.id)
  );

  const defaultSupplier = ingredientSuppliers.find(s => s.isDefault);

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
                {defaultSupplier && (
                  <Badge variant="outline" className="text-xs">
                    Default: {getSupplierById(defaultSupplier.supplierId)?.shortName || getSupplierById(defaultSupplier.supplierId)?.name}
                  </Badge>
                )}
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

            {/* Multi-Supplier Management */}
            <Card className="animate-slide-up delay-300">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg font-display">Suppliers & Pricing</CardTitle>
                {availableSuppliers.length > 0 && (
                  <Select onValueChange={addSupplier}>
                    <SelectTrigger className="w-[200px]">
                      <span className="flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        Add Supplier
                      </span>
                    </SelectTrigger>
                    <SelectContent>
                      {availableSuppliers.map(s => (
                        <SelectItem key={s.id} value={s.id}>
                          {s.shortName ? `${s.shortName} - ${s.name}` : s.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                {ingredientSuppliers.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Package className="w-10 h-10 mx-auto mb-3 opacity-50" />
                    <p className="text-sm">No suppliers assigned yet.</p>
                    <p className="text-xs">Add a supplier using the dropdown above.</p>
                  </div>
                ) : (
                  ingredientSuppliers.map(s => {
                    const supplier = getSupplierById(s.supplierId);
                    if (!supplier) return null;
                    
                    return (
                      <div 
                        key={s.supplierId} 
                        className={`p-4 rounded-lg border ${s.isDefault ? 'border-primary bg-primary/5' : ''}`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              onClick={() => setDefaultSupplier(s.supplierId)}
                              className={`p-1 rounded ${s.isDefault ? 'text-yellow-500' : 'text-muted-foreground hover:text-yellow-500'}`}
                              title={s.isDefault ? "Default supplier" : "Set as default"}
                            >
                              <Star className={`h-5 w-5 ${s.isDefault ? 'fill-current' : ''}`} />
                            </button>
                            <div>
                              <div className="font-medium">{supplier.name}</div>
                              {supplier.shortName && (
                                <Badge variant="secondary" className="text-xs mt-1">
                                  {supplier.shortName}
                                </Badge>
                              )}
                            </div>
                            {s.isDefault && (
                              <Badge variant="default" className="text-xs">Default</Badge>
                            )}
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive"
                            onClick={() => removeSupplier(s.supplierId)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        
                        <div className="grid grid-cols-4 gap-3">
                          <div className="space-y-1">
                            <Label className="text-xs">Net Price (€)</Label>
                            <Input
                              type="number"
                              value={s.price || ""}
                              onChange={e => updateSupplier(s.supplierId, "price", Number(e.target.value))}
                              placeholder="0.00"
                            />
                          </div>
                          <div className="space-y-1">
                            <Label className="text-xs">Unit</Label>
                            <Select 
                              value={s.unit} 
                              onValueChange={v => updateSupplier(s.supplierId, "unit", v)}
                            >
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
                          <div className="col-span-2 space-y-1">
                            <Label className="text-xs">Pack Size</Label>
                            <Input
                              value={s.packSize}
                              onChange={e => updateSupplier(s.supplierId, "packSize", e.target.value)}
                              placeholder="e.g. 12x500g"
                            />
                          </div>
                        </div>
                        
                        {supplier.email && (
                          <div className="mt-3 text-xs text-muted-foreground">
                            Contact: {supplier.email} {supplier.phone && `• ${supplier.phone}`}
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
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
                        <SelectItem value="unit">Per Unit</SelectItem>
                        <SelectItem value="case">Per Case</SelectItem>
                        <SelectItem value="weight">By Weight</SelectItem>
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

          {/* Right column - Image & Notes */}
          <div className="space-y-6">
            {/* Product Image */}
            <Card className="animate-slide-up">
              <CardHeader>
                <CardTitle className="text-lg font-display">Product Image</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                  <Upload className="w-10 h-10 mx-auto text-muted-foreground mb-3" />
                  <p className="text-sm text-muted-foreground">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    PNG, JPG up to 5MB
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Notes */}
            <Card className="animate-slide-up delay-100">
              <CardHeader>
                <CardTitle className="text-lg font-display">Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea 
                  value={form.notes}
                  onChange={e => handleChange("notes", e.target.value)}
                  placeholder="Add any notes about this ingredient..."
                  rows={6}
                />
              </CardContent>
            </Card>

            {/* Used In Recipes */}
            <Card className="animate-slide-up delay-200">
              <CardHeader>
                <CardTitle className="text-lg font-display">Used In</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {ingredient.usedIn.length === 0 ? (
                    <p className="text-sm text-muted-foreground">Not used in any recipes yet.</p>
                  ) : (
                    ingredient.usedIn.map((recipeName, idx) => (
                      <Link 
                        key={idx}
                        to={`/recipes/${encodeURIComponent(recipeName)}`}
                        className="block p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                      >
                        <span className="text-sm font-medium">{recipeName}</span>
                      </Link>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
