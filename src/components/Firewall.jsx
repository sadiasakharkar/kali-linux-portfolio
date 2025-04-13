import React, { useState } from "react";

const Firewall = ({ onClose, onClick }) => {
  const [rules, setRules] = useState([
    {
      id: 1,
      protocol: "TCP",
      port: "22",
      action: "ALLOW",
      direction: "INBOUND",
    },
    {
      id: 2,
      protocol: "UDP",
      port: "53",
      action: "ALLOW",
      direction: "OUTBOUND",
    },
  ]);
  const [log, setLog] = useState([
    "[INFO] Firewall started.",
    "[ALLOW] Incoming SSH connection on port 22.",
    "[ALLOW] DNS query sent on port 53.",
  ]);

  const addRule = () => {
    const newRule = {
      id: rules.length + 1,
      protocol: "TCP",
      port: "80",
      action: "BLOCK",
      direction: "INBOUND",
    };
    setRules([...rules, newRule]);
    setLog([...log, `[RULE ADDED] Block inbound TCP on port 80.`]);
  };

  return (
    <div
      onClick={onClick}
      className="absolute top-20 left-20 w-[600px] h-[500px] bg-black text-green-400 font-mono shadow-xl border border-green-600"
    >
      <div className="p-2 overflow-y-auto">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-bold">Kali Firewall</h2>
          <button onClick={onClose} className="text-red-500 hover:text-red-300">
            ✕
          </button>
        </div>

        <div className="mb-4">
          <h3 className="underline">Rules:</h3>
          <table className="w-full text-sm mt-2 border border-green-600">
            <thead>
              <tr>
                <th className="border border-green-600 px-2">ID</th>
                <th className="border border-green-600 px-2">Protocol</th>
                <th className="border border-green-600 px-2">Port</th>
                <th className="border border-green-600 px-2">Direction</th>
                <th className="border border-green-600 px-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {rules.map((rule) => (
                <tr key={rule.id}>
                  <td className="border border-green-600 px-2">{rule.id}</td>
                  <td className="border border-green-600 px-2">
                    {rule.protocol}
                  </td>
                  <td className="border border-green-600 px-2">{rule.port}</td>
                  <td className="border border-green-600 px-2">
                    {rule.direction}
                  </td>
                  <td className="border border-green-600 px-2">
                    {rule.action}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            onClick={addRule}
            className="mt-2 px-3 py-1 bg-green-800 text-white rounded hover:bg-green-600"
          >
            ➕ Add Rule
          </button>
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

export default Firewall;
