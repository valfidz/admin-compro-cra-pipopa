import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import DOMPurify from "dompurify";

export const Post = (props) => {
    const postId = props.postId;
    const be_site = process.env.REACT_APP_BE_SITE;
    const authToken = Cookies.get('token');
    const [postDetail, setPostDetail] = useState({});
    const [imageName, setImageName] = useState('');

    useEffect(() => {
        let isMounted = true;

        const fetchPostDetails = async () => {
            try {
                const response = await axios.get(`${be_site}/api/posts/${postId}`, {
                    headers: {'Authorization': `Bearer ${authToken}`}
                });
        
                if (isMounted) {
                    setPostDetail(response.data);
                    setImageName(response.data.featured_image);
                }
            } catch (error) {
                if (isMounted) {
                    console.error("Error fetching post", error)
                }
            }
        }

        fetchPostDetails();

        return () => {
            isMounted = false;
        }
    }, [postId, be_site, authToken]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
    };

    const sanitizedContent = (content) => {
        return DOMPurify.sanitize(content);
    }

    const capitalizeLetter = (string) => {
        if (!string) {
            return ''
        }
        return string.charAt(0).toUpperCase() + string.slice(1);
      }

    const hasTags = postDetail.tags && Array.isArray(postDetail.tags) && postDetail.tags.length > 0;
    const hasKeywords = postDetail.keywords && Array.isArray(postDetail.keywords) && postDetail.keywords.length > 0;

    return (
        <>
            <div className="mb-6 flex justify-between">
                <Link
                    to="/manage-posts"
                    className="inline-flex items-center gap-2 text-sm text-white bg-green-500 hover:bg-green-700 px-4 py-2 rounded-lg transition-colors duration-150"
                >
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        strokeWidth={2} 
                        stroke="currentColor" 
                        className="w-5 h-5"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" 
                        />
                    </svg>
                    Back to Posts
                </Link>

                <Link
                    to={`/edit-post/${postId}`}
                    className="inline-flex items-center gap-2 text-sm text-black bg-yellow-400 hover:text-white hover:bg-yellow-700 px-4 py-2 rounded-lg transition-colors duration-150"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
                    Edit Post
                </Link>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 shadow-md">
                <main className="pt-8 pb-16">
                    {/* Featured Image Section */}
                    <div className="relative rounded-lg overflow-hidden mb-12">
                        <div className="h-64 sm:h-72 md:h-80 relative">
                            <img 
                                src={`${be_site}/api/image/${imageName}`}
                                alt="Featured post"
                                className="w-full h-[500px] object-cover rounded-lg"
                            />
                            <div 
                                className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/30 to-transparent rounded-lg"
                            />
                        </div>
                        
                        {/* Content overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                            <div className="max-w-3xl">
                                <span className="inline-flex px-3 py-1 text-sm font-medium text-white bg-teal-500 rounded-full mb-3">
                                    {capitalizeLetter(postDetail.category_name || 'Uncategorized')}
                                </span>
                                
                                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-4 break-words leading-snug">
                                    {postDetail.title}
                                </h1>
                                
                                <div className="flex items-center">
                                    <img 
                                        src="/cropped_logo.png"
                                        alt="Author profile"
                                        className="h-8 w-8 sm:h-10 sm:w-10 rounded-full mr-3 object-cover border border-white/50" 
                                    />
                                    <div>
                                        <p className="text-white font-medium">
                                            {postDetail.author}
                                        </p>
                                        <p className="text-gray-300 text-sm">
                                            {formatDate(postDetail.created_at)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Article Content */}
                    <article className="max-w-3xl mx-auto bg-white rounded-xl p-8">
                        <div
                            dangerouslySetInnerHTML={{ 
                                __html: sanitizedContent(postDetail.content) 
                            }}
                            className="prose prose-lg max-w-none 
                                prose-headings:text-gray-900 
                                prose-headings:font-semibold
                                prose-headings:mb-2
                                prose-headings:my-2
                                prose-p:mt-2
                                prose-ul:list-disc 
                                prose-ul:pl-5
                                prose-ol:list-decimal 
                                prose-ol:pl-5
                                text-gray-800 
                                leading-tight
                                prose-p:my-2
                                prose-ul:my-2
                                prose-ol:my-2"
                        />

                        {/* Tags and Keywords Section */}
                        <div className="mt-24">
                            {/* Tags */}
                            {hasTags && (
                                <div className="mb-8">
                                    <div className="flex items-center gap-2 text-gray-900 mb-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z" />
                                        </svg>
                                        <h3 className="font-semibold text-lg">Tags</h3>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {postDetail.tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors cursor-pointer"
                                        >
                                            {tag}
                                        </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Keywords */}
                            {hasKeywords && (
                                <div>
                                    <div className="flex items-center gap-2 text-gray-900 mb-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5-3.9 19.5m-2.1-19.5-3.9 19.5" />
                                        </svg>
                                        <h3 className="font-semibold text-lg">Keywords</h3>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {postDetail.keywords.map((keyword, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors cursor-pointer"
                                        >
                                            {keyword}
                                        </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </article>
                </main>
            </div>
        </>
    );
};

export default Post;