export interface Supplier {
  id: string;
  name: string;
  shortName: string;
  address: string;
  postcode: string;
  accountReference: string;
  phone: string;
  email: string;
  taxRefNumber: string;
  faxNumber: string;
  salesRep: string;
  salesRepEmail: string;
  salesRepContact: string;
  emailOrders: boolean;
  minOrderValue: number;
  deliveryDays: string[];
}

export const sampleSuppliers: Supplier[] = [
  {
    id: "1",
    name: "Admiral Foodstuff Trading",
    shortName: "admir",
    address: "",
    postcode: "",
    accountReference: "",
    phone: "",
    email: "julia@admiralisland.com",
    taxRefNumber: "",
    faxNumber: "",
    salesRep: "",
    salesRepEmail: "",
    salesRepContact: "",
    emailOrders: true,
    minOrderValue: 0,
    deliveryDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  {
    id: "2",
    name: "AFRICAN & EASTERN",
    shortName: "AE",
    address: "STREET NO B-15, BEHIND NESTLE OFFICE, 3RD INTERCHANGE, SHEIKH ZAYED RD",
    postcode: "32321",
    accountReference: "",
    phone: "+971553007957",
    email: "service@ane.ae",
    taxRefNumber: "",
    faxNumber: "+971 4 4344869",
    salesRep: "Giulia",
    salesRepEmail: "Giuliam@ane.ae",
    salesRepContact: "",
    emailOrders: true,
    minOrderValue: 0,
    deliveryDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  {
    id: "3",
    name: "AL ALIA BEVERAGES",
    shortName: "ALAL",
    address: "PO BOX 52172",
    postcode: "DUBAI",
    accountReference: "",
    phone: "+971565494309",
    email: "800mycoke@coca-cola.co.ae",
    taxRefNumber: "",
    faxNumber: "+971 4 3380929",
    salesRep: "Peri Peri",
    salesRepEmail: "",
    salesRepContact: "Parth",
    emailOrders: true,
    minOrderValue: 0,
    deliveryDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  {
    id: "4",
    name: "Barakat Vegetables & Fruits",
    shortName: "Barakat",
    address: "",
    postcode: "",
    accountReference: "",
    phone: "",
    email: "order@barakatgroup.ae",
    taxRefNumber: "",
    faxNumber: "",
    salesRep: "Yoonus",
    salesRepEmail: "Yoonus.M@barakatgroup.ae",
    salesRepContact: "",
    emailOrders: true,
    minOrderValue: 0,
    deliveryDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
];

export interface IngredientSupplier {
  supplierId: string;
  price: number;
  unit: string;
  packSize: string;
  isDefault: boolean;
}

// Ingredient to suppliers mapping (one ingredient can have multiple suppliers)
export type IngredientSuppliersMap = Record<string, IngredientSupplier[]>;

export const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const emptySupplier: Omit<Supplier, "id"> = {
  name: "",
  shortName: "",
  address: "",
  postcode: "",
  accountReference: "",
  phone: "",
  email: "",
  taxRefNumber: "",
  faxNumber: "",
  salesRep: "",
  salesRepEmail: "",
  salesRepContact: "",
  emailOrders: true,
  minOrderValue: 0,
  deliveryDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
};
