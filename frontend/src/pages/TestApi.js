import React, { useState } from 'react';
import { registerCandidate } from '../services/api';

const TestApi = () => {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const testApi = async () => {
    setLoading(true);
    setResult('');
    
    try {
      const testData = {
        name: 'Test User',
        email: `test${Date.now()}@example.com`,
        password: 'password123',
        skills: 'JavaScript, React'
      };
      
      console.log('Testing API with data:', testData);
      const response = await registerCandidate(testData);
      console.log('API Response:', response);
      setResult('SUCCESS: API working! Response: ' + JSON.stringify(response, null, 2));
    } catch (error) {
      console.error('API Error:', error);
      setResult('ERROR: ' + JSON.stringify(error, null, 2));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>API Test Page</h2>
      <button onClick={testApi} disabled={loading} className="btn btn-primary">
        {loading ? 'Testing...' : 'Test Registration API'}
      </button>
      
      {result && (
        <div style={{ marginTop: '20px' }}>
          <h3>Result:</h3>
          <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '4px' }}>
            {result}
          </pre>
        </div>
      )}
    </div>
  );
};

export default TestApi;
