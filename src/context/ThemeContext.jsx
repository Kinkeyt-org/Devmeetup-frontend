import React, { createContext, useContext, useLayoutEffect, useState } from "react";

const ThemeContext = createContext();

const applyThemeClass = (theme) => {
  const root = window.document.documentElement;
  if (theme === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Try to get stored theme
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      return storedTheme;
    }
    // Check user system preference
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    return "light";
  });

  useLayoutEffect(() => {
    applyThemeClass(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => {
      const nextTheme = prev === "light" ? "dark" : "light";
      // Apply class immediately on click to avoid visual delay.
      applyThemeClass(nextTheme);
      return nextTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
