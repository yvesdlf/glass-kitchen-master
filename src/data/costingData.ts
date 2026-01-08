// Ingredient pricing with wastage calculations
// Formula: True Cost = Cost Price / (1 - Wastage%)

export interface IngredientCost {
  name: string;
  group: string;
  costPrice: number; // per kg/unit
  unit: string;
  wastagePercent: number;
  trueCost: number; // calculated: costPrice / (1 - wastage)
}

export interface RecipeCostItem {
  ingredient: string;
  quantity: number;
  unit: string;
  unitCost: number;
  wastagePercent: number;
  trueCost: number;
  lineCost: number;
}

export interface RecipeCostSummary {
  recipeId: string;
  recipeName: string;
  course: string;
  portions: number;
  ingredients: RecipeCostItem[];
  totalCost: number;
  costPerPortion: number;
  suggestedPrice: number;
  foodCostPercent: number;
  grossProfit: number;
  grossProfitPercent: number;
}

// Calculate true cost with wastage
export const calculateTrueCost = (costPrice: number, wastagePercent: number): number => {
  if (wastagePercent >= 100) return costPrice;
  return costPrice / (1 - wastagePercent / 100);
};

// Calculate suggested price based on target food cost percentage
export const calculateSuggestedPrice = (cost: number, targetFoodCostPercent: number = 30): number => {
  return cost / (targetFoodCostPercent / 100);
};

// Sample ingredient costs based on Excel data
export const ingredientCosts: IngredientCost[] = [
  // Fish
  { name: "Chilean Sea Bass", group: "Fish", costPrice: 238.00, unit: "kg", wastagePercent: 30, trueCost: 309.40 },
  { name: "Salmon", group: "Fish", costPrice: 50.00, unit: "kg", wastagePercent: 40, trueCost: 70.00 },
  { name: "Sea Bass", group: "Fish", costPrice: 161.00, unit: "kg", wastagePercent: 60, trueCost: 257.60 },
  { name: "Yellowfin Tuna", group: "Fish", costPrice: 293.00, unit: "kg", wastagePercent: 25, trueCost: 366.25 },
  { name: "Yellowtail", group: "Fish", costPrice: 200.00, unit: "kg", wastagePercent: 50, trueCost: 300.00 },
  { name: "Smoked Salmon", group: "Fish", costPrice: 84.00, unit: "kg", wastagePercent: 0, trueCost: 84.00 },
  
  // Shellfish
  { name: "Baby Squid", group: "Shellfish", costPrice: 86.00, unit: "kg", wastagePercent: 15, trueCost: 98.90 },
  { name: "Lobster", group: "Shellfish", costPrice: 235.00, unit: "kg", wastagePercent: 0, trueCost: 235.00 },
  { name: "Octopus", group: "Shellfish", costPrice: 140.00, unit: "kg", wastagePercent: 50, trueCost: 210.00 },
  { name: "Prawns 30/40", group: "Shellfish", costPrice: 42.00, unit: "kg", wastagePercent: 20, trueCost: 50.40 },
  { name: "Prawns 11/15", group: "Shellfish", costPrice: 54.00, unit: "kg", wastagePercent: 15, trueCost: 62.10 },
  { name: "Soft Shell Crab", group: "Shellfish", costPrice: 200.00, unit: "kg", wastagePercent: 0, trueCost: 200.00 },
  
  // Meat
  { name: "Beef Cube Roll", group: "Meat", costPrice: 360.00, unit: "kg", wastagePercent: 15, trueCost: 414.00 },
  { name: "Beef OP Ribs", group: "Meat", costPrice: 180.00, unit: "kg", wastagePercent: 10, trueCost: 198.00 },
  { name: "Beef Shortribs", group: "Meat", costPrice: 65.00, unit: "kg", wastagePercent: 35, trueCost: 87.75 },
  { name: "Beef Tenderloin", group: "Meat", costPrice: 145.00, unit: "kg", wastagePercent: 25, trueCost: 181.25 },
  { name: "Lamb Rack", group: "Meat", costPrice: 62.00, unit: "kg", wastagePercent: 30, trueCost: 80.60 },
  { name: "Wagyu Cube Roll 9+", group: "Meat", costPrice: 415.00, unit: "kg", wastagePercent: 15, trueCost: 477.25 },
  { name: "Wagyu T-Bone", group: "Meat", costPrice: 150.00, unit: "kg", wastagePercent: 5, trueCost: 157.50 },
  
  // Poultry
  { name: "Chicken Baby", group: "Poultry", costPrice: 8.50, unit: "kg", wastagePercent: 35, trueCost: 11.48 },
  { name: "Chicken Thighs", group: "Poultry", costPrice: 39.00, unit: "kg", wastagePercent: 15, trueCost: 44.85 },
  { name: "Duck Breast", group: "Poultry", costPrice: 85.00, unit: "kg", wastagePercent: 20, trueCost: 102.00 },
  
  // Produce
  { name: "Mixed Salad Greens", group: "Produce", costPrice: 28.00, unit: "kg", wastagePercent: 15, trueCost: 32.35 },
  { name: "Cherry Tomatoes", group: "Produce", costPrice: 18.00, unit: "kg", wastagePercent: 10, trueCost: 19.80 },
  { name: "Avocado", group: "Produce", costPrice: 35.00, unit: "kg", wastagePercent: 40, trueCost: 50.00 },
  { name: "Asparagus", group: "Produce", costPrice: 45.00, unit: "kg", wastagePercent: 25, trueCost: 56.25 },
  { name: "Shallots", group: "Produce", costPrice: 12.00, unit: "kg", wastagePercent: 15, trueCost: 13.85 },
  
  // Dairy
  { name: "Butter", group: "Dairy", costPrice: 25.00, unit: "kg", wastagePercent: 0, trueCost: 25.00 },
  { name: "Heavy Cream", group: "Dairy", costPrice: 18.00, unit: "L", wastagePercent: 5, trueCost: 18.90 },
  { name: "Parmesan", group: "Dairy", costPrice: 65.00, unit: "kg", wastagePercent: 10, trueCost: 71.50 },
  
  // Pantry
  { name: "Olive Oil", group: "Pantry", costPrice: 22.00, unit: "L", wastagePercent: 0, trueCost: 22.00 },
  { name: "Soy Sauce", group: "Pantry", costPrice: 8.00, unit: "L", wastagePercent: 0, trueCost: 8.00 },
  { name: "Miso Paste", group: "Pantry", costPrice: 15.00, unit: "kg", wastagePercent: 0, trueCost: 15.00 },
];

