import axios from 'axios';
import { Book, PaginatedBooks } from '../../types/book';
import authHeader from './auth-header';

const API_URL = 'http://34.124.134.197/api/book';
// const API_URL = 'http://localhost:8081/api/book';

export const searchBooks = async (judulBuku: string, penulis: string, sortBy: string, sortDirection: string, pageIndex: number): Promise<PaginatedBooks> => {
    const response = await axios.get(`${API_URL}/search`, {
        params: { judulBuku, penulis, sortBy, sortDirection, pageIndex },
        headers: authHeader()
    });
    console.log('API Response:', response.data);
    return response.data;
}

export const getBookByIsbn = async (isbn: string): Promise<Book> => {
    const response = await axios.get<Book>(`${API_URL}/${isbn}`);
    return response.data;
};