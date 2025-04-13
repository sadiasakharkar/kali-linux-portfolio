// src/components/VSCodeEditor.jsx
import React from "react";

const VSCodeEditor = ({ onClose }) => {
  // URL for VS Code Web
  const vsCodeRepoUrl =
    "https://vscode.dev/github/sadiasakharkar/kali-linux-portfolio";

  // Open VS Code Web with the repository URL
  window.open(vsCodeRepoUrl, "_blank");

  return (
    <div className="w-96 h-96 bg-gray-900 text-white p-4 rounded-lg shadow-lg relative">
      <div className="flex justify-between items-center text-sm">
        <span>VS Code</span>
        <button
          onClick={onClose}
          className="bg-red-500 text-white p-1 rounded-full text-xs"
        >
          ❌
        </button>
      </div>
      <div className="mt-4 text-sm">
        <p>Opening repository in VS Code for Web...</p>
      </div>
    </div>
  );
};

export default VSCodeEditor;
