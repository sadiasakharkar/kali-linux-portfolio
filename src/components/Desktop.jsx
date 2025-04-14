import React, { useState, useEffect } from "react";
import Terminal from "./Terminal";
import VsCode from "./VSCodeEditor";
import SystemMonitor from "./SystemMonitor";
import SystemIcons from "./SystemIcons";
import Firewall from "./Firewall";
import PortScanner from "./PortScanner";
import PasswordCracker from "./PasswordCracker";
import FileExplorer from "./FileExplorer";

let appIdCounter = 0;

const Desktop = () => {
  const [workspaces, setWorkspaces] = useState({ 1: [], 2: [], 3: [], 4: [] });
  const [currentWorkspace, setCurrentWorkspace] = useState(1);
  const [activeAppId, setActiveAppId] = useState(null);
  const [time, setTime] = useState(new Date());

  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
  });
  const [wallpaper, setWallpaper] = useState("/kali-wallpaper.jpg");
  const [showWallpaperModal, setShowWallpaperModal] = useState(false);

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

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const handleContextMenu = (e) => {
    e.preventDefault();
    setContextMenu({ visible: true, x: e.clientX, y: e.clientY });
  };

  const handleClick = () => {
    if (contextMenu.visible) setContextMenu({ ...contextMenu, visible: false });
  };

  const handleContextOption = (action) => {
    if (action === "terminal") openApp("terminal");
    if (action === "browser") openApp("browser");
    if (action === "refresh") window.location.reload();
    if (action === "wallpaper") setShowWallpaperModal(true);
    setContextMenu({ ...contextMenu, visible: false });
  };

  const currentApps = workspaces[currentWorkspace];

  const wallpapers = [
    "/wallpapers/wallpaper1.png",
    "/wallpapers/wallpaper2.jpeg",
    "/wallpapers/wallpaper3.jpeg",
    "/kali-wallpaper.jpg", // ✅ Kali custom wallpaper
  ];

  return (
    <div
      className="h-screen flex flex-col"
      onContextMenu={handleContextMenu}
      onClick={handleClick}
    >
      {/* 🧢 Top Bar */}
      <div className="h-12 bg-gray-900 text-white flex items-center justify-between px-4 relative">
        {/* Workspaces */}
        <div className="absolute left-2 top-1/2 transform -translate-y-1/2 flex space-x-1">
          {[1, 2, 3, 4].map((ws) => {
            const hasApps = workspaces[ws].length > 0;
            const isActive = currentWorkspace === ws;
            return (
              <button
                key={ws}
                onClick={() => setCurrentWorkspace(ws)}
                className={`w-8 h-8 flex items-center justify-center rounded-sm border-2 text-sm font-semibold ${
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
              className={`w-8 h-8 rounded-md border-2 flex items-center justify-center ${
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

        <div className="flex items-center space-x-4 ml-auto">
          <SystemIcons />
          <span className="text-sm font-mono">{time.toLocaleTimeString()}</span>
        </div>
      </div>

      {/* 🧱 Main Layout */}
      <div className="flex h-full">
        {/* Sidebar */}
        <div className="w-16 flex flex-col items-center justify-between py-4 space-y-4 bg-transparent backdrop-blur-sm">
          {/* App Icons */}
          <div className="flex flex-col items-center space-y-4">
            <button onClick={() => openApp("terminal")}>
              <img
                src="/terminal-icon.png"
                className="w-8 hover:scale-110 transition-transform duration-150"
              />
            </button>
            <button onClick={() => openApp("browser")}>
              <img
                src="/browser-icon.png"
                className="w-8 hover:scale-110 transition-transform duration-150"
              />
            </button>
            <button onClick={() => openApp("folder")}>
              <img
                src="/folder-icon.png"
                className="w-8 hover:scale-110 transition-transform duration-150"
              />
            </button>
            <button onClick={() => openApp("vsCode")}>
              <img
                src="/vscode-icon.png"
                className="w-8 hover:scale-110 transition-transform duration-150"
              />
            </button>
            <button onClick={() => openApp("monitor")}>
              <img
                src="/monitor-icon.png"
                className="w-8 hover:scale-110 transition-transform duration-150"
              />
            </button>
            <button onClick={() => openApp("firewall")}>
              <img
                src="/firewall-icon.svg"
                className="w-8 hover:scale-110 transition-transform duration-150"
              />
            </button>
            <button onClick={() => openApp("portscanner")}>
              <img
                src="/scanner-icon.svg"
                className="w-8 hover:scale-110 transition-transform duration-150"
              />
            </button>
            <button onClick={() => openApp("cracker")}>
              <img
                src="/password-icon.svg"
                className="w-8 hover:scale-110 transition-transform duration-150"
              />
            </button>
          </div>

          {/* Preview Thumbnail */}
          <div className="mb-2">
            <img
              src="/kali-wallpaper.jpg"
              alt="Kali Wallpaper"
              className="w-12 h-12 rounded-md border border-cyan-500 shadow-md hover:scale-105 transition-transform"
            />
          </div>
        </div>

        {/* Desktop */}
        <div
          className="flex-grow relative p-4"
          style={{
            backgroundImage: `url('${wallpaper}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Running Apps */}
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

      {/* 🖱️ Context Menu */}
      {contextMenu.visible && (
        <ul
          className="absolute bg-black text-cyan-300 border border-cyan-600 rounded shadow-xl text-sm w-48 z-50"
          style={{ top: contextMenu.y, left: contextMenu.x }}
        >
          <li
            className="px-4 py-2 hover:bg-cyan-700 cursor-pointer"
            onClick={() => handleContextOption("terminal")}
          >
            Open Terminal
          </li>
          <li
            className="px-4 py-2 hover:bg-cyan-700 cursor-pointer"
            onClick={() => handleContextOption("browser")}
          >
            Open Browser
          </li>
          <li
            className="px-4 py-2 hover:bg-cyan-700 cursor-pointer"
            onClick={() => handleContextOption("refresh")}
          >
            Refresh
          </li>
          <li
            className="px-4 py-2 hover:bg-cyan-700 cursor-pointer"
            onClick={() => handleContextOption("wallpaper")}
          >
            Change Wallpaper
          </li>
        </ul>
      )}

      {/* 🎨 Wallpaper Modal */}
      {showWallpaperModal && (
        <div className="absolute top-0 left-0 w-full h-full bg-black/70 flex justify-center items-center z-50">
          <div className="bg-gray-900 p-6 rounded-lg max-w-2xl w-full text-white">
            <h2 className="text-xl mb-4">🖼️ Choose a Wallpaper</h2>
            <div className="grid grid-cols-3 gap-4">
              {wallpapers.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Wallpaper ${index + 1}`}
                  onClick={() => {
                    setWallpaper(img);
                    setShowWallpaperModal(false);
                  }}
                  className="w-32 h-32 object-cover cursor-pointer hover:border-cyan-500 border-2 border-transparent"
                />
              ))}
            </div>
            <button
              onClick={() => setShowWallpaperModal(false)}
              className="mt-4 px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Desktop;
