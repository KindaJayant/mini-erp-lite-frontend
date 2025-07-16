import React from "react";
import { NavLink } from "react-router-dom";
import { FaBoxes, FaUserFriends, FaExchangeAlt, FaThLarge } from "react-icons/fa";

export default function Navbar() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <h1 className="text-xl font-bold text-gray-800">Mini ERP Lite</h1>
        <nav className="flex gap-6 text-gray-600">
          <NavLink to="/" className={({ isActive }) =>
            isActive ? "font-semibold text-black" : "hover:text-black"
          }>
            <div className="flex items-center gap-1"><FaThLarge /> Dashboard</div>
          </NavLink>
          <NavLink to="/products" className={({ isActive }) =>
            isActive ? "font-semibold text-black" : "hover:text-black"
          }>
            <div className="flex items-center gap-1"><FaBoxes /> Products</div>
          </NavLink>
          <NavLink to="/suppliers" className={({ isActive }) =>
            isActive ? "font-semibold text-black" : "hover:text-black"
          }>
            <div className="flex items-center gap-1"><FaUserFriends /> Suppliers</div>
          </NavLink>
          <NavLink to="/transactions" className={({ isActive }) =>
            isActive ? "font-semibold text-black" : "hover:text-black"
          }>
            <div className="flex items-center gap-1"><FaExchangeAlt /> Transactions</div>
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
