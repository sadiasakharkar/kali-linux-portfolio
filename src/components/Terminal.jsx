import React, { useEffect, useRef, useState } from "react";
import WindowFrame from "./WindowFrame";
import { profile, profileText } from "../utils/profileData";
import {
  createEntry,
  getNodeAtPath,
  listDirectory,
  normalizePath,
  pathToString,
} from "../utils/fakeFilesystem";

const kaliAsciiArt = String.raw`
    __ __      ____     ____
   / //_/_ __ / / /__  /  _/__  __ ____  __ __
  / ,< / // // / / _ \_/ // _ \/ // /\ \/ // /
 /_/|_|\_,_//_/_/\___/___/_//_/\_,_/ /_/\_, /
                                        /___/
`;

const Terminal = ({
  title,
  onClose,
  onMinimize,
  isActive,
  onFocus,
  zIndex,
  defaultPosition,
  defaultSize,
  filesystem,
  setFilesystem,
  openApp,
  openFile,
}) => {
  const [logs, setLogs] = useState([
    "Kali Portfolio Terminal ready. Type `help`, `neofetch`, `ls`, or `open Documents`.",
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [cwd, setCwd] = useState(["home", "sadia"]);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: "end" });
  }, [logs]);

  const resolveNode = (target) => {
    const path = normalizePath(cwd, target);
    return { path, node: getNodeAtPath(filesystem, path) };
  };

  const printDirectory = (path = cwd) => {
    const items = listDirectory(filesystem, path);
    if (!items) return "Not a directory";
    if (!items.length) return "Directory is empty";
    return items.map((item) => (item.type === "folder" ? `${item.name}/` : item.name)).join("  ");
  };

  const runCommand = (commandLine) => {
    const parts = commandLine.trim().split(/\s+/);
    const command = parts[0];
    const args = parts.slice(1);
    if (!command) return null;

    if (command === "clear") {
      setLogs([]);
      return null;
    }
    if (command === "help") {
      return "Commands: help, whoami, pwd, ls [path], cd [path], cat [file], touch [file], mkdir [dir], open [file|dir], clear, profile, education, experience, projects, skills, contact, neofetch";
    }
    if (command === "whoami") return profile.name;
    if (command === "pwd") return pathToString(cwd);
    if (command === "ls") return printDirectory(args[0] ? normalizePath(cwd, args[0]) : cwd);

    if (command === "cd") {
      const { path, node } = resolveNode(args[0] || "~");
      if (!node) return `${args[0] || "~"}: No such file or directory`;
      if (node.type !== "folder") return `${args[0]}: Not a directory`;
      setCwd(path);
      return pathToString(path);
    }

    if (command === "touch" || command === "mkdir") {
      const entryType = command === "touch" ? "file" : "folder";
      let message = "";
      setFilesystem((current) => {
        const result = createEntry(current, cwd, args[0], entryType);
        message = result.message;
        return result.filesystem;
      });
      return message;
    }

    if (command === "cat") {
      if (!args[0]) return "Usage: cat [file]";
      const { node } = resolveNode(args[0]);
      if (!node) return `${args[0]}: No such file`;
      if (node.type !== "file") return `${args[0]}: Is a directory`;
      return node.content || "(empty file)";
    }

    if (command === "open") {
      const { path, node } = resolveNode(args[0] || ".");
      if (!node) return `${args[0] || "."}: No such file or directory`;
      if (node.type === "folder") {
        openApp("folder", { initialPath: path });
        return `Opening ${pathToString(path)} in Files...`;
      }
      openFile(args[0], node);
      return `Opening ${args[0]}...`;
    }

    if (command === "profile") return profileText();
    if (command === "education") return profile.education.map((item) => `${item.degree}\n${item.school}\n${item.period} | ${item.score}`).join("\n\n");
    if (command === "experience") return profile.experience.map((job) => `${job.role} - ${job.org}\n${job.period}\n- ${job.points.join("\n- ")}`).join("\n\n");
    if (command === "projects") return profile.projects.map((project) => `${project.name}\n${project.stack}\n${project.summary}`).join("\n\n");
    if (command === "skills") return profile.skills.join(" | ");
    if (command === "contact") return `${profile.email}\n${profile.location}`;
    if (command === "neofetch") {
      return `${profile.name}@kali-portfolio\n----------------------\nOS: Kali Portfolio Linux x86_64\nHost: Interactive React Workstation\nShell: portfolio-terminal\nResolution: responsive desktop/mobile\nRole: Software Engineering Intern candidate\nEducation: B.Tech CSE, Cummins College of Engineering for Women\nSkills: ${profile.skills.slice(0, 10).join(", ")}\nTheme: Kali dark / Xfce-inspired`;
    }

    return `Command not found: ${command}`;
  };

  const handleCommand = (commandLine) => {
    const result = runCommand(commandLine);
    if (commandLine.trim() === "clear") return;
    setLogs((prev) => [...prev, `root@kali:${pathToString(cwd)}# ${commandLine}`, ...(result ? [result] : [])]);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (input.trim()) {
        setHistory((prev) => [...prev, input]);
        handleCommand(input);
        setInput("");
        setHistoryIndex(-1);
      }
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      if (history.length > 0 && historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1;
        setInput(history[history.length - 1 - newIndex]);
        setHistoryIndex(newIndex);
      }
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
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
      className="bg-[#0d0d0d] text-[#00ff00]"
      contentClassName="bg-[#0d0d0d] p-4 text-sm"
    >
      <pre className="text-green-400">{kaliAsciiArt}</pre>
      <div className="mb-4 space-y-1 whitespace-pre-wrap text-green-400">
        {logs.map((log, index) => <div key={`${index}-${log.slice(0, 12)}`}>{log}</div>)}
        <div ref={bottomRef} />
      </div>
      <div className="flex">
        <span className="text-blue-500">root@kali:{pathToString(cwd)}# </span>
        <input
          aria-label="Terminal command"
          type="text"
          value={input}
          onFocus={onFocus}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={handleKeyDown}
          className="min-w-0 flex-1 border-none bg-transparent text-blue-500 outline-none"
          style={{ caretColor: "#3b82f6" }}
        />
      </div>
    </WindowFrame>
  );
};

export default Terminal;
