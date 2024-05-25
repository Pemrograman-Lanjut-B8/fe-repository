"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

const EditReview = () => {
    const router = useRouter();
    const params = useParams();
    const { id } = params;
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
        console.log("Submitting edit..."); // Debugging

        const res = await fetch(`/api/review/edit/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ review, rating, bookIsbn, username }),
        });

        if (res.ok) {
            console.log("Review edited successfully"); // Debugging
            router.push("/reviews");
        } else {
            console.error("Error editing review"); // Debugging
        }
    };

    return (
        <div>
            <h1>Edit Review</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Book ISBN:</label>
                    <input
                        type="text"
                        value={bookIsbn}
                        onChange={(e) => setBookIsbn(e.target.value)}
                    />
                </div>
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
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default EditReview;
