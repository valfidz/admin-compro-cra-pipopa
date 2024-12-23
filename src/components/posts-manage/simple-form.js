import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Failed from "../alerts/failAlert";

const PostForm = () => {
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
  const [categories, setCategories] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  const authToken = Cookies.get('token')

  const be_url = process.env.REACT_APP_BE_SITE;

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
      const response = await axios.post(`${be_url}/api/posts`, data, {
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
        <form
        className="max-w-3xl mx-auto p-4 bg-white shadow-md rounded-md"
        onSubmit={handleSubmit}
        >
        <h2 className="text-2xl font-bold mb-4">Create Post</h2>

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
                    src={previewImage}
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

export default PostForm;