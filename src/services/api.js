import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for auth tokens
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const diseaseAnalyticsAPI = {
  // Get national risk level distribution
  getNationalRiskLevels: async () => {
    try {
      const response = await api.get('/analytics/national-risk-levels');
      return response.data;
    } catch (error) {
      console.error('Error fetching national risk levels:', error);
      throw error;
    }
  },

  // Get disease distribution
  getDiseaseDistribution: async () => {
    try {
      const response = await api.get('/analytics/disease-distribution');
      return response.data;
    } catch (error) {
      console.error('Error fetching disease distribution:', error);
      throw error;
    }
  },

  // Get mortality by disease
  getMortalityByDisease: async () => {
    try {
      const response = await api.get('/analytics/mortality-by-disease');
      return response.data;
    } catch (error) {
      console.error('Error fetching mortality by disease:', error);
      throw error;
    }
  },

  // Get animal health status
  getAnimalHealthStatus: async () => {
    try {
      const response = await api.get('/analytics/animal-health-status');
      return response.data;
    } catch (error) {
      console.error('Error fetching animal health status:', error);
      throw error;
    }
  },

  // Get vaccination coverage
  getVaccinationCoverage: async () => {
    try {
      const response = await api.get('/analytics/vaccination-coverage');
      return response.data;
    } catch (error) {
      console.error('Error fetching vaccination coverage:', error);
      throw error;
    }
  },

  // Get regional summary
  getRegionalSummary: async (region = null) => {
    try {
      const params = region ? { region } : {};
      const response = await api.get('/analytics/regional-summary', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching regional summary:', error);
      throw error;
    }
  },

  // Get time series data
  getTimeSeriesData: async (period = '30d') => {
    try {
      const response = await api.get(`/analytics/time-series?period=${period}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching time series data:', error);
      throw error;
    }
  }
};

export default api;