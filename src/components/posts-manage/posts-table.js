import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import Success from "../alerts/successAlert";

export const PostsTable = () => {
    const [tableItems, setTableItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showNotif, setShowNotif] = useState(false);
    // const [notification, setNotification] = useState('');
    const [notifMessage, setNotifMessage] = useState('');

    const be_site = process.env.REACT_APP_BE_SITE;
    const authToken = Cookies.get('token');

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    useEffect(() => {
        const postNotification = sessionStorage.getItem('postNotification');
        if (postNotification) {
            setShowNotif(true);
            setNotifMessage('Post created successfully!');
            // setNotification(postNotification);
            sessionStorage.removeItem('postNotification');

            const timer = setTimeout(() => {
                setShowNotif(false);
                // setNotification('');
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, []); 

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`${be_site}/api/posts`, {
                    headers: {
                        'Authorization': `Bearer ${authToken}`,
                        'Content-Type': 'application/json'
                    }
                });
                setTableItems(response.data.posts);
            } catch (err) {
                const errorMessage = err.response?.data?.message || "Failed to load posts. Please try again later";
                setError(errorMessage);
                
                if (err.response?.status === 401) {
                    setError("Unauthorized access. Please login again.");
                }
            } finally {
                setLoading(false);
            }
        };

        if (authToken) {
            fetchPost();
        } else {
            setError("No authentication token found. Please login.");
            setLoading(false);
        }
    }, [authToken]);

    if (loading) {
        return <div className="text-center mt-10">Loading . . .</div>
    }

    if (error) {
        return <div className="text-center mt-10 text-red-500">{error}</div>
    }

    return (
        <>
            {showNotif && (
                <Success
                    message={notifMessage}
                    onClose={() => setShowNotif(false)}
                />
            )}
            <div className="max-w-screen-xl mx-auto mt-10 px-4 md:px-8">
                <div className="items-start justify-between md:flex">
                    <div className="max-w-lg">
                        <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
                            All posts
                        </h3>
                    </div>
                    <div className="mt-3 md:mt-0">
                        <Link
                            to="/edit-post"
                            className="inline-flex items-center px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6" className="h-6 w-6 mr-2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                            </svg>
                            Add Post
                        </Link>
                    </div>
                </div>
                <div className="mt-12 relative h-max overflow-auto">
                    <table className="w-full table-auto text-sm text-left">
                        <thead className="text-gray-600 font-medium border-b">
                            <tr>
                                <th className="py-3 pr-6">Title</th>
                                <th className="py-3 pr-6">Date</th>
                                <th className="py-3 pr-6">Status</th>
                                <th className="py-3 pr-6">Author</th>
                                <th className="py-3 pr-6">Image</th>
                                <th className="py-3 pr-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 divide-y">
                            {tableItems.map((item) => (
                                <tr key={item.id}>
                                    <td className="pr-6 py-4 whitespace-nowrap">{item.title}</td>
                                    <td className="pr-6 py-4 whitespace-nowrap">{formatDate(item.created_at)}</td>
                                    <td className="pr-6 py-4 whitespace-nowrap">
                                        <span className={`px-3 py-2 rounded-full font-semibold text-xs ${
                                            item.status == "published"
                                                ? "text-green-600 bg-green-50"
                                                : "text-blue-600 bg-blue-50"
                                        }`}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="pr-6 py-4 whitespace-nowrap">{item.author}</td>
                                    <td className="pr-6 py-4 whitespace-nowrap">
                                        {item.featured_image ? (
                                            <img
                                                src={`${be_site}/api/image/${item.featured_image}`}
                                                alt={item.title}
                                                className="h-10 w-10 object-cover rounded"
                                                onError={(e) => {
                                                    e.target.src = '/placeholder-image.jpg'; // Add a placeholder image path
                                                    e.target.onerror = null; // Prevent infinite loop
                                                }}
                                            />
                                        ) : (
                                            <div className="h-10 w-10 bg-gray-200 rounded flex items-center justify-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                        )}
                                    </td>
                                    <td className="py-4 whitespace-nowrap">
                                        <div className="flex items-center justify-end gap-4">
                                            <Link to={`/post/${item.slug}`} className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                </svg>
                                            </Link>
                                            <Link to={`/edit-post/${item.slug}`} className="text-gray-600 hover:text-indigo-600 transition-colors duration-200">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                </svg>
                                            </Link>
                                            <button className="text-gray-600 hover:text-red-600 transition-colors duration-200">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
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
        </>
    );
};

export default PostsTable;