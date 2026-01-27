function Sidebar({ setPage }) {
  return (
    <div style={{ width: "220px", background: "#2c2f4a", color: "white" }}>
      <h3>Task-Flow</h3>

      <p onClick={() => setPage("home")}>Home</p>
      <p onClick={() => setPage("project")}>Project</p>
      <p onClick={() => setPage("team")}>Team</p>
      <p onClick={() => setPage("task")}>Task</p>
      <p onClick={() => setPage("queries")}>Queries</p>
      <p>Settings</p>
    </div>
  );
}

export default Sidebar;