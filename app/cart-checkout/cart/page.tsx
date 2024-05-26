"use client"

import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { getCartCheckout, checkoutCart } from '@/actions/cartService';

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
    const [cartItems, setCartItems] = useState<CartItemsDTO[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [checkoutId, setCheckoutId] = useState<number | null>(null);
    const [address, setAddress] = useState<string>('');
    const [isAddressConfirmed, setIsAddressConfirmed] = useState<boolean>(false);

    useEffect(() => {
        const fetchCartData = async () => {
            const searchParams = new URLSearchParams(window.location.search);
            const id = searchParams.get('id');
            if (id) {
                try {
                    console.log("Fetching cart checkout details...");
                    const cartCheckout: CartCheckoutDTO = await getCartCheckout(Number(id));
                    console.log("Cart checkout details fetched:", cartCheckout);

                    if (cartCheckout) {
                        setCheckoutId(cartCheckout.id);
                        setCartItems(cartCheckout.items);
                        setTotalPrice(cartCheckout.totalPrice);
                    } else {
                        console.log("No checkout details found for id:", id);
                    }
                } catch (error) {
                    console.error('Failed to fetch cart data', error);
                }
            }
        };

        fetchCartData();
    }, []);

    const calculateTotalPrice = (items: CartItemsDTO[]) => {
        const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        setTotalPrice(total);
    };

    const handleConfirmAddress = () => {
        if (address.trim() !== '') {
            setIsAddressConfirmed(true);
            console.log('Address confirmed:', address);
            alert('Address confirmed!');
        } else {
            alert('Please enter your address.');
        }
    };

    const handleCheckout = async () => {
        console.log("Address on checkout:", address);
        console.log("isAddressConfirmed:", isAddressConfirmed);
        console.log("checkoutId:", checkoutId);

        if (checkoutId !== null && isAddressConfirmed) {
            try {
                const success = await checkoutCart(checkoutId);
                if (success) {
                    alert('Proceed to Payment!');
                    router.push(`/cart-checkout/payment?id=${checkoutId}`);
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
