import Navbar from "@/components/Navbar/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-[2000px] flex-col items-center  p-24">
      <Navbar />
      <div className="bg-red-900 h-screen w-screen flex items-center justify-center"></div>
      <div className="bg-black h-screen w-screen flex items-center justify-center"></div>
    </main>
  );
}
