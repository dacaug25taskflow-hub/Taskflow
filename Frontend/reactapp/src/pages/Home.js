import { useEffect, useState } from "react";
import TaskColumn from "../components/TaskColumn";
import axios from "axios";

function Home() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/task/all")
      .then(res => setTasks(res.data));
  }, []);

  return (
    <div style={{ display: "flex", padding: "20px" }}>
      <TaskColumn title="To-Do" tasks={tasks.filter(t => t.status === "TODO")} />
      <TaskColumn title="In-Progress" tasks={tasks.filter(t => t.status === "IN_PROGRESS")} />
      <TaskColumn title="Completed" tasks={tasks.filter(t => t.status === "COMPLETED")} />
    </div>
  );
}

export default Home;