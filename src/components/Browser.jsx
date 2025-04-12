// src/components/Browser.jsx
import React from "react";

const Browser = () => {
  const openBrave = () => {
    // Open Brave's search engine or homepage URL
    window.open("https://search.brave.com", "_blank");
  };

  return (
    <div>
      <button
        onClick={openBrave}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Open Brave Search
      </button>
    </div>
  );
};

export default Browser;
