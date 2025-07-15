import React, { useState } from "react";
import "./todoDesign.css";

/** 
 * AddTodoForm modal based on Figma "ADD TODO"
 * PUBLIC_INTERFACE
 */
function AddTodoForm({ open, onClose, onSubmit }) {
  // manage local form state
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");

  if (!open) return null;

  return (
    <div className="modal-bg">
      <div className="add-todo-modal">
        <div className="add-todo-modal-statusbar"></div>
        <header className="add-todo-modal-appbar">
          <button
            onClick={onClose}
            className="add-todo-back-btn"
            aria-label="Back"
            tabIndex={0}
          >
            <svg height={24} width={30} viewBox="0 0 30 22">
              <polyline points="20,3 8,11 20,19" fill="none" stroke="#fff" strokeWidth="3.3" strokeLinecap="round" />
            </svg>
          </button>
          <span className="add-todo-title">Add Task</span>
        </header>
        <form
          className="add-todo-form"
          onSubmit={e => {
            e.preventDefault();
            if (title) {
              onSubmit(title, detail);
              setTitle("");
              setDetail("");
            }
          }}
        >
          <label className="input-label" htmlFor="todo-title">Title</label>
          <input
            id="todo-title"
            className="add-todo-input"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Enter todo title"
            required
            autoFocus
          />
          <div className="figma-underline"></div>

          <label className="input-label" htmlFor="todo-detail">Detail</label>
          <input
            id="todo-detail"
            className="add-todo-input"
            value={detail}
            onChange={e => setDetail(e.target.value)}
            placeholder="Detail (optional)"
            style={{marginBottom:"16px"}}
          />
          <div className="figma-underline"></div>

          <button type="submit" className="add-btn-main">
            ADD
          </button>
        </form>
      </div>
    </div>
  );
}
// Figma main design image for developer overlay accuracy test
const FIGMA_IMAGE_URL = "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/bf55dd19-9dba-4820-8996-632019df5cc8";

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

/**
 * PUBLIC_INTERFACE
 * Main App for the Todo frontend. Now includes (dev only) a Figma screenshot overlay toggle for pixel QA.
 */
function App() {
  // Static sample todos (static for visual only)
  const [todos, setTodos] = useState([
    { title: "Go for a run", desc: "5km in the park, morning", completed: false },
    { title: "Daily Standup", desc: "Zoom at 9:30 AM", completed: false },
    { title: "Write blog post", desc: "Draft new article", completed: true },
    { title: "Buy groceries", desc: "Eggs, bread, milk", completed: false },
    { title: "Read book", desc: "Finish 1 chapter", completed: false },
  ]);
  const [tab, setTab] = useState("all"); // "all" or "completed"
  const [showFigma, setShowFigma] = useState(false);

  // Modal for Add-Todo
  const [showAddModal, setShowAddModal] = useState(false);

  // Filter todos for completed tab
  const filteredTodos = tab === "all" ? todos : todos.filter(t => t.completed);

  // Simulate checkbox
  const handleToggle = idx => {
    setTodos(prev => prev.map((todo, i) =>
      i === idx ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // Modal open
  const handleAdd = () => setShowAddModal(true);

  // Modal submit
  const handleAddSubmit = (title, detail) => {
    setTodos(prev => [{title, desc: detail, completed: false}, ...prev]);
    setShowAddModal(false);
  };

  return (
    <div className="todo-app-bg">
      {/* Dev: toggle Figma overlay to check pixel-accuracy */}
      <button
        className="figma-toggle-btn"
        onClick={() => setShowFigma(f => !f)}
        tabIndex={-1}
        style={{
          position: "absolute",
          top: 10,
          left: 10,
          zIndex: 200,
          background: "#fff",
          color: "#9395d3",
          border: "1.5px solid #9395d3",
          fontWeight: 700,
          borderRadius: "8px",
          padding: "8px 18px",
          opacity: 0.8,
          cursor: "pointer",
          fontSize: "13px"
        }}
        title="Toggle Figma Design Overlay"
      >
        {showFigma ? "Hide Figma" : "Show Figma Design"}
      </button>
      {showFigma && (
        <img
          src={FIGMA_IMAGE_URL}
          alt="Figma Design Overlay"
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 414,
            height: 896,
            zIndex: 100,
            opacity: 0.52,
            pointerEvents: "none",
            borderRadius: 24
          }}
          draggable={false}
        />
      )}
      <div className="status-bar"></div>
      <AppBar />
      <TodosList todos={filteredTodos} onToggle={handleToggle} />
      <FloatingAddButton onAdd={handleAdd} />
      <BottomNav currentTab={tab} onTabChange={setTab} />
      <AddTodoForm
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddSubmit}
      />
    </div>
  );
}

export default App;
