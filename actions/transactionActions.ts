"use server"

// actions/transactionActions.ts
export interface CartItemsDTO {
    cartId: number;
    bookIsbn: string;
    bookTitle: string;
    price: number;
    quantity: number;
}

export interface CartCheckoutAdminDTO {
    id: number;
    namaUser: string;
    emailUser: string;
    phoneNumberUser: string;
    items: CartItemsDTO[];
    totalPrice: number;
    status: string;
}

const API_BASE_URL = 'http://34.124.134.197/pembelian-pelanggan';

export const fetchTransactions = async (): Promise<CartCheckoutAdminDTO[]> => {
    const response = await fetch(`${API_BASE_URL}/list-cartcheckout`);
    if (!response.ok) {
        throw new Error('Failed to fetch transactions');
    }
    return await response.json();
};

export const fetchTransactionsByEmail = async (email: string): Promise<CartCheckoutAdminDTO[]> => {
    const response = await fetch(`${API_BASE_URL}/emailPembeli`);
    if (!response.ok) {
        throw new Error('Failed to fetch transactions by email');
    }
    return await response.json();
};

export const fetchTransactionsByBook = async (book: string): Promise<CartCheckoutAdminDTO[]> => {
    const response = await fetch(`${API_BASE_URL}/book`);
    if (!response.ok) {
        throw new Error('Failed to fetch transactions by book');
    }
    return await response.json();
};

export const updateTransactionStatus = async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/update-status/${id}`, {
        method: 'PUT'
    });
    if (!response.ok) {
        throw new Error('Failed to update status');
    }
};
