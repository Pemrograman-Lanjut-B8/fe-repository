'use client';

import React, { useEffect, useState } from 'react';
import { getAllBooks } from '../../../actions/bookApi';
import { Book } from '../../../actions/types';

const AllBooks = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await getAllBooks();
                setBooks(response.data);
                setLoading(false);
            } catch (error) {
                setError('Failed to fetch books.');
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>All Books</h1>
            <ul>
                {books.map(book => (
                    <li key={book.isbn}>
                        <strong>{book.judulBuku}</strong> by {book.penulis}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AllBooks;