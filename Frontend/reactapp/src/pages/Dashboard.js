import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Home from "./Home";

function Dashboard() {
  const [page, setPage] = useState("home");

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar setPage={setPage} />
      <div style={{ flex: 1 }}>
        {page === "home" && <Home />}
        {page === "project" && <h2>Project Page</h2>}
        {page === "team" && <h2>Team Page</h2>}
        {page === "task" && <h2>Task Page</h2>}
        {page === "queries" && <h2>Queries Page</h2>}
      </div>
    </div>
  );
}

export default Dashboard;