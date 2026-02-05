import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getQueriesForTeamLeader, respondToQueryTL, createQueryTL } from '../../redux/slices/querySlice';
import { getProjectsForTL, getTasksAssignedToTL } from '../../redux/slices/taskSlice';
import { MessageSquare, Send, Clock, CheckCircle, Plus } from 'lucide-react';
import { toast } from 'react-toastify';
import Loading from '../../components/Loading';
import BackButton from '../../components/BackButton';
import '../admin/UserManagement.css';

const Queries = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { queries, isLoading } = useSelector((state) => state.query);
  const { tlProjects, tlAssignedTasks } = useSelector((state) => state.task);
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [response, setResponse] = useState('');
  const [showRaiseModal, setShowRaiseModal] = useState(false);
  const [raiseForm, setRaiseForm] = useState({ query: '', qname: '', taskId: '', projectId: '', managerId: '' });

  useEffect(() => {
    if (user?.uid) {
      dispatch(getQueriesForTeamLeader(user.uid));
      dispatch(getProjectsForTL(user.uid));
      dispatch(getTasksAssignedToTL(user.uid));
    }
  }, [dispatch, user]);

  const tasksWithManager = (tlAssignedTasks || []).map((task) => {
    const proj = (tlProjects || []).find((p) => p.pid === task.pid);
    return {
      ...task,
      managerName: proj?.managerName || 'Manager',
      managerId: proj?.managerId,
    };
  });

  const handleRespond = async (e) => {
    e.preventDefault();
    if (!response.trim()) {
      toast.error('Please enter a response');
      return;
    }
    try {
      await dispatch(respondToQueryTL({
        qid: selectedQuery.qid,
        response,
        tlUid: user.uid
      })).unwrap();
      toast.success('Response sent');
      setSelectedQuery(null);
      setResponse('');
      dispatch(getQueriesForTeamLeader(user.uid));
    } catch (error) {
      toast.error('Failed to send response');
    }
  };

  const handleRaiseQuery = async (e) => {
    e.preventDefault();
    if (!raiseForm.query.trim()) {
      toast.error('Please enter your query');
      return;
    }
    if (!raiseForm.taskId || !raiseForm.projectId || !raiseForm.managerId) {
      toast.error('Select task');
      return;
    }
    try {
      await dispatch(createQueryTL({
        queryData: {
          query: raiseForm.query,
          qname: raiseForm.qname || 'Query from Team Leader',
          projectId: parseInt(raiseForm.projectId),
          managerUid: parseInt(raiseForm.managerId),
        },
        tlUid: user.uid,
      })).unwrap();
      toast.success('Query raised to manager');
      setShowRaiseModal(false);
      setRaiseForm({ query: '', qname: '', taskId: '', projectId: '', managerId: '' });
      dispatch(getQueriesForTeamLeader(user.uid));
    } catch (error) {
      toast.error(error.message || 'Failed to raise query');
    }
  };

  if (isLoading && !queries?.length) return <Loading fullScreen />;

  return (
    <div className="page-container">
      <BackButton to="/team-leader" />
      <div className="page-header">
        <div>
          <h1 className="page-title">Queries</h1>
          <p className="page-subtitle">Raise query to manager | Respond to employee queries</p>
        </div>
        <button className="btn-primary" onClick={() => setShowRaiseModal(true)}>
          <Plus size={20} />
          Raise Query to Manager
        </button>
      </div>

      <div className="content-card">
        {queries && queries.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {queries.map((q) => {
              const isEmployeeQuery = q.raisedByUid && q.raisedByUid !== user?.uid;
              return (
              <div key={q.qid} className="query-card">
                <div className="query-header">
                  <div>
                    <h4 style={{ color: '#6366f1', marginBottom: '4px' }}>{q.qname || 'Query'}</h4>
                    <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', fontWeight: 500 }}>
                      <strong style={{ color: '#a5b4fc' }}>{q.raisedByName || 'Unknown'}</strong> raised the query
                      {q.projectId && <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px' }}> &bull; Project #{q.projectId}</span>}
                    </p>
                  </div>
                  <div>
                    {q.status === 'OPEN' && (
                      <span className="badge" style={{ background: 'rgba(245, 158, 11, 0.2)', color: '#fcd34d' }}>
                        <Clock size={14} style={{ display: 'inline', marginRight: '4px' }} />
                        Pending
                      </span>
                    )}
                    {q.status === 'RESPONDED' && (
                      <span className="badge" style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#6ee7b7' }}>
                        <CheckCircle size={14} style={{ display: 'inline', marginRight: '4px' }} />
                        Responded
                      </span>
                    )}
                  </div>
                </div>
                <p style={{ color: 'rgba(255,255,255,0.8)', marginTop: '12px' }}>{q.query}</p>
                {q.response && (
                  <div style={{ marginTop: '16px', padding: '16px', background: 'rgba(16, 185, 129, 0.1)', borderLeft: '3px solid #10b981', borderRadius: '8px' }}>
                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px' }}>Response:</p>
                    <p style={{ color: 'rgba(255,255,255,0.9)' }}>{q.response}</p>
                  </div>
                )}
                {q.status === 'OPEN' && isEmployeeQuery && (
                  <button className="btn-primary" onClick={() => setSelectedQuery(q)} style={{ marginTop: '16px' }}>
                    <Send size={16} /> Respond (Employee Query)
                  </button>
                )}
                {q.status === 'OPEN' && !isEmployeeQuery && (
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', marginTop: '12px' }}>
                    Manager will respond to your query
                  </p>
                )}
              </div>
            );
            })}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <MessageSquare size={64} style={{ color: 'rgba(255,255,255,0.3)', marginBottom: '20px' }} />
            <p style={{ color: 'rgba(255,255,255,0.5)' }}>No queries yet</p>
          </div>
        )}
      </div>

      {selectedQuery && (
        <div className="modal-overlay" onClick={() => setSelectedQuery(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Respond to Employee Query</h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '8px' }}>
              <strong style={{ color: '#a5b4fc' }}>{selectedQuery.raisedByName || 'Employee'}</strong> raised the query
            </p>
            <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '16px' }}>{selectedQuery.query}</p>
            <form onSubmit={handleRespond}>
              <textarea placeholder="Your response..." value={response} onChange={(e) => setResponse(e.target.value)} required style={{ minHeight: '120px' }} />
              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setSelectedQuery(null)}>Cancel</button>
                <button type="submit" className="btn-primary"><Send size={16} /> Send</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showRaiseModal && (
        <div className="modal-overlay" onClick={() => setShowRaiseModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Raise Query to Manager</h2>
            <form onSubmit={handleRaiseQuery}>
              <input placeholder="Query title (optional)" value={raiseForm.qname} onChange={(e) => setRaiseForm({ ...raiseForm, qname: e.target.value })} />
              <textarea placeholder="Your query..." value={raiseForm.query} onChange={(e) => setRaiseForm({ ...raiseForm, query: e.target.value })} required style={{ minHeight: '80px' }} />
              <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', marginBottom: '4px', display: 'block' }}>Select Task (assigned by manager)</label>
              <select
                value={raiseForm.taskId}
                onChange={(e) => {
                  const taskId = e.target.value;
                  const t = tasksWithManager.find((x) => String(x.taskId) === taskId);
                  setRaiseForm({
                    ...raiseForm,
                    taskId,
                    projectId: t ? String(t.pid) : '',
                    managerId: t?.managerId ? String(t.managerId) : '',
                  });
                }}
                required
                style={{ width: '100%', marginBottom: '8px' }}
                className="select-light"
              >
                <option value="">Select Task</option>
                {tasksWithManager.map((t) => (
                  <option key={t.taskId} value={t.taskId}>
                    {t.tname} – Manager: {t.managerName || 'N/A'}
                  </option>
                ))}
              </select>
              {raiseForm.taskId && (
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', marginTop: '8px' }}>
                  Query will be sent to: {tasksWithManager.find((t) => String(t.taskId) === raiseForm.taskId)?.managerName || 'Manager'}
                </p>
              )}
              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowRaiseModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary">Raise Query</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Queries;
