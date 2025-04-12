import React, { useState, useRef, useEffect } from "react";

const InteractiveTerminal = () => {
  const [logs, setLogs] = useState([
    "Welcome to Kali Linux Terminal! Type `help` to get started.",
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [files, setFiles] = useState([]);
  const [isVisible, setIsVisible] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const terminalRef = useRef(null);
  const isDragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  const commands = {
    help: "Available commands: help, whoami, clear, ls, touch [filename], mkdir [dirname], exit",
    whoami: "sadiasakharkar",
    clear: () => setLogs([]),
    ls: () => (files.length ? files.join("  ") : "No files found"),
    touch: (args) => {
      if (!args[0]) return "Usage: touch [filename]";
      setFiles((prev) => [...prev, args[0]]);
      return `File '${args[0]}' created`;
    },
    mkdir: (args) => {
      if (!args[0]) return "Usage: mkdir [dirname]";
      return `Directory '${args[0]}' created`;
    },
    exit: () => {
      setIsVisible(false);
      return "Exiting Kali Linux Terminal...";
    },
  };

  const handleCommand = (cmd) => {
    const args = cmd.trim().split(" ");
    const command = args[0];
    const result =
      typeof commands[command] === "function"
        ? commands[command](args.slice(1))
        : commands[command] || `Command not found: ${command}`;

    if (command === "clear") return;

    setLogs((prev) => [...prev, `root@kali:~# ${cmd}`, result]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (input.trim() !== "") {
        setHistory((prev) => [...prev, input]);
        handleCommand(input);
        setInput("");
        setHistoryIndex(-1);
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0 && historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1;
        setInput(history[history.length - 1 - newIndex]);
        setHistoryIndex(newIndex);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setInput(history[history.length - 1 - newIndex]);
        setHistoryIndex(newIndex);
      } else {
        setInput("");
        setHistoryIndex(-1);
      }
    }
  };

  const handleDragStart = (e) => {
    isDragging.current = true;
    offset.current = {
      x: e.clientX - terminalRef.current.getBoundingClientRect().left,
      y: e.clientY - terminalRef.current.getBoundingClientRect().top,
    };
  };

  const handleDrag = (e) => {
    if (isDragging.current) {
      const x = e.clientX - offset.current.x;
      const y = e.clientY - offset.current.y;
      terminalRef.current.style.left = `${x}px`;
      terminalRef.current.style.top = `${y}px`;
    }
  };

  const stopDrag = () => {
    isDragging.current = false;
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleDrag);
    window.addEventListener("mouseup", stopDrag);
    return () => {
      window.removeEventListener("mousemove", handleDrag);
      window.removeEventListener("mouseup", stopDrag);
    };
  }, []);

  if (!isVisible) return null;

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <div
      ref={terminalRef}
      className={`absolute bg-[#0f0f0f] text-[#00ff00] border border-green-700 font-mono shadow-lg z-50 ${
        isMaximized ? "w-full h-full top-0 left-0" : "w-[600px] h-[400px]"
      }`}
      style={{
        top: isMaximized ? 0 : "50px",
        left: isMaximized ? 0 : "50px",
      }}
      onMouseDown={handleDragStart}
    >
      <div className="flex justify-between items-center p-2 bg-black">
        <span className="text-green-500">root@kali:~#</span>
        <div className="flex space-x-2">
          <button
            className="w-3 h-3 rounded-full bg-yellow-500"
            onClick={handleMinimize}
          ></button>
          <button
            className="w-3 h-3 rounded-full bg-green-500"
            onClick={handleMaximize}
          ></button>
          <button
            className="w-3 h-3 rounded-full bg-red-500"
            onClick={handleClose}
          ></button>
        </div>
      </div>
      <div className="p-4 h-full overflow-auto">
        <div className="mb-4">
          {logs.map((log, index) => (
            <div key={index} className="text-green-400">
              {log}
            </div>
          ))}
        </div>
        <div className="flex">
          <span className="text-green-400">root@kali:~# </span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="bg-transparent text-green-400 border-none outline-none flex-1"
          />
        </div>
      </div>
    </div>
  );
};

export default InteractiveTerminal;
