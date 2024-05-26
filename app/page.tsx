"use client";

import { useState } from 'react';
import Search from '../components/book-search/Search';
import { PaginatedBooks } from '../types/book';

const Home: React.FC = () => {
    const [paginatedBooks, setPaginatedBooks] = useState<PaginatedBooks | null>(null);

    const handleSearchResults = (results: PaginatedBooks) => {
        console.log('Paginated Books:', results);
        setPaginatedBooks(results);
    };

    return (
        <div style={styles.pageContainer}>
            <h1 style={styles.header}>Book Search</h1>
            <Search onResults={handleSearchResults} />
            <div style={styles.resultsContainer}>
                {paginatedBooks ? (
                    paginatedBooks.content.length > 0 ? (
                        paginatedBooks.content.map(book => (
                            <div key={book.isbn} style={styles.card}>
                                <img src={book.fotoCover} alt={book.judulBuku} style={styles.cover} />
                                <h2 style={styles.title}>{book.judulBuku}</h2>
                                <p style={styles.text}>Penulis: {book.penulis}</p>
                                <p style={styles.text}>Penerbit: {book.penerbit}</p>
                                <p style={styles.text}>Deskripsi: {book.deskripsi}</p>
                                <p style={styles.text}>Harga: ${book.harga}</p>
                                <p style={styles.text}>Stok: {book.stok}</p>
                                <p style={styles.text}>Tanggal Terbit: {book.tanggalTerbit}</p>
                                <p style={styles.text}>ISBN: {book.isbn}</p>
                                <p style={styles.text}>Jumlah Halaman: {book.jumlahHalaman}</p>
                                <p style={styles.text}>Kategori: {book.kategori}</p>
                                <p style={styles.text}>Rating: {book.rating}</p>
                            </div>
                        ))
                    ) : (
                        <p style={styles.text}>No books found</p>
                    )
                ) : (
                    <p style={styles.text}>Search for books</p>
                )}
            </div>
        </div>
    );
};

const styles = {
    pageContainer: {
        display: 'flex',
        flexDirection: 'column' as 'column',
        alignItems: 'center',
        backgroundColor: '#DCF2F1',
        minHeight: '100vh',
        padding: '20px',
    },
    header: {
        color: '#365486',
        fontSize: '2em',
        marginBottom: '20px',
    },
    resultsContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        width: '100%',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column' as 'column',
        alignItems: 'center',
    },
    cover: {
        width: '100px',
        height: '150px',
        objectFit: 'cover' as 'cover',
        borderRadius: '4px',
        marginBottom: '10px',
    },
    title: {
        color: '#0F1035',
        marginBottom: '10px',
    },
    text: {
        color: '#0F1035',
    },
};

export default Home;
