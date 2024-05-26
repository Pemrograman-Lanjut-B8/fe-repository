"use client"

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import AuthService from "@/app/services/auth.service";

const Navbar: React.FC = () => {
    const router = useRouter();
    const [role, setRole] = useState<string | null>(null);

    useEffect(() => {
        const checkUserRole = () => {
            try {
                const currentUser = AuthService.getCurrentUser();
                if (currentUser) {
                    if (currentUser.roles.includes('ROLE_USER')) {
                        setRole('ROLE_USER');
                    } else if (currentUser.roles.includes('ROLE_ADMIN')) {
                        setRole('ROLE_ADMIN');
                    } else {
                        setRole(null);
                    }
                } else {
                    router.push('/login');
                }
            } catch (error) {
                console.error(error);
            }
        };

        checkUserRole();
    }, [router]);

    const handleCheckout = () => {
        if (role === 'ROLE_USER') {
            router.push("/cart-checkout/cart");
        } else if (role === 'ROLE_ADMIN') {
            router.push("/admin-page/cart-checkout");
        } else {
            console.log("Unauthorized access");
        }
    };

    const handleLogout = () => {
        AuthService.logout();
        router.push('/home');
    };

    return (
        <div className="flex justify-between items-center bg-buku-blue-100 fixed top-0 left-0 right-0 px-5 py-2 h-16 z-50">
            <div className="text-buku-blue-500 font-bold text-lg">AdvProg-B8</div>
            <div className="flex gap-3">
                {role === 'ROLE_ADMIN' && (
                    <button
                        className="text-buku-blue-500 hover:text-buku-blue-400"
                        onClick={() => router.push("/dashboard")}
                    >
                        Dashboard
                    </button>
                )}
                <button
                    className="text-buku-blue-500 hover:text-buku-blue-400"
                    onClick={() => router.push("/profile")}
                >
                    Profile
                </button>
                <button
                    className="text-buku-blue-500 hover:text-buku-blue-400"
                    onClick={() => router.push("/book-list")}
                >
                    Book List
                </button>
                <button
                    className="text-buku-blue-500 hover:text-buku-blue-400"
                    onClick={() => router.push("/review/list")}
                >
                    Review
                </button>
                <button
                    className="text-buku-blue-500 hover:text-buku-blue-400"
                    onClick={handleCheckout}
                >
                    Checkout
                </button>
                <button
                    className="text-buku-blue-500 hover:text-buku-blue-400"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Navbar;
