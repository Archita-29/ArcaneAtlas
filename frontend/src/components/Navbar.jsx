import { Link, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme") === "dark";
    setDark(saved);
    document.documentElement.classList.toggle("dark", saved);
  }, []);

  const toggleDark = () => {
    const newVal = !dark;
    setDark(newVal);
    document.documentElement.classList.toggle("dark", newVal);
    localStorage.setItem("theme", newVal ? "dark" : "light");
  };

  return (
    <div className="backdrop-blur-lg bg-white/60 dark:bg-gray-900/60 shadow sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
        
        {/* LOGO */}
        <Link to="/" className="text-2xl font-bold">
          ArcaneAtlas
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-6 text-lg items-center">
          <NavLink to="/" className="hover:text-blue-600">Explore</NavLink>
          <NavLink to="/map" className="hover:text-blue-600">Map</NavLink>
          <NavLink to="/wishlist" className="hover:text-blue-600">Wishlist</NavLink>

          {/* DARK MODE BUTTON */}
          <button
            onClick={toggleDark}
            className="ml-4 text-xl px-3 py-1 rounded-lg bg-gray-300 dark:bg-gray-700"
          >
            {dark ? "☀️" : "🌙"}
          </button>
        </div>

        {/* Mobile Menu Icon */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-xl">
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden flex flex-col p-4 bg-white dark:bg-gray-900 border-t">
          <NavLink to="/" className="py-2">Explore</NavLink>
          <NavLink to="/map" className="py-2">Map</NavLink>
          <NavLink to="/wishlist" className="py-2">Wishlist</NavLink>

          <button
            onClick={toggleDark}
            className="mt-3 p-2 rounded-lg bg-gray-300 dark:bg-gray-700"
          >
            {dark ? "☀️ Light mode" : "🌙 Dark mode"}
          </button>
        </div>
      )}
    </div>
  );
}
