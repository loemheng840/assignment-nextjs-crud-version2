// app/create/page.tsx
import { CreateFormComponent } from "../../components/AuthComponents/CreateFormComponent"; // Adjust path if needed

export default function CreatePage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Create New Car Listing</h1>
      <CreateFormComponent />
    </div>
  );
}