import Header from "@/app/components/Header";
import { GiHamburgerMenu } from "react-icons/gi";

export default function Home() {
  return (
    <div className=" flex justify-between px-4 py-5 bg-white shadow-md rounded-sm">
      <div className="flex items-center">
        <GiHamburgerMenu />
        <p className="mx-2 text-slate-900 font-semibold text-2xl font-poppins">
          Book Store
        </p>
      </div>
    </div>
  );
}
