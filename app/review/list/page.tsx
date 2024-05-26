"use client";

import Navbar from '@/components/navbar/navbar'
import ReviewItem from '@/components/review-rating/review_rating';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from 'next/link';

interface Review {
    reviewId: string;
    username: string;
    book: {
        judulBuku: string;
    };
    review: string;
    rating: number;
    dateTime: string;
}

const Reviews = () => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [user, setUser] = useState<string | null>(null);
    const router = useRouter();
    const [sortedBy, setSortedBy] = useState<string>('recent');

    useEffect(() => {
        const fetchReviews = async () => {
            // Simulate API call with dummy data
            const data: Review[] = [
                {
                    reviewId: "1",
                    username: "user1",
                    book: { judulBuku: "Book Title 1" },
                    review: "Great book!",
                    rating: 9,
                    dateTime: "2024-01-01T10:00:00Z",
                },
                {
                    reviewId: "2",
                    username: "user2",
                    book: { judulBuku: "Book Title 2" },
                    review: "Not bad.",
                    rating: 7,
                    dateTime: "2024-01-02T11:00:00Z",
                },
                {
                    reviewId: "3",
                    username: "user3",
                    book: { judulBuku: "Book Title 3" },
                    review: "Could be better.",
                    rating: 5,
                    dateTime: "2024-01-03T12:00:00Z",
                },
                {
                    reviewId: "4",
                    username: "user4",
                    book: { judulBuku: "Book Title 4" },
                    review: "Loved it!",
                    rating: 10,
                    dateTime: "2024-01-04T13:00:00Z",
                },
                {
                    reviewId: "5",
                    username: "user5",
                    book: { judulBuku: "Book Title 5" },
                    review: "Terrible.",
                    rating: 2,
                    dateTime: "2024-01-05T14:00:00Z",
                },
            ];
            setReviews(data);
        };

        const fetchUser = async () => {
            const userData = localStorage.getItem("user");
            setUser(userData);
        };

        fetchReviews();
        fetchUser();
    }, []);

    const deleteReview = async (id: string) => {
        // Simulate delete API call
        setReviews(reviews.filter((review) => review.reviewId !== id));
    };

    const sortReviews = async (sortBy: string) => {
        try {
            const sortedReviews = [...reviews];
            if (sortBy === 'recent') {
                sortedReviews.sort((a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime());
            } else if (sortBy === 'oldest') {
                sortedReviews.sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime());
            }
            setReviews(sortedReviews);
        } catch (error) {
            console.error('Failed to sort reviews:', error);
        }
    };

    const handleSortChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const sortBy = event.target.value;
        setSortedBy(sortBy);
        await sortReviews(sortBy);
    };

    return (
        <div className="container mx-auto p-4 bg-buku-blue-000 min-h-screen">
            <Navbar />
            <div className="mt-20">
                <h1 className="text-3xl font-semibold mb-4">Review & Rating Books</h1>
                <p>Temukan review dari pengguna lainnya di sini!</p>
                <div className="mt-4">
                    <label htmlFor="sort">Urutkan berdasarkan:</label>
                    <select id="sort" value={sortedBy} onChange={handleSortChange} className="ml-2 px-2 py-1 border border-gray-300 rounded-md">
                        <option value="recent">Terbaru</option>
                        <option value="oldest">Terlama</option>
                    </select>
                </div>
                <div>
                    {reviews.map((review) => (
                        <div key={review.reviewId} className="review-item border border-solid border-blue-900 rounded-lg overflow-hidden p-4 shadow-lg bg-white my-4">
                            <div className="flex items-start">
                                <div className="w-3/4 pr-4">
                                    <p><strong>{review.username}</strong></p>
                                    <p>{new Date(review.dateTime).toLocaleDateString()}</p>
                                    <p><strong>Title:</strong> {review.book.judulBuku}</p>
                                    <p><strong>Review:</strong> {review.review}</p>
                                    <p><strong>Rating:</strong> {review.rating}/10</p>
                                </div>
                                {user === review.username && (
                                    <div className="flex flex-col items-end justify-start w-1/4">
                                        <Link href={`/review/edit/${review.reviewId}`}>
                                            <a className="mb-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h8l4 4v8z" />
                                                </svg>
                                            </a>
                                        </Link>
                                        <button onClick={() => deleteReview(review.reviewId)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Reviews;
