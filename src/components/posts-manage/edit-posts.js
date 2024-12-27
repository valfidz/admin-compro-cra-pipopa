import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Failed from "../alerts/failAlert";
import { Link } from "react-router-dom";

const EditablePost = (props) => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    featuredImage: null,
    content: "",
    author: "",
    meta_title: "",
    meta_description: "",
    keywords: "",
    status: "draft" // Add default status
  });
  const postId = props.postId;
  const [categories, setCategories] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const [existingImage, setExistingImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  const authToken = Cookies.get('token')

  const be_url = process.env.REACT_APP_BE_SITE;

  useEffect(() => {
    const fetchPostData = async () => {
        try {
            const response = await axios.get(`${be_url}/api/posts/${postId}`, {
                headers: {'Authorization': `Bearer ${authToken}`}
            });
            const data = response.data;
            setFormData({
                title: data.title,
                category: data.category_id,
                featuredImage: data.featured_image,
                content: data.content,
                author: data.author,
                meta_title: data.meta_title,
                meta_description: data.meta_description,
                keywords: data.keywords,
                status: data.status
            })
            setExistingImage(data.featured_image);
            setPreviewImage(data.featured_image);
        } catch (error) {
            console.error("Error fetching post data", error);
            setErrorMessage("Error loading post data");
            setShowError(true);
        }
    };

    if (postId) {
        fetchPostData();
    }
  }, [be_url, postId])

  useEffect(() => {
    const fetchCategories = async () => {
        try {
            const response = await axios.get(`${be_url}/api/categories`);
            setCategories(response.data.result);
            console.log("categories", response.data.result)
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    fetchCategories();
  }, [be_url]);

  const capitalizeLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      featuredImage: e.target.files[0],
    }));
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleQuillChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      content: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      const response = await axios.put(`${be_url}/api/posts/${postId}`, data, {
        headers: {
          "Authorization": `Bearer ${authToken}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200 || response.status === 201) {
        // alert("Post created successfully!");
        sessionStorage.setItem('postNotification', 'true');

        navigate('/manage-posts')
      } else {
        alert("Failed to create post.");
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
      setErrorMessage("An error occured while submitting the form.");
      setShowError(true);
    //   alert("An error occurred while submitting the form.");
    }
  };

  return (
    <>
        {showError && <Failed message={errorMessage} />}

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
                    to={`/post/${postId}`}
                    className="inline-flex items-center gap-2 text-sm text-black bg-yellow-400 hover:text-white hover:bg-yellow-700 px-4 py-2 rounded-lg transition-colors duration-150"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z" />
                    </svg>
                    Go to Post
                </Link>
            </div>

        <form
        className="max-w-3xl mx-auto p-4 bg-white shadow-md rounded-md"
        onSubmit={handleSubmit}
        >
        <h2 className="text-2xl font-bold mb-4">Edit Post</h2>

        <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="title">
            Post Title
            </label>
            <input
            type="text"
            id="title"
            name="title"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={formData.title}
            onChange={handleInputChange}
            />
        </div>

        <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Post Status</label>
            <div className="flex gap-4">
            <div className="flex items-center">
                <input
                type="radio"
                id="draft"
                name="status"
                value="draft"
                checked={formData.status === "draft"}
                onChange={handleInputChange}
                className="mr-2"
                />
                <label htmlFor="draft" className="text-sm">
                Draft
                </label>
            </div>
            <div className="flex items-center">
                <input
                type="radio"
                id="published"
                name="status"
                value="published"
                checked={formData.status === "published"}
                onChange={handleInputChange}
                className="mr-2"
                />
                <label htmlFor="published" className="text-sm">
                Published
                </label>
            </div>
            </div>
        </div>

        <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="category">
            Category
            </label>
            <select
                id="category"
                name="category"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={formData.category}
                onChange={handleInputChange}
            >
                <option value="">Select a category</option>
                {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                        {capitalizeLetter(category.name)}
                    </option>
                ))}
            </select>
        </div>

        <div className="mb-4">
            <label
            className="block text-sm font-medium mb-1"
            htmlFor="featuredImage"
            >
            Featured Image
            </label>
            <input
            type="file"
            id="featuredImage"
            name="featuredImage"
            className="w-full p-2 border border-gray-300 rounded-md"
            onChange={handleFileChange}
            />
            {previewImage && (
                <img
                    src={`${be_url}/api/image/${previewImage}`}
                    alt="Preview"
                    className="mt-2 max-h-48 border border-gray-300 rounded-md"
                />
            )}
        </div>

        <div className="mb-14">
            <label className="block text-sm font-medium mb-1" htmlFor="content">
            Post Content
            </label>
            <ReactQuill
            value={formData.content}
            onChange={handleQuillChange}
            className="bg-white"
            style={{ height: "300px" }}
            />
        </div>

        <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="author">
            Author
            </label>
            <input
            type="text"
            id="author"
            name="author"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={formData.author}
            onChange={handleInputChange}
            />
        </div>

        <h2 className="text-2xl font-bold mb-4">SEO Metadata</h2>

        <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="meta_title">
            Meta Title
            </label>
            <input
            type="text"
            id="meta_title"
            name="meta_title"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={formData.meta_title}
            onChange={handleInputChange}
            />
        </div>

        <div className="mb-4">
            <label
            className="block text-sm font-medium mb-1"
            htmlFor="meta_description"
            >
            Meta Description
            </label>
            <textarea
            id="meta_description"
            name="meta_description"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={formData.meta_description}
            onChange={handleInputChange}
            ></textarea>
        </div>

        <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="keywords">
            Keywords
            </label>
            <input
            type="text"
            id="keywords"
            name="keywords"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={formData.keywords}
            onChange={handleInputChange}
            />
        </div>

        <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
            Submit
        </button>
        </form>
    </>
  );
};

export default EditablePost;