import React, { useState } from "react";
import WindowFrame from "./WindowFrame";

const PasswordCracker = ({ title, onClose, onMinimize, isActive, onFocus, zIndex, defaultPosition, defaultSize }) => {
  const [hash, setHash] = useState("5f4dcc3b5aa765d61d8327deb882cf99");
  const [status, setStatus] = useState("Idle");
  const [crackedPassword, setCrackedPassword] = useState("");
  const [log, setLog] = useState(["john simulator ready", "Demo dictionary loaded: portfolio-wordlist.txt"]);

  const crackPassword = () => {
    if (!hash.trim()) {
      setLog((prev) => ["[ERROR] hash required", ...prev]);
      return;
    }
    setStatus("Cracking...");
    setCrackedPassword("");
    setLog((prev) => [`Loaded hash ${hash.slice(0, 12)}...`, "Running wordlist attack simulation", ...prev]);
    setTimeout(() => {
      setStatus("Success");
      setCrackedPassword("password123");
      setLog((prev) => ["Session completed: 1 password recovered", ...prev]);
    }, 1200);
  };

  return (
    <WindowFrame title={title} onClose={onClose} onMinimize={onMinimize} onFocus={onFocus} isActive={isActive} zIndex={zIndex} defaultPosition={defaultPosition} defaultSize={defaultSize} className="bg-black text-green-400" contentClassName="bg-black p-4">
      <div className="space-y-4 text-sm">
        <input aria-label="Password hash" value={hash} onChange={(event) => setHash(event.target.value)} className="w-full border border-green-700 bg-[#050505] px-2 py-1 text-green-300 outline-none focus:border-cyan-400" placeholder="Enter MD5/SHA hash" />
        <button type="button" onClick={crackPassword} className="rounded bg-green-800 px-4 py-1 text-white hover:bg-green-600">Run john</button>
        <div className="rounded border border-green-800 bg-[#050505] p-3">
          <p>Status: <span className="text-cyan-300">{status}</span></p>
          {crackedPassword && <p>Recovered password: <span className="text-cyan-300">{crackedPassword}</span></p>}
        </div>
        <div className="h-40 overflow-auto border border-green-800 bg-[#050505] p-2 text-xs">{log.map((line, index) => <div key={`${line}-${index}`}>{line}</div>)}</div>
      </div>
    </WindowFrame>
  );
};

export default PasswordCracker;
