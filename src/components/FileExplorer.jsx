import React, { useState, useRef } from "react";

const FileExplorer = ({ onClose, isActive }) => {
  const [isResizing, setIsResizing] = useState(false);
  const [width, setWidth] = useState(500); // Initial width
  const [height, setHeight] = useState(600); // Initial height
  const fileExplorerRef = useRef(null);
  const resizeRef = useRef(null);

  const handleMouseDown = (e) => {
    e.preventDefault(); // Prevent default action, for example, dragging
    setIsResizing(true);
  };

  const handleMouseMove = (e) => {
    if (isResizing) {
      const newWidth =
        e.clientX - fileExplorerRef.current.getBoundingClientRect().left;
      const newHeight =
        e.clientY - fileExplorerRef.current.getBoundingClientRect().top;
      setWidth(Math.max(newWidth, 300)); // Minimum width of 300px
      setHeight(Math.max(newHeight, 300)); // Minimum height of 300px
    }
  };

  const handleMouseUp = () => {
    setIsResizing(false);
  };

  // Add event listeners for mouse move and up events to handle resizing
  React.useEffect(() => {
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

  return (
    <div
      ref={fileExplorerRef}
      className={`absolute top-10 left-10 bg-[#121212] border-2 border-gray-800 rounded-lg shadow-lg z-50 ${
        isActive ? "block" : "hidden"
      }`}
      style={{
        width: `${width}px`,
        height: `${height}px`,
      }}
    >
      {/* Title Bar */}
      <div className="flex justify-between items-center bg-[#1a1a1a] px-4 py-2 rounded-t-lg">
        <h2 className="text-white font-semibold text-lg">~ About Me</h2>
        <button onClick={onClose} className="text-white hover:text-red-500">
          X
        </button>
      </div>

      {/* Personal Information */}
      <div
        className="text-green-400 text-xs px-4 py-3 font-mono space-y-2 overflow-y-auto"
        style={{ maxHeight: "calc(80vh - 60px)" }}
      >
        <div>
          <span className="font-semibold">Name:</span> Sadia Sakharkar
        </div>
        <div>
          <span className="font-semibold">Description:</span> Computer
          Engineering Student | Software Development and AI/ML Enthusiast
        </div>

        <div>
          <span className="font-semibold">Email:</span>
          <a
            href="mailto:sakharkarsadia@gmail.com"
            className="text-blue-400 hover:text-white"
          >
            sakharkarsadia@gmail.com
          </a>
        </div>

        <div>
          <span className="font-semibold">GitHub:</span>
          <a
            href="https://github.com/yourusername"
            className="text-blue-400 hover:text-white"
          >
            github.com/yourusername
          </a>
        </div>

        <div>
          <span className="font-semibold">Location:</span> India - 402103
        </div>

        <div>
          <span className="font-semibold">Skills:</span> C, C++, Java, Python,
          SQL, HTML, CSS, JavaScript, PHP
        </div>

        <div>
          <span className="font-semibold">Education:</span>
        </div>
        <div className="pl-4">
          <div>
            <span className="font-semibold">Diploma:</span> Computer Engineering
            - Dr. Babasaheb Ambedkar Technological University, Lonere
          </div>
          <div>CGPA: [--] | Year of Completion: [2022]</div>
          <div>
            Relevant Courses: Data Structures, Object-Oriented Programming,
            Database Management Systems
          </div>
        </div>

        <div className="pl-4 mt-2">
          <div>
            <span className="font-semibold">SSC:</span> INT Academy English
            School, Vani-Purar
          </div>
          <div>Percentage: 89.20% | Year of Completion: [2022]</div>
        </div>

        {/* Hackathons Section */}
        <div className="mt-4">
          <span className="font-semibold">Hackathons:</span>
        </div>
        <div className="pl-4">
          <div>
            <span className="font-semibold">
              CodeBits 3.0 (March 6-7, 2025):
            </span>
            <br />
            Developed an AI-powered ecosystem for education with features like
            dropout prediction, smart attendance, plagiarism detection, and
            academic integrity validation.
          </div>
          <div>
            <span className="font-semibold">CodeCratz 2025:</span>
            <br />
            Developed an Event Handling platform with an innovative and dynamic
            approach for managing events.
          </div>
          <div>
            <span className="font-semibold">Smart India Hackathon 2024:</span>
            <br />
            Focused on AI-driven dropout prevention for students, aiming to help
            reduce drop-out rates by providing early interventions.
          </div>
        </div>

        {/* Project */}
        <div className="mt-4">
          <span className="font-semibold">Projects:</span>
        </div>
        <div className="pl-4">
          <div>
            <span className="font-semibold">
              AgriYield Pro | Crop Yield Prediction Model:
            </span>{" "}
            Developed a machine learning-based platform for forecasting crop
            yields using advanced predictive analytics.
          </div>
          <div>
            <a
              href="https://github.com/yourusername"
              className="text-blue-400 hover:text-white"
            >
              GitHub Repository: View on GitHub
            </a>
          </div>
        </div>

        {/* Internship */}
        <div className="mt-4">
          <span className="font-semibold">Internship:</span> AI/ML Developer at
          Konect U
        </div>

        {/* Certifications */}
        <div className="mt-4">
          <span className="font-semibold">Certifications:</span>
        </div>
        <div className="pl-4">
          <div>
            Web Development - Completed courses in HTML, CSS, JavaScript
          </div>
          <div>C Language - Proficient in C programming language</div>
          <div>
            Computer Automation - Hands-on training in automated processes
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-4">
          <span className="font-semibold">Additional Information:</span>
        </div>
        <div className="pl-4">
          <div>
            Project Management - Experience in Git for project coordination
          </div>
          <div>
            Problem Solving - Strong analytical skills in technical issues
          </div>
          <div>Team Collaboration - Effective communicator and team player</div>
          <div>
            Continuous Learning - Actively pursuing emerging technologies
          </div>
          <div>
            Professional Development - Engaged in coding competitions and tech
            meetups
          </div>
        </div>
      </div>

      {/* Resizable handle */}
      <div
        ref={resizeRef}
        onMouseDown={handleMouseDown}
        className="absolute right-0 bottom-0 w-5 h-5 bg-gray-700 cursor-se-resize"
      ></div>
    </div>
  );
};

export default FileExplorer;
