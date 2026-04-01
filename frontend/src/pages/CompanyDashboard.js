import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllCandidates } from '../services/api';
import './CompanyDashboard.css';

const CompanyDashboard = () => {
  const [company, setCompany] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // In a real app, this would come from login response or localStorage
    const mockCompany = {
      id: 1,
      companyName: 'Tech Corp',
      email: 'company@techcorp.com',
      description: 'Leading technology company'
    };
    setCompany(mockCompany);

    // Fetch all candidates
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const candidatesData = await getAllCandidates();
      setCandidates(candidatesData);
    } catch (error) {
      console.error('Error fetching candidates:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    // Clear any stored auth data
    navigate('/');
  };

  const handleSendOffer = (candidateId) => {
    alert(`Offer sent to candidate ${candidateId} (Feature not implemented yet)`);
  };

  if (loading) {
    return <div className="container">Loading...</div>;
  }

  return (
    <div className="container">
      <div className="navbar">
        <h2>Company Dashboard</h2>
        <div className="nav-links">
          <span>Welcome, {company?.companyName}</span>
          <button onClick={handleLogout} className="btn btn-secondary">Logout</button>
        </div>
      </div>
      
      <div className="dashboard">
        <div className="profile-section">
          <h3>Company Profile</h3>
          <div className="card">
            <p><strong>Company Name:</strong> {company?.companyName}</p>
            <p><strong>Email:</strong> {company?.email}</p>
            <p><strong>Description:</strong> {company?.description}</p>
          </div>
        </div>
        
        <div className="candidates-section">
          <h3>Available Candidates</h3>
          {candidates.length === 0 ? (
            <div className="card">
              <p>No candidates available yet.</p>
            </div>
          ) : (
            candidates.map(candidate => (
              <div key={candidate.id} className="card candidate-card">
                <h4>{candidate.name}</h4>
                <p><strong>Email:</strong> {candidate.email}</p>
                <p><strong>Skills:</strong> {candidate.skills || 'Not specified'}</p>
                <button 
                  onClick={() => handleSendOffer(candidate.id)}
                  className="btn btn-success"
                >
                  Send Offer
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;
