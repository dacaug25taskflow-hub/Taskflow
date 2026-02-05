import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTasksAssignedToTL } from '../../redux/slices/taskSlice';
import KanbanBoard from '../../components/KanbanBoard';
import Loading from '../../components/Loading';
import BackButton from '../../components/BackButton';
import '../admin/Dashboard.css';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { tlAssignedTasks, isLoading } = useSelector((state) => state.task);

  useEffect(() => {
    if (user?.uid) dispatch(getTasksAssignedToTL(user.uid));
  }, [dispatch, user?.uid]);

  if (isLoading && !tlAssignedTasks?.length) return <Loading fullScreen />;

  return (
    <div className="dashboard-page">
      <BackButton to="/" />
      <h1>Team Leader Dashboard</h1>
      <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '24px' }}>
        Tasks assigned by Manager. Edit and update status on the Kanban board. Changes are visible to Manager.
      </p>
      <div className="content-card" style={{ padding: '24px' }}>
        <KanbanBoard
          tasks={tlAssignedTasks || []}
          role="Team Leader"
          readOnly={false}
          currentUid={user?.uid}
        />
      </div>
    </div>
  );
};

export default Dashboard;
