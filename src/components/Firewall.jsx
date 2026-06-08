import React, { useState } from "react";
import WindowFrame from "./WindowFrame";

const Firewall = ({ title, onClose, onMinimize, isActive, onFocus, zIndex, defaultPosition, defaultSize }) => {
  const [rules, setRules] = useState([
    { id: 1, protocol: "TCP", port: "22", direction: "IN", action: "ALLOW", service: "ssh" },
    { id: 2, protocol: "TCP", port: "443", direction: "OUT", action: "ALLOW", service: "portfolio-web" },
    { id: 3, protocol: "UDP", port: "53", direction: "OUT", action: "ALLOW", service: "dns" },
  ]);
  const [log, setLog] = useState(["ufw status active", "policy: deny incoming, allow outgoing"]);

  const addRule = () => {
    const next = { id: rules.length + 1, protocol: "TCP", port: "8080", direction: "IN", action: "BLOCK", service: "demo-port" };
    setRules((prev) => [...prev, next]);
    setLog((prev) => [`[RULE] deny tcp/8080 from lab network`, ...prev]);
  };

  return (
    <WindowFrame title={title} onClose={onClose} onMinimize={onMinimize} onFocus={onFocus} isActive={isActive} zIndex={zIndex} defaultPosition={defaultPosition} defaultSize={defaultSize} className="bg-black text-green-400" contentClassName="bg-black p-4">
      <div className="space-y-4 text-sm">
        <table className="w-full border border-green-700 text-left text-xs">
          <thead className="bg-green-950/60 text-cyan-300"><tr><th className="p-2">ID</th><th>Proto</th><th>Port</th><th>Dir</th><th>Action</th><th>Service</th></tr></thead>
          <tbody>{rules.map((rule) => <tr key={rule.id} className="border-t border-green-900"><td className="p-2">{rule.id}</td><td>{rule.protocol}</td><td>{rule.port}</td><td>{rule.direction}</td><td>{rule.action}</td><td>{rule.service}</td></tr>)}</tbody>
        </table>
        <button type="button" onClick={addRule} className="rounded bg-green-800 px-3 py-1 text-white hover:bg-green-600">Add deny rule</button>
        <div className="h-36 overflow-auto border border-green-800 bg-[#050505] p-2 text-xs">{log.map((line) => <div key={line}>{line}</div>)}</div>
      </div>
    </WindowFrame>
  );
};

export default Firewall;
