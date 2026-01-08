// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
    appointments: `${API_BASE_URL}/api/appointments`,
    testimonials: `${API_BASE_URL}/api/testimonials`,
};
