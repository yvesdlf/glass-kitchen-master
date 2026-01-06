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

  // Fetch suppliers from backend API
  useEffect(() => {
    fetch("/api/suppliers")
      .then(res => res.json())
      .then(data => setSuppliers(data));
  }, []);

  const handleChange = (field: keyof Supplier, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleAddSupplier = () => {
    if (!form.name) return;
    // Post to backend API
    fetch("/api/suppliers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    })
      .then(res => res.json())
      .then(newSupplier => {
        setSuppliers([...suppliers, newSupplier]);
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
      });
  };

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Supplier | null>(null);

  const handleEdit = (supplier: Supplier) => {
    setEditingId(supplier.id);
    setEditForm({ ...supplier });
  };

  const handleEditChange = (field: keyof Supplier, value: string) => {
    if (editForm) setEditForm({ ...editForm, [field]: value });
  };

  const handleSaveEdit = () => {
    if (!editForm) return;
    fetch(`/api/suppliers/${editForm.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editForm)
    })
      .then(res => res.json())
      .then(updated => {
        setSuppliers(suppliers.map(s => s.id === updated.id ? updated : s));
        setEditingId(null);
        setEditForm(null);
      });
  };

  const handleDelete = (id: string) => {
    fetch(`/api/suppliers/${id}`, { method: "DELETE" })
      .then(() => setSuppliers(suppliers.filter(s => s.id !== id)));
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input placeholder="Supplier Name" value={form.name} onChange={e => handleChange('name', e.target.value)} />
              <Input placeholder="Contact Name" value={form.contactName} onChange={e => handleChange('contactName', e.target.value)} />
              <Input placeholder="Phone" value={form.phone} onChange={e => handleChange('phone', e.target.value)} />
              <Input placeholder="Email" value={form.email} onChange={e => handleChange('email', e.target.value)} />
              <Input placeholder="Address" value={form.address} onChange={e => handleChange('address', e.target.value)} />
              <Input placeholder="Company" value={form.company} onChange={e => handleChange('company', e.target.value)} />
              <Input placeholder="Website" value={form.website} onChange={e => handleChange('website', e.target.value)} />
            </div>
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
                  {editingId === supplier.id && editForm ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                      <Input value={editForm.name} onChange={e => handleEditChange('name', e.target.value)} placeholder="Supplier Name" />
                      <Input value={editForm.contactName} onChange={e => handleEditChange('contactName', e.target.value)} placeholder="Contact Name" />
                      <Input value={editForm.phone} onChange={e => handleEditChange('phone', e.target.value)} placeholder="Phone" />
                      <Input value={editForm.email} onChange={e => handleEditChange('email', e.target.value)} placeholder="Email" />
                      <Input value={editForm.address} onChange={e => handleEditChange('address', e.target.value)} placeholder="Address" />
                      <Input value={editForm.company} onChange={e => handleEditChange('company', e.target.value)} placeholder="Company" />
                      <Input value={editForm.website} onChange={e => handleEditChange('website', e.target.value)} placeholder="Website" />
                      <Input value={editForm.notes} onChange={e => handleEditChange('notes', e.target.value)} placeholder="Notes" className="col-span-2" />
                      <div className="col-span-2 flex gap-2 mt-2">
                        <Button variant="hero" size="sm" onClick={handleSaveEdit}>Save</Button>
                        <Button variant="outline" size="sm" onClick={() => { setEditingId(null); setEditForm(null); }}>Cancel</Button>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <div><strong>Contact:</strong> {supplier.contactName}</div>
                      <div><strong>Phone:</strong> {supplier.phone}</div>
                      <div><strong>Email:</strong> {supplier.email}</div>
                      <div><strong>Address:</strong> {supplier.address}</div>
                      <div><strong>Company:</strong> {supplier.company}</div>
                      <div><strong>Website:</strong> {supplier.website}</div>
                      <div className="col-span-2"><strong>Notes:</strong> {supplier.notes}</div>
                      <div className="col-span-2 flex gap-2 mt-2">
                        <Button variant="outline" size="sm" onClick={() => handleEdit(supplier)}>Edit</Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDelete(supplier.id)}>Delete</Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
}
