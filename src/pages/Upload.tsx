import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileSpreadsheet, BookOpen, ArrowRight, FileUp, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

const uploadOptions = [
  {
    title: "Upload Recipes",
    description: "Import recipes from Excel or CSV files. Supports batch imports with ingredients and instructions.",
    icon: BookOpen,
    href: "/upload/recipes",
    features: ["Excel & CSV support", "Batch import", "Auto-match ingredients"],
  },
  {
    title: "Upload Price List",
    description: "Import supplier price lists to update ingredient costs automatically.",
    icon: FileSpreadsheet,
    href: "/upload/prices",
    features: ["Multiple suppliers", "Price history tracking", "Auto-update costs"],
  },
];

export default function UploadPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-display font-bold text-foreground mb-2">Upload Data</h1>
          <p className="text-muted-foreground">Import your existing recipes and price lists</p>
        </div>

        {/* Upload Options */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {uploadOptions.map((option, index) => (
            <Card 
              key={option.title}
              className="group hover:shadow-xl hover:border-primary/30 transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <option.icon className="w-7 h-7" />
                  </div>
                </div>
                <CardTitle className="font-display mt-4">{option.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm">{option.description}</p>
                
                <ul className="space-y-2">
                  {option.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-success" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Button variant="hero" className="w-full mt-4" asChild>
                  <Link to={option.href}>
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Files
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Drop Zone */}
        <Card className="animate-fade-in">
          <CardContent className="p-12">
            <div className="border-2 border-dashed border-border rounded-2xl p-12 text-center hover:border-primary/50 transition-colors cursor-pointer">
              <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
                <FileUp className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-display font-semibold text-foreground mb-2">
                Drop files here
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                Or click to browse. Supports .xlsx, .xls, and .csv files.
              </p>
              <Button variant="outline">
                Browse Files
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Help Text */}
        <div className="mt-8 p-6 rounded-xl bg-muted/50 animate-fade-in">
          <h4 className="font-display font-semibold text-foreground mb-2">Need a template?</h4>
          <p className="text-muted-foreground text-sm mb-4">
            Download our templates to ensure your data imports correctly.
          </p>
          <div className="flex gap-3">
            <Button variant="outline" size="sm">
              <FileSpreadsheet className="w-4 h-4 mr-2" />
              Recipe Template
            </Button>
            <Button variant="outline" size="sm">
              <FileSpreadsheet className="w-4 h-4 mr-2" />
              Price List Template
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
