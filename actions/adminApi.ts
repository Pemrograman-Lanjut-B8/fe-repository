import axios from 'axios';
import { Book } from './types';

const BASE_URL = 'http://34.101.227.179/api/admin';

export const addBook = async (book: Book) => {
    try {
        const response = await axios.post(`${BASE_URL}/book`, book, {
            headers: {
                'Content-Type': 'application/json',
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
        const response = await axios.put(`${BASE_URL}/book/${isbn}`, book, {
            headers: {
                'Content-Type': 'application/json',
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
        const response = await axios.delete(`${BASE_URL}/book/${isbn}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Failed to delete book:', error);
        throw error;
    }
};