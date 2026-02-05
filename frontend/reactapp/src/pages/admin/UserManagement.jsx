import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { getAllUsers, createUser, updateUser, deleteUser } from '../../redux/slices/userSlice';
import { getAllDomains } from '../../redux/slices/domainSlice';
import BackButton from '../../components/BackButton';
import { toast } from 'react-toastify';
import Loading from '../../components/Loading';
import './UserManagement.css';

const UserManagement = () => {
  const dispatch = useDispatch();
  const { users, isLoading } = useSelector((state) => state.user);
  const { domains } = useSelector((state) => state.domain);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [formData, setFormData] = useState({
    uname: '',
    fname: '',
    lname: '',
    email: '',
    pwd: '',
    phone: '',
    address: '',
    role: '',
    domainId: '',
  });

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getAllDomains());
  }, [dispatch]);

  const handleCreate = () => {
    setEditUser(null);
    setFormData({
      uname: '',
      fname: '',
      lname: '',
      email: '',
      pwd: '',
      phone: '',
      address: '',
      role: '',
      domainId: '',
    });
    setShowModal(true);
  };

  const handleEdit = (user) => {
    setEditUser(user);
    setFormData({
      uname: user.uname,
      fname: user.fname,
      lname: user.lname,
      email: user.email,
      pwd: '',
      phone: user.phone,
      address: user.address || '',
      role: user.roleName || '',
      domainId: user.domainId || '',
    });
    setShowModal(true);
  };

  const handleDelete = async (uid) => {
    if (window.confirm('Delete this user?')) {
      try {
        await dispatch(deleteUser(uid)).unwrap();
        toast.success('User deleted');
      } catch (error) {
        toast.error('Failed to delete');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editUser) {
        await dispatch(updateUser({ uid: editUser.uid, userData: formData })).unwrap();
        toast.success('User updated');
      } else {
        await dispatch(createUser(formData)).unwrap();
        toast.success('User created');
      }
      setShowModal(false);
    } catch (error) {
      toast.error(error || 'Operation failed');
    }
  };

  const filteredUsers = users.filter((user) =>
    user.uname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading && users.length === 0) {
    return <Loading fullScreen />;
  }

  return (
    <div className="page-container">
      <BackButton to="/admin" />
      <div className="page-header">
        <div>
          <h1 className="page-title">User Management</h1>
          <p className="page-subtitle">Create and manage users</p>
        </div>
        <button className="btn-primary" onClick={handleCreate}>
          <Plus size={20} />
          <span>Create User</span>
        </button>
      </div>

      <div className="content-card">
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Domain</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.uid}>
                  <td className="username">{user.uname}</td>
                  <td>{user.fname} {user.lname}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>
                    <span className={`badge badge-${user.roleName?.toLowerCase().replace(' ', '-')}`}>
                      {user.roleName}
                    </span>
                  </td>
                  <td>{user.domainName || 'N/A'}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="action-btn edit" onClick={() => handleEdit(user)}>
                        <Edit size={16} />
                      </button>
                      <button className="action-btn delete" onClick={() => handleDelete(user.uid)}>
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
            <h2>{editUser ? 'Edit User' : 'Create User'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <input
                  type="text"
                  placeholder="Username"
                  value={formData.uname}
                  onChange={(e) => setFormData({...formData, uname: e.target.value})}
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
                <input
                  type="text"
                  placeholder="First Name"
                  value={formData.fname}
                  onChange={(e) => setFormData({...formData, fname: e.target.value})}
                  required
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={formData.lname}
                  onChange={(e) => setFormData({...formData, lname: e.target.value})}
                  required
                />
                {!editUser && (
                  <input
                    type="password"
                    placeholder="Password (min 6)"
                    value={formData.pwd}
                    onChange={(e) => setFormData({...formData, pwd: e.target.value})}
                    required
                  />
                )}
                <input
                  type="text"
                  placeholder="Phone (10 digits)"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  required
                />
                <select
                  className="select-light"
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                  required
                >
                  <option value="">Select Role</option>
                  <option value="Manager">Manager</option>
                  <option value="Team Leader">Team Leader</option>
                  <option value="Employee">Employee</option>
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
              </div>
              <textarea
                placeholder="Address"
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
              />
              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  {editUser ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
