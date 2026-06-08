import React, { useEffect, useState } from "react";
import { FileText, Folder } from "lucide-react";
import WindowFrame from "./WindowFrame";
import { getNodeAtPath, listDirectory, normalizePath, pathToString } from "../utils/fakeFilesystem";

const DEFAULT_PATH = ["home", "sadia", "Documents"];

const FileExplorer = ({
  title,
  onClose,
  onMinimize,
  isActive,
  onFocus,
  zIndex,
  filesystem,
  openFile,
  initialPath,
}) => {
  const [path, setPath] = useState(initialPath || DEFAULT_PATH);

  useEffect(() => {
    if (initialPath) setPath(initialPath);
  }, [initialPath]);

  const items = listDirectory(filesystem, path) || [];
  const openItem = (item) => {
    if (item.type === "folder") {
      setPath([...path, item.name]);
      return;
    }
    const node = getNodeAtPath(filesystem, [...path, item.name]);
    openFile(item.name, node);
  };

  const goUp = () => {
    if (path.length > 2) setPath((current) => current.slice(0, -1));
  };

  const goHome = () => setPath(DEFAULT_PATH);

  const jumpToPortfolioFile = (name) => {
    const nextPath = normalizePath(DEFAULT_PATH, name);
    const node = getNodeAtPath(filesystem, nextPath);
    if (!node) return;
    if (node.type === "folder") setPath(nextPath);
    else openFile(name, node);
  };

  return (
    <WindowFrame
      title={title || pathToString(path)}
      onClose={onClose}
      onMinimize={onMinimize}
      onFocus={onFocus}
      isActive={isActive}
      zIndex={zIndex}
      defaultPosition={{ x: 72, y: 62 }}
      defaultSize={{ width: 620, height: 480 }}
      className="bg-[#0a0a0a] text-[#98d1ac]"
      contentClassName="bg-[#0a0a0a]"
    >
      <div className="flex flex-wrap items-center gap-2 border-b border-green-800 bg-black/40 px-3 py-2 text-xs text-green-300">
        <button type="button" onClick={goUp} disabled={path.length <= 2} className="rounded border border-green-700 px-2 py-1 disabled:opacity-40" aria-label="Go to parent folder" title="Parent folder">..</button>
        <button type="button" onClick={goHome} className="rounded border border-green-700 px-2 py-1" aria-label="Go to Documents" title="Documents">~/Documents</button>
        <span className="min-w-0 flex-1 truncate text-cyan-300">{pathToString(path)}</span>
      </div>

      <div className="grid grid-cols-2 gap-3 p-4 text-xs sm:grid-cols-3">
        {items.map((item) => (
          <button
            key={item.name}
            type="button"
            onClick={() => openItem(item)}
            onDoubleClick={() => openItem(item)}
            className="flex min-h-24 flex-col items-center justify-center rounded-md border border-green-800 p-2 text-center transition hover:bg-[#101820] focus:outline focus:outline-2 focus:outline-cyan-400"
            aria-label={`${item.type === "folder" ? "Open folder" : "Open file"} ${item.name}`}
            title={item.name}
          >
            {item.type === "folder" ? <Folder className="h-8 w-8 text-green-300" /> : <FileText className="h-8 w-8 text-green-300" />}
            <span className="mt-2 break-words">{item.name}</span>
          </button>
        ))}
      </div>

      <div className="border-t border-green-900 p-3 text-xs text-cyan-200">
        <span className="mr-2 text-green-400">Quick open:</span>
        {["About_Sadia.txt", "Projects", "Resume.pdf", "Contact.txt"].map((item) => (
          <button key={item} type="button" onClick={() => jumpToPortfolioFile(item)} className="mr-2 underline hover:text-white">
            {item.replace("_Sadia.txt", "").replace(".pdf", "").replace(".txt", "")}
          </button>
        ))}
      </div>
    </WindowFrame>
  );
};

export default FileExplorer;
