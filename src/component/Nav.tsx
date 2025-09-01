"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, PenSquare, Home } from "lucide-react";
 

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="  bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-gray-100">
            MyBlog
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <Link
              href="/"
              className="flex font-bold items-center gap-1 hover:text-indigo-400 transition"
            >
              <Home size={18} /> Home
            </Link>
            <Link
              href="/create"
              className="flex font-bold items-center gap-1 hover:text-indigo-400 transition"
            >
              <PenSquare size={18} /> Create
            </Link>
          </div>

          {/* <ToggleBtn /> */}

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-gray-300 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-black border-t border-gray-700 shadow-sm">
          <Link
            href="/"
            className="block px-4 py-3 hover:bg-gray-800 transition"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/create"
            className="block px-4 py-3 hover:bg-gray-800 transition"
            onClick={() => setIsOpen(false)}
          >
            Create
          </Link>
        </div>
      )}
    </nav>
  );
}
