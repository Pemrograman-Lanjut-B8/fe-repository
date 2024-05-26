import React from 'react';
import Link from 'next/link';
import { Book } from '@/types/book';

interface BookCardProps {
    book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
    return (
        <Link href={`/books/${book.isbn}`}> {/* Tautan ke halaman detail buku */}
            <a>
                <div className="max-w-xs w-full rounded overflow-hidden shadow-lg m-4 bg-white" style={{ height: '350px' }}>
                    <img 
                        className="w-full h-48 object-cover" 
                        src={book.fotoCover} 
                        alt={book.judulBuku} 
                    />
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2 truncate" title={book.judulBuku}>
                            {book.judulBuku}
                        </div>
                        <p className="text-gray-700 text-base truncate" title={book.penulis}>
                            Author: {book.penulis}
                        </p>
                        <p className="text-gray-700 text-base truncate" title={book.kategori}>
                            Category: {book.kategori}
                        </p>
                    </div>
                </div>
            </a>
        </Link>
    );
};

export default BookCard;
