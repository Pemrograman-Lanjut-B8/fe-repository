"use client"

const Navbar: React.FC = () => {

    return (
        <div className="flex justify-between items-center bg-buku-blue-100 fixed top-0 left-0 right-0 px-5 py-2 h-16 z-50">
            <div className="text-buku-blue-500 font-bold text-lg">AdvProg-B8</div>
            <div className="flex gap-3">
                <button className="text-buku-blue-500 hover:text-buku-blue-400" onClick={() => console.log("Go to Dashboard")}>
                    Dashboard
                </button>
                <button className="text-buku-blue-500 hover:text-buku-blue-400" onClick={() => console.log("Go to Search")}>
                    Search
                </button>
                <button className="text-buku-blue-500 hover:text-buku-blue-400" onClick={() => console.log("Go to Checkout")}>
                    Checkout
                </button>
                <button className="text-buku-blue-500 hover:text-buku-blue-400" onClick={() => console.log("Go to Book List")}>
                    Book List
                </button>
            </div>
        </div>
    )
}

export default Navbar; // Ekspor komponen AuthenticatedNavbar
