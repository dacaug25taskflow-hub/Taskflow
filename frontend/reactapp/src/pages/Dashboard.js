import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Home from "./Home";
import "./Dashboard.css";

function Dashboard() {
  const [page, setPage] = useState("home");

  return (
    <div className="dashboard-container">
      <Sidebar setPage={setPage} activePage={page} />
      <div className="dashboard-content">
        <div className="content-wrapper">
          {page === "home" && <Home />}
          {page === "project" && <ProjectPage />}
          {page === "team" && <TeamPage />}
          {page === "task" && <TaskPage />}
          {page === "queries" && <QueriesPage />}
          {page === "settings" && <SettingsPage />}
        </div>
      </div>
    </div>
  );
}

