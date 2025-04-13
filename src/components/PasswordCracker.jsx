import React, { useState } from "react";

const PasswordCracker = ({ onClose, onClick }) => {
  const [hash, setHash] = useState("");
  const [status, setStatus] = useState("Idle");
  const [crackedPassword, setCrackedPassword] = useState("");
  const [log, setLog] = useState([
    "[INFO] Password Cracker started.",
    "[INFO] Enter a password hash and click 'Crack'.",
  ]);

  const crackPassword = () => {
    if (!hash) {
      setLog([...log, "[ERROR] No hash entered."]);
      return;
    }

    setStatus("Cracking...");
    setLog([...log, `[INFO] Cracking hash: ${hash}...`]);

    // Simulate cracking process
    setTimeout(() => {
      const fakePassword = "password123"; // Simulate a found password
      setCrackedPassword(fakePassword);
      setStatus("Success");
      setLog([...log, `[INFO] Password cracked: ${fakePassword}`]);
    }, 5000); // Simulate cracking delay
  };

  return (
    <div
      onClick={onClick}
      className="absolute top-20 left-20 w-[600px] h-[500px] bg-black text-green-400 font-mono shadow-xl border border-green-600"
    >
      <div className="p-2 overflow-y-auto">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-bold">Kali Password Cracker</h2>
          <button onClick={onClose} className="text-red-500 hover:text-red-300">
            ✕
          </button>
        </div>

        <div>
          <input
            type="text"
            value={hash}
            onChange={(e) => setHash(e.target.value)}
            className="w-full px-2 py-1 text-sm border border-green-500 bg-black text-green-400 mb-3"
            placeholder="Enter hash (MD5/SHA-256)"
          />
          <button
            onClick={crackPassword}
            className="w-full px-3 py-1 bg-green-800 text-white rounded hover:bg-green-600"
          >
            Crack Hash
          </button>
        </div>

        <div className="mt-4">
          <h3 className="underline">Status:</h3>
          <p>{status}</p>
          {status === "Success" && (
            <div className="mt-2">
              <h3 className="underline">Cracked Password:</h3>
              <p>{crackedPassword}</p>
            </div>
          )}
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

export default PasswordCracker;
