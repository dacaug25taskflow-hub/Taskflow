import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProjectsByManager } from '../../redux/slices/projectSlice';
import { getManagerPersonalTasks, createTask } from '../../redux/slices/taskSlice';
import { FolderKanban, Calendar, ArrowRight, Plus } from 'lucide-react';
import BackButton from '../../components/BackButton';
import Loading from '../../components/Loading';
import KanbanBoard from '../../components/KanbanBoard';
import { toast } from 'react-toastify';
import './ManagerDashboard.css';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { projects, isLoading } = useSelector((state) => state.project);
  const { managerPersonalTasks, isLoading: tasksLoading } = useSelector((state) => state.task);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [formData, setFormData] = useState({
    tname: '',
    tdescription: '',
    startDate: '',
    endDate: '',
    priority: 'Medium',
  });

  useEffect(() => {
    if (user?.uid) {
      dispatch(getProjectsByManager(user.uid));
      dispatch(getManagerPersonalTasks(user.uid));
    }
  }, [dispatch, user?.uid]);

  const project = projects?.find((p) => p.pid === selectedProject);
  const personalTasks = (managerPersonalTasks || []).filter((t) => t.pid === selectedProject);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!selectedProject || !project) return;
    try {
      await dispatch(createTask({
        tname: formData.tname,
        tdescription: formData.tdescription,
        startDate: formData.startDate,
        endDate: formData.endDate,
        priority: formData.priority,
        pid: selectedProject,
        domainId: project.domain?.domainId ?? project.domainId,
        status: 'TODO',
        uid: user.uid,
        forSelf: true,
      })).unwrap();
      toast.success('Task created');
      setShowTaskModal(false);
      setFormData({ tname: '', tdescription: '', startDate: '', endDate: '', priority: 'Medium' });
      dispatch(getManagerPersonalTasks(user.uid));
    } catch (err) {
      toast.error('Failed to create task');
    }
  };

  if (isLoading && !projects?.length) return <Loading fullScreen />;

  return (
    <div className="dashboard-page manager-dashboard">
      <BackButton to="/manager" />
      <h1>Manager Dashboard</h1>
      <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '24px' }}>
        Click a project to manage your personal tasks. Create tasks for yourself and track them on the Kanban board.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div>
          <h3 style={{ color: '#a5b4fc', marginBottom: '16px', fontSize: '18px' }}>Your Projects</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {projects?.map((p) => (
              <div
                key={p.pid}
                className={`project-card-inline ${selectedProject === p.pid ? 'active' : ''}`}
                onClick={() => setSelectedProject(p.pid)}
                style={{
                  cursor: 'pointer',
                  border: selectedProject === p.pid ? '2px solid #6366f1' : '1px solid rgba(255,255,255,0.1)',
                  padding: '16px 20px',
                  borderRadius: '12px',
                  background: selectedProject === p.pid 
                    ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%)'
                    : 'rgba(255, 255, 255, 0.05)',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div style={{ flex: 1 }}>
                  <h4 style={{ 
                    color: '#fff', 
                    margin: '0 0 8px 0',
                    fontSize: '18px',
                    fontWeight: '600',
                    background: selectedProject === p.pid 
                      ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
                      : 'transparent',
                    WebkitBackgroundClip: selectedProject === p.pid ? 'text' : 'unset',
                    WebkitTextFillColor: selectedProject === p.pid ? 'transparent' : '#fff',
                    backgroundClip: selectedProject === p.pid ? 'text' : 'unset'
                  }}>
                    {p.pname}
                  </h4>
                  <p style={{ 
                    color: 'rgba(255,255,255,0.7)', 
                    margin: '0 0 8px 0',
                    fontSize: '14px',
                    lineHeight: '1.4'
                  }}>
                    {p.pdescription}
                  </p>
                  <span style={{ 
                    color: 'rgba(255,255,255,0.6)', 
                    fontSize: '13px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    <Calendar size={14} />
                    {new Date(p.deadline).toLocaleDateString()}
                  </span>
                </div>
                <ArrowRight size={20} style={{ color: 'rgba(255,255,255,0.4)' }} />
              </div>
            ))}
          </div>
        </div>

        {selectedProject && project && (
          <div className="content-card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <h2 style={{ color: '#fff', margin: 0 }}>Personal Kanban – {project.pname}</h2>
                <p style={{ color: 'rgba(255,255,255,0.6)', marginTop: '4px' }}>
                  Create and manage your own tasks. Use dates for project deadline.
                </p>
              </div>
              <button className="btn-primary" onClick={() => setShowTaskModal(true)}>
                <Plus size={20} />
                Create Task
              </button>
            </div>
            {tasksLoading ? (
              <Loading />
            ) : (
              <KanbanBoard
                tasks={personalTasks}
                role="Manager"
                readOnly={false}
                currentUid={user?.uid}
              />
            )}
          </div>
        )}
      </div>

      {showTaskModal && project && (
        <div className="modal-overlay" onClick={() => setShowTaskModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Create Task for Yourself</h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '16px', fontSize: '14px' }}>
              Use project deadline dates
            </p>
            <form onSubmit={handleCreateTask}>
              <input
                placeholder="Task Name"
                value={formData.tname}
                onChange={(e) => setFormData({ ...formData, tname: e.target.value })}
                required
              />
              <textarea
                placeholder="Task Description"
                value={formData.tdescription}
                onChange={(e) => setFormData({ ...formData, tdescription: e.target.value })}
                required
                style={{ minHeight: '80px' }}
              />
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                className="select-light"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '12px' }}>Start (Project deadline)</label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '12px' }}>End (Project deadline)</label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowTaskModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary">Create</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
