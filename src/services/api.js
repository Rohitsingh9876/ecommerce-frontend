import axios from 'axios';

const API_URL = 'http://localhost:3000/api/users';

export const registerUser = async (userData) => {
    return await axios.post(`${API_URL}/register`, userData);
};

export const fetchUsers = async () => {
    return await axios.get(API_URL);
};
