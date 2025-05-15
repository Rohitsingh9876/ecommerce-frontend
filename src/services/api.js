import axios from 'axios';

const API_URL = 'http://localhost:3000/api/users';

export const registerUser = async (userData) => {
    try {
        return await axios.post(`${API_URL}/register`, userData);
    } catch (error) {
        if (error.response) {
            throw error.response.data; // Throw the error message from the backend
        } else {
            throw new Error("Something went wrong. Please try again.");
        }
    }
};


export const fetchUsers = async () => {
    return await axios.get(API_URL);
};
