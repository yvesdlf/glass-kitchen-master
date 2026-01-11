import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Pencil, Trash2, Building2, Phone, Mail, User, MapPin, Calendar } from "lucide-react";
import { Supplier, sampleSuppliers, daysOfWeek, emptySupplier } from "@/data/suppliers";

export default function Suppliers() {
  const [suppliers, setSuppliers] = useState<Supplier[]>(sampleSuppliers);
  const [form, setForm] = useState<Omit<Supplier, "id">>(emptySupplier);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleChange = (field: keyof Omit<Supplier, "id">, value: string | boolean | number | string[]) => {
    setForm({ ...form, [field]: value });
  };

  const toggleDeliveryDay = (day: string) => {
    const current = form.deliveryDays;
    const updated = current.includes(day)
      ? current.filter(d => d !== day)
      : [...current, day];
    handleChange("deliveryDays", updated);
  };

  const handleSubmit = () => {
    if (!form.name) return;
    
    if (editingId) {
      setSuppliers(suppliers.map(s => s.id === editingId ? { ...form, id: editingId } : s));
    } else {
      const newSupplier = { ...form, id: crypto.randomUUID() };
      setSuppliers([...suppliers, newSupplier]);
    }
    
    setForm(emptySupplier);
    setEditingId(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (supplier: Supplier) => {
    setForm({ ...supplier });
    setEditingId(supplier.id);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setSuppliers(suppliers.filter(s => s.id !== id));
  };

  const openNewDialog = () => {
    setForm(emptySupplier);
    setEditingId(null);
    setIsDialogOpen(true);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 animate-fade-in">
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground mb-2">
              Suppliers
            </h1>
            <p className="text-muted-foreground">
              Manage supplier contacts and delivery schedules
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="hero" onClick={openNewDialog}>
                <Plus className="w-4 h-4 mr-2" />
                Add Supplier
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="font-display">
                  {editingId ? "Edit Supplier" : "Add New Supplier"}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-6 pt-4">
                {/* Basic Info */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                    <Building2 className="w-4 h-4" /> Company Details
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Supplier Name *</Label>
                      <Input 
                        id="name" 
                        value={form.name} 
                        onChange={e => handleChange("name", e.target.value)} 
                        placeholder="Full company name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="shortName">Short Name / Code</Label>
                      <Input 
                        id="shortName" 
                        value={form.shortName} 
                        onChange={e => handleChange("shortName", e.target.value)} 
                        placeholder="e.g. ALAL"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="accountReference">Account Reference</Label>
                      <Input 
                        id="accountReference" 
                        value={form.accountReference} 
                        onChange={e => handleChange("accountReference", e.target.value)} 
                        placeholder="Account #"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="taxRefNumber">Tax Ref Number</Label>
                      <Input 
                        id="taxRefNumber" 
                        value={form.taxRefNumber} 
                        onChange={e => handleChange("taxRefNumber", e.target.value)} 
                        placeholder="VAT / Tax ID"
                      />
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                    <MapPin className="w-4 h-4" /> Address
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2 space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Textarea 
                        id="address" 
                        value={form.address} 
                        onChange={e => handleChange("address", e.target.value)} 
                        placeholder="Street address"
                        rows={2}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postcode">Postcode / City</Label>
                      <Input 
                        id="postcode" 
                        value={form.postcode} 
                        onChange={e => handleChange("postcode", e.target.value)} 
                        placeholder="Postcode"
                      />
                    </div>
                  </div>
                </div>

                {/* Contact */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                    <Phone className="w-4 h-4" /> Contact Details
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input 
                        id="phone" 
                        value={form.phone} 
                        onChange={e => handleChange("phone", e.target.value)} 
                        placeholder="+971..."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="faxNumber">Fax Number</Label>
                      <Input 
                        id="faxNumber" 
                        value={form.faxNumber} 
                        onChange={e => handleChange("faxNumber", e.target.value)} 
                        placeholder="+971..."
                      />
                    </div>
                    <div className="col-span-2 space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input 
                        id="email" 
                        type="email"
                        value={form.email} 
                        onChange={e => handleChange("email", e.target.value)} 
                        placeholder="orders@supplier.com"
                      />
                    </div>
                  </div>
                </div>

                {/* Sales Rep */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                    <User className="w-4 h-4" /> Sales Representative
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="salesRep">Name</Label>
                      <Input 
                        id="salesRep" 
                        value={form.salesRep} 
                        onChange={e => handleChange("salesRep", e.target.value)} 
                        placeholder="Rep name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="salesRepEmail">Email</Label>
                      <Input 
                        id="salesRepEmail" 
                        type="email"
                        value={form.salesRepEmail} 
                        onChange={e => handleChange("salesRepEmail", e.target.value)} 
                        placeholder="rep@supplier.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="salesRepContact">Phone / Mobile</Label>
                      <Input 
                        id="salesRepContact" 
                        value={form.salesRepContact} 
                        onChange={e => handleChange("salesRepContact", e.target.value)} 
                        placeholder="+971..."
                      />
                    </div>
                  </div>
                </div>

                {/* Orders & Delivery */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                    <Calendar className="w-4 h-4" /> Orders & Delivery
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="minOrderValue">Minimum Order Value</Label>
                      <Input 
                        id="minOrderValue" 
                        type="number"
                        value={form.minOrderValue} 
                        onChange={e => handleChange("minOrderValue", Number(e.target.value))} 
                        placeholder="0"
                      />
                    </div>
                    <div className="flex items-center gap-2 pt-6">
                      <Checkbox 
                        id="emailOrders" 
                        checked={form.emailOrders} 
                        onCheckedChange={(checked) => handleChange("emailOrders", Boolean(checked))}
                      />
                      <Label htmlFor="emailOrders" className="cursor-pointer">
                        Accepts Email Orders
                      </Label>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Delivery Days</Label>
                    <div className="flex flex-wrap gap-2">
                      {daysOfWeek.map(day => (
                        <Button
                          key={day}
                          type="button"
                          variant={form.deliveryDays.includes(day) ? "default" : "outline"}
                          size="sm"
                          onClick={() => toggleDeliveryDay(day)}
                          className="w-12"
                        >
                          {day}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button variant="hero" onClick={handleSubmit}>
                    {editingId ? "Save Changes" : "Add Supplier"}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Suppliers Table */}
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="w-[200px]">Supplier</TableHead>
                  <TableHead className="w-[80px]">Code</TableHead>
                  <TableHead className="w-[140px]">Phone</TableHead>
                  <TableHead className="w-[200px]">Email</TableHead>
                  <TableHead className="w-[120px]">Sales Rep</TableHead>
                  <TableHead className="w-[160px]">Delivery Days</TableHead>
                  <TableHead className="w-[80px] text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {suppliers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-12 text-muted-foreground">
                      No suppliers added yet. Click "Add Supplier" to get started.
                    </TableCell>
                  </TableRow>
                ) : (
                  suppliers.map(supplier => (
                    <TableRow key={supplier.id} className="hover:bg-muted/30">
                      <TableCell>
                        <div className="font-medium">{supplier.name}</div>
                        {supplier.address && (
                          <div className="text-xs text-muted-foreground truncate max-w-[180px]">
                            {supplier.address}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="text-xs font-mono">
                          {supplier.shortName || "-"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">
                        {supplier.phone || "-"}
                      </TableCell>
                      <TableCell>
                        <div className="text-sm truncate max-w-[180px]">
                          {supplier.email || "-"}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{supplier.salesRep || "-"}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {supplier.deliveryDays.slice(0, 4).map(day => (
                            <Badge key={day} variant="outline" className="text-[10px] px-1">
                              {day}
                            </Badge>
                          ))}
                          {supplier.deliveryDays.length > 4 && (
                            <Badge variant="outline" className="text-[10px] px-1">
                              +{supplier.deliveryDays.length - 4}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleEdit(supplier)}
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive"
                            onClick={() => handleDelete(supplier.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
