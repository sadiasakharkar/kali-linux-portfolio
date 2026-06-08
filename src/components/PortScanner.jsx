import React, { useState } from "react";
import WindowFrame from "./WindowFrame";

const PortScanner = ({ title, onClose, onMinimize, isActive, onFocus, zIndex, defaultPosition, defaultSize }) => {
  const [target, setTarget] = useState("127.0.0.1");
  const [results, setResults] = useState([]);
  const [log, setLog] = useState(["nmap simulator initialized", "Only portfolio-safe mock scans are performed."]);

  const scanPorts = () => {
    if (!target.trim()) {
      setLog((prev) => ["[ERROR] target required", ...prev]);
      return;
    }
    setLog((prev) => [`Starting Nmap 7.95 scan against ${target}`, ...prev]);
    setResults([]);
    setTimeout(() => {
      const next = [
        { port: 22, state: "open", service: "ssh" },
        { port: 80, state: "filtered", service: "http" },
        { port: 443, state: "open", service: "https" },
        { port: 5173, state: "open", service: "vite-dev" },
      ];
      setResults(next);
      setLog((prev) => [`Nmap done: 4 scanned ports for ${target}`, ...prev]);
    }, 900);
  };

  return (
    <WindowFrame title={title} onClose={onClose} onMinimize={onMinimize} onFocus={onFocus} isActive={isActive} zIndex={zIndex} defaultPosition={defaultPosition} defaultSize={defaultSize} className="bg-black text-green-400" contentClassName="bg-black p-4">
      <div className="space-y-4 text-sm">
        <div className="flex gap-2">
          <input aria-label="Scan target" value={target} onChange={(event) => setTarget(event.target.value)} className="min-w-0 flex-1 border border-green-700 bg-[#050505] px-2 py-1 text-green-300 outline-none focus:border-cyan-400" />
          <button type="button" onClick={scanPorts} className="rounded bg-green-800 px-4 py-1 text-white hover:bg-green-600">Scan</button>
        </div>
        <table className="w-full border border-green-700 text-left text-xs">
          <thead className="bg-green-950/60 text-cyan-300"><tr><th className="p-2">Port</th><th>State</th><th>Service</th></tr></thead>
          <tbody>{results.map((result) => <tr key={result.port} className="border-t border-green-900"><td className="p-2">{result.port}/tcp</td><td>{result.state}</td><td>{result.service}</td></tr>)}</tbody>
        </table>
        <div className="h-40 overflow-auto border border-green-800 bg-[#050505] p-2 text-xs">{log.map((line, index) => <div key={`${line}-${index}`}>{line}</div>)}</div>
      </div>
    </WindowFrame>
  );
};

export default PortScanner;
