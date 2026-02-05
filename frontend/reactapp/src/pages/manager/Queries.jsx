import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getQueriesByManager, respondToQuery } from '../../redux/slices/querySlice';
import { MessageSquare, Send, Clock, CheckCircle } from 'lucide-react';
import { toast } from 'react-toastify';
import Loading from '../../components/Loading';
import BackButton from '../../components/BackButton';
import '../admin/UserManagement.css';

const Queries = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { queries, isLoading } = useSelector((state) => state.query);
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [response, setResponse] = useState('');

  useEffect(() => {
    if (user?.uid) {
      dispatch(getQueriesByManager(user.uid));
    }
  }, [dispatch, user]);

  const handleRespond = async (e) => {
    e.preventDefault();
    if (!response.trim()) {
      toast.error('Please enter a response');
      return;
    }

    try {
      await dispatch(respondToQuery({ 
        qid: selectedQuery.qid, 
        response 
      })).unwrap();
      toast.success('Response sent');
      setSelectedQuery(null);
      setResponse('');
      if (user?.uid) dispatch(getQueriesByManager(user.uid));
    } catch (error) {
      toast.error('Failed to send response');
    }
  };

  if (isLoading) {
    return <Loading fullScreen />;
  }

  return (
    <div className="page-container">
      <BackButton to="/manager" />
      <div className="page-header">
        <div>
          <h1 className="page-title">Queries</h1>
          <p className="page-subtitle">Respond to queries from Team Leaders and Employees</p>
        </div>
      </div>

      <div className="content-card">
        {queries && queries.length > 0 ? (
          <>
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{ color: '#a5b4fc', marginBottom: '16px', fontSize: '18px' }}>Queries from Team Leaders</h3>
              {(queries.filter(q => (q.source || 'EMPLOYEE') === 'TEAM_LEADER') || []).length === 0 ? (
                <p style={{ color: 'rgba(255,255,255,0.5)', padding: '16px 0' }}>No queries from Team Leaders</p>
              ) : (queries.filter(q => q.source === 'TEAM_LEADER') || []).map((query) => (
              <div key={query.qid} className="query-card">
                <div className="query-header">
                  <div>
                    <h4 style={{color: '#6366f1', marginBottom: '4px'}}>
                      {query.qname || 'Query'}
                    </h4>
                    <p style={{color: 'rgba(255,255,255,0.7)', fontSize: '14px', fontWeight: 500}}>
                      <strong style={{color: '#a5b4fc'}}>{query.raisedByName || 'Unknown'}</strong> raised the query
                      {query.projectName && <span style={{color: 'rgba(255,255,255,0.5)', fontSize: '13px'}}> &bull; {query.projectName}</span>}
                    </p>
                  </div>
                  <div>
                    {query.status === 'OPEN' && (
                      <span className="badge" style={{background: 'rgba(245, 158, 11, 0.2)', color: '#fcd34d'}}>
                        <Clock size={14} style={{display: 'inline', marginRight: '4px'}} />
                        Pending
                      </span>
                    )}
                    {query.status === 'RESPONDED' && (
                      <span className="badge" style={{background: 'rgba(16, 185, 129, 0.2)', color: '#6ee7b7'}}>
                        <CheckCircle size={14} style={{display: 'inline', marginRight: '4px'}} />
                        Responded
                      </span>
                    )}
                  </div>
                </div>

                <p style={{color: 'rgba(255,255,255,0.8)', marginTop: '12px', lineHeight: '1.5'}}>
                  {query.query}
                </p>

                {query.response && (
                  <div style={{
                    marginTop: '16px',
                    padding: '16px',
                    background: 'rgba(16, 185, 129, 0.1)',
                    borderLeft: '3px solid #10b981',
                    borderRadius: '8px'
                  }}>
                    <p style={{color: 'rgba(255,255,255,0.6)', fontSize: '12px', marginBottom: '8px'}}>
                      {query.respondedByName ? `${query.respondedByName} responded:` : 'Your Response:'}
                    </p>
                    <p style={{color: 'rgba(255,255,255,0.9)'}}>{query.response}</p>
                  </div>
                )}

                {query.status === 'OPEN' && (
                  <button 
                    className="btn-primary" 
                    onClick={() => setSelectedQuery(query)}
                    style={{marginTop: '16px', fontSize: '14px', padding: '10px 20px'}}
                  >
                    <Send size={16} />
                    Respond to Query
                  </button>
                )}
              </div>
            ))}
            </div>

            <div>
              <h3 style={{ color: '#a5b4fc', marginBottom: '16px', fontSize: '18px' }}>Queries from Employees</h3>
              {(queries.filter(q => q.source === 'EMPLOYEE') || []).length === 0 ? (
                <p style={{ color: 'rgba(255,255,255,0.5)', padding: '16px 0' }}>No queries from Employees</p>
              ) : (queries.filter(q => q.source === 'EMPLOYEE') || []).map((query) => (
              <div key={query.qid} className="query-card">
                <div className="query-header">
                  <div>
                    <h4 style={{color: '#6366f1', marginBottom: '4px'}}>
                      {query.qname || 'Query'}
                    </h4>
                    <p style={{color: 'rgba(255,255,255,0.7)', fontSize: '14px', fontWeight: 500}}>
                      <strong style={{color: '#a5b4fc'}}>{query.raisedByName || 'Unknown'}</strong> raised the query
                      {query.projectName && <span style={{color: 'rgba(255,255,255,0.5)', fontSize: '13px'}}> &bull; {query.projectName}</span>}
                    </p>
                  </div>
                  <div>
                    {query.status === 'OPEN' && (
                      <span className="badge" style={{background: 'rgba(245, 158, 11, 0.2)', color: '#fcd34d'}}>
                        <Clock size={14} style={{display: 'inline', marginRight: '4px'}} />
                        Pending
                      </span>
                    )}
                    {query.status === 'RESPONDED' && (
                      <span className="badge" style={{background: 'rgba(16, 185, 129, 0.2)', color: '#6ee7b7'}}>
                        <CheckCircle size={14} style={{display: 'inline', marginRight: '4px'}} />
                        Responded
                      </span>
                    )}
                  </div>
                </div>
                <p style={{color: 'rgba(255,255,255,0.8)', marginTop: '12px', lineHeight: '1.5'}}>
                  {query.query}
                </p>
                {query.response && (
                  <div style={{ marginTop: '16px', padding: '16px', background: 'rgba(16, 185, 129, 0.1)', borderLeft: '3px solid #10b981', borderRadius: '8px' }}>
                    <p style={{color: 'rgba(255,255,255,0.6)', fontSize: '12px', marginBottom: '8px'}}>
                      {query.respondedByName ? `${query.respondedByName} responded:` : 'Your Response:'}
                    </p>
                    <p style={{color: 'rgba(255,255,255,0.9)'}}>{query.response}</p>
                  </div>
                )}
                {query.status === 'OPEN' && (
                  <button className="btn-primary" onClick={() => setSelectedQuery(query)} style={{marginTop: '16px', fontSize: '14px', padding: '10px 20px'}}>
                    <Send size={16} /> Respond to Query
                  </button>
                )}
              </div>
            ))}
            </div>
          </>
        ) : (
          <div style={{textAlign: 'center', padding: '60px 20px'}}>
            <MessageSquare size={64} style={{color: 'rgba(255,255,255,0.3)', marginBottom: '20px'}} />
            <p style={{color: 'rgba(255,255,255,0.5)', fontSize: '16px'}}>
              No queries yet
            </p>
          </div>
        )}
      </div>

      {/* Response Modal */}
      {selectedQuery && (
        <div className="modal-overlay" onClick={() => setSelectedQuery(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Respond to Query</h2>
            <div style={{
              padding: '16px',
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '12px',
              marginBottom: '20px'
            }}>
              <p style={{color: 'rgba(255,255,255,0.7)', fontSize: '14px', marginBottom: '8px'}}>
                <strong style={{color: '#a5b4fc'}}>{selectedQuery.raisedByName || 'Unknown'}</strong> raised the query
              </p>
              <p style={{color: 'white', fontWeight: '600', marginBottom: '8px'}}>
                {selectedQuery.qname}
              </p>
              <p style={{color: 'rgba(255,255,255,0.8)'}}>
                {selectedQuery.query}
              </p>
            </div>

            <form onSubmit={handleRespond}>
              <textarea
                placeholder="Type your response here..."
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                required
                style={{minHeight: '120px'}}
              />
              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setSelectedQuery(null)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  <Send size={16} />
                  Send Response
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
