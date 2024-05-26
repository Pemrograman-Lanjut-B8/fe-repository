"use client";

import Navbar from '@/components/navbar/navbar';
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

const EditReview = () => {
    const router = useRouter();
    const { reviewId } = useParams();
    const [review, setReview] = useState("");
    const [rating, setRating] = useState<number>(0);
    const [bookIsbn, setBookIsbn] = useState<string>("");
    const [username, setUsername] = useState<string>("");

    const baseURL = 'http://localhost:8080';

    useEffect(() => {
        const fetchReview = async () => {
            try {
                const res = await fetch(`${baseURL}/api/review/${reviewId}`);
                if (!res.ok) {
                    throw new Error('Network response was not OK!');
                }
                const data = await res.json();
                setReview(data.review);
                setRating(data.rating);
                setBookIsbn(data.book.isbn);
                setUsername(data.username);
            } catch (error) {
                console.error('There was a problem fetching the review:', error);
            }
        };

        if (reviewId) {
            fetchReview();
        }
    }, [reviewId]);

    const handleUpdateReview = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch(`${baseURL}/api/review/edit/${reviewId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ review, rating, bookIsbn, username })
            });
            if (!response.ok) {
                throw new Error("Failed to update review!");
            }
            router.push('/review/list');
        } catch (error) {
            console.error("There was a problem while updating the review:", error);
        }
    };

    return (
        <div className="container mx-auto p-4 bg-buku-blue-000 min-h-screen">
            <Navbar />
            <div className="mt-20">
                <h1 className="text-3xl font-semibold mb-4">Edit Review & Rating Books</h1>
                {review !== "" ? (
                    <form onSubmit={handleUpdateReview}>
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
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
};

export default EditReview;
