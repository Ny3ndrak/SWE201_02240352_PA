// src/components/TaskInput.jsx
import React, { useState } from "react";

function TaskInput({ onAddTask }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("normal"); // second piece of state

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAddTask({ id: Date.now(), title: title.trim(), priority });
    setTitle("");
    setPriority("normal");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: "0.5rem" }}>
        <input
          type="text"
          placeholder="Task title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            width: "100%",
            padding: "0.5rem",
            border: "1px solid #d1d5db"
          }}
        />
      </div>
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          style={{
            padding: "0.5rem",
            border: "1px solid #d1d5db",
            cursor: "pointer",
            background: "white"
          }}
        >
          <option value="low">Low</option>
          <option value="normal">Normal</option>
          <option value="high">High</option>
        </select>
        <button 
          type="submit" 
          style={{
            background: "#667eea",
            color: "white",
            border: "none",
            padding: "0.5rem 1rem",
            cursor: "pointer"
          }}
        >
          Add Task
        </button>
        <button
          type="button"
          onClick={() => setTitle("")}
          style={{
            background: "#6b7280",
            color: "white",
            border: "none",
            padding: "0.5rem 1rem",
            cursor: "pointer"
          }}
        >
          Clear
        </button>
      </div>
      <div style={{ 
        marginTop: "0.5rem",
        padding: "0.5rem",
        background: "#f3f4f6",
        fontSize: "0.85rem",
        color: "#6b7280"
      }}>
        Preview: "{title || "(empty)"}" - Priority: {priority}
      </div>
    </form>
  );
}

export default TaskInput;
