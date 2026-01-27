import TaskCard from "./TaskCard";

function TaskColumn({ title, tasks }) {
  return (
    <div style={{ width: "30%", margin: "10px" }}>
      <h3>{title}</h3>
      {tasks.map(task => (
        <TaskCard key={task.task_id} task={task} />
      ))}
    </div>
  );
}

export default TaskColumn;