"use client"

import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { getCartItems, checkout } from '../../../actions/cartService';

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

const Page: React.FC = () => {
    const [cartItems, setCartItems] = useState<CartItemsDTO[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [cartId, setCartId] = useState<number | null>(null);
    const [address, setAddress] = useState<string>('');
    const [isAddressConfirmed, setIsAddressConfirmed] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const items = await getCartItems();
                if (items.length > 0) {
                    setCartId(items[0].cartId);
                }
                setCartItems(items);
                calculateTotalPrice(items);
            } catch (error) {
                console.error('Failed to fetch cart items', error);
            }
        };

        fetchCartItems();
    }, []);

    const calculateTotalPrice = (items: CartItemsDTO[]) => {
        const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        setTotalPrice(total);
    };

    const handleConfirmAddress = () => {
        if (address.trim() !== '') {
            setIsAddressConfirmed(true);
            alert('Address confirmed!');
        } else {
            alert('Please enter your address.');
        }
    };

    const handleCheckout = async () => {
        console.log("Address on checkout: ", address);
        if (cartId !== null && isAddressConfirmed) {
            try {
                const success = await checkout(cartId);
                if (success) {
                    alert('Checkout successful!');
                    router.push(`/payment/${cartId}`);
                } else {
                    alert('Checkout failed. Please try again.');
                }
            } catch (error) {
                console.error('Checkout error', error);
                alert('Checkout failed. Please try again.');
            }
        } else {
            alert('Please confirm your address before checkout.');
        }
    };

    return (
        <div className="cart-page">
            <h1>Keranjang Belanja</h1>
            <div className="cart-items">
                {cartItems.length > 0 ? (
                    cartItems.map(item => (
                        <div key={item.bookIsbn} className="cart-item">
                            <p>{item.bookTitle}</p>
                            <p>Harga: Rp{item.price}</p>
                            <p>Jumlah: {item.quantity}</p>
                        </div>
                    ))
                ) : (
                    <p>Keranjang Anda kosong</p>
                )}
            </div>
            <div className="cart-summary">
                <p>Total Harga: Rp{totalPrice}</p>
                <input
                    type="text"
                    placeholder="Masukkan alamat pengiriman"
                    value={address}
                    onChange={(e) => {
                        setAddress(e.target.value);
                        setIsAddressConfirmed(false);
                    }}
                />
                <button onClick={handleConfirmAddress}>Confirm Address</button>
                <button onClick={handleCheckout} disabled={!isAddressConfirmed}>Checkout</button>
            </div>
        </div>
    );
};

export default Page;
