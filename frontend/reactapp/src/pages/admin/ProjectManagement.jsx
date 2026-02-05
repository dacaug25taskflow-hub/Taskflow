import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Plus, Edit, Trash2, Calendar } from 'lucide-react';
import { getAllProjects, createProject, deleteProject, updateProject } from '../../redux/slices/projectSlice';
import { getAllUsers } from '../../redux/slices/userSlice';
import { getAllDomains } from '../../redux/slices/domainSlice';
import BackButton from '../../components/BackButton';
import { toast } from 'react-toastify';
import Loading from '../../components/Loading';
import './UserManagement.css';

const ProjectManagement = () => {
  const dispatch = useDispatch();
  const { projects, isLoading } = useSelector((state) => state.project);
  const { users } = useSelector((state) => state.user);
  const { domains } = useSelector((state) => state.domain);
  const [showModal, setShowModal] = useState(false);
  const [editProject, setEditProject] = useState(null);
  const [formData, setFormData] = useState({
    pname: '',
    pdescription: '',
    uid: '',
    domainId: '',
    client: '',
    deadline: '',
    comment: '',
  });

  useEffect(() => {
    dispatch(getAllProjects());
    dispatch(getAllUsers());
    dispatch(getAllDomains());
  }, [dispatch]);

  const handleCreate = () => {
    setEditProject(null);
    setFormData({
      pname: '',
      pdescription: '',
      uid: '',
      domainId: '',
      client: '',
      deadline: '',
      comment: '',
    });
    setShowModal(true);
  };

  const handleEdit = (project) => {
    setEditProject(project);
    setFormData({
      pname: project.pname,
      pdescription: project.pdescription,
      uid: project.managerId || '',
      domainId: project.domainId || '',
      client: project.client,
      deadline: project.deadline ? new Date(project.deadline).toISOString().split('T')[0] : '',
      comment: project.comment || '',
    });
    setShowModal(true);
  };

  const handleDelete = async (pid) => {
    if (window.confirm('Delete this project?')) {
      try {
        await dispatch(deleteProject(pid)).unwrap();
        toast.success('Project deleted');
      } catch (error) {
        toast.error('Failed to delete');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editProject) {
        await dispatch(updateProject({ pid: editProject.pid, projectData: formData })).unwrap();
        toast.success('Project updated');
      } else {
        await dispatch(createProject(formData)).unwrap();
        toast.success('Project created');
      }
      setShowModal(false);
    } catch (error) {
      toast.error(error || 'Failed');
    }
  };

  const managers = users.filter(u => u.roleName === 'Manager');

  if (isLoading && projects.length === 0) {
    return <Loading fullScreen />;
  }

  return (
    <div className="page-container">
      <BackButton to="/admin" />
      <div className="page-header">
        <div>
          <h1 className="page-title">Project Management</h1>
          <p className="page-subtitle">Create and assign projects</p>
        </div>
        <button className="btn-primary" onClick={handleCreate}>
          <Plus size={20} />
          <span>Create Project</span>
        </button>
      </div>

      <div className="content-card">
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Project</th>
                <th>Description</th>
                <th>Manager</th>
                <th>Domain</th>
                <th>Client</th>
                <th>Deadline</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.pid}>
                  <td className="username">{project.pname}</td>
                  <td>{project.pdescription}</td>
                  <td>
                    {project.managerName ? (
                      <span style={{ color: '#10b981', fontWeight: '500' }}>
                        {project.managerName}
                      </span>
                    ) : (
                      <span style={{ color: '#ef4444', fontStyle: 'italic' }}>
                        Unassigned
                      </span>
                    )}
                  </td>
                  <td>{project.domainName || '-'}</td>
                  <td>{project.client}</td>
                  <td>
                    <Calendar size={16} style={{display: 'inline', marginRight: '6px'}} />
                    {new Date(project.deadline).toLocaleDateString()}
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="action-btn edit" onClick={() => handleEdit(project)}>
                        <Edit size={16} />
                      </button>
                      <button className="action-btn delete" onClick={() => handleDelete(project.pid)}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{editProject ? 'Edit Project' : 'Create Project'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <input
                  type="text"
                  placeholder="Project Name"
                  value={formData.pname}
                  onChange={(e) => setFormData({...formData, pname: e.target.value})}
                  required
                />
                <input
                  type="text"
                  placeholder="Client"
                  value={formData.client}
                  onChange={(e) => setFormData({...formData, client: e.target.value})}
                  required
                />
                <select
                  className="select-light"
                  value={formData.uid}
                  onChange={(e) => setFormData({...formData, uid: e.target.value})}
                  required
                >
                  <option value="">Assign Manager</option>
                  {managers.map((manager) => (
                    <option key={manager.uid} value={manager.uid}>
                      {manager.fname} {manager.lname}
                    </option>
                  ))}
                </select>
                <select
                  className="select-light"
                  value={formData.domainId}
                  onChange={(e) => setFormData({...formData, domainId: e.target.value})}
                  required
                >
                  <option value="">Select Domain</option>
                  {domains?.map((domain) => (
                    <option key={domain.domainId} value={domain.domainId}>
                      {domain.dname}
                    </option>
                  ))}
                </select>
                <input
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => setFormData({...formData, deadline: e.target.value})}
                  required
                />
              </div>
              <textarea
                placeholder="Description"
                value={formData.pdescription}
                onChange={(e) => setFormData({...formData, pdescription: e.target.value})}
                required
              />
              <textarea
                placeholder="Comments (optional)"
                value={formData.comment}
                onChange={(e) => setFormData({...formData, comment: e.target.value})}
              />
              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  {editProject ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectManagement;
