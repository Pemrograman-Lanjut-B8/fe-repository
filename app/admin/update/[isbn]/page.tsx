// app/UpdateBook.tsx
'use client';

import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { addBook, updateBook } from '@/actions/adminApi';
import { Book } from '@/types/book';
import Navbar from '@/components/navbar/navbar';
import { useParams, useRouter } from 'next/navigation';
import AuthService from '@/app/services/auth.service';
import { getBookByIsbn } from '@/app/services/book.service';

const UpdateBook = () => {
    const [bookData, setBookData] = useState<Book>({
        isbn: '',
        judulBuku: '',
        penulis: '',
        penerbit: '',
        deskripsi: '',
        harga: 0,
        stok: 0,
        tanggalTerbit: '',
        jumlahHalaman: 0,
        fotoCover: '',
        kategori: '',
        rating: 0
    });
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const [book, setBook] = useState<Book | null>(null);
    const params = useParams()
    const isbn = params.isbn as string;

    useEffect(() => {
        if (isbn && typeof isbn === 'string') {
            getBookDetails(isbn);
            checkUserRole();
        }
    }, []);

    const getBookDetails = async (isbn: string) => {
        try {
            const bookData = await getBookByIsbn(isbn);
            setBook(bookData);
            setBookData(bookData); // Set bookData ke data buku yang diperoleh
        } catch (error) {
            console.error('Error fetching book details:', error);
        }
    };

    const checkUserRole = () => {
        try {
            const currentUser = AuthService.getCurrentUser();
            if (!currentUser || !currentUser.roles || !currentUser.roles.includes('ROLE_ADMIN')) {
                router.push('/');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const numericFields = ["harga", "rating"];
        const integerFields = ["stok", "jumlahHalaman"];
    
        let parsedValue;
        if (numericFields.includes(name)) {
            parsedValue = parseFloat(value);
        } else if (integerFields.includes(name)) {
            parsedValue = parseInt(value);
        } else {
            parsedValue = value;
        }
    
        setBookData({
            ...bookData,
            [name]: parsedValue
        });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            await updateBook(isbn, bookData); // Menggunakan updateBook untuk memperbarui buku
            alert('Book updated successfully!');
            router.push('/admin/dashboard'); 
        } catch (error) {
            alert('Failed to update book.');
            setError('Failed to update book.');
            console.error(error);
        }
    };

    return (
        <div className="container mx-auto p-4 bg-buku-blue-000 min-h-screen">
            <Navbar />
            <h1 className="text-4xl font-bold text-center mt-20 mb-8 lato-regular text-buku-yellow-100" style={{ textShadow: '1px 1px 2px #333', outline: '1px solid transparent' }}>Add New Book</h1>
            {error && <div className="text-red-500 mb-4">{error}</div>} {/* Menampilkan pesan error jika terjadi kesalahan */}
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="isbn">ISBN</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="isbn" placeholder="ISBN" value={bookData.isbn} onChange={handleChange} required />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="judulBuku">Title</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="judulBuku" placeholder="Title" value={bookData.judulBuku} onChange={handleChange} required />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="penulis">Author</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="penulis" placeholder="Author" value={bookData.penulis} onChange={handleChange} required />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="penerbit">Publisher</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="penerbit" placeholder="Publisher" value={bookData.penerbit} onChange={handleChange} required />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="deskripsi">Description</label>
                    <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="deskripsi" placeholder="Description" value={bookData.deskripsi} onChange={handleChange} required></textarea>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="harga">Price</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" name="harga" placeholder="Price" value={bookData.harga} onChange={handleChange} required step="0.01"/>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="stok">Stock</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" name="stok" placeholder="Stock" value={bookData.stok} onChange={handleChange} required step="1" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tanggalTerbit">Publication Date</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="date" name="tanggalTerbit" placeholder="Publication Date" value={bookData.tanggalTerbit} onChange={handleChange} required />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="jumlahHalaman">Page Count</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" name="jumlahHalaman" placeholder="Page Count" value={bookData.jumlahHalaman} onChange={handleChange} required step="1" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fotoCover">Cover Photo URL</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="fotoCover" placeholder="Cover Photo URL" value={bookData.fotoCover} onChange={handleChange} required />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="kategori">Category</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="kategori" placeholder="Category" value={bookData.kategori} onChange={handleChange} required />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rating">Rating</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" name="rating" placeholder="Rating" value={bookData.rating} onChange={handleChange} required step="0.1"/>
                </div>
                <div className="flex items-center justify-between">
                    <button className="bg-buku-blue-500 hover:bg-buku-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Update Book
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateBook;
