export interface Book {
    judulBuku: string;
    penulis: string;
    penerbit: string;
    deskripsi: string;
    harga: number;
    stok: number;
    tanggalTerbit: string;
    isbn: string;
    jumlahHalaman: number;
    fotoCover: string;
    kategori: string;
    rating: number;
}

export interface PaginatedBooks {
    content: Book[];
    pageable: {
        pageNumber: number;
        pageSize: number;
        sort: {
            sorted: boolean;
            unsorted: boolean;
            empty: boolean;
        };
    };
    totalPages: number;
    totalElements: number;
    number: number;
    size: number;
    numberOfElements: number;
    first: boolean;
    last: boolean;
    sort: {
        sorted: boolean;
        unsorted: boolean;
        empty: boolean;
    };
    empty: boolean;
}
