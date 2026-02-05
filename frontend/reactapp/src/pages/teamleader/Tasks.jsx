import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Calendar, Users, Plus, Edit, Trash2, ChevronRight, CheckCircle, Clock, AlertCircle, Eye, ThumbsUp, ThumbsDown, MessageSquare, BarChart3, TrendingUp, Bell, X } from 'lucide-react';
import { toast } from 'react-toastify';
import Loading from '../../components/Loading';
import BackButton from '../../components/BackButton';
import '../admin/UserManagement.css';

const Tasks = () => {
  const { user } = useSelector((state) => state.auth);
  const [tasks, setTasks] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showSubtaskModal, setShowSubtaskModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showForwardModal, setShowForwardModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [kanbanView, setKanbanView] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [subtaskForm, setSubtaskForm] = useState({
    title: '',
    description: '',
    assignedTo: '',
    deadline: ''
  });
  const [reviewForm, setReviewForm] = useState({
    taskId: null,
    action: '',
    comments: ''
  });

  useEffect(() => {
    fetchTasks();
    fetchTeamMembers();
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      // Simulate notifications - in real app, this would come from an API
      const mockNotifications = [
        { id: 1, type: 'task_completed', message: 'Sarah Jones completed "Database Schema Design"', taskId: 21, time: '2 hours ago' },
        { id: 2, type: 'task_completed', message: 'Mike Wilson completed "API Integration"', taskId: 22, time: '5 hours ago' }
      ];
      setNotifications(mockNotifications);
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await fetch(`http://localhost:8083/tl/tasks/assigned/${user.uid}`);
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      toast.error('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  const fetchTeamMembers = async () => {
    try {
      // Get team members for the team leader
      const response = await fetch(`http://localhost:8082/manager/team/project/${user.projectId || 1}`);
      const data = await response.json();
      // Filter out the team leader and get only employees
      const employees = data.filter(member => member.uid !== user.uid);
      setTeamMembers(employees);
    } catch (error) {
      console.error('Failed to fetch team members:', error);
    }
  };

  const handleCreateSubtask = async (e) => {
    e.preventDefault();
    if (!selectedTask || !subtaskForm.title || !subtaskForm.assignedTo) {
      toast.error('Please fill all required fields');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8083/tl/tasks/split/${user.uid}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          parentTaskId: selectedTask.taskId,
          tname: subtaskForm.title,
          tdescription: subtaskForm.description,
          startDate: new Date().toISOString().split('T')[0],
          endDate: subtaskForm.deadline
        })
      });

      if (response.ok) {
        const newTask = await response.json();
        // Assign the subtask to the selected employee
        if (subtaskForm.assignedTo) {
          await handleAssignTask(newTask.taskId, parseInt(subtaskForm.assignedTo));
        }
        
        toast.success('Subtask created successfully');
        setShowSubtaskModal(false);
        setSubtaskForm({ title: '', description: '', assignedTo: '', deadline: '' });
        fetchTasks();
      } else {
        toast.error('Failed to create subtask');
      }
    } catch (error) {
      toast.error('Failed to create subtask');
    }
  };

  const handleAssignTask = async (taskId, employeeId) => {
    try {
      const response = await fetch(`http://localhost:8083/tl/tasks/${taskId}/assign/${employeeId}`, {
        method: 'PUT'
      });

      if (response.ok) {
        toast.success('Task assigned successfully');
        fetchTasks();
      } else {
        toast.error('Failed to assign task');
      }
    } catch (error) {
      toast.error('Failed to assign task');
    }
  };

  const handleUpdateStatus = async (taskId, status) => {
    try {
      const response = await fetch(`http://localhost:8083/tl/tasks/${taskId}/status?status=${status}`, {
        method: 'PUT'
      });

      if (response.ok) {
        toast.success('Task status updated');
        fetchTasks();
      } else {
        toast.error('Failed to update status');
      }
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handleReviewTask = (task, action) => {
    setReviewForm({
      taskId: task.taskId,
      action: action,
      comments: ''
    });
    setShowReviewModal(true);
  };

  const handleApproveTask = async () => {
    try {
      const response = await fetch(`http://localhost:8083/tl/tasks/${reviewForm.taskId}/approve`, {
        method: 'PUT'
      });

      if (response.ok) {
        toast.success('Task approved successfully');
        setShowReviewModal(false);
        fetchTasks();
      } else {
        toast.error('Failed to approve task');
      }
    } catch (error) {
      toast.error('Failed to approve task');
    }
  };

  const handleRejectTask = async () => {
    try {
      const response = await fetch(`http://localhost:8083/tl/tasks/${reviewForm.taskId}/reject?reason=${encodeURIComponent(reviewForm.comments)}&managerUid=${user.uid}`, {
        method: 'PUT'
      });

      if (response.ok) {
        toast.success('Task rejected with comments');
        setShowReviewModal(false);
        fetchTasks();
      } else {
        toast.error('Failed to reject task');
      }
    } catch (error) {
      toast.error('Failed to reject task');
    }
  };

  const handleForwardProject = async (projectId) => {
    try {
      // Simulate forwarding to manager - in real app, this would be an API call
      toast.success('Project forwarded to manager for review');
      setShowForwardModal(false);
    } catch (error) {
      toast.error('Failed to forward project');
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'COMPLETED':
        return <CheckCircle size={16} style={{ color: '#10b981' }} />;
      case 'IN_PROGRESS':
        return <Clock size={16} style={{ color: '#f59e0b' }} />;
      case 'PENDING':
        return <AlertCircle size={16} style={{ color: '#ef4444' }} />;
      default:
        return <Clock size={16} style={{ color: '#6b7280' }} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'COMPLETED':
        return '#10b981';
      case 'IN_PROGRESS':
        return '#f59e0b';
      case 'PENDING':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  // Group tasks by status for Kanban view
  const getTasksByStatus = (status) => {
    return tasks.filter(task => {
      const taskStatus = task.status?.replace('TODO', 'PENDING');
      return taskStatus === status;
    });
  };

  const completedTasks = getTasksByStatus('COMPLETED');
  const inProgressTasks = getTasksByStatus('IN_PROGRESS');
  const pendingTasks = getTasksByStatus('PENDING');

  const TaskCard = ({ task }) => (
    <div
      key={task.taskId}
      style={{
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '8px',
        padding: '16px',
        marginBottom: '12px',
        cursor: 'pointer',
        transition: 'all 0.3s ease'
      }}
      onClick={() => setSelectedTask(task)}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
        <h5 style={{ color: '#fff', margin: 0, fontSize: '14px', fontWeight: '500' }}>
          {task.tname}
        </h5>
        {getStatusIcon(task.status)}
      </div>
      
      <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px', marginBottom: '8px', lineHeight: '1.4' }}>
        {task.tdescription?.substring(0, 80)}...
      </p>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px' }}>
        <span style={{ color: 'rgba(255,255,255,0.5)' }}>
          {task.endDate ? new Date(task.endDate).toLocaleDateString() : 'No deadline'}
        </span>
        {task.status === 'COMPLETED' && (
          <div style={{ display: 'flex', gap: '4px' }}>
            <button
              className="action-btn edit"
              onClick={(e) => {
                e.stopPropagation();
                handleReviewTask(task, 'approve');
              }}
              title="Approve"
            >
              <ThumbsUp size={12} />
            </button>
            <button
              className="action-btn delete"
              onClick={(e) => {
                e.stopPropagation();
                handleReviewTask(task, 'reject');
              }}
              title="Reject"
            >
              <ThumbsDown size={12} />
            </button>
          </div>
        )}
      </div>
    </div>
  );

  if (loading) return <Loading fullScreen />;

  return (
    <div className="page-container">
      <BackButton to="/team-leader" />
      <div className="page-header">
        <div>
          <h1 className="page-title">Team Leader Tasks</h1>
          <p className="page-subtitle">Manage tasks and create subtasks for team members</p>
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
            <BarChart3 size={16} style={{ color: '#a5b4fc' }} />
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
                    <X size={14} />
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

      <div className="content-card">
        {kanbanView ? (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ color: '#a5b4fc', margin: 0 }}>Kanban Board</h3>
              <button
                onClick={() => setShowForwardModal(true)}
                style={{
                  background: 'rgba(16, 185, 129, 0.2)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  borderRadius: '8px',
                  padding: '8px 16px',
                  color: '#10b981',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                Forward Completed Project
              </button>
            </div>
            
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
                {pendingTasks.length > 0 ? pendingTasks.map(task => <TaskCard key={task.taskId} task={task} />) : (
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
                {inProgressTasks.length > 0 ? inProgressTasks.map(task => <TaskCard key={task.taskId} task={task} />) : (
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
                {completedTasks.length > 0 ? completedTasks.map(task => <TaskCard key={task.taskId} task={task} />) : (
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px' }}>No completed tasks</p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div>
            <h3 style={{ color: '#a5b4fc', marginBottom: '20px' }}>Task List</h3>
            {tasks.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {tasks.map((task) => (
                  <div
                    key={task.taskId}
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '12px',
                      padding: '20px',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                          <h4 style={{ color: '#fff', margin: 0, fontSize: '18px' }}>
                            {task.tname}
                          </h4>
                          {getStatusIcon(task.status)}
                          <span style={{ 
                            color: getStatusColor(task.status), 
                            fontSize: '14px',
                            fontWeight: '500'
                          }}>
                            {task.status?.replace('_', ' ')}
                          </span>
                        </div>
                        
                        <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '12px', lineHeight: '1.5' }}>
                          {task.tdescription}
                        </p>
                        
                        <div style={{ display: 'flex', gap: '20px', alignItems: 'center', fontSize: '14px' }}>
                          <span style={{ color: 'rgba(255,255,255,0.6)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Calendar size={14} />
                            {task.endDate ? new Date(task.endDate).toLocaleDateString() : 'No deadline'}
                          </span>
                        </div>
                      </div>
                      
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          className="action-btn edit"
                          onClick={() => {
                            setSelectedTask(task);
                            setShowSubtaskModal(true);
                          }}
                          title="Create Subtask"
                        >
                          <Plus size={16} />
                        </button>
                        
                        {task.status === 'COMPLETED' && (
                          <div style={{ display: 'flex', gap: '4px' }}>
                            <button
                              className="action-btn edit"
                              onClick={() => handleReviewTask(task, 'approve')}
                              title="Approve"
                            >
                              <ThumbsUp size={16} />
                            </button>
                            <button
                              className="action-btn delete"
                              onClick={() => handleReviewTask(task, 'reject')}
                              title="Reject"
                            >
                              <ThumbsDown size={16} />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '40px' }}>
                <p style={{ color: 'rgba(255,255,255,0.5)' }}>No tasks assigned to you yet.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Subtask Creation Modal */}
      {showSubtaskModal && selectedTask && (
        <div className="modal-overlay" onClick={() => setShowSubtaskModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px' }}>
            <h2>Create Subtask</h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '20px' }}>
              Parent Task: <strong>{selectedTask.title}</strong>
            </p>
            
            <form onSubmit={handleCreateSubtask}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ color: 'rgba(255,255,255,0.8)', display: 'block', marginBottom: '8px' }}>
                  Subtask Title *
                </label>
                <input
                  type="text"
                  value={subtaskForm.title}
                  onChange={(e) => setSubtaskForm({ ...subtaskForm, title: e.target.value })}
                  placeholder="Enter subtask title"
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '14px'
                  }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ color: 'rgba(255,255,255,0.8)', display: 'block', marginBottom: '8px' }}>
                  Description
                </label>
                <textarea
                  value={subtaskForm.description}
                  onChange={(e) => setSubtaskForm({ ...subtaskForm, description: e.target.value })}
                  placeholder="Enter subtask description"
                  rows={3}
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '14px',
                    resize: 'vertical'
                  }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ color: 'rgba(255,255,255,0.8)', display: 'block', marginBottom: '8px' }}>
                  Assign to Employee *
                </label>
                <select
                  value={subtaskForm.assignedTo}
                  onChange={(e) => setSubtaskForm({ ...subtaskForm, assignedTo: e.target.value })}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '14px'
                  }}
                >
                  <option value="">Select employee</option>
                  {teamMembers.map(member => (
                    <option key={member.uid} value={member.uid}>
                      {member.fname} {member.lname}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ color: 'rgba(255,255,255,0.8)', display: 'block', marginBottom: '8px' }}>
                  Deadline
                </label>
                <input
                  type="date"
                  value={subtaskForm.deadline}
                  onChange={(e) => setSubtaskForm({ ...subtaskForm, deadline: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '14px'
                  }}
                />
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowSubtaskModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Create Subtask
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Task Review Modal */}
      {showReviewModal && (
        <div className="modal-overlay" onClick={() => setShowReviewModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px' }}>
            <h2>{reviewForm.action === 'approve' ? 'Approve Task' : 'Reject Task'}</h2>
            
            <div style={{ marginBottom: '20px' }}>
              <p style={{ color: 'rgba(255,255,255,0.6)' }}>
                {reviewForm.action === 'approve' 
                  ? 'Are you sure you want to approve this task?' 
                  : 'Please provide comments for rejecting this task:'
                }
              </p>
            </div>

            {reviewForm.action === 'reject' && (
              <div style={{ marginBottom: '20px' }}>
                <label style={{ color: 'rgba(255,255,255,0.8)', display: 'block', marginBottom: '8px' }}>
                  Comments *
                </label>
                <textarea
                  value={reviewForm.comments}
                  onChange={(e) => setReviewForm({ ...reviewForm, comments: e.target.value })}
                  placeholder="Enter rejection comments..."
                  rows={4}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '14px',
                    resize: 'vertical'
                  }}
                />
              </div>
            )}

            <div className="modal-actions">
              <button type="button" className="btn-secondary" onClick={() => setShowReviewModal(false)}>
                Cancel
              </button>
              <button 
                type="button" 
                className={reviewForm.action === 'approve' ? 'btn-primary' : 'btn-danger'}
                onClick={reviewForm.action === 'approve' ? handleApproveTask : handleRejectTask}
                disabled={reviewForm.action === 'reject' && !reviewForm.comments.trim()}
              >
                {reviewForm.action === 'approve' ? 'Approve' : 'Reject'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Forward Project Modal */}
      {showForwardModal && (
        <div className="modal-overlay" onClick={() => setShowForwardModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px' }}>
            <h2>Forward Completed Project</h2>
            
            <div style={{ marginBottom: '20px' }}>
              <p style={{ color: 'rgba(255,255,255,0.6)' }}>
                Are you sure you want to forward this completed project to the manager for final review?
              </p>
              <div style={{
                background: 'rgba(255,255,255,0.1)',
                padding: '12px',
                borderRadius: '8px',
                marginTop: '12px'
              }}>
                <p style={{ color: '#fff', margin: 0, fontSize: '14px' }}>
                  <strong>Project Summary:</strong><br/>
                  Total Tasks: {tasks.length}<br/>
                  Completed: {completedTasks.length}<br/>
                  Completion Rate: {tasks.length > 0 ? Math.round((completedTasks.length / tasks.length) * 100) : 0}%
                </p>
              </div>
            </div>

            <div className="modal-actions">
              <button type="button" className="btn-secondary" onClick={() => setShowForwardModal(false)}>
                Cancel
              </button>
              <button 
                type="button" 
                className="btn-primary"
                onClick={() => handleForwardProject(1)} // Using project ID 1 for demo
              >
                Forward to Manager
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasks;
