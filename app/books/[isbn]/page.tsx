// app/books/[isbn]/page.tsx
'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getBookByIsbn } from '../../services/book.service';
import { Book } from '../../../types/book';

const BookDetailPage = () => {
    const searchParams = useSearchParams();
    const isbn = searchParams.get('isbn');
    const [book, setBook] = useState<Book | null>(null);

    useEffect(() => {
        if (isbn) {
            getBookByIsbn(isbn).then(setBook);
        }
    }, [isbn]);

    if (!book) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{book.judulBuku}</h1>
            <p>{book.deskripsi}</p>
            <p>Penulis: {book.penulis}</p>
            <p>Penerbit: {book.penerbit}</p>
            <p>Harga: {book.harga}</p>
            <p>Stok: {book.stok}</p>
            <p>Tanggal Terbit: {book.tanggalTerbit}</p>
            <p>Jumlah Halaman: {book.jumlahHalaman}</p>
            <p>Kategori: {book.kategori}</p>
            <p>Rating: {book.rating}</p>
        </div>
    );
};

export default BookDetailPage;
