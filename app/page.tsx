"use client"

import { useRouter } from 'next/navigation'; // Import useRouter hook
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Navbar from '@/components/navbar/navbar';
import logo from '@/public/buku.png'; // Import the logo image

const Home: React.FC = () => {
    const router = useRouter(); // Initialize useRouter hook

    // Function to handle button click and navigate to landing-page
    const handleButtonClick = () => {
        router.push('/landing-page');
    };

    return (
        <div className="container mx-auto p-4 bg-buku-blue-000 min-h-screen">
            <Navbar />
            <div className="mt-20">
                <Head>
                    <title>BUKU.ID💡</title>
                </Head>
                <div className="flex justify-center items-center">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold mb-4" style={{textShadow: '1px 1px 2px #333'}}>
                            <span className="text-buku-yellow-000">Selamat datang di</span><br />
                            <span className="text-buku-yellow-000">BUKU.ID💡</span>
                        </h1>
                        <div className="flex justify-center items-center mt-8">
                            <Image src={logo} alt="BUKU.ID Logo" width={200} height={200}/>
                        </div>
                        <button onClick={handleButtonClick}
                                className="bg-buku-yellow-100 text-buku-blue-500 px-4 py-2 mt-8 rounded hover:bg-buku-yellow-200">
                            Visit our Website
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;

