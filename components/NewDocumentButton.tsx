'use client';

import { Button } from "./ui/button";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { createNewDocument } from "../actions/actions";


function NewDocumentButton() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const handleCreateNewDocument = () => {
    startTransition(async() => {
      // createnewdocument is a server action we will create later
      // it will create a new document in the database
      // and return the id of the new document
      const { docId } = await createNewDocument();
      // navigate to the new document
      router.push(`/document/${docId}`);
  })
}
  return (
    <div className="p-2">
        <Button onClick={handleCreateNewDocument} disabled={isPending}>{isPending ? "Creating..." : "New Document"}</Button>
    </div>
  )
}

export default NewDocumentButton