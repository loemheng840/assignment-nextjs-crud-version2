// app/update/[id]/page.tsx
import { UpdateFormComponent } from "../../../components/AuthComponents/UpdateFormComponent"; // Adjust path if needed
import { Suspense } from "react";

interface UpdatePageProps {
  params: {
    id: string;
  };
}

export default function UpdatePage({ params }: UpdatePageProps) {
  const { id } = params;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Update Car Listing (ID: {id})</h1>
      <Suspense fallback={<div>Loading form...</div>}>
        <UpdateFormComponent carId={id} />
      </Suspense>
    </div>
  );
}