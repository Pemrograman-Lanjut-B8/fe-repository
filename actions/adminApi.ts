import axios from 'axios';
import { Book } from '@/types/book';
import AuthService from '@/app/services/auth.service';

const BASE_URL = 'http://localhost:8080/api/admin';

export const addBook = async (book: Book) => {
    try {
        const currentUser = AuthService.getCurrentUser();
        const token = currentUser ? currentUser.token : null;

        if (!token) {
            throw new Error('No authentication token found. Please log in.');
        }

        const response = await axios.post(`${BASE_URL}/book`, book, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Failed to add book:', error);
        throw error;
    }
}

export const updateBook = async (isbn: string, book: Book) => {
    try {
        const currentUser = AuthService.getCurrentUser();
        const token = currentUser ? currentUser.token : null;

        if (!token) {
            throw new Error('No authentication token found. Please log in.');
        }

        const response = await axios.put(`${BASE_URL}/book/${isbn}`, book, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Failed to update book:', error);
        throw error;
    }
};

export const deleteBook = async (isbn: string) => {
    try {
        const currentUser = AuthService.getCurrentUser();
        const token = currentUser ? currentUser.token : null;

        if (!token) {
            throw new Error('No authentication token found. Please log in.');
        }

        const response = await axios.delete(`${BASE_URL}/book/${isbn}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Failed to delete book:', error);
        throw error;
    }
};