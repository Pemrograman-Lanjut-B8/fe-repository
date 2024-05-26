"use client";

import Navbar from '@/components/navbar/navbar';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AuthService from '../../services/auth.service';

const CreateReview = () => {
    const [review, setReview] = useState("");
    const [rating, setRating] = useState(0);
    const [bookIsbn, setBookIsbn] = useState("");
    const [username, setUsername] = useState<string | null>(null);
    const router = useRouter();

    const baseURL = 'http://34.124.134.197';

    useEffect(() => {
        const storedIsbn = localStorage.getItem("bookIsbn");
        if (storedIsbn) {
            setBookIsbn(storedIsbn);
        } else {
            console.error("No ISBN found");
        }

        const user = AuthService.getCurrentUser();
        if (user) {
            setUsername(user.username);
        } else {
            setUsername("Anonymous");
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await fetch(`${baseURL}/api/review/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ review, rating, bookIsbn, username })
            });
            if (!res.ok) {
                throw new Error("Failed to create review!");
            }
            router.push('/review/list');
        } catch (error) {
            console.error("There was a problem while creating the review:", error);
        }
    };

    return (
        <div className="container mx-auto p-4 bg-buku-blue-000 min-h-screen">
            <Navbar />
            <div className="mt-20">
                <h1 className="text-3xl font-semibold mb-4">Create Review & Rating Books</h1>
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">ISBN:</label>
                        <input
                            type="text"
                            value={bookIsbn}
                            onChange={(e) => setBookIsbn(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Review:</label>
                        <textarea
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Rating:</label>
                        <input
                            type="number"
                            value={rating}
                            onChange={(e) => setRating(parseInt(e.target.value))}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 focus:outline-none">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default CreateReview;
