import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CandidateDashboard.css';

const CandidateDashboard = () => {
  const [candidate, setCandidate] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // In a real app, this would come from login response or localStorage
    // For demo purposes, we'll use mock data
    const mockCandidate = {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      skills: 'JavaScript, React, Node.js'
    };
    setCandidate(mockCandidate);
  }, []);

  const handleLogout = () => {
    // Clear any stored auth data
    navigate('/');
  };

  if (!candidate) {
    return <div className="container">Loading...</div>;
  }

  return (
    <div className="container">
      <div className="navbar">
        <h2>Candidate Dashboard</h2>
        <div className="nav-links">
          <span>Welcome, {candidate.name}</span>
          <button onClick={handleLogout} className="btn btn-secondary">Logout</button>
        </div>
      </div>
      
      <div className="dashboard">
        <div className="profile-section">
          <h3>Your Profile</h3>
          <div className="card">
            <p><strong>Name:</strong> {candidate.name}</p>
            <p><strong>Email:</strong> {candidate.email}</p>
            <p><strong>Skills:</strong> {candidate.skills}</p>
          </div>
        </div>
        
        <div className="offers-section">
          <h3>Your Offers</h3>
          <div className="card">
            <p>No offers received yet. Companies will contact you here!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateDashboard;
