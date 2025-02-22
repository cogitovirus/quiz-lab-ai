"use client";

import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";

export default function DarkModeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark mode

  // Toggle dark mode and persist preference
  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
    document.documentElement.classList.toggle("dark", !isDarkMode);
    localStorage.setItem("theme", !isDarkMode ? "dark" : "light");
  };

  // Apply dark mode by default OR load user preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else {
      // If no preference, default to dark mode
      document.documentElement.classList.add("dark");
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
