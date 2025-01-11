'use client'
import NewDocumentButton from "@/components/NewDocumentButton";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import { useCollection } from "react-firebase-hooks/firestore";
import { query, collectionGroup, where, DocumentData, doc } from "firebase/firestore";
import { useUser } from "@clerk/nextjs";
import { db } from "@/firebase";
import { useEffect, useState} from "react";
import SidebarOption from "./SidebarOption";

interface RoomDocument extends DocumentData {
  userId: string;
  role: "owner" | "editor";
  roomId: string;
  createdAt: string;
}

function Sidebar() {
  const {user} = useUser();

  const [groupedData, setGroupedData] = useState<{
    owner: RoomDocument[];
    editor: RoomDocument[];
  }>({ owner: [], editor: [] });

  const email = user?.emailAddresses[0];
  const [data, loading, error] = useCollection(
    user && (
      query(collectionGroup(db, "rooms"), where("userId", "==", user.emailAddresses[0].emailAddress))
    )
  );

  useEffect(() => {
    if (!data) return;
    const grouped = data.docs.reduce<{
      owner: RoomDocument[];
      editor: RoomDocument[];
    }>(
      (acc, doc) => {
        const roomData = doc.data() as RoomDocument;
        if (roomData.role === "owner") {
          acc.owner.push(roomData);
        } else {
          acc.editor.push(roomData);
        }
        return acc;
      }, { owner: [], editor: [] }
    )
    setGroupedData(grouped);
  }, [data]);

  // Create two separate menu options components for mobile and desktop
  const mobileMenuOptions = (
    <div>
    <div className="flex flex-col items-center w-full space-y-4">
      <NewDocumentButton />
      <h2 className="text-gray-500 font-semibold text-sm">My Documents</h2>
      <div className="flex flex-col w-full space-y-4">
        {groupedData.owner.length > 0 ? (
          <>
            {groupedData.owner.map((doc) => (
              <SidebarOption key={doc.roomId} id={doc.roomId} href={`/doc/${doc.roomId}`} />
            ))}
          </>
        ) : (
          <h2 className="text-gray-500 font-semibold text-sm text-center">No Documents Found</h2>
        )}
      </div>
    </div>
    
    {groupedData.owner.length > 0 && (
      <>
        <div className=" mt-8 top-3 flex flex-col items-center w-full space-y-4">
        <h2 className="text-gray-500 font-semibold text-sm">Shared Documents</h2>
        <div className="flex flex-col w-full space-y-4">
          {groupedData.owner.map((doc) => (
            <SidebarOption key={doc.roomId} id={doc.roomId} href={`/doc/${doc.roomId}`} />
          ))}
        </div>
      </div>
      </>
    )}
  </div>
  );

  
  const desktopMenuOptions = (
      <div>
      <div className="flex flex-col items-center md:max-w-36 space-y-4">
        <NewDocumentButton />
        <h2 className="text-gray-500 font-semibold text-sm">My Documents</h2>
        <div className="flex flex-col max-w-36 space-y-4 w-full">
          {groupedData.owner.map((doc) => (
            <SidebarOption key={doc.roomId} id={doc.roomId} href={`/doc/${doc.roomId}`} />
          ))}
        </div>
      </div>
  
  
      <div className="mt-8 flex flex-col items-center md:max-w-36 space-y-4">
        <h2 className="text-gray-500 font-semibold text-sm">Shared</h2>
        <div className="flex flex-col max-w-36 space-y-4 w-full">
          {groupedData.owner.map((doc) => (
            <SidebarOption key={doc.roomId} id={doc.roomId} href={`/doc/${doc.roomId}`} />
          ))}
        </div>
      </div>
      </div>
    
  );

  return (
    <div className="p-2 md:p-5 bg-gray-200 relative">
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger>
            <MenuIcon className="p-2 hover:opacity-30 rounded-lg" size={40} />
          </SheetTrigger>
          <SheetContent className="flex flex-col items-center" side="left">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <div className="w-full px-4">
              {mobileMenuOptions}
            </div>
          </SheetContent>
        </Sheet>
      </div>
      <div className="hidden md:flex md:flex-col md:items-center">
        {desktopMenuOptions}
      </div>
    </div>
  );
}

export default Sidebar;