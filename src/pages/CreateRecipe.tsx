import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ArrowLeft, Plus, Trash2, Save, Image } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { extractAllIngredients } from "@/data/recipes";

const COURSE_OPTIONS = [
  "Appetizers",
  "Salads", 
  "Raw",
  "Mains",
  "Sides",
  "Vegan",
  "Desserts",
  "Specials"
] as const;

const ingredientSchema = z.object({
  name: z.string().min(1, "Ingredient name is required"),
  quantity: z.string().optional(),
  unit: z.string().optional(),
  cost: z.string().optional(),
});

const recipeSchema = z.object({
  name: z.string().min(1, "Recipe name is required").max(100, "Name must be less than 100 characters"),
  course: z.string().min(1, "Course is required"),
  yield: z.string().optional(),
  description: z.string().optional(),
  instructions: z.string().optional(),
  ingredients: z.array(ingredientSchema).min(1, "At least one ingredient is required").refine(
    (ingredients) => ingredients.some(i => i.name.trim() !== ""),
    "At least one ingredient with a name is required"
  ),
});

type RecipeFormData = z.infer<typeof recipeSchema>;

export default function CreateRecipe() {
  const allIngredients = useMemo(() => extractAllIngredients(), []);
  const ingredientNames = useMemo(() => 
    [...new Set(allIngredients.map(i => i.name))].sort(),
    [allIngredients]
  );

  const form = useForm<RecipeFormData>({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      name: "",
      course: "",
      yield: "",
      description: "",
      instructions: "",
      ingredients: [{ name: "", quantity: "", unit: "", cost: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "ingredients",
  });

  const [openAutocomplete, setOpenAutocomplete] = useState<string | null>(null);
  const [autocompleteSearch, setAutocompleteSearch] = useState<Record<string, string>>({});

  const getFilteredIngredients = (fieldId: string, currentValue: string) => {
    const searchTerm = autocompleteSearch[fieldId] ?? currentValue;
    if (!searchTerm) return ingredientNames.slice(0, 10);
    return ingredientNames
      .filter(name => name.toLowerCase().includes(searchTerm.toLowerCase()))
      .slice(0, 10);
  };

  const onSubmit = (data: RecipeFormData) => {
    console.log("Recipe data:", data);
    // TODO: Save recipe to database
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

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6 animate-slide-up">
            {/* Basic Info */}
            <Card>
              <CardHeader>
                <CardTitle className="font-display">Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Recipe Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Classic Beef Bourguignon" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="course"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Course</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger className="w-full bg-background">
                              <SelectValue placeholder="Select course" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-background border">
                            {COURSE_OPTIONS.map((course) => (
                              <SelectItem key={course} value={course.toLowerCase()}>
                                {course}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="yield"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Yield (servings)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="4" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Brief description of the dish..."
                          rows={3}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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
                <div>
                  <CardTitle className="font-display">Ingredients</CardTitle>
                  {form.formState.errors.ingredients?.root && (
                    <p className="text-sm text-destructive mt-1">
                      {form.formState.errors.ingredients.root.message}
                    </p>
                  )}
                </div>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  onClick={() => append({ name: "", quantity: "", unit: "", cost: "" })}
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {fields.map((field, index) => (
                    <div 
                      key={field.id} 
                      className="grid grid-cols-12 gap-2 items-start p-3 rounded-lg bg-muted/50"
                    >
                      <div className="col-span-12 sm:col-span-4">
                        <FormField
                          control={form.control}
                          name={`ingredients.${index}.name`}
                          render={({ field: formField }) => (
                            <FormItem className="space-y-1">
                              <Popover 
                                open={openAutocomplete === field.id} 
                                onOpenChange={(open) => {
                                  setOpenAutocomplete(open ? field.id : null);
                                  if (!open) {
                                    setAutocompleteSearch(prev => ({ ...prev, [field.id]: "" }));
                                  }
                                }}
                              >
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Input 
                                      placeholder="Ingredient name"
                                      {...formField}
                                      onChange={(e) => {
                                        formField.onChange(e);
                                        setAutocompleteSearch(prev => ({ ...prev, [field.id]: e.target.value }));
                                        setOpenAutocomplete(field.id);
                                      }}
                                      onFocus={() => setOpenAutocomplete(field.id)}
                                    />
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent 
                                  className="w-[280px] p-0 bg-background border" 
                                  align="start"
                                  onOpenAutoFocus={(e) => e.preventDefault()}
                                >
                                  <div className="max-h-[200px] overflow-y-auto">
                                    {getFilteredIngredients(field.id, formField.value).length > 0 ? (
                                      getFilteredIngredients(field.id, formField.value).map((name) => (
                                        <button
                                          key={name}
                                          type="button"
                                          className="w-full px-3 py-2 text-left text-sm hover:bg-muted transition-colors"
                                          onClick={() => {
                                            formField.onChange(name);
                                            setOpenAutocomplete(null);
                                            setAutocompleteSearch(prev => ({ ...prev, [field.id]: "" }));
                                          }}
                                        >
                                          {name}
                                        </button>
                                      ))
                                    ) : (
                                      <div className="px-3 py-2 text-sm text-muted-foreground">
                                        No matching ingredients
                                      </div>
                                    )}
                                  </div>
                                </PopoverContent>
                              </Popover>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="col-span-4 sm:col-span-2">
                        <FormField
                          control={form.control}
                          name={`ingredients.${index}.quantity`}
                          render={({ field: formField }) => (
                            <FormItem>
                              <FormControl>
                                <Input placeholder="Qty" {...formField} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="col-span-4 sm:col-span-2">
                        <FormField
                          control={form.control}
                          name={`ingredients.${index}.unit`}
                          render={({ field: formField }) => (
                            <FormItem>
                              <Select onValueChange={formField.onChange} value={formField.value}>
                                <FormControl>
                                  <SelectTrigger className="w-full bg-background">
                                    <SelectValue placeholder="Unit" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-background border">
                                  <SelectItem value="KG">KG</SelectItem>
                                  <SelectItem value="G">G</SelectItem>
                                  <SelectItem value="L">L</SelectItem>
                                  <SelectItem value="ML">ML</SelectItem>
                                  <SelectItem value="EACH">EACH</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="col-span-3 sm:col-span-3">
                        <FormField
                          control={form.control}
                          name={`ingredients.${index}.cost`}
                          render={({ field: formField }) => (
                            <FormItem>
                              <FormControl>
                                <Input placeholder="Cost" {...formField} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="col-span-1 flex items-center justify-center pt-1">
                        <Button 
                          type="button"
                          variant="ghost" 
                          size="icon"
                          onClick={() => remove(index)}
                          disabled={fields.length === 1}
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
                <FormField
                  control={form.control}
                  name="instructions"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter step-by-step cooking instructions..."
                          rows={8}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex justify-end gap-3">
              <Button variant="outline" asChild>
                <Link to="/recipes">Cancel</Link>
              </Button>
              <Button type="submit" variant="hero">
                <Save className="w-4 h-4 mr-2" />
                Save Recipe
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Layout>
  );
}
