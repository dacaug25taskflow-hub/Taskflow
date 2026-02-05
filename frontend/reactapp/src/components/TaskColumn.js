import TaskCard from "./TaskCard";
import "./TaskColumn.css";

function TaskColumn({ title, tasks, status, color }) {
  return (
    <div className="task-column">
      <div className="column-header" style={{ '--column-color': color }}>
        <div className="column-title-wrapper">
          <h3 className="column-title">{title}</h3>
          <span className="task-count">{tasks.length}</span>
        </div>
        <button className="add-column-task-btn" aria-label="Add task">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
        </button>
      </div>
      
      <div className="column-content">
        {tasks.length === 0 ? (
          <div className="empty-column">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <line x1="9" y1="9" x2="15" y2="9"/>
              <line x1="9" y1="15" x2="15" y2="15"/>
            </svg>
            <p>No tasks yet</p>
          </div>
        ) : (
          tasks.map((task, index) => (
            <TaskCard 
              key={task.task_id} 
              task={task} 
              color={color}
              index={index}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default TaskColumn;