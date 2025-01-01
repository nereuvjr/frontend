import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ClientsTable } from "@/components/clients/ClientsTable";
import { ClientForm } from "@/components/clients/ClientForm";
import { Client, ClientFormData } from "@/types/client";

// Mock data - replace with actual API calls
const mockClients: Client[] = [
  {
    id: "1",
    name: "João Silva",
    email: "joao@email.com",
    phone: "(11) 99999-9999",
    document: "123.456.789-00",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  // Add more mock data as needed
];

export function Clients() {
  const [clients] = useState<Client[]>(mockClients);
  const [open, setOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const handleSubmit = async (data: ClientFormData) => {
    if (selectedClient) {
      // Update existing client
      console.log("Update client:", { id: selectedClient.id, ...data });
    } else {
      // Create new client
      console.log("Create client:", data);
    }
    setOpen(false);
    setSelectedClient(null);
  };

  const handleEdit = (client: Client) => {
    setSelectedClient(client);
    setOpen(true);
  };

  const handleDelete = (client: Client) => {
    console.log("Delete client:", client);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Clientes</h1>
          <p className="text-muted-foreground">
            Gerencie os clientes do cartório
          </p>
        </div>
        <Button onClick={() => setOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Novo Cliente
        </Button>
      </div>

      <ClientsTable
        clients={clients}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedClient ? "Editar Cliente" : "Novo Cliente"}
            </DialogTitle>
          </DialogHeader>
          <ClientForm
            initialData={selectedClient || undefined}
            onSubmit={handleSubmit}
            onCancel={() => {
              setOpen(false);
              setSelectedClient(null);
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}