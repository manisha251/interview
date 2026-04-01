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
    console.log('Attempting login with:', credentials.email);
    const response = await api.post('/login', credentials);
    console.log('Login successful:', response.data);
    return response.data;
  } catch (error) {
    console.error('Login API Error:', error);
    console.error('Error response:', error.response);
    console.error('Error status:', error.response?.status);
    console.error('Error data:', error.response?.data);
    
    if (error.response) {
      throw error.response.data;
    } else if (error.request) {
      throw { message: 'No response from server. Please check if the backend is running.' };
    } else {
      throw { message: error.message };
    }
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
      // eslint-disable-next-line no-throw-literal
      throw new Error(error.response.data.message || 'API request failed');
    } else if (error.request) {
      // The request was made but no response was received
      // eslint-disable-next-line no-throw-literal
      throw new Error('No response from server. Please check if the backend is running.');
    } else {
      // Something happened in setting up the request that triggered an Error
      // eslint-disable-next-line no-throw-literal
      throw new Error(error.message);
    }
  }
};

export const getAllCandidates = async () => {
  try {
    const response = await api.get('/candidates');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message || 'Failed to fetch candidates');
  }
};

// Company APIs
export const registerCompany = async (companyData) => {
  try {
    const response = await api.post('/register/company', companyData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message || 'Company registration failed');
  }
};

export const getAllCompanies = async () => {
  try {
    const response = await api.get('/companies');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message || 'Failed to fetch companies');
  }
};

// Offer APIs
export const createOffer = async (offerData) => {
  try {
    console.log('Creating offer:', offerData);
    const response = await api.post('/offers', offerData);
    console.log('Offer created:', response.data);
    return response.data;
  } catch (error) {
    console.error('Create offer error:', error);
    throw new Error(error.response?.data?.message || error.message || 'Failed to create offer');
  }
};

export const getAllOffers = async () => {
  try {
    const response = await api.get('/offers');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message || 'Failed to fetch offers');
  }
};

export const getOffersByCandidateId = async (candidateId) => {
  try {
    const response = await api.get(`/offers/candidate/${candidateId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message || 'Failed to fetch candidate offers');
  }
};

export const getOffersByCompanyId = async (companyId) => {
  try {
    const response = await api.get(`/offers/company/${companyId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message || 'Failed to fetch company offers');
  }
};

export default api;
