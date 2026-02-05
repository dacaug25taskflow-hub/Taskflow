import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword, reset } from '../redux/slices/authSlice';
import { Lock, User, Edit2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import { toast } from 'react-toastify';
import profileService from '../services/profileService';
import './Settings.css';

const Settings = () => {
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);
  const [profile, setProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [profileForm, setProfileForm] = useState({ fname: '', lname: '', email: '', phone: '', address: '' });

  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      if (user?.uid) {
        try {
          const data = await profileService.getProfile(user.uid, user.role);
          setProfile(data);
          setProfileForm({
            fname: data.fname || '',
            lname: data.lname || '',
            email: data.email || '',
            phone: data.phone || '',
            address: data.address || ''
          });
        } catch (err) {
          toast.error('Failed to load profile');
        } finally {
          setProfileLoading(false);
        }
      }
    };
    fetchProfile();
  }, [user?.uid, user?.role]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess && message) {
      toast.success(message);
      setPasswords({ current: '', new: '', confirm: '' });
    }
    dispatch(reset());
  }, [isError, isSuccess, message, dispatch]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      await profileService.updateProfile(user.uid, profileForm, user.role);
      setProfile({ ...profile, ...profileForm });
      setEditing(false);
      toast.success('Profile updated');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update profile');
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      toast.error('New passwords do not match');
      return;
    }
    if (passwords.new.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    dispatch(changePassword({
      uid: user.uid,
      currentPassword: passwords.current,
      newPassword: passwords.new,
      role: user.role
    }));
  };

  const displayRole = profile?.role?.rname ?? profile?.role ?? profile?.Role ?? user?.role ?? 'User';

  return (
    <div className="settings-layout">
      <Navbar />
      <div className="settings-container">
        <h1 className="page-title">Settings</h1>
        <p className="page-subtitle">Manage your account</p>

        <div className="settings-grid">
          <div className="settings-card">
            <h3><User size={20} /> Account Information</h3>
            {profileLoading ? (
              <p style={{ color: 'rgba(255,255,255,0.5)' }}>Loading...</p>
            ) : editing ? (
              <form onSubmit={handleProfileUpdate}>
                <div className="info-grid">
                  <div className="info-item"><span>UID</span><span className="info-value">{profile?.uid}</span></div>
                  <div className="info-item"><span>Username</span><span className="info-value">{profile?.uname}</span></div>
                  <div className="info-item"><span>Role</span><span className="role-badge">{displayRole}</span></div>
                  <input placeholder="First Name" value={profileForm.fname} onChange={(e) => setProfileForm({ ...profileForm, fname: e.target.value })} className="select-light" />
                  <input placeholder="Last Name" value={profileForm.lname} onChange={(e) => setProfileForm({ ...profileForm, lname: e.target.value })} className="select-light" />
                  <input placeholder="Email" type="email" value={profileForm.email} onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })} className="select-light" required />
                  <input placeholder="Phone" value={profileForm.phone} onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })} className="select-light" />
                  <textarea placeholder="Address" value={profileForm.address} onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })} className="select-light" style={{ minHeight: '80px' }} />
                </div>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', marginTop: '8px' }}>Note: UID, Username, and Role cannot be changed</p>
                <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                  <button type="button" className="btn-secondary" onClick={() => setEditing(false)}>Cancel</button>
                  <button type="submit" className="btn-primary">Save</button>
                </div>
              </form>
            ) : (
              <>
                <div className="info-grid">
                  <div className="info-item"><span>UID</span><span className="info-value">{profile?.uid}</span></div>
                  <div className="info-item"><span>Username</span><span className="info-value">{profile?.uname}</span></div>
                  <div className="info-item"><span>Email</span><span className="info-value">{profile?.email}</span></div>
                  <div className="info-item"><span>Role</span><span className="role-badge">{displayRole}</span></div>
                  <div className="info-item"><span>Phone</span><span className="info-value">{profile?.phone || '-'}</span></div>
                  <div className="info-item"><span>First Name</span><span className="info-value">{profile?.fname || '-'}</span></div>
                  <div className="info-item"><span>Last Name</span><span className="info-value">{profile?.lname || '-'}</span></div>
                  <div className="info-item"><span>Address</span><span className="info-value">{profile?.address || '-'}</span></div>
                </div>
                <button className="btn-primary" onClick={() => setEditing(true)} style={{ marginTop: '16px' }}>
                  <Edit2 size={16} /> Update Information
                </button>
              </>
            )}
          </div>

          <div className="settings-card">
            <h3><Lock size={20} /> Change Password</h3>
            <form onSubmit={handlePasswordSubmit}>
              <input
                type="password"
                placeholder="Current Password"
                value={passwords.current}
                onChange={(e) => setPasswords({...passwords, current: e.target.value})}
                required
                disabled={isLoading}
              />
              <input
                type="password"
                placeholder="New Password (min 6 characters)"
                value={passwords.new}
                onChange={(e) => setPasswords({...passwords, new: e.target.value})}
                required
                disabled={isLoading}
              />
              <input
                type="password"
                placeholder="Confirm New Password"
                value={passwords.confirm}
                onChange={(e) => setPasswords({...passwords, confirm: e.target.value})}
                required
                disabled={isLoading}
              />
              <button type="submit" className="btn-primary" disabled={isLoading}>
                {isLoading ? 'Changing...' : 'Change Password'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
