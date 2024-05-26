// app/books/[isbn]/page.tsx
'use client';

import { getBookByIsbn } from '@/app/services/book.service';
import { Book } from '@/types/book';
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react';
 
export default function BookDetailsPage() {
    const params = useParams()
    const isbn = params.isbn;
    const [book, setBook] = useState<Book | null>(null);

    useEffect(() => {
        if (isbn && typeof isbn === 'string') {
            getBookDetails(isbn);
        }
    }, [isbn]);

    const getBookDetails = async (isbn: string) => {
        try {
            const bookData = await getBookByIsbn(isbn);
            setBook(bookData);
        } catch (error) {
            console.error('Error fetching book details:', error);
        }
    };

    return (
        <div>
            {book ? (
                <div>
                    <h1>{book.judulBuku}</h1>
                    <p>Author: {book.penulis}</p>
                    <p>ISBN: {book.isbn}</p>
                    {/* Add more details as needed */}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}