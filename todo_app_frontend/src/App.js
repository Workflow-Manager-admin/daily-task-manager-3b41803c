import React from "react";
import "./todoDesign.css";

/** 
 * AppBar component for the top bar
 * PUBLIC_INTERFACE
 */
function AppBar() {
  return (
    <header className="app-bar">
      <div className="app-bar-content">
        <span className="app-bar-title">Todo Apps</span>
        <span className="app-bar-icon">
          {/* Placeholder SVG for Calendar Icon */}
          <svg width="34" height="34" viewBox="0 0 34 34"><rect width="34" height="34" rx="8" fill="#fff"/><rect x="7" y="13" width="20" height="12" rx="3" fill="#9395D3"/><rect x="7" y="7" width="20" height="5" rx="2" fill="#9395D3"/><rect x="11" y="18" width="4" height="4" rx="1" fill="#fff"/><rect x="19" y="18" width="4" height="4" rx="1" fill="#fff"/></svg>
        </span>
      </div>
    </header>
  );
}

/**
 * FloatingAddButton component
 * PUBLIC_INTERFACE
 */
function FloatingAddButton({ onAdd }) {
  return (
    <button className="floating-add-btn" title="Add new todo" onClick={onAdd}>
      <span className="plus-icon">
        +
      </span>
    </button>
  );
}

/**
 * Bottom navigation bar (tabs)
 * PUBLIC_INTERFACE
 */
function BottomNav({ currentTab, onTabChange }) {
  return (
    <nav className="bottom-nav">
      <div
        className={`nav-item${currentTab === "all" ? " active" : ""}`}
        onClick={() => onTabChange("all")}
      >
        {/* Playlist SVG icon */}
        <svg width="30" height="30" viewBox="0 0 30 30">
          <rect width="10" height="4" rx="2" y="4" x="4" fill={currentTab === "all" ? "#9395D3" : "#B5B7BB"} />
          <rect width="18" height="4" rx="2" y="13" x="4" fill={currentTab === "all" ? "#9395D3" : "#B5B7BB"} />
          <rect width="8" height="4" rx="2" y="22" x="4" fill={currentTab === "all" ? "#9395D3" : "#B5B7BB"} />
        </svg>
        <span>All</span>
      </div>
      <div
        className={`nav-item${currentTab === "completed" ? " active" : ""}`}
        onClick={() => onTabChange("completed")}
      >
        {/* Tick SVG icon */}
        <svg width="30" height="30" viewBox="0 0 30 30">
          <polyline points="7,16 13,22 23,8" stroke={currentTab === "completed" ? "#9395D3" : "#B5B7BB"} strokeWidth="3.5" fill="none" strokeLinecap="round"/>
        </svg>
        <span>Completed</span>
      </div>
    </nav>
  );
}

/**
 * Single TodoCard
 * PUBLIC_INTERFACE
 */
function TodoCard({ title, desc, completed, onCheck }) {
  return (
    <div className="todo-card">
      <div className="todo-card-indicator"></div>
      <div className="todo-card-main">
        <div className="todo-card-title">{title}</div>
        <div className="todo-card-desc">{desc}</div>
      </div>
      <div className="todo-card-check">
        <input
          type="checkbox"
          checked={completed}
          onChange={onCheck}
          aria-label={`Mark "${title}" as complete`}
        />
      </div>
    </div>
  );
}

/**
 * TodosList - main vertical list of TodoCards
 * PUBLIC_INTERFACE
 */
function TodosList({ todos, onToggle }) {
  return (
    <main className="todos-list">
      {todos.map((todo, idx) => (
        <TodoCard
          key={idx}
          title={todo.title}
          desc={todo.desc}
          completed={todo.completed}
          onCheck={() => onToggle(idx)}
        />
      ))}
    </main>
  );
}

// PUBLIC_INTERFACE
function App() {
  // Static sample todos (static for visual only)
  const [todos, setTodos] = React.useState([
    { title: "Go for a run", desc: "5km in the park, morning", completed: false },
    { title: "Daily Standup", desc: "Zoom at 9:30 AM", completed: false },
    { title: "Write blog post", desc: "Draft new article", completed: true },
    { title: "Buy groceries", desc: "Eggs, bread, milk", completed: false },
    { title: "Read book", desc: "Finish 1 chapter", completed: false },
  ]);
  const [tab, setTab] = React.useState("all"); // "all" or "completed"

  // Filter todos for completed tab
  const filteredTodos = tab === "all" ? todos : todos.filter(t => t.completed);

  // Simulate checkbox
  const handleToggle = idx => {
    setTodos(prev => prev.map((todo, i) =>
      i === idx ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // Simulate add
  const handleAdd = () => {
    window.alert("Add New Todo (functionality not implemented)");
  };

  // Filling background frame and fixed layout
  return (
    <div className="todo-app-bg">
      <div className="status-bar"></div>
      <AppBar />
      <TodosList todos={filteredTodos} onToggle={handleToggle} />
      <FloatingAddButton onAdd={handleAdd} />
      <BottomNav currentTab={tab} onTabChange={setTab} />
    </div>
  );
}

export default App;
