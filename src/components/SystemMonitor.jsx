import React, { useEffect, useState } from "react";
import { motion } from "framer-motion"; // For drag functionality

const SystemMonitor = ({ onClose }) => {
  const [cpu, setCpu] = useState(0);
  const [ram, setRam] = useState(0);
  const [log, setLog] = useState([]);
  const [network, setNetwork] = useState(0);

  // Random process simulation
  const generateRandomLog = () => {
    const randomStatus = ["OK", "WARNING", "ERROR"];
    const status =
      randomStatus[Math.floor(Math.random() * randomStatus.length)];
    return `[${new Date().toLocaleTimeString()}] System: CPU: ${cpu}% | RAM: ${ram}% | Network: ${network}% - Status: ${status}`;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCpu(Math.floor(Math.random() * 100));
      setRam(Math.floor(Math.random() * 100));
      setNetwork(Math.floor(Math.random() * 100));
      setLog((prevLog) => [...prevLog, generateRandomLog()]);
    }, 2000); // Update every 2 seconds

    return () => clearInterval(interval);
  }, [cpu, ram, network]);

  return (
    <motion.div
      drag
      dragConstraints={{ left: 0, right: 1000, top: 0, bottom: 600 }}
      className="absolute top-20 left-20 bg-black text-green-400 border border-green-500 rounded-lg shadow-lg w-96 p-4 font-mono z-50"
    >
      <div className="flex justify-between items-center border-b border-green-500 pb-2 mb-4">
        <h2 className="text-lg font-bold">System Monitor</h2>
        <button onClick={onClose} className="text-red-400 hover:text-red-600">
          ✕
        </button>
      </div>

      {/* CPU and RAM Usage with Progress Bars */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm">🖥️ CPU Usage: {cpu}%</p>
          <div className="w-32 h-3 bg-green-900 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-400"
              style={{ width: `${cpu}%` }}
            ></div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <p className="text-sm">🧠 RAM Usage: {ram}%</p>
          <div className="w-32 h-3 bg-green-900 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-400"
              style={{ width: `${ram}%` }}
            ></div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-2">
          <p className="text-sm">🌐 Network Usage: {network}%</p>
          <div className="w-32 h-3 bg-green-900 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-400"
              style={{ width: `${network}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* System Logs */}
      <div className="text-sm overflow-y-auto max-h-40 mb-4">
        <p className="font-bold mb-2">System Logs:</p>
        <div className="space-y-1">
          {log.slice(0, 10).map((entry, index) => (
            <p key={index} className="text-gray-400">
              {entry}
            </p>
          ))}
        </div>
      </div>

      {/* Running Apps */}
      <div className="text-sm">
        <p className="font-bold mb-2">📂 Running Apps:</p>
        <ul className="list-disc ml-4 text-gray-400">
          <li>Terminal</li>
          <li>File Explorer</li>
          <li>VS Code</li>
        </ul>
      </div>

      {/* More Details */}
      <div className="mt-4">
        <p className="text-xs text-gray-500">Press F1 for more details</p>
      </div>
    </motion.div>
  );
};

export default SystemMonitor;
