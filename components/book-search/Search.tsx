import React, { useState } from 'react';
import { PaginatedBooks } from '../../types/book';
import { searchBooks } from '../../app/services/book.service';

interface SearchProps {
    onResults: (results: PaginatedBooks) => void;
}

const Search: React.FC<SearchProps> = ({ onResults }) => {
    const [judulBuku, setJudulBuku] = useState('');
    const [penulis, setPenulis] = useState('');
    const [sortBy, setSortBy] = useState('tanggalTerbit');
    const [sortDirection, setSortDirection] = useState('DESC');
    const [pageIndex, setPageIndex] = useState(1);

    const handleSearchInternal = async (newPageIndex = pageIndex) => {
        const results = await searchBooks(judulBuku, penulis, sortBy, sortDirection, newPageIndex);
        console.log('Search Results:', results);
        onResults(results);
        setPageIndex(newPageIndex); // Update the page index state
    };

    const handleNextPage = () => {
        handleSearchInternal(pageIndex + 1);
    };

    const handlePreviousPage = () => {
        if (pageIndex > 1) {
            handleSearchInternal(pageIndex - 1);
        }
    };

    return (
        <div style={styles.container}>
            <input
                type="text"
                placeholder="Judul Buku"
                value={judulBuku}
                onChange={(e) => setJudulBuku(e.target.value)}
                style={styles.input}
            />
            <input
                type="text"
                placeholder="Penulis"
                value={penulis}
                onChange={(e) => setPenulis(e.target.value)}
                style={styles.input}
            />
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={styles.select}>
                <option value="tanggalTerbit">Tanggal Terbit</option>
                <option value="rating">Rating</option>
                <option value="harga">Harga</option>
            </select>
            <select value={sortDirection} onChange={(e) => setSortDirection(e.target.value)} style={styles.select}>
                <option value="DESC">Descending</option>
                <option value="ASC">Ascending</option>
            </select>
            <button onClick={() => handleSearchInternal(1)} style={styles.button}>Search</button>
            <div style={styles.pagination}>
                <button onClick={handlePreviousPage} disabled={pageIndex <= 1} style={styles.button}>
                    Previous
                </button>
                <span style={styles.pageInfo}>Page {pageIndex}</span>
                <button onClick={handleNextPage} style={styles.button}>
                    Next
                </button>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column' as 'column',
        gap: '10px',
        padding: '20px',
        backgroundColor: '#DCF2F1',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    input: {
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #7FC7D9',
        outline: 'none',
        color: '#0F1035',
    },
    select: {
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #7FC7D9',
        outline: 'none',
        color: '#0F1035',
    },
    button: {
        padding: '10px',
        borderRadius: '4px',
        border: 'none',
        backgroundColor: '#7FC7D9',
        color: '#fff',
        cursor: 'pointer',
    },
    pagination: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '20px',
    },
    pageInfo: {
        margin: '0 10px',
        color: '#0F1035',
    },
};

export default Search;