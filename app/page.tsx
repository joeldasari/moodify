import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="w-full gap-4 min-h-screen">
      <Navbar />
      <Hero />
    </div>
  );
}
