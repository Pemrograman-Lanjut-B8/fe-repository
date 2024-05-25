import axios from 'axios';
import { Book, PaginatedBooks } from '../../types/book';

const API_URL = 'http://localhost:8080/api/book';

export const searchBooks = async (judulBuku: string, penulis: string, sortBy: string, sortDirection: string, pageIndex: number): Promise<PaginatedBooks> => {
    const response = await axios.get(`${API_URL}/search`, {
        params: { judulBuku, penulis, sortBy, sortDirection, pageIndex }
    });
    console.log('API Response:', response.data);
    return response.data;
}
