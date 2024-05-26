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
                const response = await fetch('http://localhost:8090/api/book/recommendation');
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

    // Render the LandingPage component content
    return (
        <div className="container mx-auto p-4 bg-buku-blue-000 min-h-screen">
            <Navbar />
            <div className="mt-20">
                <h1>Welcome to My Website</h1>
                <div className="mt-1">
                    <Head>
                        <title>BUKU.ID💡</title>
                    </Head>
                </div>
                <h1 className="text-4xl font-bold text-center mb-8 lato-regular text-buku-yellow-100" style={{ textShadow: '1px 1px 2px #333', outline: '1px solid transparent' }}>BUKU.ID💡</h1>
                <p className="description">
                    BUKU.ID adalah platform daring yang dirancang untuk memudahkan Anda dalam mencari, membeli, dan menjelajahi buku-buku favorit Anda. Dengan antarmuka yang ramah pengguna dan fitur pencarian yang canggih, kami berkomitmen untuk memberikan pengalaman terbaik dalam menemukan buku yang Anda sukai.
                </p>
                <button onClick={handleNavigation}>Our Top Rated Books</button> {/* Example usage of navigation */}
                {/* Display the list of books */}
                <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {books && books.map(book => (
                        <div key={book.isbn} className="card border border-gray-200 rounded-lg p-4 shadow-lg bg-buku-white-000" style={{ width: '150px', height: '200px' }}>
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
