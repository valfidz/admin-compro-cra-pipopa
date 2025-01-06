import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Failed from "../alerts/failAlert";
import { Link } from "react-router-dom";

const CategoryForm = () => {
    const [formData, setFormData] = useState({
    name: "",
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  const authToken = Cookies.get('token')

  const be_url = process.env.REACT_APP_BE_SITE;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      const response = await axios.post(`${be_url}/api/categories`, data, {
        headers: {
          "Authorization": `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200 || response.status === 201) {
        sessionStorage.setItem('categoryNotification', 'true');

        navigate('/categories')
      } else {
        alert("Failed to create category.");
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
      setErrorMessage("An error occured while submitting the form.");
      setShowError(true);
    }
  };

  return (
    <>
        {showError && <Failed message={errorMessage} />}

        <div className="mb-6">
            <Link
            to="/categories"
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
            Back to Categories
            </Link>
        </div>

        <form
        className="max-w-3xl mx-auto p-4 bg-white shadow-md rounded-md"
        onSubmit={handleSubmit}
        >
        <h2 className="text-2xl font-bold mb-4">Create Category</h2>

        <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="name">
            Category Name
            </label>
            <input
            type="text"
            id="name"
            name="name"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={formData.name}
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

export default CategoryForm;