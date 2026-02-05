import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTasksByEmployee, updateTaskStatus } from '../../redux/slices/taskSlice';
import { toast } from 'react-toastify';
import Loading from '../../components/Loading';
import KanbanBoard from '../../components/KanbanBoard';
import '../admin/UserManagement.css';

const MyTasks = () => {
  const dispatch = useDispatch();
  const { tasks, isLoading } = useSelector((state) => state.task);

  useEffect(() => {
    dispatch(getTasksByEmployee());
  }, [dispatch]);

  if (isLoading) {
    return <Loading fullScreen />;
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">My Tasks</h1>
          <p className="page-subtitle">Update task status via Kanban - visible to Manager & Team Leader</p>
        </div>
      </div>

      <div className="content-card" style={{ padding: '24px' }}>
        <KanbanBoard
          tasks={tasks || []}
          role="Employee"
        />
        {(!tasks || tasks.length === 0) && (
          <div style={{ padding: '40px', textAlign: 'center', color: 'rgba(255,255,255,0.5)', marginTop: '24px' }}>
            No tasks assigned by Team Leader. Kanban updates sync to Manager and Team Leader.
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTasks;
