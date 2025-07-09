const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:5000';

// Helper function to check backend status
export const checkBackendHealth = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`Backend health check failed: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Backend status:', data);
    
    // Check if models are loaded for predictions
    if (data.health && !data.health.models_loaded) {
      console.warn('⚠️ Backend is running but models are not loaded. Predictions will not work.');
    }
    
    return data;
  } catch (error) {
    console.error('Backend health check error:', error);
    throw error;
  }
};

// Helper function for API requests with better error handling
export const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultOptions = {
    headers: {
      'Accept': 'application/json',
    },
  };
  
  const finalOptions = { ...defaultOptions, ...options };
  
  try {
    console.log(`Making API request to: ${url}`);
    
    const response = await fetch(url, finalOptions);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API Error Response: ${errorText}`);
      throw new Error(`API request failed: ${response.status} - ${errorText}`);
    }
    
    return response;
  } catch (error) {
    console.error(`API request error for ${url}:`, error);
    
    // Check if it's a network error
    if (error.message.includes('ERR_NETWORK') || 
        error.message.includes('fetch') || 
        error.message.includes('CORS') ||
        error.name === 'TypeError') {
      throw new Error('Network connection error. Please check your internet connection and try again.');
    }
    
    // Check if it's a server error
    if (error.message.includes('503') || error.message.includes('502')) {
      throw new Error('Server is temporarily unavailable. Please try again later.');
    }
    
    throw error;
  }
};

export { API_BASE_URL };
