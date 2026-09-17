const BASE_URL = '/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('asia_explora_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
};

export const api = {
  // Countries
  getCountries: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${BASE_URL}/countries${query ? `?${query}` : ''}`);
    return res.json();
  },
  getCountry: async (identifier) => {
    const res = await fetch(`${BASE_URL}/countries/${identifier}`);
    return res.json();
  },

  // Destinations
  getDestinations: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${BASE_URL}/destinations${query ? `?${query}` : ''}`);
    return res.json();
  },
  getDestination: async (id) => {
    const res = await fetch(`${BASE_URL}/destinations/${id}`);
    return res.json();
  },

  // Regions
  getRegions: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${BASE_URL}/regions${query ? `?${query}` : ''}`);
    return res.json();
  },
  getRegion: async (id) => {
    const res = await fetch(`${BASE_URL}/regions/${id}`);
    return res.json();
  },

  // Heritage
  getHeritage: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${BASE_URL}/heritage${query ? `?${query}` : ''}`);
    return res.json();
  },
  getHeritageItem: async (id) => {
    const res = await fetch(`${BASE_URL}/heritage/${id}`);
    return res.json();
  },

  // Virtual Tours
  getVirtualTours: async () => {
    const res = await fetch(`${BASE_URL}/virtual-tours`);
    return res.json();
  },
  getVirtualTour: async (id) => {
    const res = await fetch(`${BASE_URL}/virtual-tours/${id}`);
    return res.json();
  },

  // AI & Planner
  askLunaAI: async (message, context = {}) => {
    const res = await fetch(`${BASE_URL}/ai/chat`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ message, context })
    });
    return res.json();
  },
  planTripWithAI: async (preferences) => {
    const res = await fetch(`${BASE_URL}/ai/plan-trip`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(preferences)
    });
    return res.json();
  },
  replanTripForWeather: async (tripPlan, weatherAlert = {}) => {
    const res = await fetch(`${BASE_URL}/ai/replan-trip`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ tripPlan, weatherAlert })
    });
    return res.json();
  },

  // Trips
  getUserTrips: async () => {
    const res = await fetch(`${BASE_URL}/trips`, {
      headers: getAuthHeaders()
    });
    return res.json();
  },
  saveTrip: async (tripData) => {
    const res = await fetch(`${BASE_URL}/trips`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(tripData)
    });
    return res.json();
  },
  deleteTrip: async (id) => {
    const res = await fetch(`${BASE_URL}/trips/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return res.json();
  },

  // Auth & Passport
  login: async (email, password) => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return res.json();
  },
  register: async (name, email, password) => {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });
    return res.json();
  },
  getCurrentUser: async () => {
    const res = await fetch(`${BASE_URL}/auth/me`, {
      headers: getAuthHeaders()
    });
    return res.json();
  },
  stampPassport: async (countryCode) => {
    const res = await fetch(`${BASE_URL}/auth/stamp-passport`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ countryCode })
    });
    return res.json();
  },

  // Admin
  getAdminStats: async () => {
    const res = await fetch(`${BASE_URL}/admin/stats`, {
      headers: getAuthHeaders()
    });
    return res.json();
  }
};
