import Image from "next/image";
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react";

export default function Home() {
  return (
      <main className="p-2 flex items-center">
        <ArrowLeft className="w-8 h-8" />
        <h1 className="2xl font-bold">Get started with CursorNotes</h1>
      </main>
  )}