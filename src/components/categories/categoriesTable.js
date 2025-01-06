import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import Success from "../alerts/successAlert";
import Failed from "../alerts/failAlert";
import ConfirmationDialog from "../confirmation/confirmation";
import { Pagination } from "../posts-manage/pagination";

export const CategoriesTable = () => {
    const [tableItems, setTableItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showNotif, setShowNotif] = useState(false);
    const [showNotifError, setShowNotifError] = useState(false);
    const [notifMessage, setNotifMessage] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [deleteCategoryId, setDeleteCategoryId] = useState(null);

    // Search states
    const [searchQuery, setSearchQuery] = useState('');
    const [submittedSearchQuery, setSubmittedSearchQuery] = useState('');

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const be_site = process.env.REACT_APP_BE_SITE;
    const authToken = Cookies.get('token');

    useEffect(() => {
        const categoryNotification = sessionStorage.getItem('categoryNotification');
        if (categoryNotification) {
            setShowNotif(true);
            setNotifMessage('Category created successfully!');
            sessionStorage.removeItem('categoryNotification');

            const timer = setTimeout(() => {
                setShowNotif(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, []); 

    const fetchCategories = async () => {
        try {
            setLoading(true);
            let url = `${be_site}/api/categories?page=${currentPage}&limit=${itemsPerPage}`;

            if (submittedSearchQuery) {
                url += `&search=${submittedSearchQuery}`;
            }

            const response = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.data) {
                const { result, pagination } = response.data.result;
                setTableItems(result);
                setTotalItems(pagination.total);
                setTotalPages(pagination.pages);
                setItemsPerPage(pagination.limit);
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to load categories. Please try again later.";
            setError(errorMessage);
            setShowNotifError(true);

            if (error.response?.status == 401) {
                setError("Unauthorized access. Please login again");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (authToken) {
            fetchCategories();
        } else {
            setError("No authentication found. Please login.");
            setLoading(false);
        }
    }, [currentPage, submittedSearchQuery, authToken]);

    const handlePageChange = (page) => {
        setCurrentPage(parseInt(page));
    }

    const capitalizeLetter = (string) => {
        if (!string) {
            return ''
        }
        return string.replace(/\b\w/g, char => char.toUpperCase());
      }

    const handleDelete = (categoryId) => {
        setDeleteCategoryId(categoryId);
        setIsDialogOpen(true);
    }

    const confirmDelete = async () => {
        setIsDialogOpen(false);
        try {
            await axios.delete(`${be_site}/api/categories/${deleteCategoryId}`, {
                headers: { Authorization: `Bearer ${authToken}` },
            });

            // Refresh the current page after deletion
            await fetchCategories();

            setShowNotif(true);
            setNotifMessage("Category deleted successfully!");
        } catch (error) {
            setShowNotifError(true);
            setNotifMessage("Failed to delete category. Please try again.");
        }
    }

    const cancelDelete = () => {
        setIsDialogOpen(false);
        setDeleteCategoryId(null);
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (error) {
        return <div className="text-center mt-10 text-red-500">{error}</div>
    }

    const handleSearch = (event) => {
        event.preventDefault();
        setCurrentPage(1);
        setSubmittedSearchQuery(searchQuery);
    };

    return (
        <div className="min-h-screen">
            {showNotif && (
                <Success
                    message={notifMessage}
                    onClose={() => setShowNotif(false)}
                />
            )}
            {showNotifError && (
                <Failed
                    message={notifMessage}
                    onClose={() => setShowNotif(false)}
                />
            )}
            
            {/* Main container with better padding for different screen sizes */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header section with improved responsive layout */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 mb-8">
                    <div className="w-full sm:w-auto">
                        <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
                            All Categories
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                            Manage your content categories
                        </p>
                    </div>
                    <div className="w-full sm:w-auto">
                        <Link
                            to="/create-category"
                            className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 text-white duration-150 font-medium bg-green-500 rounded-lg hover:bg-green-700 active:bg-green-800 text-sm"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5 mr-2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                            </svg>
                            Add Category
                        </Link>
                    </div>
                </div>

                {/* Search section with improved spacing and responsiveness */}
                <div className="mb-8">
                    <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search categories..."
                            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                        />
                        <button
                            type="submit"
                            className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors duration-300 ease-in-out text-sm"
                        >
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                strokeWidth={1.5} 
                                stroke="currentColor" 
                                className="w-5 h-5 mr-2"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" 
                                />
                            </svg>
                            <span className="font-medium">Search</span>
                        </button>
                    </form>
                </div>

                {/* Table section with improved responsiveness */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full table-auto">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                        Category
                                    </th>
                                    <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {tableItems.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {capitalizeLetter(item.name || 'Uncategorized')}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                                            <div className="flex items-center justify-end space-x-4">
                                                <Link 
                                                    to={`/edit-categories/${item.id}`}
                                                    className="text-gray-600 hover:text-indigo-600 transition-colors duration-200"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                    </svg>
                                                </Link>
                                                <button 
                                                    onClick={() => handleDelete(item.id)}
                                                    className="text-gray-600 hover:text-red-600 transition-colors duration-200"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pagination with improved spacing */}
                <div className="mt-6">
                    <Pagination
                        currentPage={currentPage.toString()}
                        itemsPerPage={itemsPerPage}
                        totalItems={totalItems}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>

            <ConfirmationDialog
                isOpen={isDialogOpen}
                message="Are you sure you want to delete this category?"
                onConfirm={confirmDelete}
                onCancel={cancelDelete}
            />
        </div>
    );
};

export default CategoriesTable;