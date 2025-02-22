"use client";

import { useState, useEffect, useCallback } from "react";
import { Moon, Sun } from "lucide-react";

export default function DarkModeToggle() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  // Toggle dark mode and persist preference
  const toggleDarkMode = useCallback(() => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      document.documentElement.classList.toggle("dark", newMode);
      localStorage.setItem("theme", newMode ? "dark" : "light");
      return newMode;
    });
  }, []);

  // Load and apply user preference
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      const prefersDark = savedTheme ? savedTheme === "dark" : true; // Default to dark mode

      setIsDarkMode(prefersDark);
      document.documentElement.classList.toggle("dark", prefersDark);
    }
  }, []);

  return (
    <div className="flex items-center space-x-3">
      {/* Sun Icon (Light Mode) */}
      <Sun
        className={`w-6 h-6 text-yellow-500 transition-all ${
          isDarkMode ? "scale-90 opacity-50" : "scale-100 opacity-100"
        }`}
      />

      {/* Toggle Switch */}
      <label className="relative flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={isDarkMode}
          onChange={toggleDarkMode}
          className="sr-only peer"
        />
        <div className="w-12 h-6 bg-gray-300 dark:bg-gray-700 rounded-full peer ring-0 transition-all duration-300 relative">
          <div
            className={`absolute top-1 left-1 w-4 h-4 bg-white dark:bg-gray-900 rounded-full shadow-md transition-all duration-300 transform ${
              isDarkMode ? "translate-x-6" : "translate-x-0"
            }`}
          />
        </div>
      </label>

      {/* Moon Icon (Dark Mode) */}
      <Moon
        className={`w-6 h-6 text-gray-800 dark:text-gray-300 transition-all ${
          isDarkMode ? "scale-100 opacity-100" : "scale-90 opacity-50"
        }`}
      />
    </div>
  );
}
