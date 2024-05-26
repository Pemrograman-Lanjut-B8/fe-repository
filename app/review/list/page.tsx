"use client";

import Navbar from '@/components/navbar/navbar';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from 'next/link';
import { Review } from '../types';
import AuthService from '../../services/auth.service';

const Reviews = () => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [user, setUser] = useState<string | null>(null);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const router = useRouter();
    const [sortedBy, setSortedBy] = useState<string>('recent');

    const baseURL = 'http://34.124.134.197';

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const res = await fetch(`${baseURL}/api/review/list`);
                if (!res.ok) {
                    throw new Error('Failed to fetch reviews!');
                }
                const data: Review[] = await res.json();
                setReviews(data);
            } catch (error) {
                console.error('There was a problem fetching the reviews:', error);
            }
        };

        const fetchUser = () => {
            const currentUser = AuthService.getCurrentUser();
            setUser(currentUser?.username || null);
            setIsAdmin(currentUser?.roles.includes('ROLE_ADMIN') || false);
        };

        fetchReviews();
        fetchUser();
    }, []);

    const deleteReview = async (id: string) => {
        try {
            const res = await fetch(`${baseURL}/api/review/delete/${id}`, {
                method: 'DELETE',
            });
            if (!res.ok) {
                throw new Error('Failed to delete review!');
            }
            setReviews(reviews.filter((review) => review.reviewId !== id));
        } catch (error) {
            console.error('There was a problem deleting the review:', error);
        }
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
                <p className="mt-2">
                    Ingin menambahkan review & rating lainnya?
                    <Link href="/landing-page">
                        <a className="text-blue-500 underline ml-1">Cari buku!</a>
                    </Link>
                </p>
                <div className="mt-4">
                    <Link href="/review/create">
                        <a className="inline-block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Create Review</a>
                    </Link>
                </div>
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
                                {isAdmin && (
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
