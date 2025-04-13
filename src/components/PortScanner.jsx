import React, { useState } from "react";

const PortScanner = ({ onClose, onClick }) => {
  const [ip, setIp] = useState("");
  const [portResults, setPortResults] = useState([]);
  const [log, setLog] = useState([
    "[INFO] PortScanner started.",
    "[INFO] Enter an IP address and click 'Scan'.",
  ]);

  const scanPorts = () => {
    // Simple mock of port scanning
    if (!ip) {
      setLog([...log, "[ERROR] No IP address entered."]);
      return;
    }
    setLog([...log, `[INFO] Scanning IP: ${ip}...`]);
    setPortResults([]);
    setTimeout(() => {
      const result = [
        { port: 22, status: "OPEN" },
        { port: 80, status: "CLOSED" },
        { port: 443, status: "OPEN" },
        { port: 8080, status: "CLOSED" },
      ];
      setPortResults(result);
      setLog([...log, `[INFO] Scan completed for IP: ${ip}.`]);
    }, 2000); // Simulate network delay
  };

  return (
    <div
      onClick={onClick}
      className="absolute top-20 left-20 w-[600px] h-[500px] bg-black text-green-400 font-mono shadow-xl border border-green-600"
    >
      <div className="p-2 overflow-y-auto">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-bold">Kali Port Scanner</h2>
          <button onClick={onClose} className="text-red-500 hover:text-red-300">
            ✕
          </button>
        </div>

        <div>
          <input
            type="text"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
            className="w-full px-2 py-1 text-sm border border-green-500 bg-black text-green-400 mb-3"
            placeholder="Enter target IP address"
          />
          <button
            onClick={scanPorts}
            className="w-full px-3 py-1 bg-green-800 text-white rounded hover:bg-green-600"
          >
            Scan Ports
          </button>
        </div>

        <div className="mt-4">
          <h3 className="underline">Scan Results:</h3>
          <table className="w-full text-sm mt-2 border border-green-600">
            <thead>
              <tr>
                <th className="border border-green-600 px-2">Port</th>
                <th className="border border-green-600 px-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {portResults.map((result, index) => (
                <tr key={index}>
                  <td className="border border-green-600 px-2">
                    {result.port}
                  </td>
                  <td className="border border-green-600 px-2">
                    {result.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4">
          <h3 className="underline">Logs:</h3>
          <div className="bg-black border border-green-600 p-2 h-40 overflow-y-auto text-xs">
            {log.map((line, index) => (
              <div key={index}>{line}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortScanner;
