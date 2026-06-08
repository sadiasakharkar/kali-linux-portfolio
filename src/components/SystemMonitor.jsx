import React, { useEffect, useState } from "react";
import WindowFrame from "./WindowFrame";
import { profile } from "../utils/profileData";

const bar = (value) => <div className="h-2 w-32 overflow-hidden rounded bg-green-950"><div className="h-full bg-green-400" style={{ width: `${value}%` }} /></div>;

const SystemMonitor = ({ title, onClose, onMinimize, isActive, onFocus, zIndex }) => {
  const [cpu, setCpu] = useState(18);
  const [ram, setRam] = useState(42);
  const [network, setNetwork] = useState(12);
  const [log, setLog] = useState(["xfce4-taskmanager started", "portfolio-session active"]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCpu((value) => (value + 13) % 91);
      setRam((value) => 35 + ((value + 7) % 45));
      setNetwork((value) => (value + 19) % 76);
      setLog((prev) => [`${new Date().toLocaleTimeString()} portfolio process healthy`, ...prev].slice(0, 8));
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <WindowFrame title={title} onClose={onClose} onMinimize={onMinimize} onFocus={onFocus} isActive={isActive} zIndex={zIndex} defaultPosition={{ x: 180, y: 90 }} defaultSize={{ width: 440, height: 430 }} className="bg-black text-green-400" contentClassName="bg-black p-4">
      <div className="space-y-4 text-sm">
        <div className="grid gap-3">
          <div className="flex items-center justify-between"><span>CPU Usage</span>{bar(cpu)}<span>{cpu}%</span></div>
          <div className="flex items-center justify-between"><span>RAM Usage</span>{bar(ram)}<span>{ram}%</span></div>
          <div className="flex items-center justify-between"><span>Network</span>{bar(network)}<span>{network}%</span></div>
        </div>
        <div>
          <h3 className="mb-2 text-cyan-300">Portfolio Processes</h3>
          <ul className="space-y-1 text-gray-300">
            <li>terminal - interactive resume shell</li>
            <li>thunar - shared fake filesystem</li>
            <li>brave - internal portfolio search</li>
            <li>code - project source preview</li>
          </ul>
        </div>
        <div>
          <h3 className="mb-2 text-cyan-300">Candidate Snapshot</h3>
          <p>{profile.name} | {profile.location}</p>
          <p>{profile.skills.slice(0, 8).join(" | ")}</p>
        </div>
        <div className="h-24 overflow-auto border border-green-800 bg-[#050505] p-2 text-xs text-gray-400">
          {log.map((line) => <div key={line}>{line}</div>)}
        </div>
      </div>
    </WindowFrame>
  );
};

export default SystemMonitor;
