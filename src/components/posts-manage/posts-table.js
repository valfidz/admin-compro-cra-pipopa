import React from "react";
import { Link } from "react-router-dom";

export const PostsTable = () => {
    const tableItems = [
        {
            title: "Solo learn app",
            date: "Oct 9, 2023",
            status: "Active",
            image: "$35.000",
            description: "Monthly subscription"
        },
        {
            title: "Window wrapper",
            date: "Oct 12, 2023",
            status: "Active",
            image: "$12.000",
            description: "Monthly subscription"
        },
        {
            title: "Unity loroin",
            date: "Oct 22, 2023",
            status: "Archived",
            image: "$20.000",
            description: "Annually subscription"
        },
        {
            title: "Background remover",
            date: "Jan 5, 2023",
            status: "Active",
            image: "$5.000",
            description: "Monthly subscription"
        },
        {
            title: "Colon tiger",
            date: "Jan 6, 2023",
            status: "Active",
            image: "$9.000",
            description: "Annually subscription"
        },
    ];

    return (
        <div className="max-w-screen-xl mx-auto mt-10 px-4 md:px-8">
            <div className="items-start justify-between md:flex">
                <div className="max-w-lg">
                    <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
                        All posts
                    </h3>
                    <p className="text-gray-600 mt-2">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    </p>
                </div>
                <div className="mt-3 md:mt-0">
                    <Link
                        to="/edit-post"
                        className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
                    >
                        Add post
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
                            <th className="py-3 pr-6">Description</th>
                            <th className="py-3 pr-6">Image</th>
                            <th className="py-3 pr-6 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 divide-y">
                        {tableItems.map((item, idx) => (
                            <tr key={idx}>
                                <td className="pr-6 py-4 whitespace-nowrap">{item.title}</td>
                                <td className="pr-6 py-4 whitespace-nowrap">{item.date}</td>
                                <td className="pr-6 py-4 whitespace-nowrap">
                                    <span className={`px-3 py-2 rounded-full font-semibold text-xs ${
                                        item.status == "Active"
                                            ? "text-green-600 bg-green-50"
                                            : "text-blue-600 bg-blue-50"
                                    }`}>
                                        {item.status}
                                    </span>
                                </td>
                                <td className="pr-6 py-4 whitespace-nowrap">{item.description}</td>
                                <td className="pr-6 py-4 whitespace-nowrap">{item.image}</td>
                                <td className="py-4 whitespace-nowrap">
                                    <div className="flex items-center justify-center gap-4">
                                        <a href="/post" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                            </svg>
                                        </a>
                                        <a href="/edit-post" className="text-gray-600 hover:text-indigo-600 transition-colors duration-200">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                            </svg>
                                        </a>
                                        <a href="#" className="text-gray-600 hover:text-red-600 transition-colors duration-200">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                            </svg>
                                        </a>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PostsTable;