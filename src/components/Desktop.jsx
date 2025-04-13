import React, { useState, useEffect } from "react";
import Terminal from "./Terminal";
import VsCode from "./VSCodeEditor";
import SystemMonitor from "./SystemMonitor";
import SystemIcons from "./SystemIcons";
import Firewall from "./Firewall";
import PortScanner from "./PortScanner";
import PasswordCracker from "./PasswordCracker";
import FileExplorer from "./FileExplorer"; // Ensure the component is correctly defined

let appIdCounter = 0;

const Desktop = () => {
  const [workspaces, setWorkspaces] = useState({
    1: [],
    2: [],
    3: [],
    4: [],
  });
  const [currentWorkspace, setCurrentWorkspace] = useState(1);
  const [activeAppId, setActiveAppId] = useState(null);
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
      const newApp = { id, name: appName };
      setWorkspaces((prev) => ({
        ...prev,
        [currentWorkspace]: [...prev[currentWorkspace], newApp],
      }));
      setActiveAppId(id);
    }
  };

  const closeApp = (id) => {
    setWorkspaces((prev) => ({
      ...prev,
      [currentWorkspace]: prev[currentWorkspace].filter((app) => app.id !== id),
    }));
    if (activeAppId === id) {
      setActiveAppId(null);
    }
  };

  const formatTime = (date) =>
    date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const currentApps = workspaces[currentWorkspace];

  return (
    <div className="h-screen flex flex-col">
      {/* Top Bar */}
      <div className="h-12 bg-gray-900 text-white flex items-center justify-between px-4 relative">
        {/* Workspace Switcher */}
        <div className="absolute left-2 top-1/2 transform -translate-y-1/2 flex space-x-1">
          {[1, 2, 3, 4].map((ws) => {
            const hasApps = workspaces[ws].length > 0;
            const isActive = currentWorkspace === ws;

            return (
              <button
                key={ws}
                onClick={() => setCurrentWorkspace(ws)}
                className={`w-8 h-8 flex items-center justify-center rounded-sm border-2 text-sm font-semibold transition-all duration-150
                  ${
                    isActive
                      ? "border-blue-500 bg-gray-800"
                      : "border-gray-600 hover:border-gray-400 bg-gray-700"
                  }`}
              >
                {ws}
                {hasApps && (
                  <span
                    className={`absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 rounded-full ${
                      isActive ? "bg-blue-400" : "bg-gray-400"
                    }`}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* App Indicators */}
        <div className="flex space-x-2 absolute left-40 top-1/2 transform -translate-y-1/2">
          {currentApps.map((app) => (
            <button
              key={app.id}
              onClick={() => setActiveAppId(app.id)}
              title={app.name}
              className={`w-8 h-8 rounded-md border-2 flex items-center justify-center transition-all
                ${
                  app.id === activeAppId
                    ? "border-blue-500 bg-gray-700"
                    : "border-gray-700 hover:border-gray-500"
                }`}
            >
              <img
                src={`/${app.name}-icon.png`}
                alt={app.name}
                className="w-5 h-5"
              />
            </button>
          ))}
        </div>

        {/* System Icons */}
        <div className="flex items-center space-x-4 ml-auto">
          <SystemIcons />
          <span className="text-sm font-mono">{formatTime(time)}</span>
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex flex-grow">
        {/* Sidebar with transparent background */}
        <div
          className="w-16 flex flex-col items-center py-4 space-y-4 backdrop-blur-lg"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.4)", // Semi-transparent background
            backdropFilter: "blur(8px)", // Apply blur to the content behind
          }}
        >
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
          <button onClick={() => openApp("monitor")}>
            <img src="/monitor-icon.png" alt="System Monitor" className="w-8" />
          </button>
          <button onClick={() => openApp("firewall")}>
            <img src="/firewall-icon.svg" alt="Firewall" className="w-8" />
          </button>
          <button onClick={() => openApp("portscanner")}>
            <img src="/scanner-icon.svg" alt="Port Scanner" className="w-8" />
          </button>
          <button onClick={() => openApp("cracker")}>
            <img
              src="/password-icon.svg"
              alt="Password Cracker"
              className="w-8"
            />
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
          {currentApps.map((app) => {
            const commonProps = {
              key: app.id,
              onClose: () => closeApp(app.id),
              isActive: activeAppId === app.id,
              onClick: () => setActiveAppId(app.id),
            };

            if (app.name === "terminal") return <Terminal {...commonProps} />;
            if (app.name === "folder") return <FileExplorer {...commonProps} />;
            if (app.name === "vsCode") return <VsCode {...commonProps} />;
            if (app.name === "monitor")
              return <SystemMonitor {...commonProps} />;
            if (app.name === "firewall") return <Firewall {...commonProps} />;
            if (app.name === "portscanner")
              return <PortScanner {...commonProps} />;
            if (app.name === "cracker")
              return <PasswordCracker {...commonProps} />;
            return null;
          })}
        </div>
      </div>
    </div>
  );
};

export default Desktop;
