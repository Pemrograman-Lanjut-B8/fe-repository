import axios from 'axios';
import { Book } from './types';

const BASE_URL = 'http://34.101.227.179/api/book';

export const getAllBooks = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/all`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Failed to fetch books:', error);
        throw error;
    }
};