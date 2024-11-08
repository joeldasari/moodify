import { Music } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="px-[120px] py-[16px] max-md:px-[60px] max-sm:px-[16px]">
      <div className="flex items-center gap-2">
        <Music color="#1ed760" />
        <h1 className="text-2xl hero-text font-semibold">Moodify</h1>
      </div>
    </nav>
  );
};

export default Navbar;
