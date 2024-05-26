export interface Review {
    reviewId: string;
    username: string;
    book: {
        judulBuku: string;
    };
    review: string;
    rating: number;
    dateTime: string;
}