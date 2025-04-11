"use client";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [dark, setDark] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const isDark = localStorage.getItem("theme") === "dark";
    setDark(isDark);
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    setMounted(true);
  }, []);

  const toggleDark = () => {
    const newTheme = !dark;
    setDark(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
    if (newTheme) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  if (!mounted) return null;

  return (
    <nav className="bg-gray-300 dark:bg-gray-800 p-4 flex justify-between items-center">
      <h1 className="text-2xl font-extrabold text-black dark:text-white cursor-pointer">
        Car Finder
      </h1>
      <motion.div
        transition={{ type: "spring" }}
        animate={{ scale: 1.2 }}
        className="flex items-center space-x-4"
      >
        <a href="/" className="hover:underline text-black dark:text-white">
          Home
        </a>
        <a
          href="/wishlist"
          className="hover:underline text-black dark:text-white"
        >
          Wishlist
        </a>

        <motion.button
          whileHover={{ scale: 1.2 }}
          onClick={toggleDark}
          className="px-2 py-1 text-black dark:text-white cursor-pointer rounded-xl"
        >
          {dark ? <Sun size={20} /> : <Moon size={20} />}
        </motion.button>
      </motion.div>
    </nav>
  );
}
