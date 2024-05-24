"use client"

import React, { useState } from 'react';
import Navbar from '@/components/navbar/navbar';

const UpdateReviewPage: React.FC = () => {
    const [review, setReview] = useState<string>('');
    const [rating, setRating] = useState<number>(0);

    const handleReviewChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setReview(event.target.value);
    };

    const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = parseInt(event.target.value, 10);
        if (value < 0) value = 0;
        if (value > 10) value = 10;
        setRating(value);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        // Implementasi pengiriman data ke server atau logika lainnya
        console.log('Review:', review);
        console.log('Rating:', rating);
    };

    return (
        <div className="container mx-auto p-4 bg-buku-blue-000 min-h-screen">
            <Navbar />
            <div className="mt-20">
                <h1 className="text-3xl font-semibold mb-4">Update Review & Rating Book</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="review" className="block text-gray-700 font-bold mb-2">Review:</label>
                        <textarea
                            id="review"
                            value={review}
                            onChange={handleReviewChange}
                            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                            rows={4}
                        ></textarea>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="rating" className="block text-gray-700 font-bold mb-2">Rating (0-10):</label>
                        <input
                            id="rating"
                            type="number"
                            value={rating}
                            onChange={handleRatingChange}
                            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                            min="0"
                            max="10"
                        />
                    </div>
                    <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 focus:outline-none">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default UpdateReviewPage;
