"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Search from '../../components/Search';
import { PaginatedBooks, Book } from '../../types/book';
import { searchBooks } from '../services/book.service';

const Home: React.FC = () => {
    const [paginatedBooks, setPaginatedBooks] = useState<PaginatedBooks | null>(null);
    const [pageIndex, setPageIndex] = useState<number>(0); // 0-based index
    const router = useRouter();
    
    const handleSearchResults = (results: PaginatedBooks) => {
        console.log('Paginated Books:', results);
        setPaginatedBooks(results);
        setPageIndex(results.pageable.pageNumber);
    };

    const handleBookClick = (isbn: string) => {
        router.push(`/books/${isbn}`);
    };

    const handleNextPage = async () => {
        if (paginatedBooks && !paginatedBooks.last) {

        }
    };

    const handlePreviousPage = async () => {
        if (paginatedBooks && !paginatedBooks.first) {

        }
    };

    return (
        <div style={styles.pageContainer}>
            <h1 style={styles.header}>Book Search</h1>
            <Search onResults={handleSearchResults}/>
            <div style={styles.resultsContainer}>
                {paginatedBooks ? (
                    paginatedBooks.content.length > 0 ? (
                        paginatedBooks.content.map((book: Book) => (
                            <div
                                key={book.isbn}
                                style={styles.card}
                                onClick={() => handleBookClick(book.isbn)}
                            >
                                <img src={book.fotoCover} alt={book.judulBuku} style={styles.cover} />
                                <h2 style={styles.title}>{book.judulBuku}</h2>
                            </div>
                        ))
                    ) : (
                        <p style={styles.text}>No books found</p>
                    )
                ) : (
                    <p style={styles.text}>Search for books</p>
                )}
            </div>
            {paginatedBooks && (
                <div style={styles.pagination}>
                    {/* <button onClick={handlePreviousPage} disabled={pageIndex <= 0} style={styles.button}>
                        Previous
                    </button> */}
                    <span style={styles.pageInfo}>Page {pageIndex + 1} of {paginatedBooks.totalPages}</span>
                    {/* <button onClick={handleNextPage} disabled={pageIndex >= paginatedBooks.totalPages - 1} style={styles.button}>
                        Next
                    </button> */}
                </div>
            )}
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
        cursor: 'pointer',
    },
    title: {
        color: '#0F1035',
        marginBottom: '10px',
    },
    text: {
        color: '#0F1035',
    },
    cover: {
        width: '100px',
        height: '150px',
        objectFit: 'cover' as 'cover',
        borderRadius: '4px',
        marginBottom: '10px',
    },
    pagination: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '20px',
    },
    button: {
        padding: '10px',
        borderRadius: '4px',
        border: 'none',
        backgroundColor: '#7FC7D9',
        color: '#fff',
        cursor: 'pointer',
    },
    pageInfo: {
        margin: '0 10px',
        color: '#0F1035',
    },
};

export default Home;