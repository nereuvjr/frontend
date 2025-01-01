export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  document: string;
  createdAt: string;
  updatedAt: string;
}

export interface ClientFormData {
  name: string;
  email: string;
  phone: string;
  document: string;
}