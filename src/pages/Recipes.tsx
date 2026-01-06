import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, Plus, Search, Filter } from "lucide-react";
import { Link } from "react-router-dom";

export default function Recipes() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div className="animate-fade-in">
            <h1 className="text-3xl font-display font-bold text-foreground mb-2">Recipe Book</h1>
            <p className="text-muted-foreground">Manage your complete recipe collection</p>
          </div>
          <Button variant="hero" asChild className="animate-fade-in">
            <Link to="/recipes/create">
              <Plus className="w-4 h-4 mr-2" />
              New Recipe
            </Link>
          </Button>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 animate-slide-up">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search recipes..." 
              className="pl-10"
            />
          </div>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>

        {/* Empty State */}
        <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in">
          <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center mb-6">
            <BookOpen className="w-10 h-10 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-display font-semibold text-foreground mb-2">
            No recipes yet
          </h3>
          <p className="text-muted-foreground mb-6 max-w-md">
            Start building your recipe collection. Create your first recipe or upload existing ones from a spreadsheet.
          </p>
          <div className="flex gap-3">
            <Button variant="hero" asChild>
              <Link to="/recipes/create">
                <Plus className="w-4 h-4 mr-2" />
                Create Recipe
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/upload/recipes">
                Upload Recipes
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
