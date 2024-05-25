"use server"

export interface CartItemsDTO {
    cartId: number;
    bookIsbn: string;
    bookTitle: string;
    price: number;
    quantity: number;
}

export interface CartCheckoutDTO {
    id: number;
    userId: string;
    totalPrice: number;
    status: string;
    items: CartItemsDTO[];
}

const API_BASE_URL = 'http://localhost:8080/cart';

export const getCartItems = async (): Promise<CartItemsDTO[]> => {
    const response = await fetch(`${API_BASE_URL}/list`);
    if (!response.ok) {
        throw new Error('Failed to fetch cart items');
    }
    return await response.json();
};

export const checkout = async (cartId: number): Promise<boolean> => {
    const response = await fetch(`${API_BASE_URL}/status/checkout/${cartId}`, {
        method: 'POST'
    });
    return response.ok;
};

export const getCartCheckout = async (cartId: number): Promise<CartCheckoutDTO> => {
    const response = await fetch(`${API_BASE_URL}/checkout/${cartId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch cart checkout details');
    }
    return await response.json();
};

export const pay = async (cartId: number): Promise<boolean> => {
    const response = await fetch(`${API_BASE_URL}/status/pay/${cartId}`, {
        method: 'POST'
    });
    return response.ok;
};

export const cancel = async (cartId: number): Promise<boolean> => {
    const response = await fetch(`${API_BASE_URL}/status/cancel/${cartId}`, {
        method: 'POST'
    });
    return response.ok;
};
