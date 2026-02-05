import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateTaskStatus } from '../redux/slices/taskSlice';
import { Calendar, User } from 'lucide-react';
import { toast } from 'react-toastify';
import './KanbanBoard.css';

const KanbanBoard = ({ tasks, role, onAssignTask, readOnly, currentUid }) => {
  const dispatch = useDispatch();
  const [draggedTask, setDraggedTask] = useState(null);

  const columns = {
    TODO: { title: 'To Do', color: '#94a3b8' },
    IN_PROGRESS: { title: 'In Progress', color: '#3b82f6' },
    DONE: { title: 'Completed', color: '#10b981' },
  };

  const normalizeStatus = (s) => {
    if (!s) return '';
    const u = String(s).toUpperCase();
    if (u === 'PENDING') return 'TODO';
    if (u === 'COMPLETED' || u === 'DONE') return 'DONE';
    if (u === 'IN_PROGRESS' || u === 'INPROGRESS') return 'IN_PROGRESS';
    return u === 'TODO' ? 'TODO' : u;
  };

  const getTasksByStatus = (status) =>
    tasks?.filter((task) => normalizeStatus(task.status) === status) || [];

  const handleDrop = async (status) => {
    if (readOnly || !draggedTask || normalizeStatus(draggedTask.status) === status) {
      setDraggedTask(null);
      return;
    }
    try {
      await dispatch(
        updateTaskStatus({
          taskId: draggedTask.taskId || draggedTask.task_id,
          status: status === 'DONE' ? 'DONE' : status,
          role,
          uid: currentUid,
        })
      ).unwrap();
      toast.success('Task status updated');
    } catch {
      toast.error('Failed to update status');
    }
    setDraggedTask(null);
  };

  return (
    <div className="kanban-board">
      {Object.entries(columns).map(([status, config]) => {
        const statusTasks = getTasksByStatus(status);

        return (
          <div
            key={status}
            className="kanban-column"
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(status)}
          >
            <div
              className="kanban-header"
              style={{ borderLeft: `4px solid ${config.color}` }}
            >
              <h3>{config.title}</h3>
              <span className="task-count">{statusTasks.length}</span>
            </div>

            <div className="kanban-tasks">
              {statusTasks.map((task) => (
                <div
                  key={task.taskId || task.task_id}
                  className="kanban-task"
                  draggable={!readOnly}
                  onDragStart={() => !readOnly && setDraggedTask(task)}
                >
                  <h4>{task.tname || task.taskName || 'Task'}</h4>
                  <p>{task.tdescription || task.description || ''}</p>

                  <div className="task-meta">
                    <span
                      className={`priority-badge priority-${(
                        task.priority || 'Medium'
                      ).toLowerCase()}`}
                    >
                      {task.priority || 'Medium'}
                    </span>

                    <div className="task-dates">
                      <Calendar size={14} />
                      <span>
                        {task.endDate ? new Date(task.endDate).toLocaleDateString() : '-'}
                      </span>
                    </div>
                  </div>

                  {task.user ? (
                    <div className="task-assignee">
                      <User size={14} />
                      <span>
                        {task.user.fname} {task.user.lname}
                      </span>
                    </div>
                  ) : (
                    role === 'Manager' && !readOnly && onAssignTask && (
                      <button
                        className="assign-btn"
                        onClick={() => onAssignTask(task)}
                      >
                        Assign to Team Leader
                      </button>
                    )
                  )}
                </div>
              ))}

              {statusTasks.length === 0 && (
                <div className="empty-column">No tasks</div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default KanbanBoard;
