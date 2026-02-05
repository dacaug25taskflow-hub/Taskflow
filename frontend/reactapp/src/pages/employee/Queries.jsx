import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createQuery, getMyQueriesEmployee } from '../../redux/slices/querySlice';
import queryService from '../../services/queryService';
import { MessageSquare, Plus, CheckCircle, Clock } from 'lucide-react';
import { toast } from 'react-toastify';
import Loading from '../../components/Loading';
import BackButton from '../../components/BackButton';
import '../admin/UserManagement.css';

const Queries = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { employeeQueries, isLoading } = useSelector((state) => state.query);
  const [showModal, setShowModal] = useState(false);
  const [queryOptions, setQueryOptions] = useState([]);
  const [form, setForm] = useState({
    query: '',
    qname: '',
    optionKey: '',
  });

  useEffect(() => {
    if (user?.uid) {
      dispatch(getMyQueriesEmployee(user.uid));
      queryService.getQueryOptionsEmployee(user.uid).then(setQueryOptions).catch(() => setQueryOptions([]));
    }
  }, [dispatch, user?.uid]);

  const selectedOption = queryOptions.find((o) => o.taskId + '-' + o.teamId === form.optionKey);

  const handleRaiseQuery = async (e) => {
    e.preventDefault();
    if (!form.query.trim()) {
      toast.error('Please enter your query');
      return;
    }
    if (!selectedOption || !selectedOption.teamId || !selectedOption.projectId || !selectedOption.managerId) {
      toast.error('Select Task (with Team and Manager)');
      return;
    }
    try {
      await dispatch(createQuery({
        queryData: {
          query: form.query,
          qname: form.qname || 'Employee Query',
          teamId: selectedOption.teamId,
          projectId: selectedOption.projectId,
          managerUid: selectedOption.managerId,
          raisedByUid: user.uid,
        },
        role: 'Employee',
      })).unwrap();
      toast.success('Query raised');
      setShowModal(false);
      setForm({ query: '', qname: '', optionKey: '' });
      dispatch(getMyQueriesEmployee(user.uid));
    } catch (error) {
      toast.error(error.message || 'Failed to raise query');
    }
  };

  if (isLoading && !employeeQueries?.length) return <Loading fullScreen />;

  return (
    <div className="page-container">
      <BackButton to="/employee" />
      <div className="page-header">
        <div>
          <h1 className="page-title">Queries</h1>
          <p className="page-subtitle">Raise query to Team Leader / Manager</p>
        </div>
        <button className="btn-primary" onClick={() => setShowModal(true)}>
          <Plus size={20} />
          Raise Query
        </button>
      </div>

      <div className="content-card" style={{ padding: '24px' }}>
        <h3 style={{ color: '#a5b4fc', marginBottom: '16px', fontSize: '18px' }}>My Raised Queries</h3>
        {employeeQueries && employeeQueries.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {employeeQueries.map((q) => (
              <div key={q.qid} className="query-card">
                <div className="query-header">
                  <div>
                    <h4 style={{ color: '#6366f1', marginBottom: '4px' }}>{q.qname || 'Query'}</h4>
                    <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', fontWeight: 500 }}>
                      <strong style={{ color: '#a5b4fc' }}>You</strong> raised the query
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
                <p style={{ color: 'rgba(255,255,255,0.8)', marginTop: '12px' }}>{q.query1 || q.query}</p>
                {q.response && (
                  <div style={{ marginTop: '16px', padding: '16px', background: 'rgba(16, 185, 129, 0.1)', borderLeft: '3px solid #10b981', borderRadius: '8px' }}>
                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px' }}>
                      {q.respondedByName ? `${q.respondedByName} responded` : 'Response from Team Leader / Manager'}
                    </p>
                    <p style={{ color: 'rgba(255,255,255,0.9)' }}>{q.response}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p style={{ padding: '24px', color: 'rgba(255,255,255,0.5)' }}>
            No queries yet. Click Raise Query to ask Team Leader or Manager.
          </p>
        )}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Raise Query</h2>
            <form onSubmit={handleRaiseQuery}>
              <input
                placeholder="Query title (optional)"
                value={form.qname}
                onChange={(e) => setForm({ ...form, qname: e.target.value })}
                className="select-light"
              />
              <textarea
                placeholder="Your query..."
                value={form.query}
                onChange={(e) => setForm({ ...form, query: e.target.value })}
                required
                style={{ minHeight: '80px' }}
                className="select-light"
              />
              <label style={{ color: 'rgba(255,255,255,0.8)', display: 'block', marginBottom: '8px' }}>
                Select Task (Team + Manager)
              </label>
              <select
                value={form.optionKey}
                onChange={(e) => setForm({ ...form, optionKey: e.target.value })}
                required
                className="select-light"
                style={{ width: '100%', marginBottom: '16px' }}
              >
                <option value="">Select...</option>
                {queryOptions.map((o) => (
                  <option key={o.taskId + '-' + o.teamId} value={o.taskId + '-' + o.teamId}>
                    Task: {o.taskName} | Team: {o.teamName} | Manager: {o.managerName}
                  </option>
                ))}
              </select>
              {queryOptions.length === 0 && (
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', marginBottom: '12px' }}>
                  No tasks with teams. Ensure you have assigned tasks in projects with teams.
                </p>
              )}
              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Raise Query
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Queries;
