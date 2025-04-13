import React, { useState } from "react";

const TextEditor = ({ onClose }) => {
  const [content, setContent] = useState("");

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  return (
    <div className="w-96 h-96 bg-gray-900 text-white p-4 rounded-lg shadow-lg relative">
      {/* Top Bar */}
      <div className="flex justify-between items-center text-sm">
        <span>Untitled-1</span>
        <button
          onClick={onClose}
          className="bg-red-500 text-white p-1 rounded-full text-xs"
        >
          ❌
        </button>
      </div>
      {/* Text Editor Area */}
      <textarea
        value={content}
        onChange={handleChange}
        className="w-full h-full bg-gray-800 text-white p-2 rounded-md mt-2"
        style={{ fontFamily: "monospace", fontSize: "14px" }}
        placeholder="Start typing..."
      />
    </div>
  );
};

export default TextEditor;
