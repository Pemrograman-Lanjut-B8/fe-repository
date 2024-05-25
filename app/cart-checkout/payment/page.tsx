"use client"

import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { getCartCheckout, pay, cancel } from '../../../actions/cartService';

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
    const router = useRouter();
    const searchParams = useSearchParams();
    const cartId = searchParams.get('cartId');
    const [cartCheckout, setCartCheckout] = useState<CartCheckoutDTO | null>(null);
    const [status, setStatus] = useState<string>('');

    useEffect(() => {
        const fetchCartCheckout = async () => {
            if (cartId) {
                try {
                    const checkoutDetails = await getCartCheckout(Number(cartId));
                    setCartCheckout(checkoutDetails);
                    setStatus(checkoutDetails.status);
                } catch (error) {
                    console.error('Failed to fetch cart checkout details', error);
                }
            }
        };

        fetchCartCheckout();
    }, [cartId]);

    const handlePayment = async () => {
        if (cartId) {
            try {
                const success = await pay(Number(cartId));
                if (success) {
                    setStatus('Menunggu Pengiriman Buku');
                    alert('Payment successful!');
                } else {
                    alert('Payment failed. Please try again.');
                }
            } catch (error) {
                console.error('Payment error', error);
                alert('Payment failed. Please try again.');
            }
        }
    };

    const handleCancel = async () => {
        if (cartId) {
            try {
                const success = await cancel(Number(cartId));
                if (success) {
                    setStatus('Pembelian Dibatalkan');
                    alert('Cancellation successful!');
                } else {
                    alert('Cancellation failed. Please try again.');
                }
            } catch (error) {
                console.error('Cancellation error', error);
                alert('Cancellation failed. Please try again.');
            }
        }
    };

    if (!cartCheckout) {
        return <div>Loading...</div>;
    }

    return (
        <div className="purchase-detail-page container">
            <h1 className="page-title">Detail Pembelian</h1>
            <div className="cart-items">
                {cartCheckout.items.map(item => (
                    <div key={item.bookIsbn} className="cart-item card mb-3">
                        <div className="card-body">
                            <h5 className="card-title">{item.bookTitle}</h5>
                            <p className="card-text">Harga: Rp{item.price}</p>
                            <p className="card-text">Jumlah: {item.quantity}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="cart-summary card p-3 mt-3">
                <h5 className="card-title">Ringkasan Pembelian</h5>
                <p className="card-text">Total Harga: Rp{cartCheckout.totalPrice}</p>
                <p className="card-text">Status: {status}</p>
                {status === 'Menunggu Konfirmasi Pembayaran' && (
                    <>
                        <button className="btn btn-success mb-2" onClick={handlePayment}>Pay</button>
                        <button className="btn btn-danger" onClick={handleCancel}>Cancel</button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Page;
