import { Layout } from "@/components/layout/Layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useMemo } from "react";
import { extractAllIngredients } from "@/data/recipes";

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

export default function PriceLists() {
  const allIngredients = useMemo(() => {
    // Remap categories to custom
    return extractAllIngredients().map(ing => ({
      ...ing,
      category: categoryMap[ing.category?.toUpperCase() || ""] || ing.category?.toUpperCase() || "OTHER"
    }));
  }, []);

  // Group ingredients by category
  const groupedIngredients = useMemo(() => {
    const groups: Record<string, typeof allIngredients> = {};
    allIngredients.forEach(ingredient => {
      if (!groups[ingredient.category]) groups[ingredient.category] = [];
      groups[ingredient.category].push(ingredient);
    });
    return groups;
  }, [allIngredients]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-display font-bold mb-8">Price List</h1>
        {customCategories.map(category => (
          groupedIngredients[category]?.length ? (
            <div key={category} className="mb-8">
              <h2 className="text-xl font-bold mb-2 mt-6">{category}</h2>
              <Card className="animate-fade-in">
                <CardContent>
                  <table className="w-full text-sm">
                    <thead>
                      <tr>
                        <th className="text-left py-2">Ingredient</th>
                        <th className="text-left py-2">Supplier</th>
                        <th className="text-left py-2">Price</th>
                        <th className="text-left py-2">Unit</th>
                        <th className="text-left py-2">Package</th>
                        <th className="text-left py-2">Allergens</th>
                        <th className="text-left py-2">Used In</th>
                      </tr>
                    </thead>
                    <tbody>
                      {groupedIngredients[category].map(ingredient => (
                        <tr key={ingredient.name}>
                          <td className="font-medium py-2">{ingredient.name}</td>
                          <td className="py-2">
                            <select className="border rounded px-2 py-1 text-xs">
                              <option value="">Select Supplier</option>
                              <option value="Supplier A">Supplier A</option>
                              <option value="Supplier B">Supplier B</option>
                              <option value="Supplier C">Supplier C</option>
                            </select>
                          </td>
                          <td className="py-2">
                            <input type="number" className="border rounded px-2 py-1 w-20 text-xs" placeholder="Price" />
                          </td>
                          <td className="py-2">
                            <select className="border rounded px-2 py-1 text-xs">
                              <option value="KG">KG</option>
                              <option value="G">G</option>
                              <option value="L">L</option>
                              <option value="ML">ML</option>
                              <option value="EACH">EACH</option>
                            </select>
                          </td>
                          <td className="py-2">
                            <input type="text" className="border rounded px-2 py-1 w-32 text-xs" placeholder="e.g. 244g cans, 1.25L bottles x 12" />
                          </td>
                          <td className="py-2">
                            <div className="flex flex-wrap gap-1">
                              {["Milk","Eggs","Fish","Crustacean shellfish","Tree nuts","Peanuts","Wheat","Soybeans","Sesame","Gluten-containing cereals (wheat, barley, rye, oats)","Celery","Lupin","Mollusks","Mustard","Sulfites/sulphur dioxide"].map(allergen => (
                                <label key={allergen} className="flex items-center gap-1 text-xs">
                                  <input type="checkbox" className="accent-primary" />
                                  {allergen}
                                </label>
                              ))}
                            </div>
                          </td>
                          <td className="py-2 text-muted-foreground">{ingredient.usedIn.length} recipes</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            </div>
          ) : null
        ))}
      </div>
    </Layout>
  );
}
