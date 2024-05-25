"use client";

import Navbar from '@/components/navbar/navbar';
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

const EditReview = () => {
    const router = useRouter();
    const { id } = useParams();
    const [review, setReview] = useState("");
    const [rating, setRating] = useState(0);
    const [bookIsbn, setBookIsbn] = useState("");
    const [username, setUsername] = useState("");

    useEffect(() => {
        const fetchReview = async () => {
            const res = await fetch(`/api/review/${id}`);
            const data = await res.json();
            setReview(data.review);
            setRating(data.rating);
            setBookIsbn(data.book.isbn);
            setUsername(data.username);
        };

        if (id) {
            fetchReview();
        }
    }, [id]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const res = await fetch(`/api/review/edit/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ review, rating, bookIsbn, username }),
        });

        if (res.ok) {
            router.push("/review/list");
        } else {
            console.error("Error editing review");
        }
    };

    return (
        <div className="container mx-auto p-4 bg-buku-blue-000 min-h-screen">
            <Navbar />
            <div className="mt-20">
                <h1 className="text-3xl font-semibold mb-4">Edit Review & Rating Books</h1>
                <div>
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
        </div>
    );
};

export default EditReview;
