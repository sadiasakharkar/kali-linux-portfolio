import React, { useState, useRef, useEffect } from "react";
import { Folder, FileText } from "lucide-react";
import FileViewer from "./FileViewer";

const FileExplorer = ({ onClose, isActive }) => {
  const [isResizing, setIsResizing] = useState(false);
  const [width, setWidth] = useState(550);
  const [height, setHeight] = useState(500);
  const fileExplorerRef = useRef(null);
  const [openFile, setOpenFile] = useState(null);

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsResizing(true);
  };

  const handleMouseMove = (e) => {
    if (isResizing) {
      const newWidth =
        e.clientX - fileExplorerRef.current.getBoundingClientRect().left;
      const newHeight =
        e.clientY - fileExplorerRef.current.getBoundingClientRect().top;
      setWidth(Math.max(newWidth, 350)); // Set minimum width
      setHeight(Math.max(newHeight, 300)); // Set minimum height
    }
  };

  const handleMouseUp = () => setIsResizing(false);

  useEffect(() => {
    if (isResizing) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing]);

  const items = [
    { name: "About_Sadia.txt", type: "file" },
    { name: "Projects", type: "folder" },
    { name: "Hackathons", type: "folder" },
    { name: "Certifications", type: "folder" },
    { name: "Resume.pdf", type: "file" },
  ];

  return (
    <>
      <div
        ref={fileExplorerRef}
        className={`absolute top-12 left-12 rounded-md border border-green-500 shadow-lg ${
          isActive ? "block" : "hidden"
        }`}
        style={{
          width: `${width}px`,
          height: `${height}px`,
          backgroundColor: "#0a0a0a",
        }}
      >
        {/* Title Bar */}
        <div className="flex justify-between items-center bg-[#101820] px-4 py-2 rounded-t-md text-green-400 font-mono text-sm border-b border-green-700">
          <span>~/Documents/</span>
          <button onClick={onClose} className="hover:text-red-500">
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-4 text-[#98d1ac] font-mono text-xs overflow-y-auto grid grid-cols-2 gap-4">
          {items.map((item, index) => (
            <div
              key={index}
              onClick={() => setOpenFile(item.name)}
              className="flex flex-col items-center justify-center p-2 border border-green-800 rounded-md hover:bg-[#101820] cursor-pointer transition duration-150"
            >
              {item.type === "folder" ? (
                <Folder className="text-green-300 w-8 h-8" />
              ) : (
                <FileText className="text-green-300 w-8 h-8" />
              )}
              <span className="mt-1 text-center">{item.name}</span>
            </div>
          ))}
        </div>

        {/* Resizer */}
        <div
          onMouseDown={handleMouseDown}
          className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 cursor-se-resize"
        />
      </div>

      {/* File Content Popup */}
      {openFile && (
        <FileViewer fileName={openFile} onClose={() => setOpenFile(null)} />
      )}
    </>
  );
};

export default FileExplorer;
