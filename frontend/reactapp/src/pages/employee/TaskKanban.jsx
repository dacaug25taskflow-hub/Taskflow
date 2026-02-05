import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTasksByEmployee } from '../../redux/slices/taskSlice';
import KanbanBoard from '../../components/KanbanBoard';
import Loading from '../../components/Loading';
import { ArrowLeft } from 'lucide-react';
import '../admin/UserManagement.css';

const TaskKanban = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { tasks, isLoading } = useSelector((state) => state.task);

  useEffect(() => {
    if (user?.uid) dispatch(getTasksByEmployee(user.uid));
  }, [dispatch, user?.uid]);

  const task = (tasks || []).find(
    (t) => String(t.taskId) === taskId || String(t.task_id) === taskId
  );
  const displayTasks = task ? [task] : [];

  if (isLoading && !tasks?.length) return <Loading fullScreen />;
  if (!task) {
    return (
      <div className="page-container">
        <button
          onClick={() => navigate('/employee')}
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '8px',
            cursor: 'pointer',
            marginBottom: '20px',
          }}
        >
          <ArrowLeft size={20} /> Back
        </button>
        <p style={{ color: 'rgba(255,255,255,0.7)', textAlign: 'center', padding: '40px' }}>
          Task not found
        </p>
      </div>
    );
  }

  return (
    <div className="page-container">
      <button
        onClick={() => navigate('/employee')}
        style={{
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.1)',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          cursor: 'pointer',
          marginBottom: '20px',
        }}
      >
        <ArrowLeft size={20} /> Back to Dashboard
      </button>
      <div className="page-header">
        <h1 className="page-title">{task.tname || task.taskName}</h1>
        <p className="page-subtitle">Update task status via Kanban</p>
      </div>
      <div className="content-card" style={{ padding: '24px' }}>
        <KanbanBoard
          tasks={displayTasks}
          role="Employee"
          readOnly={false}
          currentUid={user?.uid}
        />
      </div>
    </div>
  );
};

export default TaskKanban;
