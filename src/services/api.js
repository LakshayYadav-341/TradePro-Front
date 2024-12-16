import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const loginUser = async (credentials) => {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    return response.data;
};

export const registerUser = async (data) => {
    const response = await axios.post(`${API_URL}/auth/register`, data);
    return response.data;
};

export const fetchUserProfile = async () => {
    const token = localStorage.getItem('authToken');
    const response = await axios.get(`${API_URL}/auth/profile`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const buyStock = async (data) => {
    const token = localStorage.getItem('authToken');
    const response = await axios.post(`${API_URL}/trading/buy`, data, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const sellStock = async (data) => {
    const token = localStorage.getItem('authToken');
    const response = await axios.post(`${API_URL}/trading/sell`, data, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const fetchStockHistory = async (symbol) => {
    const response = await axios.get(`${API_URL}/analytics/history/${symbol}`);
    return response.data;
};

// Fetch market overview data
export const getMarketOverview = async () => {
    const response = await axios.get(`${API_URL}/market/overview`);
    return response.data;
};

export const getMarketTopData = async (discoveryFilter) => {
    const response = await axios.get(`${API_URL}/market/getMarketTopData?discoveryFilter=${discoveryFilter}`);
    return response.data;
};

// Search for stocks
export const searchStock = async (query) => {
    const response = await axios.get(`${API_URL}/stocks/search`, { params: { query } });
    return response.data;
};

// Fetch user watchlist
export const getWatchlistData = async () => {
    const token = localStorage.getItem("authToken");
    const response = await axios.get(`${API_URL}/watchlist`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

// Fetch market news
export const getMarketNews = async () => {
    const response = await axios.get(`${API_URL}/market/news`);
    return response.data;
};
