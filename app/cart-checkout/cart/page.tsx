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
        console.log("isAddressConfirmed: ", isAddressConfirmed);
        console.log("cartId: ", cartId);

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
        <div className="cart-page container">
            <h1 className="page-title">Keranjang Belanja</h1>
            <div className="cart-items">
                {cartItems.length > 0 ? (
                    cartItems.map(item => (
                        <div key={item.bookIsbn} className="cart-item card mb-3">
                            <div className="card-body">
                                <h5 className="card-title">{item.bookTitle}</h5>
                                <p className="card-text">Harga: Rp{item.price}</p>
                                <p className="card-text">Jumlah: {item.quantity}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Keranjang Anda kosong</p>
                )}
            </div>
            <div className="cart-summary card p-3 mt-3">
                <h5 className="card-title">Ringkasan Keranjang</h5>
                <p className="card-text">Total Harga: Rp{totalPrice}</p>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Masukkan alamat pengiriman"
                        value={address}
                        onChange={(e) => {
                            setAddress(e.target.value);
                            setIsAddressConfirmed(false);
                        }}
                    />
                </div>
                <button className="btn btn-primary mb-2" onClick={handleConfirmAddress}>Confirm Address</button>
                <button className="btn btn-success" onClick={handleCheckout} disabled={!isAddressConfirmed}>Checkout</button>
            </div>
        </div>
    );
};

export default Page;
