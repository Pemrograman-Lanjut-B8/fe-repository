import axios from 'axios';
import { Book } from '@/types/book';
import AuthService from '@/app/services/auth.service';

const BASE_URL = 'http://34.101.227.179/api/book';

export const getAllBooks = async () => {
    try {
        const currentUser = AuthService.getCurrentUser();
        const token = currentUser ? currentUser.token : null;

        if (!token) {
            throw new Error('No authentication token found. Please log in.');
        }

        const response = await axios.get(`${BASE_URL}/all`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        
        return response.data.data;
    } catch (error) {
        console.error('Failed to fetch books:', error);
        throw error;
    }
};

export const getBookByIsbn = async (isbn: string) => {
    try {
        const currentUser = AuthService.getCurrentUser();
        const token = currentUser ? currentUser.token : null;

        if (!token) {
            throw new Error('No authentication token found. Please log in.');
        }

        const response = await axios.get(`${BASE_URL}/${isbn}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        console.log('Book:', response.data);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch book:', error);
        throw error;
    }
};