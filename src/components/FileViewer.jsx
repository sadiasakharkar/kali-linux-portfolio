import React from "react";

const FileViewer = ({ fileName, onClose }) => {
  const renderContent = () => {
    switch (fileName) {
      case "About_Sadia.txt":
        return (
          <pre className="whitespace-pre-wrap font-mono text-cyan-300 text-sm">
            <p>
              A highly dedicated, results-driven, and ambitious Computer
              Engineering student with a profound passion for software
              development, AI/ML, and cybersecurity. With a proven track record
              of excellence in national hackathons and coding competitions, I
              consistently demonstrate my ability to tackle complex problems and
              deliver innovative solutions under pressure. Over the course of my
              academic journey, I have honed a versatile skill set that blends
              strong technical expertise with exceptional leadership abilities,
              allowing me to contribute effectively to every project I
              undertake.
            </p>
            <br />
            <p>
              I possess a deep understanding of cutting-edge technologies, and I
              am particularly focused on developing machine learning models and
              secure systems that have real-world applications. My passion lies
              in building scalable, efficient, and impactful systems that not
              only solve problems but also drive progress and innovation across
              various industries. I have successfully utilized AI/ML algorithms
              to optimize processes and create solutions that are both
              technically robust and user-centric.
            </p>
            <br />
            <p>
              With a passion for continuous learning and growth, I am committed
              to making a lasting impact in the field of software development,
              AI/ML, and cybersecurity, striving to build systems that are not
              only technically advanced but also solve real-world problems with
              a focus on efficiency, scalability, and security.
            </p>
            <br />
            <br />
            <p>
              <strong className="text-cyan-500">Technical Skills:</strong> C,
              C++, Java, Python, SQL, HTML, CSS, JavaScript, PHP, React,
              Node.js, AI/ML, Cybersecurity
            </p>
            <br />
            <p>
              <strong className="text-cyan-500">
                AI/ML libraries and tools:
              </strong>{" "}
              PyTorch, Scikit-learn, OpenCV, NumPy, Pandas, Matplotlib, Seaborn
            </p>
            <br />
            <p>
              <strong className="text-cyan-500">Achievements:</strong>
              <ul className="list-disc ml-5">
                <li>Selected as a Google Arcade Facilitator 2025</li>
              </ul>
            </p>
            <br />
            <p>
              <strong className="text-cyan-500">Contact:</strong>{" "}
              sakharkarsadia@gmail.com{" "}
              <a
                href="https://github.com/sadia-sakharkar"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300"
              >
                GitHub: github.com/sadiasakharkar
              </a>
            </p>
          </pre>
        );
      case "Resume.pdf":
        return (
          <p className="text-cyan-300">
            Opening Resume.pdf... (PDF viewer coming soon!)
          </p>
        );
      case "Projects":
        return (
          <div className="overflow-y-auto">
            <ul className="list-disc pl-5 text-cyan-300 text-sm">
              <li>
                <strong className="text-cyan-500">AgriYield Pro</strong> – A
                machine learning-based crop yield prediction model that uses
                historical data and weather patterns to forecast agricultural
                outcomes with high accuracy.
              </li>
              <br />
              <li>
                <strong className="text-cyan-500">
                  Smart Attendance System
                </strong>{" "}
                – An attendance system that QR-code detects student presence
                using Geo-location.
              </li>
              <br />
              <li>
                <strong className="text-cyan-500">
                  Event Handling Platform
                </strong>{" "}
                (CodeCratz 2025) – A dynamic platform designed to manage event
                registrations, track participation, and provide real-time
                updates and notifications.
              </li>
              <br />
              <li>
                <strong className="text-cyan-500">
                  Dropout Prediction Model
                </strong>{" "}
                (Smart India Hackathon 2024) – An AI-powered tool designed to
                predict dropout risks and suggest interventions for at-risk
                students.
              </li>
              <br />
              <li>
                <strong className="text-cyan-500">
                  Interactive Terminal for Developer Portfolio
                </strong>{" "}
                – A Kali Linux-style terminal interface integrated into my
                personal portfolio, showcasing various technical skills and
                projects in a unique and interactive way.
              </li>
            </ul>
          </div>
        );
      case "Hackathons":
        return (
          <div className="overflow-y-auto">
            <ul className="list-disc pl-5 text-cyan-300 text-sm">
              <li>
                <strong className="text-cyan-500">CodeBits 3.0</strong> –
                Developed an AI-powered ecosystem for education, featuring
                dropout prediction, smart attendance, and plagiarism detection.
              </li>
              <br />
              <li>
                <strong className="text-cyan-500">CodeCratz 2025</strong> –
                Created an event handling platform that helped streamline event
                management and provide real-time notifications for participants.
              </li>
              <br />
              <li>
                <strong className="text-cyan-500">Smart India Hackathon</strong>{" "}
                – Focused on developing an AI-driven solution to prevent school
                dropout by predicting dropout risks and suggesting interventions
                for at-risk students.
              </li>
            </ul>
          </div>
        );
      case "Certifications":
        return (
          <div className="overflow-y-auto">
            <ul className="list-disc pl-5 text-cyan-300 text-sm">
              <li>
                <strong className="text-cyan-500">Web Development</strong> –
                Completed Certification in Web Development, focusing on modern
                technologies like HTML5, CSS3, and JavaScript.
              </li>
              <br />
              <li>
                <strong className="text-cyan-500">C Language</strong> –
                Participated in a C Tutorial covering data structures and
                algorithms, which solidified my foundation in programming.
              </li>
            </ul>
          </div>
        );
      default:
        return <p className="text-cyan-400">Unknown file</p>;
    }
  };

  return (
    <div className="absolute top-20 left-20 bg-[#1e1e1e] border border-cyan-500 rounded-md shadow-lg w-[400px] h-[300px] p-4 overflow-auto z-50">
      <div className="flex justify-between items-center mb-2 text-cyan-400 font-mono border-b border-cyan-700 pb-1">
        <span className="font-semibold">{fileName}</span>
        <button
          onClick={onClose}
          className="hover:text-red-500 transition-all ease-in-out duration-300"
        >
          ×
        </button>
      </div>
      {renderContent()}
    </div>
  );
};

export default FileViewer;
