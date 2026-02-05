import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getTasksByEmployee, updateTaskStatus } from '../../redux/slices/taskSlice';
import { ListTodo, ArrowRight, CheckCircle, Clock, AlertCircle, Bell, Send } from 'lucide-react';
import BackButton from '../../components/BackButton';
import Loading from '../../components/Loading';
import KanbanBoard from '../../components/KanbanBoard';
import { toast } from 'react-toastify';
import '../admin/Dashboard.css';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { tasks, isLoading } = useSelector((state) => state.task);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [kanbanView, setKanbanView] = useState(true);

  useEffect(() => {
    if (user?.uid) dispatch(getTasksByEmployee(user.uid));
    // Simulate notifications from Team Leader
    const mockNotifications = [
      { id: 1, type: 'task_assigned', message: 'Team Leader assigned you "Database Schema Design"', taskId: 1, time: '1 hour ago' },
      { id: 2, type: 'task_assigned', message: 'Team Leader assigned you "API Integration"', taskId: 2, time: '3 hours ago' }
    ];
    setNotifications(mockNotifications);
  }, [dispatch, user?.uid]);

  const handleTaskComplete = async (taskId) => {
    try {
      // Update task status to completed
      await dispatch(updateTaskStatus({ taskId, status: 'COMPLETED' })).unwrap();
      
      // Send notification to Team Leader
      await sendNotificationToTeamLeader(taskId);
      
      toast.success('Task marked as completed and Team Leader notified');
    } catch (error) {
      toast.error('Failed to complete task');
    }
  };

  const sendNotificationToTeamLeader = async (taskId) => {
    // This would integrate with the .NET backend
    // For now, simulate the notification
    const notification = {
      type: 'task_completed',
      message: `${user.fname} ${user.lname} completed task #${taskId}`,
      taskId: taskId,
      employeeId: user.uid,
      time: 'Just now'
    };
    
    // In real implementation, this would call the .NET API
    console.log('Sending notification to Team Leader:', notification);
  };

  const handleStatusUpdate = async (taskId, newStatus) => {
    try {
      await dispatch(updateTaskStatus({ taskId, status: newStatus })).unwrap();
      toast.success(`Task status updated to ${newStatus}`);
    } catch (error) {
      toast.error('Failed to update task status');
    }
  };

  const getTasksByStatus = (status) => {
    return tasks.filter(task => task.status === status);
  };

  const pendingTasks = getTasksByStatus('PENDING') || getTasksByStatus('TODO');
  const inProgressTasks = getTasksByStatus('IN_PROGRESS');
  const completedTasks = getTasksByStatus('COMPLETED');

  if (isLoading && !tasks?.length) return <Loading fullScreen />;

  return (
    <div className="dashboard-page">
      <BackButton to="/employee" />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1>Employee Dashboard</h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', margin: 0 }}>
            Tasks assigned by Team Leader
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          {/* Task Insights */}
          <div style={{ 
            background: 'rgba(255,255,255,0.1)', 
            padding: '8px 16px', 
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <ListTodo size={16} style={{ color: '#a5b4fc' }} />
            <span style={{ color: '#fff', fontSize: '14px' }}>
              {tasks.length} Total | {completedTasks.length} Done
            </span>
          </div>
          
          {/* Notifications */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '8px',
                padding: '8px 12px',
                color: '#fff',
                cursor: 'pointer',
                position: 'relative'
              }}
            >
              <Bell size={16} />
              {notifications.length > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-4px',
                  background: '#ef4444',
                  color: '#fff',
                  borderRadius: '50%',
                  width: '16px',
                  height: '16px',
                  fontSize: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {notifications.length}
                </span>
              )}
            </button>
            
            {showNotifications && (
              <div style={{
                position: 'absolute',
                top: '40px',
                right: '0',
                background: 'rgba(30,30,30,0.95)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '8px',
                padding: '12px',
                minWidth: '250px',
                zIndex: 1000
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <h4 style={{ color: '#fff', margin: 0, fontSize: '14px' }}>Notifications</h4>
                  <button onClick={() => setShowNotifications(false)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
                    ×
                  </button>
                </div>
                {notifications.map(notification => (
                  <div key={notification.id} style={{ 
                    padding: '8px 0', 
                    borderBottom: '1px solid rgba(255,255,255,0.1)',
                    fontSize: '12px',
                    color: 'rgba(255,255,255,0.8)'
                  }}>
                    <div>{notification.message}</div>
                    <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)', marginTop: '2px' }}>
                      {notification.time}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* View Toggle */}
          <button
            onClick={() => setKanbanView(!kanbanView)}
            style={{
              background: kanbanView ? '#6366f1' : 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '8px',
              padding: '8px 16px',
              color: '#fff',
              cursor: 'pointer'
            }}
          >
            {kanbanView ? 'List View' : 'Kanban View'}
          </button>
        </div>
      </div>

      {kanbanView ? (
        <div className="content-card" style={{ padding: '24px' }}>
          <h3 style={{ color: '#a5b4fc', marginBottom: '20px', margin: 0 }}>My Tasks Kanban Board</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            {/* Pending Column */}
            <div style={{
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.2)',
              borderRadius: '12px',
              padding: '16px'
            }}>
              <h4 style={{ color: '#ef4444', margin: '0 0 12px 0', fontSize: '16px' }}>
                Pending ({pendingTasks.length})
              </h4>
              {pendingTasks.length > 0 ? pendingTasks.map(task => (
                <div key={task.taskId || task.task_id} style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  padding: '12px',
                  marginBottom: '8px',
                  cursor: 'pointer'
                }}>
                  <h5 style={{ color: '#fff', margin: '0 0 8px 0', fontSize: '14px' }}>
                    {task.tname || task.taskName}
                  </h5>
                  <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px', margin: '0 0 8px 0' }}>
                    {task.tdescription?.substring(0, 60)}...
                  </p>
                  <button
                    onClick={() => handleStatusUpdate(task.taskId || task.task_id, 'IN_PROGRESS')}
                    style={{
                      background: '#f59e0b',
                      border: 'none',
                      borderRadius: '4px',
                      padding: '4px 8px',
                      color: '#fff',
                      fontSize: '12px',
                      cursor: 'pointer'
                    }}
                  >
                    Start Task
                  </button>
                </div>
              )) : (
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px' }}>No pending tasks</p>
              )}
            </div>

            {/* In Progress Column */}
            <div style={{
              background: 'rgba(245, 158, 11, 0.1)',
              border: '1px solid rgba(245, 158, 11, 0.2)',
              borderRadius: '12px',
              padding: '16px'
            }}>
              <h4 style={{ color: '#f59e0b', margin: '0 0 12px 0', fontSize: '16px' }}>
                In Progress ({inProgressTasks.length})
              </h4>
              {inProgressTasks.length > 0 ? inProgressTasks.map(task => (
                <div key={task.taskId || task.task_id} style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  padding: '12px',
                  marginBottom: '8px'
                }}>
                  <h5 style={{ color: '#fff', margin: '0 0 8px 0', fontSize: '14px' }}>
                    {task.tname || task.taskName}
                  </h5>
                  <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px', margin: '0 0 8px 0' }}>
                    {task.tdescription?.substring(0, 60)}...
                  </p>
                  <button
                    onClick={() => handleTaskComplete(task.taskId || task.task_id)}
                    style={{
                      background: '#10b981',
                      border: 'none',
                      borderRadius: '4px',
                      padding: '4px 8px',
                      color: '#fff',
                      fontSize: '12px',
                      cursor: 'pointer'
                    }}
                  >
                    Mark Complete
                  </button>
                </div>
              )) : (
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px' }}>No tasks in progress</p>
              )}
            </div>

            {/* Completed Column */}
            <div style={{
              background: 'rgba(16, 185, 129, 0.1)',
              border: '1px solid rgba(16, 185, 129, 0.2)',
              borderRadius: '12px',
              padding: '16px'
            }}>
              <h4 style={{ color: '#10b981', margin: '0 0 12px 0', fontSize: '16px' }}>
                Completed ({completedTasks.length})
              </h4>
              {completedTasks.length > 0 ? completedTasks.map(task => (
                <div key={task.taskId || task.task_id} style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  padding: '12px',
                  marginBottom: '8px'
                }}>
                  <h5 style={{ color: '#fff', margin: '0 0 8px 0', fontSize: '14px' }}>
                    {task.tname || task.taskName}
                  </h5>
                  <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px', margin: '0 0 8px 0' }}>
                    {task.tdescription?.substring(0, 60)}...
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#10b981' }}>
                    <CheckCircle size={12} />
                    <span>Completed - Team Leader notified</span>
                  </div>
                </div>
              )) : (
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px' }}>No completed tasks</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {(tasks || []).length === 0 ? (
            <p style={{ color: 'rgba(255,255,255,0.5)', padding: '40px', textAlign: 'center' }}>
              No tasks assigned yet.
            </p>
          ) : (
            (tasks || []).map((task) => (
              <div
                key={task.taskId || task.task_id}
                onClick={() => navigate(`/employee/task/${task.taskId || task.task_id}`)}
                style={{
                  padding: '20px',
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: '12px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(99, 102, 241, 0.15)';
                  e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                }}
              >
                <div>
                  <h4 style={{ color: '#fff', margin: 0 }}>
                    {task.tname || task.taskName || 'Task'}
                    {task.status === 'COMPLETED' && (
                      <span style={{ color: '#10b981', marginLeft: '8px', fontSize: '12px' }}>
                        ✓ Completed
                      </span>
                    )}
                  </h4>
                  <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', marginTop: '4px' }}>
                    {task.tdescription || ''}
                  </p>
                  <span
                    className={`priority-badge priority-${(task.priority || 'Medium').toLowerCase()}`}
                    style={{ marginTop: '8px', display: 'inline-block' }}
                  >
                    {task.status || 'TODO'}
                  </span>
                </div>
                <ArrowRight size={24} style={{ color: 'rgba(255,255,255,0.5)' }} />
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
