import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProjectsForTL, getTasksByProjectTL } from '../../redux/slices/taskSlice';
import { ArrowLeft } from 'lucide-react';
import KanbanBoard from '../../components/KanbanBoard';
import Loading from '../../components/Loading';
import '../admin/UserManagement.css';

const ProjectDetails = () => {
  const { pid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { tlProjects, tasks, isLoading } = useSelector((state) => state.task);

  useEffect(() => {
    if (user?.uid) dispatch(getProjectsForTL(user.uid));
  }, [dispatch, user]);

  useEffect(() => {
    if (pid) dispatch(getTasksByProjectTL(pid));
  }, [dispatch, pid]);

  const project = tlProjects?.find(p => p.pid === parseInt(pid));

  if (isLoading && !project) return <Loading fullScreen />;

  return (
    <div className="page-container">
      <button
        onClick={() => navigate('/team-leader/projects')}
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
          marginBottom: '20px'
        }}
      >
        <ArrowLeft size={20} /> Back to Projects
      </button>

      <div className="page-header">
        <div>
          <h1 className="page-title">{project?.pname || 'Project'}</h1>
          <p className="page-subtitle">Kanban: To Do | In Progress | Completed - changes visible to Manager</p>
        </div>
      </div>

      <div className="content-card" style={{ padding: '24px' }}>
        <KanbanBoard
        tasks={tasks || []}
        role="Team Leader"
        readOnly={false}
        currentUid={user?.uid}
      />
      </div>
    </div>
  );
};

export default ProjectDetails;
