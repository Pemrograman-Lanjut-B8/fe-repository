"use client"

import { useState, useEffect } from 'react';
import Head from 'next/head';
import Navbar from '@/components/navbar/navbar';

interface Book {
    id: number;
    title: string;
    author: string;
    averageRating: number;
}

const LandingPage: React.FC = () => {
    const [books, setBooks] = useState<Book[] | null>(null); // State untuk menyimpan data buku

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                // Data buku yang digunakan sebagai contoh
                const booksData: Book[] = [
                    {
                        id: 1,
                        title: 'The Great Gatsby',
                        author: 'F. Scott Fitzgerald',
                        averageRating: 4.5,
                    },
                    {
                        id: 2,
                        title: 'To Kill a Mockingbird',
                        author: 'Harper Lee',
                        averageRating: 4.7,
                    },
                    {
                        id: 3,
                        title: '1984',
                        author: 'George Orwell',
                        averageRating: 4.4,
                    },
                    {
                        id: 4,
                        title: 'The Catcher in the Rye',
                        author: 'J.D. Salinger',
                        averageRating: 4.3,
                    },
                    {
                        id: 5,
                        title: 'Pride and Prejudice',
                        author: 'Jane Austen',
                        averageRating: 4.6,
                    }
                ];
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

    // Render konten komponen LandingPage
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
                <button onClick={handleNavigation}>Our Top Rated Books</button> {/* Contoh penggunaan navigasi */}
                {/* Menampilkan daftar buku */}
                <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {books && books.map(book => (
                        <div key={book.id} className="card border border-gray-200 rounded-lg p-4 shadow-lg bg-buku-white-000" style={{ width: '150px', height: '200px' }}>
                            <h2 className="text-xl font-semibold text-buku-blue-500">{book.title}</h2>
                            <p className="text-buku-blue-200">{book.author}</p>
                            <p className="text-red-100">Rating: {book.averageRating}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
