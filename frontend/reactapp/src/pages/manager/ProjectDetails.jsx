import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProjectsByManager } from '../../redux/slices/projectSlice';
import { getTasksByProject, createTask, assignTask } from '../../redux/slices/taskSlice';
import teamService from '../../services/teamService';
import { Plus, ArrowLeft } from 'lucide-react';
import { toast } from 'react-toastify';
import KanbanBoard from '../../components/KanbanBoard';
import Loading from '../../components/Loading';
import '../admin/UserManagement.css';

const ProjectDetails = () => {
  const { pid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { projects } = useSelector((state) => state.project);
  const { tasks, isLoading } = useSelector((state) => state.task);
  const [teamLeaders, setTeamLeaders] = useState([]);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [formData, setFormData] = useState({
    tname: '',
    tdescription: '',
    startDate: '',
    endDate: '',
    priority: 'Medium',
    tlUid: '',
  });

  const project = projects?.find(p => p.pid === parseInt(pid));
  const domainId = project?.domain?.domainId ?? project?.domainId;

  useEffect(() => {
    if (user?.uid) dispatch(getProjectsByManager(user.uid));
    if (pid) dispatch(getTasksByProject(pid));
    teamService.getTeamLeaders().then(setTeamLeaders).catch(() => setTeamLeaders([]));
  }, [dispatch, user?.uid, pid]);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!formData.tlUid) {
      toast.error('Select a Team Leader to assign');
      return;
    }
    try {
      await dispatch(createTask({
        tname: formData.tname,
        tdescription: formData.tdescription,
        startDate: formData.startDate,
        endDate: formData.endDate,
        priority: formData.priority,
        pid: parseInt(pid),
        domainId: domainId,
        status: 'TODO',
        uid: parseInt(formData.tlUid),
      })).unwrap();
      toast.success('Task created and assigned to Team Leader');
      setShowTaskModal(false);
      setFormData({ tname: '', tdescription: '', startDate: '', endDate: '', priority: 'Medium', tlUid: '' });
      dispatch(getTasksByProject(pid));
    } catch (error) {
      toast.error(error.message || 'Failed to create task');
    }
  };

  const handleAssignTask = async (teamLeaderId) => {
    try {
      await dispatch(assignTask({
        taskId: selectedTask.taskId,
        uid: teamLeaderId,
      })).unwrap();
      toast.success('Task assigned');
      setShowAssignModal(false);
      setSelectedTask(null);
      dispatch(getTasksByProject(pid));
    } catch (error) {
      toast.error('Failed to assign');
    }
  };

  if (isLoading && !project) return <Loading fullScreen />;
  if (!project) {
    return (
      <div style={{ textAlign: 'center', padding: '60px', color: 'white' }}>
        <h2>Project not found</h2>
      </div>
    );
  }

  return (
    <div className="page-container">
      <button
        onClick={() => navigate('/manager/projects')}
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
        <ArrowLeft size={20} /> Back to Projects
      </button>

      <div className="page-header">
        <div>
          <h1 className="page-title">{project.pname}</h1>
          <p className="page-subtitle">{project.pdescription}</p>
          {project.comment && (
            <p style={{ color: '#a5b4fc', fontSize: '14px', marginTop: '8px' }}>
              Admin comment: {project.comment}
            </p>
          )}
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', marginTop: '4px' }}>
            View-only Kanban – Team Leader tasks (manager cannot edit)
          </p>
        </div>
        <button className="btn-primary" onClick={() => setShowTaskModal(true)}>
          <Plus size={20} />
          <span>Create Task (assign to TL)</span>
        </button>
      </div>

      <div className="content-card" style={{ padding: '24px' }}>
        <KanbanBoard
          tasks={tasks || []}
          role="Manager"
          readOnly={true}
          onAssignTask={(task) => {
            setSelectedTask(task);
            setShowAssignModal(true);
          }}
        />
      </div>

      {showTaskModal && (
        <div className="modal-overlay" onClick={() => setShowTaskModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Create Task (assign to Team Leader)</h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '16px', fontSize: '14px' }}>
              Use project deadline dates. Task will be assigned to selected Team Leader.
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
              <label style={{ color: 'rgba(255,255,255,0.8)' }}>Assign to Team Leader</label>
              <select
                value={formData.tlUid}
                onChange={(e) => setFormData({ ...formData, tlUid: e.target.value })}
                className="select-light"
                required
                style={{ width: '100%', marginBottom: '12px' }}
              >
                <option value="">Select Team Leader</option>
                {teamLeaders?.map((tl) => (
                  <option key={tl.uid} value={tl.uid}>{tl.fname} {tl.lname} ({tl.email})</option>
                ))}
              </select>
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
                <button type="submit" className="btn-primary">Create Task</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Assign Task Modal */}
      {showAssignModal && selectedTask && (
        <div className="modal-overlay" onClick={() => setShowAssignModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{maxWidth: '500px'}}>
            <h2>Assign Task: {selectedTask.tname}</h2>
            <p style={{color: 'rgba(255,255,255,0.7)', marginBottom: '20px'}}>
              Select a Team Leader to assign this task
            </p>
            <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
              {teamLeaders.map((tl) => (
                <div
                  key={tl.uid}
                  onClick={() => handleAssignTask(tl.uid)}
                  style={{
                    padding: '16px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(99, 102, 241, 0.2)';
                    e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                  }}
                >
                  <div style={{color: 'white', fontWeight: '600', marginBottom: '4px'}}>
                    {tl.fname} {tl.lname}
                  </div>
                  <div style={{color: 'rgba(255,255,255,0.6)', fontSize: '14px'}}>
                    {tl.email}
                  </div>
                  <div style={{color: 'rgba(255,255,255,0.5)', fontSize: '12px', marginTop: '4px'}}>
                    Domain: {tl.domain?.dname}
                  </div>
                </div>
              ))}
              {teamLeaders.length === 0 && (
                <p style={{textAlign: 'center', color: 'rgba(255,255,255,0.5)', padding: '20px'}}>
                  No Team Leaders available
                </p>
              )}
            </div>
            <div className="modal-actions" style={{marginTop: '20px'}}>
              <button className="btn-secondary" onClick={() => setShowAssignModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;
