"use client"

import { useState, useEffect } from 'react';
import Head from 'next/head';
import Navbar from '@/components/navbar/navbar';

interface Book {
    judul_buku: string;
    foto_cover: string;
    penulis: string;
    isbn: string;
    averageRating: number;
}

const LandingPage: React.FC = () => {
    const [books, setBooks] = useState<Book[] | null>(null); // State to store book data

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await fetch('http://34.124.134.197/api/book/recommendation');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const booksData: Book[] = await response.json();
                setBooks(booksData);
            } catch (error) {
                console.error("Failed to fetch books:", error);
            }
        };

        fetchBooks();
    }, []);

    const handleNavigation = () => {
        console.log("Navigating to other page...");
    };

    return (
        <div className="container mx-auto p-4 bg-buku-blue-000 min-h-screen">
            <Navbar />
            <div className="mt-20">
                <Head>
                    <title>BUKU.ID💡</title>
                </Head>
                <div className="flex justify-center items-center">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold mb-4 text-buku-yellow-100" style={{ textShadow: '1px 1px 2px #333' }}>
                            BUKU.ID💡
                        </h1>
                        <p className="text-buku-blue-300">
                            BUKU.ID adalah platform daring yang dirancang untuk memudahkan Anda dalam mencari, membeli, dan menjelajahi buku-buku favorit Anda. Dengan antarmuka yang ramah pengguna dan fitur pencarian yang canggih, kami berkomitmen untuk memberikan pengalaman terbaik dalam menemukan buku yang Anda sukai.
                        </p>
                        <button onClick={handleNavigation} className="bg-buku-yellow-100 text-buku-blue-500 px-4 py-2 mt-8 rounded hover:bg-buku-yellow-200">
                            Our Top Rated Books
                        </button>
                    </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-8">
                    {books && books.map(book => (
                        <div key={book.isbn} className="card border border-gray-200 rounded-lg p-4 shadow-lg bg-buku-white-000">
                            <img src={book.foto_cover} alt={book.judul_buku} className="w-full h-48 object-cover" />
                            <h2 className="text-xl font-semibold text-buku-blue-500">{book.judul_buku}</h2>
                            <p className="text-buku-blue-200">{book.penulis}</p>
                            <p className="text-red-100">Rating: {book.averageRating}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
