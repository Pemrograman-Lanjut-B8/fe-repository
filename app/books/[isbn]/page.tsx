// app/books/[isbn]/page.tsx
'use client';

import { getBookByIsbn } from '@/app/services/book.service';
import Navbar from '@/components/navbar/navbar';
import { Book } from '@/types/book';
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react';
import AuthService from '@/app/services/auth.service';
import { deleteBook } from '@/actions/adminApi';

export default function BookDetailsPage() {
    const params = useParams()
    const isbn = params.isbn;
    const [book, setBook] = useState<Book | null>(null);
    const [userRole, setUserRole] = useState<string | null>(null);
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (isbn && typeof isbn === 'string') {
            getBookDetails(isbn);
            getUserRole();
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

    const getUserRole = () => {
        try {
            const currentUser = AuthService.getCurrentUser();
            if (currentUser && currentUser.roles && currentUser.roles.includes('ROLE_ADMIN') ) {
                setUserRole('admin');
            } else if (currentUser && currentUser.roles && currentUser.roles.includes('ROLE_USER')) {
                setUserRole('user');
            }
        } catch (error) {
            console.error('Error fetching user role:', error);
        }
    };

    const renderButtons = () => {
        if (userRole === 'admin') {
            return (
                <div className='mt-2'>
                    <button onClick={handleUpdate} className="update-button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">Update</button>
                    <button onClick={handleDelete} className="delete-button bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button>
                </div>
            );
        } else if (userRole === 'user') {
            return (
                <div className='mt-2'>
                    <button onClick={handleReview} className="review-button bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2">Review</button>
                    <button onClick={handleAddToCart} className="add-to-cart-button bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Add to Cart</button>
                </div>
            );
        }
        return null;
    };

    const handleUpdate = () => {
        router.push(`/admin/update/${isbn}`);
    };

    const handleDelete = async () => {
        try {
            await deleteBook(isbn as string);
            alert('Book deleted successfully!');
            router.push('/admin/dashboard');
        } catch (error) {
            alert('Failed to delete book.');
            console.error(error);
        }
    };

    const handleReview = () => {
        // Logic for handling review
        router.push(`/review/create`);
    };

    const handleAddToCart = () => {
        // Logic for handling add to cart
    };

    return (
        <div className="container mx-auto p-4 bg-buku-blue-000 min-h-screen">
            <Navbar />
            {book ? (
                <div>
                    <h1 className="text-4xl font-bold text-center mt-20 mb-2 lato-regular text-buku-yellow-100" style={{ textShadow: '1px 1px 2px #333', outline: '1px solid transparent' }}>{book.judulBuku}</h1>
                    <img src={book.fotoCover} alt={book.judulBuku} className="w-1/3 mx-auto" />
                    <div className="text-center mt-2">
                        <p>Penulis: {book.penulis}</p>
                        <p>Penerbit: {book.penerbit}</p>
                        <p>Deskripsi: {book.deskripsi}</p>
                        <p>Harga: {book.harga}</p>
                        <p>Stok: {book.stok}</p>
                        <p>Tanggal Terbit: {book.tanggalTerbit}</p>
                        <p>ISBN: {book.isbn}</p>
                        <p>Jumlah Halaman: {book.jumlahHalaman}</p>
                        <p>Kategori: {book.kategori}</p>
                        <p>Rating: {book.rating}</p>
                    </div>
                    {renderButtons()}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}