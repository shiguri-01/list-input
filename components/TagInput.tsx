
import React, { useState, useRef, useEffect } from 'react';
import { XIcon } from './icons/XIcon';

interface TagInputProps {
  tags: string[];
  setTags: (tags: string[]) => void;
  placeholder?: string;
}

const TagInput: React.FC<TagInputProps> = ({ tags, setTags, placeholder }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault();
      const newTag = inputValue.trim();
      if (newTag && !tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      setInputValue('');
    } else if (event.key === 'Backspace' && inputValue === '' && tags.length > 0) {
      setTags(tags.slice(0, -1));
    }
  };

  const handleRemoveTag = (indexToRemove: number) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };
  
  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div
      className={`flex items-center flex-wrap gap-2 p-2.5 border rounded-lg transition-all duration-200 cursor-text
        ${isFocused ? 'border-blue-500 ring-2 ring-blue-500/30' : 'border-gray-600 hover:border-gray-500'} 
        bg-gray-850`}
      onClick={handleContainerClick}
    >
      {tags.map((tag, index) => (
        <span
          key={index}
          className="flex items-center gap-1.5 bg-blue-500/20 text-blue-300 text-sm font-medium px-2.5 py-1 rounded-md"
        >
          {tag}
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent container click
              handleRemoveTag(index);
            }}
            className="text-blue-400 hover:text-white transition-colors duration-200"
            aria-label={`Remove ${tag}`}
          >
            <XIcon className="h-4 w-4" />
          </button>
        </span>
      ))}
      <input
        ref={inputRef}
        id="tags-input"
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={tags.length === 0 ? placeholder : ''}
        className="flex-grow bg-transparent text-gray-200 placeholder-gray-500 text-sm outline-none min-w-[100px]"
        size={1}
      />
    </div>
  );
};

export default TagInput;
