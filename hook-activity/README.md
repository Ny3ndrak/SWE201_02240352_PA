# Reactive Task Board: State and Side Effects with Hooks

A comprehensive React hooks activity for learning state management and side effects in React functional components.

## Learning Objectives

This activity demonstrates all major React hooks:

- **useState**: Managing local component state
- **useEffect**: Handling side effects and lifecycle behavior
- **useContext**: Sharing data across components without prop drilling
- **useReducer**: Managing complex state transitions
- **Custom Hooks**: Encapsulating reusable stateful logic

## Features

✅ Add tasks with priority levels (low, normal, high)  
✅ Mark tasks as complete/incomplete  
✅ Clear completed tasks  
✅ Dark/Light theme toggle  
✅ Persistent storage using localStorage  
✅ Preview task input in real-time  

## Getting Started

### Prerequisites

- Node.js and npm installed
- Basic familiarity with React components and JSX

### Installation

```bash
# Install dependencies
npm install

# Start the development server
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

## Project Structure

```
hook-activity/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── TaskInput.jsx          # useState demo
│   │   └── ThemeToggleButton.jsx  # useContext consumer
│   ├── context/
│   │   └── ThemeContext.jsx       # useContext provider
│   ├── hooks/
│   │   ├── useLocalStorageState.js  # Custom hook
│   │   └── useTasks.js              # Custom hook with useReducer
│   ├── reducers/
│   │   └── taskReducer.js         # useReducer logic
│   ├── App.jsx                    # Main component
│   └── index.js                   # Entry point
├── package.json
└── README.md
```

## Hook Usage Examples

### Part 1: useState

```jsx
const [title, setTitle] = useState("");
const [priority, setPriority] = useState("normal");
```

### Part 2: useEffect

```jsx
useEffect(() => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}, [tasks]);
```

### Part 3: useContext

```jsx
const { theme, toggleTheme } = useTheme();
```

### Part 4: useReducer

```jsx
const [state, dispatch] = useReducer(taskReducer, initialTaskState);
dispatch({ type: "ADD_TASK", task: newTask });
```

### Part 5: Custom Hooks

```jsx
const { tasks, dispatch } = useTasks();
const [value, setValue] = useLocalStorageState("key", defaultValue);
```

## Available Scripts

- `npm start` - Run the development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App (one-way operation)

## Activity Extensions

Try these additional exercises:

1. **Filtering**: Add "All / Active / Completed" task filters
2. **Timestamps**: Show a badge for tasks created in the last 5 minutes
3. **Clock Component**: Use `useEffect` with `setInterval` to display a live clock
4. **Edit Task**: Add an EDIT_TASK action to the reducer
5. **Task Statistics**: Create a component showing task completion statistics

## Technologies Used

- React 18
- JavaScript (ES6+)
- localStorage API
- CSS-in-JS (inline styles)

## License

This project is for educational purposes.
