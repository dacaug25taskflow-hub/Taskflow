function TaskCard({ task }) {
  return (
    <div style={{ border: "1px solid gray", padding: "10px", marginBottom: "10px" }}>
      <p><b>ID:</b> {task.task_id}</p>
      <p><b>Name:</b> {task.tname}</p>
      <p><b>Description:</b> {task.tdescription}</p>
      <p><b>Status:</b> {task.status}</p>
      <p><b>Start:</b> {task.start_date}</p>
      <p><b>End:</b> {task.end_date}</p>
    </div>
  );
}

export default TaskCard;