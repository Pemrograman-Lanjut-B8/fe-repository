// app/createBook.tsx
'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { addBook } from '../../../actions/adminApi';
import { Book } from '../../../actions/types';

const CreateBook = () => {
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

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setBookData({
            ...bookData,
            [name]: value
        });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response = await addBook(bookData);
            alert('Book added successfully!');
            console.log(response);
        } catch (error) {
            alert('Failed to add book.');
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Add New Book</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="isbn" placeholder="ISBN" value={bookData.isbn} onChange={handleChange} required />
                <input type="text" name="judulBuku" placeholder="Title" value={bookData.judulBuku} onChange={handleChange} required />
                <input type="text" name="penulis" placeholder="Author" value={bookData.penulis} onChange={handleChange} required />
                <input type="text" name="penerbit" placeholder="Publisher" value={bookData.penerbit} onChange={handleChange} required />
                <textarea name="deskripsi" placeholder="Description" value={bookData.deskripsi} onChange={handleChange} required></textarea>
                <input type="number" name="harga" placeholder="Price" value={bookData.harga} onChange={handleChange} required />
                <input type="number" name="stok" placeholder="Stock" value={bookData.stok} onChange={handleChange} required />
                <input type="date" name="tanggalTerbit" placeholder="Publication Date" value={bookData.tanggalTerbit} onChange={handleChange} required />
                <input type="number" name="jumlahHalaman" placeholder="Page Count" value={bookData.jumlahHalaman} onChange={handleChange} required />
                <input type="text" name="fotoCover" placeholder="Cover Photo URL" value={bookData.fotoCover} onChange={handleChange} required />
                <input type="text" name="kategori" placeholder="Category" value={bookData.kategori} onChange={handleChange} required />
                <input type="number" name="rating" placeholder="Rating" value={bookData.rating} onChange={handleChange} required />
                <button type="submit">Add Book</button>
            </form>
        </div>
    );
};

export default CreateBook;
