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

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <main className="pt-8 pb-16">
                {/* Featured Image Section */}
                <div className="relative rounded-lg overflow-hidden mb-12">
                    <div className="h-64 sm:h-72 md:h-80 relative">
                        <img 
                            src={`${be_site}/api/image/${imageName}`}
                            alt="Featured post image"
                            className="w-full h-full object-cover rounded-lg"
                        />
                        <div 
                            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent rounded-lg"
                        />
                    </div>
                    
                    {/* Content overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                        <div className="max-w-3xl">
                            <span className="inline-flex px-3 py-1 text-sm font-medium text-gray-200 bg-black/80 rounded-full mb-3">
                                {postDetail.category_id}
                            </span>
                            
                            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-4 break-words leading-snug">
                                {postDetail.title}
                            </h1>
                            
                            <div className="flex items-center">
                                <img 
                                    src="/vertikal_logo.jpg"
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
                <article className="max-w-3xl mx-auto">
                    <div
                        dangerouslySetInnerHTML={{ 
                            __html: sanitizedContent(postDetail.content) 
                        }}
                        className="prose prose-lg max-w-none text-gray-800 leading-relaxed
                            prose-headings:text-gray-900 prose-headings:font-semibold
                            prose-p:text-gray-800 prose-p:leading-relaxed
                            prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                            prose-strong:text-gray-900
                            prose-blockquote:text-gray-700 prose-blockquote:border-l-gray-300
                            prose-ul:text-gray-800 prose-ol:text-gray-800
                            prose-li:marker:text-gray-500"
                    />
                </article>
            </main>
        </div>
    );
};

export default Post;