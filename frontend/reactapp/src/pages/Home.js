import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, HelpCircle, Phone, Mail, Users, CheckCircle, BarChart3, MessageSquare, TrendingUp, Shield, Clock, Target, Zap } from 'lucide-react';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showContact, setShowContact] = useState(false);

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleHelpClick = () => {
    setShowHelp(true);
    setShowContact(false);
  };

  const handleContactClick = () => {
    setShowContact(true);
    setShowHelp(false);
  };

  const features = [
    {
      icon: <Users size={48} />,
      title: "Role-Based Access",
      description: "Admin, Manager, Team Leader, and Employee roles with specific permissions"
    },
    {
      icon: <CheckCircle size={48} />,
      title: "Task Management",
      description: "Complete task lifecycle from creation to completion with status tracking"
    },
    {
      icon: <BarChart3 size={48} />,
      title: "Kanban Boards",
      description: "Visual task management with drag-and-drop functionality for all roles"
    },
    {
      icon: <MessageSquare size={48} />,
      title: "Query System",
      description: "Built-in communication system for queries between team members"
    },
    {
      icon: <TrendingUp size={48} />,
      title: "Real-time Analytics",
      description: "Dashboard insights and progress tracking for projects and tasks"
    },
    {
      icon: <Shield size={48} />,
      title: "Secure Authentication",
      description: "Role-based security with JWT authentication and authorization"
    },
    {
      icon: <Clock size={48} />,
      title: "Time Tracking",
      description: "Monitor task progress with timestamps and deadline management"
    },
    {
      icon: <Target size={48} />,
      title: "Project Management",
      description: "Complete project oversight with team assignments and resource allocation"
    },
    {
      icon: <Zap size={48} />,
      title: "Instant Notifications",
      description: "Real-time alerts for task updates and team communications"
    }
  ];

  return (
    <div className="home-container">
      {/* Top Bar */}
      <header className="home-header">
        <div className="header-content">
          <div className="header-left">
            <h1 className="logo">TaskFlow</h1>
          </div>
          <nav className="header-nav">
            <button className="nav-btn login-btn" onClick={handleLoginClick}>
              <LogIn size={16} />
              Login
            </button>
            <button className="nav-btn help-btn" onClick={handleHelpClick}>
              <HelpCircle size={16} />
              Help
            </button>
            <button className="nav-btn contact-btn" onClick={handleContactClick}>
              <Phone size={16} />
              Contact
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="home-main">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">TaskFlow</h1>
            <p className="hero-subtitle">Streamline Your Workflow, Empower Your Team</p>
            <p className="hero-description">
              Comprehensive task management system designed for modern teams with role-based access, 
              real-time collaboration, and powerful analytics.
            </p>
            <button className="cta-button" onClick={handleLoginClick}>
              Get Started
              <LogIn size={20} />
            </button>
          </div>
        </section>

        {/* Features Section */}
        <section className="features-section">
          <div className="features-header">
            <h2 className="features-title">Powerful Features</h2>
            <p className="features-subtitle">Everything you need to manage your team and projects efficiently</p>
          </div>
          
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">
                  {feature.icon}
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Help Modal */}
      {showHelp && (
        <div className="modal-overlay" onClick={() => setShowHelp(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Help & Support</h3>
              <button className="modal-close" onClick={() => setShowHelp(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="help-section">
                <h4>Getting Started</h4>
                <ul>
                  <li>Login with your credentials provided by your administrator</li>
                  <li>Navigate to your dashboard based on your role</li>
                  <li>Start managing tasks and projects immediately</li>
                </ul>
              </div>
              <div className="help-section">
                <h4>Role Guides</h4>
                <ul>
                  <li><strong>Admin:</strong> Manage users, projects, and system settings</li>
                  <li><strong>Manager:</strong> Create projects, assign teams, monitor progress</li>
                  <li><strong>Team Leader:</strong> Manage tasks, assign to employees, review work</li>
                  <li><strong>Employee:</strong> Complete assigned tasks, update status</li>
                </ul>
              </div>
              <div className="help-section">
                <h4>Common Issues</h4>
                <ul>
                  <li>Forgot password? Contact your system administrator</li>
                  <li>Need role changes? Contact your manager or admin</li>
                  <li>Technical issues? Use the contact form below</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contact Modal */}
      {showContact && (
        <div className="modal-overlay" onClick={() => setShowContact(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Contact Us</h3>
              <button className="modal-close" onClick={() => setShowContact(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="contact-info">
                <div className="contact-item">
                  <Mail size={20} />
                  <div>
                    <h4>Email Support</h4>
                    <p>support@taskflow.com</p>
                    <small>We respond within 24 hours</small>
                  </div>
                </div>
                <div className="contact-item">
                  <Phone size={20} />
                  <div>
                    <h4>Phone Support</h4>
                    <p>+1 (555) 123-4567</p>
                    <small>Mon-Fri, 9AM-6PM EST</small>
                  </div>
                </div>
                <div className="contact-item">
                  <MessageSquare size={20} />
                  <div>
                    <h4>Live Chat</h4>
                    <p>Available on business days</p>
                    <small>Instant support for urgent issues</small>
                  </div>
                </div>
              </div>
              <div className="contact-form">
                <h4>Send us a Message</h4>
                <form>
                  <input type="text" placeholder="Your Name" required />
                  <input type="email" placeholder="Your Email" required />
                  <select>
                    <option>Select Issue Type</option>
                    <option>Technical Support</option>
                    <option>Account Issue</option>
                    <option>Feature Request</option>
                    <option>Other</option>
                  </select>
                  <textarea placeholder="Describe your issue..." rows="4" required></textarea>
                  <button type="submit" className="submit-btn">Send Message</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;