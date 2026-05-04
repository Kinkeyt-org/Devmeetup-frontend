import React from "react";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative w-10 h-10 flex items-center justify-center cursor-pointer rounded-full bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 transition duration-300"
      aria-label="Toggle Dark Mode"
    >
      <motion.div
        initial={false}
        animate={{
          scale: theme === "light" ? 1 : 0,
          opacity: theme === "light" ? 1 : 0,
          rotate: theme === "light" ? 0 : 90,
        }}
        transition={{ duration: 0.1, ease: "easeInOut" }}
        className="absolute"
      >
        <Sun className="w-5 h-5 text-neutral-600" />
      </motion.div>
      <motion.div
        initial={false}
        animate={{
          scale: theme === "dark" ? 1 : 0,
          opacity: theme === "dark" ? 1 : 0,
          rotate: theme === "dark" ? 0 : -90,
        }}
        transition={{ duration: 0.1, ease: "easeInOut" }}
        className="absolute"
      >
        <Moon className="w-5 h-5 text-neutral-300" />
      </motion.div>
    </button>
  );
};

export default ThemeToggle;
