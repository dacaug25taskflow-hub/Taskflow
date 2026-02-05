import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProjectsForTL } from '../../redux/slices/taskSlice';
import { useNavigate } from 'react-router-dom';
import { FolderKanban, Calendar, ArrowRight } from 'lucide-react';
import Loading from '../../components/Loading';
import '../admin/Dashboard.css';

const Projects = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { tlProjects, isLoading } = useSelector((state) => state.task);

  useEffect(() => {
    if (user?.uid) dispatch(getProjectsForTL(user.uid));
  }, [dispatch, user]);

  if (isLoading && !tlProjects?.length) return <Loading fullScreen />;

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Tasks from Manager</h1>
        <p className="page-subtitle">View projects and tasks assigned by manager</p>
      </div>
      <div className="dashboard-page">
        {tlProjects?.map((project) => (
          <div
            key={project.pid}
            className="project-card-inline"
            onClick={() => navigate(`/team-leader/projects/${project.pid}`)}
          >
            <h4>{project.pname}</h4>
            <p>{project.pdescription || 'Project'}</p>
            <ArrowRight />
          </div>
        ))}
        {(!tlProjects || tlProjects.length === 0) && (
          <p style={{color: 'rgba(255,255,255,0.5)', textAlign: 'center', padding: '40px'}}>
            No projects with assigned tasks
          </p>
        )}
      </div>
    </div>
  );
};

export default Projects;
