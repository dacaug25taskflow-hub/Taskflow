import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDomains, createDomain } from '../../redux/slices/domainSlice';
import { toast } from 'react-toastify';
import { Plus, Briefcase } from 'lucide-react';
import Loading from '../../components/Loading';
import BackButton from '../../components/BackButton';
import './UserManagement.css';

const DomainManagement = () => {
  const dispatch = useDispatch();
  const { domains, isLoading } = useSelector((state) => state.domain);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ dname: '' });

  useEffect(() => {
    dispatch(getAllDomains());
  }, [dispatch]);

  const handleCreate = () => {
    setFormData({ dname: '' });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(createDomain(formData)).unwrap();
      toast.success('Domain created');
      setShowModal(false);
    } catch (error) {
      toast.error('Failed');
    }
  };

  if (isLoading && domains.length === 0) {
    return <Loading fullScreen />;
  }

  return (
    <div className="page-container">
      <BackButton to="/admin" />
      <div className="page-header">
        <div>
          <h1 className="page-title">Domain Management</h1>
          <p className="page-subtitle">Manage organization domains</p>
        </div>
        <button className="btn-primary" onClick={handleCreate}>
          <Plus size={20} />
          <span>Create Domain</span>
        </button>
      </div>

      <div className="content-card">
        <div className="domains-grid">
          {domains.map((domain) => (
            <div key={domain.domainId} className="domain-card">
              <Briefcase size={32} />
              <h3>{domain.dname}</h3>
              <span className="domain-id">ID: {domain.domainId}</span>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{maxWidth: '400px'}}>
            <h2>Create Domain</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Domain Name (e.g., Backend)"
                value={formData.dname}
                onChange={(e) => setFormData({dname: e.target.value})}
                required
                style={{width: '100%', marginBottom: '20px'}}
              />
              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DomainManagement;