// Sample costed recipes
export const costedRecipes: RecipeCostSummary[] = [
  {
    recipeId: "wagyu-tataki",
    recipeName: "A5 Wagyu Tataki",
    course: "Appetizers",
    portions: 4,
    ingredients: [
      { ingredient: "Wagyu Cube Roll 9+", quantity: 0.300, unit: "kg", unitCost: 415.00, wastagePercent: 15, trueCost: 477.25, lineCost: 143.18 },
      { ingredient: "Soy Sauce", quantity: 0.050, unit: "L", unitCost: 8.00, wastagePercent: 0, trueCost: 8.00, lineCost: 0.40 },
      { ingredient: "Olive Oil", quantity: 0.030, unit: "L", unitCost: 22.00, wastagePercent: 0, trueCost: 22.00, lineCost: 0.66 },
      { ingredient: "Shallots", quantity: 0.050, unit: "kg", unitCost: 12.00, wastagePercent: 15, trueCost: 13.85, lineCost: 0.69 },
      { ingredient: "Mixed Salad Greens", quantity: 0.080, unit: "kg", unitCost: 28.00, wastagePercent: 15, trueCost: 32.35, lineCost: 2.59 },
    ],
    totalCost: 147.52,
    costPerPortion: 36.88,
    suggestedPrice: 122.93,
    foodCostPercent: 30,
    grossProfit: 86.05,
    grossProfitPercent: 70,
  },
  {
    recipeId: "grilled-sea-bass",
    recipeName: "Grilled Mediterranean Sea Bass",
    course: "Mains",
    portions: 2,
    ingredients: [
      { ingredient: "Sea Bass", quantity: 0.400, unit: "kg", unitCost: 161.00, wastagePercent: 60, trueCost: 257.60, lineCost: 103.04 },
      { ingredient: "Asparagus", quantity: 0.150, unit: "kg", unitCost: 45.00, wastagePercent: 25, trueCost: 56.25, lineCost: 8.44 },
      { ingredient: "Cherry Tomatoes", quantity: 0.100, unit: "kg", unitCost: 18.00, wastagePercent: 10, trueCost: 19.80, lineCost: 1.98 },
      { ingredient: "Olive Oil", quantity: 0.040, unit: "L", unitCost: 22.00, wastagePercent: 0, trueCost: 22.00, lineCost: 0.88 },
      { ingredient: "Butter", quantity: 0.030, unit: "kg", unitCost: 25.00, wastagePercent: 0, trueCost: 25.00, lineCost: 0.75 },
    ],
    totalCost: 115.09,
    costPerPortion: 57.55,
    suggestedPrice: 191.82,
    foodCostPercent: 30,
    grossProfit: 134.27,
    grossProfitPercent: 70,
  },
  {
    recipeId: "lobster-risotto",
    recipeName: "Butter Poached Lobster Risotto",
    course: "Mains",
    portions: 4,
    ingredients: [
      { ingredient: "Lobster", quantity: 0.500, unit: "kg", unitCost: 235.00, wastagePercent: 0, trueCost: 235.00, lineCost: 117.50 },
      { ingredient: "Heavy Cream", quantity: 0.200, unit: "L", unitCost: 18.00, wastagePercent: 5, trueCost: 18.90, lineCost: 3.78 },
      { ingredient: "Butter", quantity: 0.150, unit: "kg", unitCost: 25.00, wastagePercent: 0, trueCost: 25.00, lineCost: 3.75 },
      { ingredient: "Parmesan", quantity: 0.080, unit: "kg", unitCost: 65.00, wastagePercent: 10, trueCost: 71.50, lineCost: 5.72 },
      { ingredient: "Shallots", quantity: 0.060, unit: "kg", unitCost: 12.00, wastagePercent: 15, trueCost: 13.85, lineCost: 0.83 },
    ],
    totalCost: 131.58,
    costPerPortion: 32.90,
    suggestedPrice: 109.65,
    foodCostPercent: 30,
    grossProfit: 76.75,
    grossProfitPercent: 70,
  },
  {
    recipeId: "duck-confit",
    recipeName: "Duck Confit with Orange Glaze",
    course: "Mains",
    portions: 2,
    ingredients: [
      { ingredient: "Duck Breast", quantity: 0.350, unit: "kg", unitCost: 85.00, wastagePercent: 20, trueCost: 102.00, lineCost: 35.70 },
      { ingredient: "Butter", quantity: 0.080, unit: "kg", unitCost: 25.00, wastagePercent: 0, trueCost: 25.00, lineCost: 2.00 },
      { ingredient: "Shallots", quantity: 0.040, unit: "kg", unitCost: 12.00, wastagePercent: 15, trueCost: 13.85, lineCost: 0.55 },
      { ingredient: "Asparagus", quantity: 0.120, unit: "kg", unitCost: 45.00, wastagePercent: 25, trueCost: 56.25, lineCost: 6.75 },
    ],
    totalCost: 45.00,
    costPerPortion: 22.50,
    suggestedPrice: 75.00,
    foodCostPercent: 30,
    grossProfit: 52.50,
    grossProfitPercent: 70,
  },
  {
    recipeId: "tuna-tartare",
    recipeName: "Yellowfin Tuna Tartare",
    course: "Appetizers",
    portions: 4,
    ingredients: [
      { ingredient: "Yellowfin Tuna", quantity: 0.250, unit: "kg", unitCost: 293.00, wastagePercent: 25, trueCost: 366.25, lineCost: 91.56 },
      { ingredient: "Avocado", quantity: 0.150, unit: "kg", unitCost: 35.00, wastagePercent: 40, trueCost: 50.00, lineCost: 7.50 },
      { ingredient: "Soy Sauce", quantity: 0.030, unit: "L", unitCost: 8.00, wastagePercent: 0, trueCost: 8.00, lineCost: 0.24 },
      { ingredient: "Olive Oil", quantity: 0.020, unit: "L", unitCost: 22.00, wastagePercent: 0, trueCost: 22.00, lineCost: 0.44 },
    ],
    totalCost: 99.74,
    costPerPortion: 24.94,
    suggestedPrice: 83.12,
    foodCostPercent: 30,
    grossProfit: 58.18,
    grossProfitPercent: 70,
  },
  {
    recipeId: "lamb-rack",
    recipeName: "Herb Crusted Lamb Rack",
    course: "Mains",
    portions: 2,
    ingredients: [
      { ingredient: "Lamb Rack", quantity: 0.450, unit: "kg", unitCost: 62.00, wastagePercent: 30, trueCost: 80.60, lineCost: 36.27 },
      { ingredient: "Butter", quantity: 0.060, unit: "kg", unitCost: 25.00, wastagePercent: 0, trueCost: 25.00, lineCost: 1.50 },
      { ingredient: "Asparagus", quantity: 0.100, unit: "kg", unitCost: 45.00, wastagePercent: 25, trueCost: 56.25, lineCost: 5.63 },
      { ingredient: "Cherry Tomatoes", quantity: 0.080, unit: "kg", unitCost: 18.00, wastagePercent: 10, trueCost: 19.80, lineCost: 1.58 },
    ],
    totalCost: 44.98,
    costPerPortion: 22.49,
    suggestedPrice: 74.97,
    foodCostPercent: 30,
    grossProfit: 52.48,
    grossProfitPercent: 70,
  },
];

// Summary statistics
export const getCostingSummary = () => {
  const totalRecipes = costedRecipes.length;
  const avgFoodCostPercent = costedRecipes.reduce((sum, r) => sum + r.foodCostPercent, 0) / totalRecipes;
  const avgGrossProfitPercent = costedRecipes.reduce((sum, r) => sum + r.grossProfitPercent, 0) / totalRecipes;
  const totalPotentialRevenue = costedRecipes.reduce((sum, r) => sum + (r.suggestedPrice * r.portions), 0);
  
  return {
    totalRecipes,
    avgFoodCostPercent,
    avgGrossProfitPercent,
    totalPotentialRevenue,
  };
};
