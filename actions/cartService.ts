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

export const getCartCheckouts = async (): Promise<CartCheckoutDTO[]> => {
    const response = await fetch(`${API_BASE_URL}/list`);
    if (!response.ok) {
        throw new Error('Failed to fetch cart checkouts');
    }
    return await response.json();
};

export const addItemToCart = async (cartCheckout: CartCheckoutDTO): Promise<CartCheckoutDTO> => {
    const response = await fetch(`${API_BASE_URL}/createCart`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cartCheckout)
    });
    if (!response.ok) {
        throw new Error('Failed to add item to cart');
    }
    return await response.json();
};

export const checkoutCart = async (checkoutId: number): Promise<boolean> => {
    const response = await fetch(`${API_BASE_URL}/status/checkout/${checkoutId}`, {
        method: 'POST'
    });
    return response.ok;
};

export const getCartCheckout = async (checkoutId: number): Promise<CartCheckoutDTO> => {
    const response = await fetch(`${API_BASE_URL}/checkout/${checkoutId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch cart checkout details');
    }
    return await response.json();
};

export const payCart = async (checkoutId: number): Promise<boolean> => {
    const response = await fetch(`${API_BASE_URL}/status/pay/${checkoutId}`, {
        method: 'POST'
    });
    return response.ok;
};

export const cancelCart = async (checkoutId: number): Promise<boolean> => {
    const response = await fetch(`${API_BASE_URL}/status/cancel/${checkoutId}`, {
        method: 'POST'
    });
    return response.ok;
};

export const storeCheckedOutBooks = async (cartCheckout: CartCheckoutDTO): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/inventory`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cartCheckout)
    });
    if (!response.ok) {
        throw new Error('Failed to store checked out books');
    }
};
