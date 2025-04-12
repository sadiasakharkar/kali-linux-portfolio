import { useEffect, useState } from "react";

const bootMessages = [
  "Starting Kali Linux...",
  "[ OK ] Initializing kernel modules...",
  "[ OK ] Starting network manager...",
  "[ OK ] Launching desktop environment...",
  "[ OK ] Welcome, root@kali:~#",
];

export default function BootScreen({ onFinish }) {
  const [currentLine, setCurrentLine] = useState(0);

  useEffect(() => {
    if (currentLine < bootMessages.length) {
      const timer = setTimeout(() => {
        setCurrentLine((prev) => prev + 1);
      }, 800);
      return () => clearTimeout(timer);
    } else {
      setTimeout(onFinish, 1000); // Move to desktop after 1 second
    }
  }, [currentLine]);

  return (
    <div className="h-screen bg-black text-green-500 font-mono p-4 text-sm">
      {bootMessages.slice(0, currentLine).map((line, index) => (
        <div key={index}>{line}</div>
      ))}
      {currentLine < bootMessages.length && (
        <span className="animate-pulse">█</span>
      )}
    </div>
  );
}
