"use client";

import Navbar from '@/components/navbar/navbar';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const CreateReview = () => {
    const [review, setReview] = useState("");
    const [rating, setRating] = useState(0);
    const [bookIsbn, setBookIsbn] = useState("");
    const router = useRouter();

    const baseURL = 'http://localhost:8080';

    useEffect(() => {
        const storedIsbn = localStorage.getItem("bookIsbn");
        if (storedIsbn) {
            setBookIsbn(storedIsbn);
        } else {
            console.error("No ISBN found");
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
                body: JSON.stringify({ review, rating, bookIsbn, username: "currentUser" })
            });
            if (!res.ok) {
                throw new Error("Failed to create review!");
            }
            router.push('/book');
        } catch (error) {
            console.error("There was a problem while creating the review:", error);
        }
    };

    return (
        <div className="container mx-auto p-4 bg-buku-blue-000 min-h-screen">
            <Navbar />
            <div className="mt-20">
                <h1 className="text-3xl font-semibold mb-4">Create Review & Rating Books</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Review:</label>
                        <textarea
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Rating:</label>
                        <input
                            type="number"
                            value={rating}
                            onChange={(e) => setRating(parseInt(e.target.value))}
                        />
                    </div>
                    <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 focus:outline-none">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default CreateReview;
