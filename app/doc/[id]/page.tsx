'use client'
import { use } from "react";

import Document from "@/components/Document"
function DocumentPage({params}:{params: Promise<{id: string}> }) {
    const { id } = use(params);
  return (
    <Document id={id} />
  )
}

export default DocumentPage