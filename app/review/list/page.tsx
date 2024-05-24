"use client"

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/navbar/navbar';
import ReviewItem from '@/components/review-rating/review_rating';
import dynamic from 'next/dynamic';
// import { useRouter } from 'next/router'; // Import useRouter di sini

const DynamicReviewItem = dynamic(() => import('@/components/review-rating/review_rating'), { ssr: false });

const ReviewRatingPage: React.FC = () => {
    const [reviews, setReviews] = useState<any[]>([]);
    const [sortedBy, setSortedBy] = useState<string>('recent');
    // const router = useRouter(); // Gunakan useRouter di sini

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                // Simulasi penundaan pengambilan data untuk meniru respons asynchronous dari server
                const delay = () => new Promise(resolve => setTimeout(resolve, 1000));
                await delay();
                // Dummy data review
                const dummyReviews = [
                    {
                        username: 'User1',
                        datetime: '2024-05-24T10:00:00',
                        title: 'The Great Gatsby',
                        review: 'This book is amazing! Wow bagus banget keren amazing anjay saya suka saya suka ini bagus banget rekomended gan! Baca buku ini kelar dalam 10 hari, ini rekor pertama saya, waduh ini nulis review panjang sebenernya cuma buat ngetes tampilannya berhasil justify rapi gak ya? Semoga rapi please tolong rapi, halo justify! tes tes test tes tes test test test test etesttest hhehehehe ahahaha :v hahahahah bismillah kelar adpro ini tolong. Oke beberapa kalimat lagi jadi 1 2 3 4 5 6 7 8 9 10 11 12 3132 heehhe terima kasih!',
                        rating: 9
                    },
                    {
                        username: 'User2',
                        datetime: '2024-05-25T11:00:00',
                        title: 'To Kill a Mockingbird',
                        review: 'One of the best books I have ever read!',
                        rating: 10
                    },
                    {
                        username: 'User3',
                        datetime: '2024-05-26T12:00:00',
                        title: '1984',
                        review: 'A must-read for everyone!',
                        rating: 8
                    },
                    {
                        username: 'User4',
                        datetime: '2024-05-27T13:00:00',
                        title: 'The Catcher in the Rye',
                        review: 'Enjoyed every bit of it.',
                        rating: 7
                    },
                    {
                        username: 'User5',
                        datetime: '2024-05-28T14:00:00',
                        title: 'Pride and Prejudice',
                        review: 'Classic!',
                        rating: 9
                    }
                ];
                setReviews(dummyReviews);
            } catch (error) {
                console.error('Failed to fetch reviews:', error);
            }
        };

        fetchReviews();
    }, []);

    const sortReviews = async (sortBy: string) => {
        try {
            const sortedReviews = [...reviews];
            if (sortBy === 'recent') {
                sortedReviews.sort((a, b) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime());
            } else if (sortBy === 'oldest') {
                sortedReviews.sort((a, b) => new Date(a.datetime).getTime() - new Date(b.datetime).getTime());
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

    // const handleEditReview = () => {
    //     router.push('/review/edit/page.tsx'); // Navigasi ke halaman edit review
    // };

    return (
        <div className="container mx-auto p-4 bg-buku-blue-000 min-h-screen">
            <Navbar />
            <div className="mt-20">
                <h1 className="text-3xl font-semibold mb-4">Review & Rating Books</h1>
                <p>Temukan review dari pengguna lainnya</p>
                <div className="mt-4">
                    <label htmlFor="sort">Urutkan berdasarkan:</label>
                    <select id="sort" value={sortedBy} onChange={handleSortChange} className="ml-2 px-2 py-1 border border-gray-300 rounded-md">
                        <option value="recent">Terbaru</option>
                        <option value="oldest">Terlama</option>
                    </select>
                </div>
                <div className="reviews-container mt-8">
                    {reviews.map((review, index) => (
                        <DynamicReviewItem
                            key={index}
                            {...review}
                            // onEdit={handleEditReview} // Teruskan fungsi handleEditReview sebagai prop
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ReviewRatingPage;
