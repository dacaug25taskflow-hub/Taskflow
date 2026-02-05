import React from 'react';
import './Loading.css';

const Loading = ({ fullScreen = false }) => {
  if (fullScreen) {
    return (
      <div className="loading-fullscreen">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="loading-inline">
      <div className="loading-spinner-small"></div>
    </div>
  );
};

export default Loading;