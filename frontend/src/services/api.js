import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

console.log('API Base URL:', API_BASE_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth APIs
export const login = async (credentials) => {
  try {
    const response = await api.post('/login', credentials);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// Candidate APIs
export const registerCandidate = async (candidateData) => {
  try {
    console.log('Sending registration data:', candidateData);
    const response = await api.post('/register/candidate', candidateData);
    console.log('Registration response:', response.data);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    console.error('Error response:', error.response);
    console.error('Error status:', error.response?.status);
    console.error('Error data:', error.response?.data);
    
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      throw error.response.data;
    } else if (error.request) {
      // The request was made but no response was received
      throw { message: 'No response from server. Please check if the backend is running.' };
    } else {
      // Something happened in setting up the request that triggered an Error
      throw { message: error.message };
    }
  }
};

export const getAllCandidates = async () => {
  try {
    const response = await api.get('/candidates');
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// Company APIs
export const registerCompany = async (companyData) => {
  try {
    const response = await api.post('/register/company', companyData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const getAllCompanies = async () => {
  try {
    const response = await api.get('/companies');
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export default api;
