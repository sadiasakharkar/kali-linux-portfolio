import React from "react";
import WindowFrame from "./WindowFrame";

const VSCodeEditor = ({ title, onClose, onMinimize, isActive, onFocus, zIndex, defaultPosition, defaultSize }) => {
  return (
    <WindowFrame
      title={title}
      onClose={onClose}
      onMinimize={onMinimize}
      onFocus={onFocus}
      isActive={isActive}
      zIndex={zIndex}
      defaultPosition={defaultPosition}
      defaultSize={defaultSize}
      className="bg-[#111827] text-gray-100"
      contentClassName="bg-[#111827]"
    >
      <div className="grid h-full grid-cols-[190px_1fr] text-sm">
        <aside className="border-r border-gray-700 bg-[#0f172a] p-3 text-gray-300">
          <p className="mb-3 text-xs uppercase tracking-wide text-cyan-400">Explorer</p>
          <ul className="space-y-2">
            <li>src/</li>
            <li className="pl-3 text-cyan-300">components/</li>
            <li className="pl-6 text-green-300">Desktop.jsx</li>
            <li className="pl-6 text-green-300">Terminal.jsx</li>
            <li className="pl-6 text-green-300">FileExplorer.jsx</li>
            <li>public/</li>
            <li>package.json</li>
          </ul>
          <a className="mt-6 block text-blue-400 underline" href="https://vscode.dev/github/sadiasakharkar/kali-linux-portfolio" target="_blank" rel="noreferrer">
            Open real VS Code Web
          </a>
        </aside>
        <main className="overflow-auto p-4 font-mono text-xs leading-6">
          <div className="mb-3 border-b border-gray-700 pb-2 text-cyan-300">Desktop.jsx</div>
          <pre className="whitespace-pre-wrap text-gray-200">{`const portfolio = {
  owner: "Sadia Sakharkar",
  theme: "Kali Linux desktop",
  features: [
    "shared fake filesystem",
    "terminal commands",
    "internal browser",
    "internal VS Code",
    "window minimize and restore",
    "mobile compact mode"
  ],
};

export default portfolio;`}</pre>
        </main>
      </div>
    </WindowFrame>
  );
};

export default VSCodeEditor;
