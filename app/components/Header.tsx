import React from 'react'
import { GiHamburgerMenu } from "react-icons/gi";


const Header: React.FC = () => {
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
};

export default Header