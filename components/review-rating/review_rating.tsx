import React from 'react';
import Link from 'next/link';

interface Review {
    username: string;
    datetime: string;
    title: string;
    review: string;
    rating: number;
}

const ReviewItem: React.FC<Review> = ({ username, datetime, title, review, rating }) => {
    const handleEdit = () => {
        // Handle navigation to edit page
    };

    const handleDelete = () => {
        // Handle delete logic
    };

    return (
        <div className="review-item border border-solid border-blue-900 rounded-lg overflow-hidden p-4 shadow-lg bg-white my-4">
            <div className="flex items-start">
                <div className="w-3/4 pr-4">
                    <p><strong>{username}</strong></p>
                    <p>{new Date(datetime).toLocaleDateString()}</p>
                    <p><strong>Title:</strong> {title}</p>
                    <p><strong>Review:</strong> {review}</p>
                    <p><strong>Rating:</strong> {rating}/10</p>
                </div>
                <div className="flex flex-col items-end justify-start w-1/4">
                    {/* Link to edit page */}
                    <Link href="/review/edit">
                        <a className="mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h8l4 4v8z" />
                            </svg>
                        </a>
                    </Link>
                    {/* Button for delete */}
                    <button onClick={handleDelete}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReviewItem;
