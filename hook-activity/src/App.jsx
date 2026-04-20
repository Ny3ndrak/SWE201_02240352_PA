// src/App.jsx
import React from "react";
import TaskInput from "./components/TaskInput";
import ThemeToggleButton from "./components/ThemeToggleButton";
import { useTheme } from "./context/ThemeContext";
import { useTasks } from "./hooks/useTasks";

function App() {
  const { theme } = useTheme();
  const { tasks, dispatch } = useTasks();

  const background = theme === "light" ? "#ffffff" : "#1f2937";
  const color = theme === "light" ? "#000000" : "#ffffff";
  const cardBg = theme === "light" ? "#f9fafb" : "#374151";
  
  const getPriorityColor = (priority) => {
    switch(priority) {
      case "high": return theme === "light" ? "#dc2626" : "#f87171";
      case "normal": return theme === "light" ? "#2563eb" : "#60a5fa";
      case "low": return theme === "light" ? "#059669" : "#34d399";
      default: return theme === "light" ? "#6b7280" : "#9ca3af";
    }
  };

  return (
    <div
      style={{
        padding: "1rem",
        fontFamily: "sans-serif",
        background,
        color,
        minHeight: "100vh",
      }}
    >
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>
          Reactive Task Board
        </h1>
        <div style={{ marginBottom: "1rem" }}>
          <ThemeToggleButton />
        </div>
        
        <div style={{
          background: cardBg,
          padding: "1rem",
          border: "1px solid",
          borderColor: theme === "light" ? "#e5e7eb" : "#4b5563",
          marginBottom: "1rem"
        }}>
          <TaskInput
            onAddTask={(task) =>
              dispatch({ type: "ADD_TASK", task: { ...task, done: false } })
            }
          />
        </div>
        
        <div style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center",
          marginBottom: "1rem" 
        }}>
          <p style={{ margin: 0 }}>
            Total tasks: <strong>{tasks.length}</strong>
          </p>
          <button 
            onClick={() => dispatch({ type: "CLEAR_COMPLETED" })}
            style={{
              background: theme === "light" ? "#ef4444" : "#dc2626",
              color: "white",
              border: "none",
              padding: "0.5rem 1rem",
              cursor: "pointer"
            }}
          >
            Clear Completed
          </button>
        </div>
        
        <ul style={{ 
          listStyle: "none", 
          padding: 0,
          margin: 0
        }}>
          {tasks.map((t) => (
            <li key={t.id} style={{
              background: cardBg,
              padding: "0.75rem",
              marginBottom: "0.5rem",
              border: "1px solid",
              borderColor: theme === "light" ? "#e5e7eb" : "#4b5563",
              borderLeftWidth: "3px",
              borderLeftColor: getPriorityColor(t.priority)
            }}>
              <label style={{ 
                display: "flex", 
                alignItems: "center",
                cursor: "pointer"
              }}>
                <input
                  type="checkbox"
                  checked={t.done}
                  onChange={() => dispatch({ type: "TOGGLE_DONE", id: t.id })}
                  style={{
                    cursor: "pointer"
                  }}
                />
                <span
                  style={{
                    textDecoration: t.done ? "line-through" : "none",
                    marginLeft: "0.5rem",
                    flex: 1,
                    opacity: t.done ? 0.5 : 1
                  }}
                >
                  {t.title}
                </span>
                <span style={{
                  background: getPriorityColor(t.priority),
                  color: "white",
                  padding: "0.25rem 0.5rem",
                  fontSize: "0.75rem"
                }}>
                  {t.priority}
                </span>
              </label>
            </li>
          ))}
        </ul>
        
        {tasks.length === 0 && (
          <div style={{
            textAlign: "center",
            padding: "2rem",
            background: cardBg,
            border: "1px solid",
            borderColor: theme === "light" ? "#e5e7eb" : "#4b5563",
            opacity: 0.7
          }}>
            <p style={{ margin: 0 }}>No tasks yet. Add one above to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
