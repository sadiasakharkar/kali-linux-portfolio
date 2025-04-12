// src/components/DesktopLayout.jsx
import React, { useState } from "react";
import Terminal from "./Terminal";

let appIdCounter = 0;

const Desktop = () => {
  const [apps, setApps] = useState([]);

  const openApp = (appName) => {
    if (appName === "browser") {
      window.open("https://search.brave.com", "_blank");
    } else {
      const id = ++appIdCounter;
      setApps((prev) => [...prev, { id, name: appName }]);
    }
  };

  const closeApp = (id) => {
    setApps((prev) => prev.filter((app) => app.id !== id));
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Top Bar */}
      <div className="h-12 bg-gray-900 text-white flex items-center justify-between px-4">
        <span className="font-bold">KaliOS</span>
        <span>12:00 PM</span>
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
        </div>

        {/* Desktop Area */}
        <div className="flex-grow bg-[#121212] p-4 relative">
          {apps.map((app) => {
            if (app.name === "terminal") {
              return <Terminal key={app.id} onClose={() => closeApp(app.id)} />;
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
};

export default Desktop;
``;
