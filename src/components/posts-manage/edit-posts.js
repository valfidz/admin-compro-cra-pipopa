import React, { useState } from 'react';

export const EditablePost = () => {
    const [postData, setPostData] = useState({
        category: "Nutrition",
        title: "Sample Title",
        author: "John Doe",
        date: "14 Aug",
        content: ["First paragraph", "Second paragraph"],
        quote: "Sample quote",
        subtitle: "Sample subtitle",
        additionalContent: ["Additional paragraph 1", "Additional paragraph 2"]
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically send the updated data to your backend
        console.log('Updated post data:', postData);
    };

    return (
        <form onSubmit={handleSubmit} className="px-4 lg:px-0 mt-12 max-w-screen-md mx-auto">
            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <input
                        type="text"
                        value={postData.category}
                        onChange={(e) => setPostData({...postData, category: e.target.value})}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <textarea
                        value={postData.title}
                        onChange={(e) => setPostData({...postData, title: e.target.value})}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                        rows={2}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Author</label>
                        <input
                            type="text"
                            value={postData.author}
                            onChange={(e) => setPostData({...postData, author: e.target.value})}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Date</label>
                        <input
                            type="text"
                            value={postData.date}
                            onChange={(e) => setPostData({...postData, date: e.target.value})}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Main Content</label>
                    {postData.content.map((paragraph, index) => (
                        <textarea
                            key={index}
                            value={paragraph}
                            onChange={(e) => {
                                const newContent = [...postData.content];
                                newContent[index] = e.target.value;
                                setPostData({...postData, content: newContent});
                            }}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 mb-4"
                            rows={4}
                        />
                    ))}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Quote</label>
                    <textarea
                        value={postData.quote}
                        onChange={(e) => setPostData({...postData, quote: e.target.value})}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                        rows={3}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Subtitle</label>
                    <input
                        type="text"
                        value={postData.subtitle}
                        onChange={(e) => setPostData({...postData, subtitle: e.target.value})}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Additional Content</label>
                    {postData.additionalContent.map((paragraph, index) => (
                        <textarea
                            key={index}
                            value={paragraph}
                            onChange={(e) => {
                                const newContent = [...postData.additionalContent];
                                newContent[index] = e.target.value;
                                setPostData({...postData, additionalContent: newContent});
                            }}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 mb-4"
                            rows={4}
                        />
                    ))}
                </div>

                <div className="flex justify-end space-x-3">
                    <button
                        type="submit"
                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </form>
    );
};