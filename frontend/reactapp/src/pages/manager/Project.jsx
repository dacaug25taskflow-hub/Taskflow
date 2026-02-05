import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { 
  Layers, 
  Users, 
  FolderKanban, 
  ListTodo, 
  MessageSquare, 
  ArrowRight,
  CheckCircle 
} from 'lucide-react';


const WelcomeScreen = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: 'Welcome to TaskFlow',
      subtitle: 'Your Complete Project Management Solution',
      icon: <Layers size={80} />,
      features: [
        'Manage multiple projects seamlessly',
        'Assign tasks to team leaders and employees',
        'Track progress with Kanban boards',
        'Real-time collaboration and queries'
      ]
    },
    {
      title: 'Powerful Features',
      subtitle: 'Everything you need in one place',
      icon: <FolderKanban size={80} />,
      features: [
        'Role-based dashboards for Admin, Manager, Team Leader, Employee',
        'Break projects into domain-specific tasks',
        'Visual task tracking with drag-and-drop',
        'Query management system for quick communication'
      ]
    },
    {
      title: `Ready, ${user?.uname}?`,
      subtitle: 'Let\'s get started!',
      icon: <CheckCircle size={80} />,
      features: [
        `You're logged in as ${user?.role}`,
        'Navigate using the sidebar',
        'Track your work efficiently',
        'Collaborate with your team'
      ]
    }
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      const role = user?.role.toLowerCase().replace(' ', '-');
      navigate(`/${role}`);
    }
  };

  const handleSkip = () => {
    const role = user?.role.toLowerCase().replace(' ', '-');
    navigate(`/${role}`);
  };

  return (
    <div className="welcome-screen">
      <div className="welcome-background">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>

      <div className="welcome-content">
        <div className="welcome-card">
          <div className="welcome-icon">
            {slides[currentSlide].icon}
          </div>

          <h1 className="welcome-title">{slides[currentSlide].title}</h1>
          <p className="welcome-subtitle">{slides[currentSlide].subtitle}</p>

          <div className="features-list">
            {slides[currentSlide].features.map((feature, index) => (
              <div key={index} className="feature-item" style={{animationDelay: `${index * 0.1}s`}}>
                <CheckCircle size={20} />
                <span>{feature}</span>
              </div>
            ))}
          </div>

          <div className="slide-indicators">
            {slides.map((_, index) => (
              <div 
                key={index} 
                className={`indicator ${currentSlide === index ? 'active' : ''}`}
              />
            ))}
          </div>

          <div className="welcome-actions">
            <button className="btn-skip" onClick={handleSkip}>
              Skip
            </button>
            <button className="btn-next" onClick={handleNext}>
              {currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;