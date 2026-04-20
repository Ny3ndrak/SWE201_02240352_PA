// src/components/ThemeToggleButton.jsx
import React from "react";
import { useTheme } from "../context/ThemeContext";

function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button 
      onClick={toggleTheme} 
      style={{ 
        background: theme === "light" ? "#374151" : "#f3f4f6",
        color: theme === "light" ? "#ffffff" : "#1f2937",
        border: "1px solid",
        borderColor: theme === "light" ? "#4b5563" : "#d1d5db",
        padding: "0.5rem 1rem",
        cursor: "pointer"
      }}
    >
      Switch to {theme === "light" ? "dark" : "light"} mode
    </button>
  );
}

export default ThemeToggleButton;
