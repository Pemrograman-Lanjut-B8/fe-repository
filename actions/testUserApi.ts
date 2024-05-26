import axios from "axios";
import AuthService from '@/app/services/auth.service';

const BASE_URL = 'http://34.124.134.197/api/test';

export const testUserApi = async () => {
    try {
        const currentUser = AuthService.getCurrentUser();
        const token = currentUser ? currentUser.token : null;

        if (!token) {
            throw new Error('No authentication token found. Please log in.');
        }

        const response = await axios.get(`${BASE_URL}/user`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw error;
    }
};

export const testAdminApi = async () => {
    try {
        const currentUser = AuthService.getCurrentUser();
        const token = currentUser ? currentUser.token : null;

        if (!token) {
            throw new Error('No authentication token found. Please log in.');
        }

        const response = await axios.get(`${BASE_URL}/admin`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Failed to fetch admin:', error);
        throw error;
    }
};