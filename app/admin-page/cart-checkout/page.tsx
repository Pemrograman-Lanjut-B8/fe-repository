"use client";

import { useState, useEffect } from 'react';
import Head from 'next/head';
import Navbar from '@/components/navbar/navbar';
import {
    CartCheckoutAdminDTO,
    fetchTransactions,
    fetchTransactionsByEmail,
    fetchTransactionsByBook,
    updateTransactionStatus
} from '@/actions/transactionActions';

const TransactionsPage: React.FC = () => {
    const [transactions, setTransactions] = useState<CartCheckoutAdminDTO[]>([]);
    const [filteredTransactions, setFilteredTransactions] = useState<CartCheckoutAdminDTO[]>([]);
    const [emailFilter, setEmailFilter] = useState('');
    const [bookFilter, setBookFilter] = useState('');

    useEffect(() => {
        const loadTransactions = async () => {
            try {
                const data = await fetchTransactions();
                setTransactions(data);
                setFilteredTransactions(data);
            } catch (error) {
                console.error('Error fetching transactions:', error);
            }
        };
        loadTransactions();
    }, []);

    const handleFilter = async () => {
        try {
            if (emailFilter) {
                const data = await fetchTransactionsByEmail(emailFilter);
                setFilteredTransactions(data);
            } else if (bookFilter) {
                const data = await fetchTransactionsByBook(bookFilter);
                setFilteredTransactions(data);
            } else {
                setFilteredTransactions(transactions);
            }
        } catch (error) {
            console.error('Error fetching filtered transactions:', error);
        }
    };

    const handleStatusChange = async (id: number) => {
        try {
            await updateTransactionStatus(id);
            const data = await fetchTransactions();
            setTransactions(data);
            setFilteredTransactions(data);
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    return (
        <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
            <Navbar />
            <div className="mt-20">
                <Head>
                    <title>Administrator Transactions</title>
                </Head>
                <h1 className="text-4xl font-bold text-center mb-8">Administrator Transactions</h1>
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Filter by email"
                        value={emailFilter}
                        onChange={(e) => setEmailFilter(e.target.value)}
                        className="border p-2 mr-2"
                    />
                    <input
                        type="text"
                        placeholder="Filter by book title"
                        value={bookFilter}
                        onChange={(e) => setBookFilter(e.target.value)}
                        className="border p-2 mr-2"
                    />
                    <button onClick={handleFilter} className="bg-blue-500 text-white p-2 rounded">Filter</button>
                </div>
                <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {filteredTransactions.map(transaction => (
                        <div key={transaction.id} className="card border border-gray-200 rounded-lg p-4 shadow-lg bg-white">
                            <h2 className="text-xl font-semibold">{transaction.namaUser}</h2>
                            <p>📱{transaction.phoneNumberUser}</p>
                            <div className="mt-2">
                                <h3 className="font-semibold">Books:</h3>
                                <ul className="list-disc list-inside">
                                    {transaction.items.map((item, index) => (
                                        <li key={index}>
                                            {item.bookTitle} - {item.quantity} x ${item.price}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <p className="mt-2">Total Price: ${transaction.totalPrice}</p>
                            <p className="mt-2">Status: {transaction.status}</p>
                            {transaction.status === 'Menunggu Pengiriman Buku' && (
                                <button
                                    onClick={() => handleStatusChange(transaction.id)}
                                    className="bg-yellow-500 text-white p-2 rounded mt-2"
                                >
                                    Set to Dalam Pengiriman
                                </button>
                            )}
                            {transaction.status === 'Dalam Pengiriman' && (
                                <button
                                    onClick={() => handleStatusChange(transaction.id)}
                                    className="bg-green-500 text-white p-2 rounded mt-2"
                                >
                                    Set to Pengiriman Selesai
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TransactionsPage;