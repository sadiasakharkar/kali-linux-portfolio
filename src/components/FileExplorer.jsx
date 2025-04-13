// src/components/FileExplorer.jsx
import React from "react";

const FileExplorer = ({ onClose }) => {
  return (
    <div className="absolute top-20 left-20 w-[500px] h-[400px] bg-[#1e1e1e] border border-gray-600 rounded-lg shadow-lg text-white font-mono">
      {/* Header */}
      <div className="bg-gray-800 p-2 flex justify-between items-center cursor-move">
        <span>Files</span>
        <button onClick={onClose} className="text-red-500 hover:text-red-700">
          X
        </button>
      </div>

      {/* Content */}
      <div className="p-4 grid grid-cols-3 gap-4">
        <div className="text-center">
          <img src="/folder-icon.png" alt="Folder" className="w-12 mx-auto" />
          <p>Projects</p>
        </div>
        <div className="text-center">
          <img src="/folder-icon.png" alt="Folder" className="w-12 mx-auto" />
          <p>Certs</p>
        </div>
        <div className="text-center">
          <img src="/folder-icon.png" alt="Folder" className="w-12 mx-auto" />
          <p>Hackathons</p>
        </div>
      </div>
    </div>
  );
};

export default FileExplorer;
