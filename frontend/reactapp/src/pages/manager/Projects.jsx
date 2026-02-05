import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProjectsByManager } from '../../redux/slices/projectSlice';
import { useNavigate } from 'react-router-dom';
import { FolderKanban, Calendar, ArrowRight } from 'lucide-react';
import BackButton from '../../components/BackButton';
import Loading from '../../components/Loading';
import '../admin/Dashboard.css';

const Projects = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { projects, isLoading } = useSelector((state) => state.project);

  useEffect(() => {
    if (user?.uid) dispatch(getProjectsByManager(user.uid));
  }, [dispatch, user]);

  if (isLoading) return <Loading fullScreen />;

  return (
    <div className="page-container">
      <BackButton to="/manager" />
      <div className="page-header">
        <h1 className="page-title">Projects</h1>
        <p className="page-subtitle">View projects in Kanban representation</p>
      </div>
      <div className="dashboard-page">
        {projects?.map((project) => (
          <div
            key={project.pid}
            className="project-card-inline"
            onClick={() => navigate(`/manager/projects/${project.pid}`)}
          >
            <h4>{project.pname}</h4>
            <p>{project.pdescription}</p>
            <span><Calendar size={14} /> {new Date(project.deadline).toLocaleDateString()}</span>
            <ArrowRight />
          </div>
        ))}
        {(!projects || projects.length === 0) && (
          <p style={{color: 'rgba(255,255,255,0.5)', textAlign: 'center', padding: '40px'}}>
            No projects assigned
          </p>
        )}
      </div>
    </div>
  );
};

export default Projects;
