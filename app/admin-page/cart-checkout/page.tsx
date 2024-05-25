"use client"

import { useState, useEffect } from 'react';
import Head from 'next/head';
import Navbar from '@/components/navbar/navbar';

interface CartItemsDTO {
    cartId: number;
    bookIsbn: string;
    bookTitle: string;
    price: number;
    quantity: number;
}

interface CartCheckoutAdminDTO {
    id: number;
    namaUser: string;
    emailUser: string;
    phoneNumberUser: string;
    items: CartItemsDTO[];
    totalPrice: number;
    status: string;
}

const TransactionsPage: React.FC = () => {
    const [transactions, setTransactions] = useState<CartCheckoutAdminDTO[]>([]);
    const [filteredTransactions, setFilteredTransactions] = useState<CartCheckoutAdminDTO[]>([]);
    const [emailFilter, setEmailFilter] = useState('');
    const [bookFilter, setBookFilter] = useState('');

    useEffect(() => {
        // Dummy data for transactions
        const dummyTransactions: CartCheckoutAdminDTO[] = [
            {
                id: 1,
                namaUser: 'John Doe',
                emailUser: 'john@example.com',
                phoneNumberUser: '123-456-7890',
                items: [
                    { cartId: 1, bookIsbn: '1234567890', bookTitle: 'The Great Gatsby', price: 10, quantity: 1 },
                ],
                totalPrice: 10,
                status: 'Menunggu Pengiriman Buku'
            },
            {
                id: 2,
                namaUser: 'Jane Smith',
                emailUser: 'jane@example.com',
                phoneNumberUser: '987-654-3210',
                items: [
                    { cartId: 2, bookIsbn: '0987654321', bookTitle: '1984', price: 15, quantity: 1 },
                ],
                totalPrice: 15,
                status: 'Dalam Pengiriman'
            },
            {
                id: 3,
                namaUser: 'Alice Johnson',
                emailUser: 'alice@example.com',
                phoneNumberUser: '555-666-7777',
                items: [
                    { cartId: 3, bookIsbn: '1122334455', bookTitle: 'Pride and Prejudice', price: 12, quantity: 1 },
                ],
                totalPrice: 12,
                status: 'Pengiriman Selesai'
            },
        ];
        setTransactions(dummyTransactions);
        setFilteredTransactions(dummyTransactions);
    }, []);

    const handleStatusChange = (id: number, newStatus: string) => {
        setTransactions(transactions.map(transaction =>
            transaction.id === id ? { ...transaction, status: newStatus } : transaction
        ));
        setFilteredTransactions(filteredTransactions.map(transaction =>
            transaction.id === id ? { ...transaction, status: newStatus } : transaction
        ));
    };

    const handleFilter = () => {
        let filtered = transactions;

        if (emailFilter) {
            filtered = filtered.filter(transaction =>
                transaction.emailUser.toLowerCase().includes(emailFilter.toLowerCase())
            );
        }

        if (bookFilter) {
            filtered = filtered.filter(transaction =>
                transaction.items.some(item =>
                    item.bookTitle.toLowerCase().includes(bookFilter.toLowerCase())
                )
            );
        }

        setFilteredTransactions(filtered);
    };

    return (
        <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
            <Navbar />
            <div className="mt-20">
                <Head>
                    <title>Administrator Transactions</title>
                </Head>
                <h1 className="text-4xl font-bold text-center mb-8">Administrator Transactions</h1>
                <div className="mb-4 flex justify-center items-center space-x-4">
                    <input
                        type="text"
                        placeholder="Filter by email"
                        value={emailFilter}
                        onChange={(e) => setEmailFilter(e.target.value)}
                        className="border p-2"
                    />
                    <input
                        type="text"
                        placeholder="Filter by book title"
                        value={bookFilter}
                        onChange={(e) => setBookFilter(e.target.value)}
                        className="border p-2"
                    />
                    <button onClick={handleFilter} className="bg-blue-500 text-white p-2 rounded">Filter</button>
                </div>
                <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {filteredTransactions.map(transaction => (
                        <div key={transaction.id} className="card border border-gray-200 rounded-lg p-4 shadow-lg bg-white">
                            <h2 className="text-xl font-semibold">{transaction.namaUser}</h2>
                            <p className="text-gray-600">📱{transaction.phoneNumberUser}</p>
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
                                    onClick={() => handleStatusChange(transaction.id, 'Dalam Pengiriman')}
                                    className="bg-yellow-500 text-white p-2 rounded mt-2"
                                >
                                    Set to Dalam Pengiriman
                                </button>
                            )}
                            {transaction.status === 'Dalam Pengiriman' && (
                                <button
                                    onClick={() => handleStatusChange(transaction.id, 'Pengiriman Selesai')}
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
