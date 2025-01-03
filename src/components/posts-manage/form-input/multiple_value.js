import React, { useState, useRef } from 'react';

const TagInput = ({ tags, setTags, placeholder, name }) => {
//   const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    // Add tags when comma is typed
    if (value.endsWith(',')) {
      const newTag = value.slice(0, -1).trim();
      if (newTag && !tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      setInputValue('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
      // Remove last tag when backspace is pressed and input is empty
      const newTags = [...tags];
      newTags.pop();
      setTags(newTags);
    }

    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      const newTag = inputValue.trim();
      if (!tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      setInputValue('');
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div 
      className="w-full border border-gray-300 rounded-lg p-2 min-h-12 cursor-text"
      onClick={handleContainerClick}
    >
        <div className='flex flex-wrap gap-2'>
            {tags.map((tag, index) => (
                <span
                key={index}
                className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md flex items-center gap-1 text-sm flex-shrink-0"
                >
                {tag}
                <button
                    onClick={(e) => {
                    e.stopPropagation();
                    removeTag(tag);
                    }}
                    className="hover:text-blue-600 font-medium ml-1"
                >
                    ×
                </button>
                </span>
            ))}
            <div className='flex-1 min-w-0'>
                <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    name={name}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    className="outline-none w-full text-sm"
                    placeholder={tags.length === 0 ? "Type and press comma or enter to add tags" : ""}
                />
            </div>
        </div>
    </div>
  );
};

export default TagInput;