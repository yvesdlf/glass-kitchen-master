import { Layout } from "@/components/layout/Layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface Supplier {
  id: string;
  name: string;
  contactName: string;
  phone: string;
  email: string;
  address: string;
  company: string;
  website: string;
  notes: string;
}

export default function Suppliers() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [form, setForm] = useState<Supplier>({
    id: "",
    name: "",
    contactName: "",
    phone: "",
    email: "",
    address: "",
    company: "",
    website: "",
    notes: ""
  });

  const handleChange = (field: keyof Supplier, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleAddSupplier = () => {
    if (!form.name) return;
    setSuppliers([...suppliers, { ...form, id: Date.now().toString() }]);
    setForm({
      id: "",
      name: "",
      contactName: "",
      phone: "",
      email: "",
      address: "",
      company: "",
      website: "",
      notes: ""
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <h1 className="text-3xl font-display font-bold mb-6">Suppliers</h1>
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Add New Supplier</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder="Supplier Name" value={form.name} onChange={e => handleChange('name', e.target.value)} />
            <Input placeholder="Contact Name" value={form.contactName} onChange={e => handleChange('contactName', e.target.value)} />
            <Input placeholder="Phone" value={form.phone} onChange={e => handleChange('phone', e.target.value)} />
            <Input placeholder="Email" value={form.email} onChange={e => handleChange('email', e.target.value)} />
            <Input placeholder="Address" value={form.address} onChange={e => handleChange('address', e.target.value)} />
            <Input placeholder="Company" value={form.company} onChange={e => handleChange('company', e.target.value)} />
            <Input placeholder="Website" value={form.website} onChange={e => handleChange('website', e.target.value)} />
            <Input placeholder="Notes" value={form.notes} onChange={e => handleChange('notes', e.target.value)} />
            <Button variant="hero" onClick={handleAddSupplier}>Add Supplier</Button>
          </CardContent>
        </Card>
        <div className="space-y-4">
          {suppliers.length === 0 ? (
            <p className="text-muted-foreground">No suppliers added yet.</p>
          ) : (
            suppliers.map(supplier => (
              <Card key={supplier.id}>
                <CardHeader>
                  <CardTitle>{supplier.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    <div><strong>Contact:</strong> {supplier.contactName}</div>
                    <div><strong>Phone:</strong> {supplier.phone}</div>
                    <div><strong>Email:</strong> {supplier.email}</div>
                    <div><strong>Address:</strong> {supplier.address}</div>
                    <div><strong>Company:</strong> {supplier.company}</div>
                    <div><strong>Website:</strong> {supplier.website}</div>
                    <div className="col-span-2"><strong>Notes:</strong> {supplier.notes}</div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
}
