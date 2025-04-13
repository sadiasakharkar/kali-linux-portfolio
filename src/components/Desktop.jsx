// src/components/DesktopLayout.jsx
import React, { useState, useEffect } from "react";
import Terminal from "./Terminal";
import Folder from "./FileExplorer";
import VsCode from "./VSCodeEditor"; // Import the VsCode component

let appIdCounter = 0;

const Desktop = () => {
  const [apps, setApps] = useState([]);
  const [time, setTime] = useState(new Date());

  const openApp = (appName) => {
    const id = ++appIdCounter;

    if (appName === "browser") {
      window.open("https://search.brave.com", "_blank");
    } else if (appName === "vsCode") {
      window.open(
        "https://vscode.dev/github/sadiasakharkar/kali-linux-portfolio",
        "_blank"
      );
    } else {
      setApps((prev) => [...prev, { id, name: appName }]);
    }
  };

  const closeApp = (id) => {
    setApps((prev) => prev.filter((app) => app.id !== id));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (date) =>
    date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

  return (
    <div className="h-screen flex flex-col">
      {/* Top Bar */}
      <div className="h-12 bg-gray-900 text-white flex items-center justify-between px-4">
        <span className="font-bold">KaliOS</span>
        <span>{formatTime(time)}</span>
      </div>

      {/* Main Layout */}
      <div className="flex flex-grow">
        {/* Sidebar */}
        <div className="w-16 bg-gray-800 text-white flex flex-col items-center py-4 space-y-4">
          <button onClick={() => openApp("terminal")}>
            <img src="/terminal-icon.png" alt="Terminal" className="w-8" />
          </button>
          <button onClick={() => openApp("browser")}>
            <img src="/browser-icon.png" alt="Browser" className="w-8" />
          </button>
          <button onClick={() => openApp("folder")}>
            <img src="/folder-icon.png" alt="Folder" className="w-8" />
          </button>
          <button onClick={() => openApp("vsCode")}>
            <img src="/vscode-icon.png" alt="VS Code" className="w-8" />
          </button>
        </div>

        {/* Desktop Area */}
        <div
          className="flex-grow relative p-4"
          style={{
            backgroundImage: `url('/kali-wallpaper.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {apps.map((app) => {
            if (app.name === "terminal") {
              return <Terminal key={app.id} onClose={() => closeApp(app.id)} />;
            } else if (app.name === "folder") {
              return <Folder key={app.id} onClose={() => closeApp(app.id)} />;
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
};

export default Desktop;
