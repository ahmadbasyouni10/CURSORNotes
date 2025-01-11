'use client'
import { useDocumentData } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";
import { db } from "@/firebase";
import Link from "next/link";
import { usePathname } from "next/navigation";
import path from "path";

function SidebarOption({href, id}: {
    href: string;
    id: string;
} ) {
    // documents is the collection name in the database of all documents (rooms) in the database
    // id is the document id
    // useDocumentData hook to get the data from the document
    const [data, loading, error] = useDocumentData(doc(db, "documents", id));
    // path currently on
    const pathName = usePathname();
    const isActive = href.includes(pathName) && pathName != "/";

    if (!data) return null;

    return (
        <Link href={href} className={`w-full border p-2 rounded-md ${isActive ? "bg-gray-300 font-bold border-black" : "border-gray-400"}`}>
            <p className="truncate text-center font-semibold">{data.title}</p>
        </Link>
  )
}

export default SidebarOption