import React from "react";
import { assets } from "../asset/admin_assets/assets";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="h-screen w-20 md:w-56 bg-white border-r border-gray-200 flex flex-col py-6">
      {/* Title (hidden on mobile) */}
      <h2 className="text-xl font-bold text-center mb-8 hidden md:block">
        Admin Panel
      </h2>

      <nav className="flex flex-col gap-3">
        <NavLink
          to="/add"
          className={({ isActive }) =>
            `flex items-center gap-3 px-5 py-3 rounded-md transition 
             hover:bg-gray-100 ${
               isActive ? "bg-gray-200 font-medium" : "text-gray-800"
             }`
          }
        >
          <img src={assets.add_icon} alt="Add" className="w-5 h-5" />
          <p className="hidden md:block">Add Items</p>
        </NavLink>

        <NavLink
          to="/list"
          className={({ isActive }) =>
            `flex items-center gap-3 px-5 py-3 rounded-md transition 
             hover:bg-gray-100 ${
               isActive ? "bg-gray-200 font-medium" : "text-gray-800"
             }`
          }
        >
          <img src={assets.order_icon} alt="List" className="w-5 h-5" />
          <p className="hidden md:block">List Items</p>
        </NavLink>

        <NavLink
          to="/order"
          className={({ isActive }) =>
            `flex items-center gap-3 px-5 py-3 rounded-md transition 
             hover:bg-gray-100 ${
               isActive ? "bg-gray-200 font-medium" : "text-gray-800"
             }`
          }
        >
          <img src={assets.order_icon} alt="Order" className="w-5 h-5" />
          <p className="hidden md:block">Orders</p>
        </NavLink>
      </nav>
    </div>
  );
};

export default SideBar;
