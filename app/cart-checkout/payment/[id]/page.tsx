"use client"

import { useRouter, useParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { getCartCheckout, payCart, storeCheckedOutBooks, cancelCart } from '@/actions/cartService';

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
    const { id } = useParams();
    const [cartCheckout, setCartCheckout] = useState<CartCheckoutDTO | null>(null);
    const [status, setStatus] = useState<string>('');

    useEffect(() => {
        const fetchCartCheckout = async () => {
            if (id) {
                try {
                    const checkoutDetails = await getCartCheckout(Number(id));
                    setCartCheckout(checkoutDetails);
                    setStatus(checkoutDetails.status);
                } catch (error) {
                    console.error('Failed to fetch cart checkout details', error);
                }
            }
        };

        fetchCartCheckout();
    }, [id]);

    const handlePayment = async () => {
        if (id) {
            try {
                const success = await payCart(Number(id));
                if (success && cartCheckout) {
                    await storeCheckedOutBooks(cartCheckout);
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
        if (id) {
            try {
                const success = await cancelCart(Number(id));
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
