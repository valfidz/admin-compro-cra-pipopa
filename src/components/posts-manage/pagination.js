import { useState, useEffect } from "react"

export const Pagination = ({ currentPage, itemsPerPage, totalItems, onPageChange }) => {
    const [pages, setPages] = useState([]);

    useEffect(() => {
        const totalPages =  Math.ceil(totalItems / itemsPerPage);
        const calculatePages = () => {
            if (totalPages <= 10) {
                return Array.from({ length: totalPages }, (_, i) => (i + 1).toString());
            }

            const currentPageNum = parseInt(currentPage);
            let pageNumbers = [];

            if (currentPageNum <= 4) {
                pageNumbers = ['1', '2', '3', '4', '5', '...', totalPages.toString()];
            } else if (currentPage >= totalPages - 3) {
                pageNumbers = ['1', '...', (totalPages - 4).toString(), (totalPages - 3).toString(), 
                    (totalPages - 2).toString(), (totalPages - 1).toString(), totalPages.toString()];
            } else {
                pageNumbers = ['1', '...', (currentPageNum - 1).toString(), currentPageNum.toString(),
                    (currentPageNum + 1).toString(), '...', totalPages.toString()];
            }

            return pageNumbers;
        }

        setPages(calculatePages());
    }, [currentPage, totalItems, itemsPerPage]);

    const handlePageClick = (page) => {
        if (page !== "...") {
            onPageChange(page)
        }
    }

    return (
        <div className="max-w-screen-xl mx-auto mt-12 px-4 text-gray-600 md:px-8">
            <div className="hidden justify-between text-sm md:flex">
                <div>
                    Showing {((parseInt(currentPage) - 1) * itemsPerPage + 1)}-
                    {Math.min(parseInt(currentPage) * itemsPerPage, totalItems)} of {totalItems}
                </div>
                <div className="flex items-center gap-12" aria-label="Pagination">
                    <button
                        onClick={() => onPageChange(Math.max(1, parseInt(currentPage) - 1).toString())}
                        disabled={currentPage === "1"}
                        className="hover:text-indigo-600"
                    >
                        Previous
                    </button>
                    <ul className="flex items-center gap-1">
                        {
                            pages.map((item, idx) => (
                                <li key={item}>
                                    {
                                        item === "..." ? (
                                            <div>
                                                {item}
                                            </div>
                                        ) : (

                                            <button
                                                onClick={() => handlePageClick(item)}
                                                aria-current={currentPage === item ? "page" : false}
                                                className={`px-3 py-2 rounded-lg duration-150 hover:text-white hover:bg-green-600 ${currentPage === item ? "bg-green-400 text-white font-medium" : ""}`}
                                            >
                                                {item}
                                            </button>
                                        )
                                    }
                                </li>
                            ))
                        }
                    </ul>
                    <button
                        onClick={() => onPageChange(Math.min(parseInt(currentPage) + 1, Math.ceil(totalItems / itemsPerPage)).toString())}
                        disabled={currentPage === Math.ceil(totalItems / itemsPerPage).toString()}
                        className="hover:text-indigo-600"
                    >
                        Next
                    </button>
                </div>
            </div>
            {/* On mobile version */}
            <div className="flex items-center justify-between text-sm text-gray-600 font-medium md:hidden">
                <button
                    onClick={() => onPageChange(Math.max(1, parseInt(currentPage) - 1).toString())}
                    disabled={currentPage === "1"} 
                    className="px-4 py-2 border rounded-lg duration-150 hover:bg-gray-50"
                >
                    Previous
                </button>
                <div className="font-medium">
                    Showing {((parseInt(currentPage) - 1) * itemsPerPage + 1)}-
                    {Math.min(parseInt(currentPage) * itemsPerPage, totalItems)} of {totalItems}
                </div>
                <button
                    onClick={() => onPageChange(Math.min(parseInt(currentPage) + 1, Math.ceil(totalItems / itemsPerPage)).toString())}
                    disabled={currentPage === Math.ceil(totalItems / itemsPerPage).toString()}
                    className="px-4 py-2 border rounded-lg duration-150 hover:bg-gray-50"
                >
                    Next
                </button>
            </div>
        </div>
    )
}