import React, { useState } from 'react';

// Simple SVG Icons as components
const Icons = {
  Grip: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="12" r="1" /><circle cx="9" cy="5" r="1" /><circle cx="9" cy="19" r="1" />
      <circle cx="15" cy="12" r="1" /><circle cx="15" cy="5" r="1" /><circle cx="15" cy="19" r="1" />
    </svg>
  ),
  Delete: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  ),
  Image: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path d="M21 15l-5-5L5 21" />
    </svg>
  ),
  Text: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4 7 4 4 20 4 20 7" />
      <line x1="9" y1="20" x2="15" y2="20" />
      <line x1="12" y1="4" x2="12" y2="20" />
    </svg>
  )
};

const PostEditForm = () => {
  const [postData, setPostData] = useState({
    title: 'Pellentesque a consectetur velit, ac molestie ipsum. Donec sodales, massa et auctor.',
    category: 'Nutrition',
    author: 'Mike Sullivan',
    date: '14 Aug',
    imageUrl: '/api/placeholder/2100/800',
    // SEO fields
    metaTitle: '',
    metaDescription: '',
    canonical: '',
    keywords: '',
    ogTitle: '',
    ogDescription: '',
    ogImage: '',
  });

  const [contentBlocks, setContentBlocks] = useState([
    { id: '1', type: 'paragraph', content: 'Advantage old had otherwise sincerity dependent additions...' },
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBlockChange = (id, value) => {
    setContentBlocks(prev =>
      prev.map(block =>
        block.id === id ? { ...block, content: value } : block
      )
    );
  };

  const addBlock = (type) => {
    const newBlock = {
      id: Date.now().toString(),
      type,
      content: type === 'paragraph' ? '' : '/api/placeholder/800/400'
    };
    setContentBlocks(prev => [...prev, newBlock]);
  };

  const removeBlock = (id) => {
    setContentBlocks(prev => prev.filter(block => block.id !== id));
  };

  const moveBlock = (index, direction) => {
    setContentBlocks(prev => {
      const newBlocks = [...prev];
      if (
        (direction === 'up' && index > 0) ||
        (direction === 'down' && index < newBlocks.length - 1)
      ) {
        const newIndex = direction === 'up' ? index - 1 : index + 1;
        [newBlocks[index], newBlocks[newIndex]] = [newBlocks[newIndex], newBlocks[index]];
      }
      return newBlocks;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', {
      ...postData,
      contentBlocks,
    });
  };

  const BlockComponent = ({ block, index, total }) => {
    return (
      <div className="group relative flex gap-2 items-start bg-white p-4 border border-gray-200 rounded-lg mb-4">
        <div className="flex flex-col items-center gap-2">
          <button
            type="button"
            onClick={() => moveBlock(index, 'up')}
            disabled={index === 0}
            className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50"
            title="Move up"
          >
            ↑
          </button>
          <div className="text-gray-400">
            <Icons.Grip />
          </div>
          <button
            type="button"
            onClick={() => moveBlock(index, 'down')}
            disabled={index === total - 1}
            className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50"
            title="Move down"
          >
            ↓
          </button>
        </div>
        
        <div className="flex-grow">
          {block.type === 'paragraph' ? (
            <textarea
              value={block.content}
              onChange={(e) => handleBlockChange(block.id, e.target.value)}
              placeholder="Type your content here..."
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          ) : (
            <div className="space-y-2">
              <input
                type="text"
                value={block.content}
                onChange={(e) => handleBlockChange(block.id, e.target.value)}
                placeholder="Image URL"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
              <img 
                src={block.content} 
                alt="Preview" 
                className="max-w-full h-auto rounded-md"
              />
            </div>
          )}
        </div>

        <div>
          <button
            type="button"
            onClick={() => removeBlock(block.id)}
            className="p-1 text-gray-400 hover:text-red-500"
            title="Remove block"
          >
            <Icons.Delete />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-screen-xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow">
        <div className="p-6 space-y-6">
          {/* Content Section */}
          <div className="space-y-6">
            <h2 className="text-lg font-medium text-gray-900">Content</h2>
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Post Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={postData.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <input
                type="text"
                id="category"
                name="category"
                value={postData.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
                Featured Image URL
              </label>
              <input
                type="text"
                id="imageUrl"
                name="imageUrl"
                value={postData.imageUrl}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Post Content
                </label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => addBlock('paragraph')}
                    className="inline-flex items-center gap-1 px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <Icons.Text />
                    Add Text
                  </button>
                  <button
                    type="button"
                    onClick={() => addBlock('image')}
                    className="inline-flex items-center gap-1 px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <Icons.Image />
                    Add Image
                  </button>
                </div>
              </div>
              
              <div className="space-y-2">
                {contentBlocks.map((block, index) => (
                  <BlockComponent
                    key={block.id}
                    block={block}
                    index={index}
                    total={contentBlocks.length}
                  />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
                  Author
                </label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  value={postData.author}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="text"
                  id="date"
                  name="date"
                  value={postData.date}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* SEO Section */}
          <div className="space-y-6 pt-6 border-t border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">SEO Settings</h2>
            <div>
              <label htmlFor="metaTitle" className="block text-sm font-medium text-gray-700 mb-1">
                Meta Title
              </label>
              <input
                type="text"
                id="metaTitle"
                name="metaTitle"
                value={postData.metaTitle}
                onChange={handleChange}
                placeholder="SEO optimized title (55-60 characters)"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="metaDescription" className="block text-sm font-medium text-gray-700 mb-1">
                Meta Description
              </label>
              <textarea
                id="metaDescription"
                name="metaDescription"
                value={postData.metaDescription}
                onChange={handleChange}
                placeholder="SEO optimized description (150-160 characters)"
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="keywords" className="block text-sm font-medium text-gray-700 mb-1">
                Keywords
              </label>
              <input
                type="text"
                id="keywords"
                name="keywords"
                value={postData.keywords}
                onChange={handleChange}
                placeholder="Comma-separated keywords"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="canonical" className="block text-sm font-medium text-gray-700 mb-1">
                Canonical URL
              </label>
              <input
                type="text"
                id="canonical"
                name="canonical"
                value={postData.canonical}
                onChange={handleChange}
                placeholder="https://yourdomain.com/post-url"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* <div className="space-y-6">
              <h3 className="text-sm font-medium text-gray-700">Social Media Preview</h3>
              <div>
                <label htmlFor="ogTitle" className="block text-sm font-medium text-gray-700 mb-1">
                  Open Graph Title
                </label>
                <input
                  type="text"
                  id="ogTitle"
                  name="ogTitle"
                  value={postData.ogTitle}
                  onChange={handleChange}
                  placeholder="Title for social media sharing"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="ogDescription" className="block text-sm font-medium text-gray-700 mb-1">
                  Open Graph Description
                </label>
                <textarea
                  id="ogDescription"
                  name="ogDescription"
                  value={postData.ogDescription}
                  onChange={handleChange}
                  placeholder="Description for social media sharing"
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="ogImage" className="block text-sm font-medium text-gray-700 mb-1">
                  Open Graph Image URL
                </label>
                <input
                  type="text"
                  id="ogImage"
                  name="ogImage"
                  value={postData.ogImage}
                  onChange={handleChange}
                  placeholder="Image URL for social media sharing"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div> */}
         </div>
        </div>

        {/* Form Actions */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-4 rounded-b-lg">
          <button
            type="button"
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostEditForm;