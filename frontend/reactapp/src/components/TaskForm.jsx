import React, { useState, useEffect } from 'react';
import { X, Save, Calendar, AlertCircle } from 'lucide-react';
import './TaskForm.css';

const TaskForm = ({ isOpen, onClose, onSubmit, initialData = null }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    endDate: '',
    status: 'TODO'
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.tname || initialData.taskName || '',
        description: initialData.tdescription || initialData.description || '',
        priority: initialData.priority || 'Medium',
        endDate: initialData.endDate ? new Date(initialData.endDate).toISOString().split('T')[0] : '',
        status: initialData.status || 'TODO'
      });
    } else {
      setFormData({ title: '', description: '', priority: 'Medium', endDate: '', status: 'TODO' });
    }
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>{initialData ? 'Edit Task' : 'Create New Task'}</h2>
          <button onClick={onClose} className="close-btn"><X size={20} /></button>
        </div>
        
        <form onSubmit={handleSubmit} className="task-form">
          <div className="form-group">
            <label>Task Title</label>
            <input 
              type="text" 
              name="title" 
              value={formData.title} 
              onChange={handleChange} 
              placeholder="e.g. API Integration"
              required 
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea 
              name="description" 
              value={formData.description} 
              onChange={handleChange} 
              placeholder="Detail the requirements..."
              rows={4}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label><AlertCircle size={14} /> Priority</label>
              <select name="priority" value={formData.priority} onChange={handleChange}>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
            </div>

            <div className="form-group">
              <label><Calendar size={14} /> Due Date</label>
              <input 
                type="date" 
                name="endDate" 
                value={formData.endDate} 
                onChange={handleChange} 
                required 
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" onClick={onClose} className="cancel-btn">Cancel</button>
            <button type="submit" className="submit-btn">
              <Save size={16} /> {initialData ? 'Update Task' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;