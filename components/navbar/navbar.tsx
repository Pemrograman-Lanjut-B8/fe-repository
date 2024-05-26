"use client"

import { useRouter } from 'next/navigation'; // Import useRouter from next/router

const Navbar: React.FC = () => {
    const router = useRouter(); // Initialize the useRouter hook

    return (
        <div className="flex justify-between items-center bg-buku-blue-100 fixed top-0 left-0 right-0 px-5 py-2 h-16 z-50">
            <div className="text-buku-blue-500 font-bold text-lg">AdvProg-B8</div>
            <div className="flex gap-3">
                <button
                    className="text-buku-blue-500 hover:text-buku-blue-400"
                    onClick={() => router.push("/dashboard")} // Navigate to Dashboard
                >
                    Dashboard
                </button>
                <button
                    className="text-buku-blue-500 hover:text-buku-blue-400"
                    onClick={() => router.push("/book-list")} // Navigate to Book List
                >
                    Book List
                </button>
                <button
                    className="text-buku-blue-500 hover:text-buku-blue-400"
                    onClick={() => router.push("/review/list")} // Navigate to Search
                >
                    Review
                </button>
                <button
                    className="text-buku-blue-500 hover:text-buku-blue-400"
                    onClick={() => router.push("/checkout")} // Navigate to Checkout
                >
                    Checkout
                </button>
            </div>
        </div>
    );
};

export default Navbar;
