'use client';

import React, { useEffect, useState } from 'react';
import { getAllBooks } from '@/actions/bookApi';
import { Book } from '@/types/book';
import BookCard from '@/components/book-card/book_card';
import Navbar from '@/components/navbar/navbar';
import { useRouter } from 'next/navigation';
import AuthService from '@/app/services/auth.service';
import { getAllUsers } from '@/actions/adminApi';
import { User } from '@/types/user';

const Dashboard = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter(); 

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await getAllBooks();
                setBooks(response);
                setLoading(false);
            } catch (error) {
                setError('Failed to fetch books.');
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await getAllUsers();
                setUsers(response);
                setLoading(false);
            } catch (error) {
                setError('Failed to fetch users.');
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        const checkUserRole = async () => {
            try {
                const currentUser = AuthService.getCurrentUser();
                if (!currentUser || !currentUser.roles || !currentUser.roles.includes('ROLE_ADMIN')) {
                    router.push('/');
                }
            } catch (error) {
                console.error(error);
            }
        };

        checkUserRole();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const handleAddBookClick = () => {
        router.push('/admin/create');
    };

    return (
        <div className="container mx-auto p-4 bg-buku-blue-000 min-h-screen">
            <Navbar />
            <h1 className="text-4xl font-bold text-center mt-20 mb-8 lato-regular text-buku-yellow-100" style={{ textShadow: '1px 1px 2px #333', outline: '1px solid transparent' }}>All Books</h1>
            <button
                onClick={handleAddBookClick}
                className="bg-green-600 text-white font-bold py-2 px-4 rounded"
            >
                Add Book
            </button>
            <div className="books-container grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-8 max-h-96 overflow-y-auto">
                {books.map(book => (
                    <BookCard key={book.isbn} book={book} />
                ))}
            </div>
            <h2 className="text-3xl font-bold text-center mt-8 mb-4 lato-regular text-buku-yellow-100" style={{ textShadow: '1px 1px 2px #333', outline: '1px solid transparent' }}>All Users</h2>
            <div className="users-container max-h-96 overflow-y-auto">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="w-1/2 px-4 py-2">Username</th>
                            <th className="w-1/2 px-4 py-2">Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.email}>
                                <td className="border px-4 py-2">{user.username}</td>
                                <td className="border px-4 py-2">{user.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;