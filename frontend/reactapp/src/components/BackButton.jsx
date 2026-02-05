import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import './BackButton.css';

const BackButton = ({ to, label = 'Back', className = '' }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1); // Go back to previous page
    }
  };

  return (
    <button
      className={`back-button ${className}`}
      onClick={handleBack}
      title={label}
    >
      <ArrowLeft size={16} />
      <span>{label}</span>
    </button>
  );
};

export default BackButton;
