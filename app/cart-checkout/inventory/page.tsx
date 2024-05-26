"use client"

import React, { useState, useEffect } from 'react';
import { getInventory } from '@/actions/cartService';

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

const InventoryPage: React.FC = () => {
    const [inventory, setInventory] = useState<CartCheckoutDTO[]>([]);

    useEffect(() => {
        const fetchInventory = async () => {
            try {
                const inventoryData = await getInventory();
                setInventory(inventoryData);
            } catch (error) {
                console.error('Failed to fetch inventory', error);
            }
        };

        fetchInventory();
    }, []);

    return (
        <div className="inventory-page container">
            <h1 className="page-title">Inventory</h1>
            <div className="cart-checkouts">
                {inventory.map(checkout => (
                    <div key={checkout.id} className="cart-checkout card mb-3">
                        <div className="card-body">
                            <h5 className="card-title">Checkout ID: {checkout.id}</h5>
                            <p className="card-text">User ID: {checkout.userId}</p>
                            <p className="card-text">Total Price: Rp{checkout.totalPrice}</p>
                            <p className="card-text">Status: {checkout.status}</p>
                            <div className="cart-items">
                                {checkout.items.map(item => (
                                    <div key={item.bookIsbn} className="cart-item">
                                        <h6 className="item-title">{item.bookTitle}</h6>
                                        <p className="item-details">ISBN: {item.bookIsbn}</p>
                                        <p className="item-details">Price: Rp{item.price}</p>
                                        <p className="item-details">Quantity: {item.quantity}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InventoryPage;
