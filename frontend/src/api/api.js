import axios from 'axios';

const API = axios.create({
    baseURL: 'https://mood-mate-lx9i.onrender.com/api',
});

API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export const signup = (formData) => API.post('/auth/signup', formData);
export const login = (formData) => API.post('/auth/login', formData);
export const createEntry = (data) => API.post('/entries', data);
export const getEntries = () => API.get('/entries');