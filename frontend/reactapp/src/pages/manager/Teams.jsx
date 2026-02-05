import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProjectsByManager } from '../../redux/slices/projectSlice';
import teamService from '../../services/teamService';
import domainService from '../../services/domainService';
import { adminAPI } from '../../services/api';
import { Users, Plus, UserCheck, Edit, Trash2 } from 'lucide-react';
import BackButton from '../../components/BackButton';
import { toast } from 'react-toastify';
import Loading from '../../components/Loading';
import '../admin/UserManagement.css';

const Teams = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { projects } = useSelector((state) => state.project);
  const [teams, setTeams] = useState([]);
  const [teamLeaders, setTeamLeaders] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [domains, setDomains] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editTeam, setEditTeam] = useState(null);
  const [form, setForm] = useState({ 
    pid: '', 
    domainId: '', 
    tlUid: '',
    selectedEmployees: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.uid) {
      dispatch(getProjectsByManager(user.uid));
    }
    const load = async () => {
      try {
        const [tls, doms, emps] = await Promise.all([
          teamService.getTeamLeaders(),
          domainService.getAllDomains(),
          adminAPI.get('/users').then(res => res.data)
        ]);
        setTeamLeaders(tls);
        setDomains(doms);
        setEmployees(emps.filter(u => u.roleName === 'Employee'));
      } catch (err) {
        toast.error('Failed to load data');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [dispatch, user]);

  const loadTeams = async () => {
    if (!projects?.length) return;
    const all = [];
    for (const p of projects) {
      try {
        const t = await teamService.getTeamsByProject(p.pid);
        all.push(...(t || []).map(tm => ({ ...tm, projectName: p.pname })));
      } catch {}
    }
    setTeams(all);
  };

  useEffect(() => {
    loadTeams();
  }, [projects]);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!form.pid || !form.domainId || !form.tlUid) {
      toast.error('Select project, domain and team leader');
      return;
    }
    try {
      if (editTeam) {
        // For edit, we need to delete the old team and create a new one
        await teamService.deleteTeam(editTeam.teamId);
        toast.success('Team updated');
      }
      
      // Create team (or recreate for edit)
      await teamService.createTeam(
        parseInt(form.pid),
        parseInt(form.domainId),
        parseInt(form.tlUid)
      );
      
      // Add selected employees to the team
      for (const employeeId of form.selectedEmployees) {
        await teamService.addMember(parseInt(form.pid), employeeId);
      }
      
      const action = editTeam ? 'updated' : 'created';
      toast.success(`Team ${action} with ${form.selectedEmployees.length} employee(s)`);
      setShowModal(false);
      setForm({ pid: '', domainId: '', tlUid: '', selectedEmployees: [] });
      loadTeams();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create team');
    }
  };

  const handleEdit = (team) => {
    setEditTeam(team);
    setForm({ 
      pid: team.pid, 
      domainId: team.domainId || '', 
      tlUid: team.uid,
      selectedEmployees: []
    });
    setShowModal(true);
  };

  const handleDelete = async (teamId) => {
    if (window.confirm('Delete this team? This will remove all team members.')) {
      try {
        await teamService.deleteTeam(teamId);
        toast.success('Team deleted');
        loadTeams();
      } catch (err) {
        toast.error('Failed to delete team');
      }
    }
  };

  const handleModalOpen = () => {
    setEditTeam(null);
    setForm({ 
      pid: '', 
      domainId: '', 
      tlUid: '',
      selectedEmployees: []
    });
    setShowModal(true);
  };

  // Filter employees by selected domain
  const filteredEmployees = form.domainId 
    ? employees.filter(emp => emp.domainId === parseInt(form.domainId))
    : employees;

  // Filter team leaders by selected domain - handle both DTO and entity structures
  const filteredTeamLeaders = form.domainId
    ? teamLeaders.filter(tl => {
        const domainId = tl.domainId || tl.domain?.domainId;
        return domainId === parseInt(form.domainId);
      })
    : teamLeaders;

  // Fallback: if no team leaders found after filtering, show all
  const displayTeamLeaders = filteredTeamLeaders.length > 0 ? filteredTeamLeaders : teamLeaders;

  if (loading) return <Loading fullScreen />;

  return (
    <div className="page-container">
      <BackButton to="/manager" />
      <div className="page-header">
        <div>
          <h1 className="page-title">Create Team</h1>
          <p className="page-subtitle">Create domain-specific teams with employees and assign Team Leaders</p>
        </div>
        <button className="btn-primary" onClick={handleModalOpen}>
          <Plus size={20} />
          Create Team
        </button>
      </div>

      <div className="content-card">
        <h3 style={{ color: '#a5b4fc', marginBottom: '16px' }}>Existing Teams</h3>
        {teams.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {teams.map((t) => (
              <div
                key={t.teamId}
                style={{
                  padding: '16px',
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: '12px',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong style={{ color: '#fff' }}>Project: {t.projectName || `#${t.pid}`}</strong>
                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', marginTop: '4px' }}>
                      Team ID: {t.teamId} | Domain ID: {t.domainId || '-'} | TL UID: {t.uid}
                    </p>
                  </div>
                  <div className="action-buttons">
                    <button className="action-btn edit" onClick={() => handleEdit(t)}>
                      <Edit size={16} />
                    </button>
                    <button className="action-btn delete" onClick={() => handleDelete(t.teamId)}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ color: 'rgba(255,255,255,0.5)' }}>No teams yet. Create a team to get started.</p>
        )}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '600px' }}>
            <h2>{editTeam ? 'Edit Team' : 'Create Domain-Specific Team'}</h2>
            <form onSubmit={handleCreate}>
              <label style={{ color: 'rgba(255,255,255,0.8)', display: 'block', marginBottom: '4px' }}>Project</label>
              <select
                value={form.pid}
                onChange={(e) => setForm({ ...form, pid: e.target.value, domainId: '', tlUid: '', selectedEmployees: [] })}
                className="select-light"
                required
                style={{ width: '100%', marginBottom: '16px' }}
              >
                <option value="">Select Project</option>
                {projects?.map((p) => (
                  <option key={p.pid} value={p.pid}>{p.pname}</option>
                ))}
              </select>
              
              <label style={{ color: 'rgba(255,255,255,0.8)', display: 'block', marginBottom: '4px' }}>Domain</label>
              <select
                value={form.domainId}
                onChange={(e) => setForm({ ...form, domainId: e.target.value, tlUid: '', selectedEmployees: [] })}
                className="select-light"
                required
                style={{ width: '100%', marginBottom: '16px' }}
              >
                <option value="">Select Domain</option>
                {domains?.map((d) => (
                  <option key={d.domainId} value={d.domainId}>{d.dname}</option>
                ))}
              </select>

              {form.domainId && (
                <>
                  <label style={{ color: 'rgba(255,255,255,0.8)', display: 'block', marginBottom: '4px' }}>
                    <UserCheck size={16} style={{ display: 'inline', marginRight: '6px' }} />
                    Select Team Leader ({displayTeamLeaders.length} available)
                  </label>
                  <select
                    value={form.tlUid}
                    onChange={(e) => setForm({ ...form, tlUid: e.target.value })}
                    className="select-light"
                    required
                    style={{ width: '100%', marginBottom: '16px' }}
                  >
                    <option value="">Select Team Leader</option>
                    {displayTeamLeaders?.map((tl) => (
                      <option key={tl.uid} value={tl.uid}>
                        {tl.fname} {tl.lname} ({tl.email})
                      </option>
                    ))}
                  </select>
                  
                  {/* Debug info - remove later */}
                  {process.env.NODE_ENV === 'development' && (
                    <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginBottom: '16px' }}>
                      Debug: {teamLeaders.length} total team leaders, {filteredTeamLeaders.length} filtered, {displayTeamLeaders.length} to display
                    </div>
                  )}

                  <label style={{ color: 'rgba(255,255,255,0.8)', display: 'block', marginBottom: '4px' }}>
                    <Users size={16} style={{ display: 'inline', marginRight: '6px' }} />
                    Select Team Members ({filteredEmployees.length} available in {domains.find(d => d.domainId === parseInt(form.domainId))?.dname})
                  </label>
                  <div style={{ 
                    background: 'rgba(255,255,255,0.05)', 
                    border: '1px solid rgba(255,255,255,0.1)', 
                    borderRadius: '8px', 
                    padding: '12px', 
                    marginBottom: '16px',
                    maxHeight: '200px',
                    overflowY: 'auto'
                  }}>
                    {filteredEmployees.length > 0 ? (
                      filteredEmployees.map((emp) => (
                        <label key={emp.uid} style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '8px', 
                          padding: '8px',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          color: 'rgba(255,255,255,0.8)'
                        }}>
                          <input
                            type="checkbox"
                            checked={form.selectedEmployees.includes(emp.uid)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setForm({ ...form, selectedEmployees: [...form.selectedEmployees, emp.uid] });
                              } else {
                                setForm({ ...form, selectedEmployees: form.selectedEmployees.filter(id => id !== emp.uid) });
                              }
                            }}
                            style={{ margin: 0 }}
                          />
                          <span>
                            {emp.fname} {emp.lname} ({emp.email}) - {emp.domainName}
                          </span>
                        </label>
                      ))
                    ) : (
                      <p style={{ color: 'rgba(255,255,255,0.5)', textAlign: 'center', margin: 0 }}>
                        No employees available in this domain
                      </p>
                    )}
                  </div>
                  
                  {form.selectedEmployees.length > 0 && (
                    <p style={{ 
                      color: '#10b981', 
                      fontSize: '14px', 
                      marginBottom: '16px',
                      fontWeight: '500'
                    }}>
                      Selected: {form.selectedEmployees.length} employee(s)
                    </p>
                  )}
                </>
              )}
              
              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary">
                  {editTeam ? 'Update Team' : 'Create Team'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Teams;
