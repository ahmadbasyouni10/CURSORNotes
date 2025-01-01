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

function Sidebar() {

  // React element for the menu / React Node containing multiple components
  // infered return using '()' instead of '{}'
  const menuOptions = (
    <>
      <NewDocumentButton />
      {/* My Documents*/}
      {/* List */}
      
      {/* Shared with Me*/}
      {/* List */}
    
    </>
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
            <div>
              {menuOptions}
            </div>
          </SheetContent>
        </Sheet>
      </div>
      <div className="hidden md:inline">
        {menuOptions}
      </div>
    </div>
  );
}

export default Sidebar;
