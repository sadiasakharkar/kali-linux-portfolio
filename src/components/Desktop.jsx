import React, { useEffect, useMemo, useState } from "react";
import Terminal from "./Terminal";
import VsCode from "./VSCodeEditor";
import SystemMonitor from "./SystemMonitor";
import SystemIcons from "./SystemIcons";
import Firewall from "./Firewall";
import PortScanner from "./PortScanner";
import PasswordCracker from "./PasswordCracker";
import FileExplorer from "./FileExplorer";
import Browser from "./Browser";
import FileViewer from "./FileViewer";
import { createInitialFilesystem, getNodeAtPath } from "../utils/fakeFilesystem";

let appIdCounter = 0;

const APP_META = {
  terminal: { label: "Terminal", icon: "/terminal-icon.png", title: "root@kali:~" },
  browser: { label: "Browser", icon: "/browser-icon.png", title: "Brave Browser" },
  folder: { label: "Files", icon: "/folder-icon.png", title: "~/Documents" },
  vsCode: { label: "VS Code", icon: "/vscode-icon.png", title: "VS Code - kali-linux-portfolio" },
  monitor: { label: "System Monitor", icon: "/monitor-icon.png", title: "System Monitor" },
  firewall: { label: "Firewall", icon: "/firewall-icon.svg", title: "Kali Firewall" },
  portscanner: { label: "Port Scanner", icon: "/scanner-icon.svg", title: "Kali Port Scanner" },
  cracker: { label: "Password Cracker", icon: "/password-icon.svg", title: "Kali Password Cracker" },
};

const Desktop = () => {
  const [workspaces, setWorkspaces] = useState({ 1: [], 2: [], 3: [], 4: [] });
  const [currentWorkspace, setCurrentWorkspace] = useState(1);
  const [activeAppId, setActiveAppId] = useState(null);
  const [time, setTime] = useState(new Date());
  const [filesystem, setFilesystem] = useState(() => createInitialFilesystem());
  const [fileViewer, setFileViewer] = useState(null);
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0 });
  const [wallpaper, setWallpaper] = useState("/kali-wallpaper.jpg");
  const [showWallpaperModal, setShowWallpaperModal] = useState(false);
  const [topZIndex, setTopZIndex] = useState(60);

  const currentApps = workspaces[currentWorkspace];
  const activeApp = currentApps.find((app) => app.id === activeAppId);
  const dockApps = useMemo(() => ["terminal", "browser", "folder", "vsCode", "monitor", "firewall", "portscanner", "cracker"], []);
  const wallpapers = ["/wallpapers/wallpaper1.png", "/wallpapers/wallpaper2.jpeg", "/wallpapers/wallpaper3.jpeg", "/kali-wallpaper.jpg"];

  const focusApp = (id) => {
    setTopZIndex((value) => {
      const next = value + 1;
      setWorkspaces((prev) => ({
        ...prev,
        [currentWorkspace]: prev[currentWorkspace].map((app) =>
          app.id === id ? { ...app, minimized: false, zIndex: next } : app
        ),
      }));
      return next;
    });
    setActiveAppId(id);
  };

  const openApp = (appName, options = {}) => {
    const existing = currentApps.find((app) => app.name === appName && app.minimized);
    if (existing) {
      focusApp(existing.id);
      return existing.id;
    }

    const id = ++appIdCounter;
    const newApp = {
      id,
      name: appName,
      minimized: false,
      zIndex: topZIndex + 1,
      initialPath: options.initialPath,
    };

    setTopZIndex((value) => value + 1);
    setWorkspaces((prev) => ({ ...prev, [currentWorkspace]: [...prev[currentWorkspace], newApp] }));
    setActiveAppId(id);
    return id;
  };

  const closeApp = (id) => {
    setWorkspaces((prev) => ({
      ...prev,
      [currentWorkspace]: prev[currentWorkspace].filter((app) => app.id !== id),
    }));
    setActiveAppId((current) => (current === id ? null : current));
  };

  const minimizeApp = (id) => {
    setWorkspaces((prev) => ({
      ...prev,
      [currentWorkspace]: prev[currentWorkspace].map((app) =>
        app.id === id ? { ...app, minimized: true } : app
      ),
    }));
    setActiveAppId((current) => (current === id ? null : current));
  };

  const openFile = (fileName, node) => {
    setFileViewer({ fileName, node });
    setTopZIndex((value) => value + 1);
  };

  const openDesktopItem = (fileName) => {
    const path = ["home", "sadia", "Documents", fileName];
    const node = getNodeAtPath(filesystem, path);
    if (!node) return;
    if (node.type === "folder") {
      openApp("folder", { initialPath: path });
      return;
    }
    openFile(fileName, node);
  };

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const handleContextMenu = (event) => {
    event.preventDefault();
    setContextMenu({ visible: true, x: event.clientX, y: event.clientY });
  };

  const handleContextOption = (action) => {
    if (action === "terminal") openApp("terminal");
    if (action === "browser") openApp("browser");
    if (action === "folder") openApp("folder");
    if (action === "refresh") window.location.reload();
    if (action === "wallpaper") setShowWallpaperModal(true);
    setContextMenu({ ...contextMenu, visible: false });
  };

  const renderApp = (app) => {
    if (app.minimized) return null;
    const meta = APP_META[app.name];
    const commonProps = {
      key: app.id,
      title: meta.title,
      onClose: () => closeApp(app.id),
      onMinimize: () => minimizeApp(app.id),
      isActive: activeAppId === app.id,
      onFocus: () => focusApp(app.id),
      zIndex: app.zIndex,
    };

    if (app.name === "terminal") {
      return <Terminal {...commonProps} filesystem={filesystem} setFilesystem={setFilesystem} openApp={openApp} openFile={openFile} />;
    }
    if (app.name === "folder") {
      return <FileExplorer {...commonProps} filesystem={filesystem} openFile={openFile} initialPath={app.initialPath} />;
    }
    if (app.name === "browser") return <Browser {...commonProps} />;
    if (app.name === "vsCode") return <VsCode {...commonProps} />;
    if (app.name === "monitor") return <SystemMonitor {...commonProps} />;
    if (app.name === "firewall") return <Firewall {...commonProps} />;
    if (app.name === "portscanner") return <PortScanner {...commonProps} />;
    if (app.name === "cracker") return <PasswordCracker {...commonProps} />;
    return null;
  };

  return (
    <div className="desktop-shell h-screen overflow-hidden flex flex-col bg-black" onContextMenu={handleContextMenu} onClick={() => contextMenu.visible && setContextMenu({ ...contextMenu, visible: false })}>
      <header className="top-panel h-12 bg-gray-900 text-white flex items-center justify-between px-4 relative">
        <div className="workspace-switcher absolute left-2 top-1/2 flex -translate-y-1/2 gap-1">
          {[1, 2, 3, 4].map((workspace) => {
            const hasApps = workspaces[workspace].length > 0;
            const isActive = currentWorkspace === workspace;
            return (
              <button key={workspace} type="button" aria-label={`Switch to workspace ${workspace}`} title={`Workspace ${workspace}`} onClick={() => { setCurrentWorkspace(workspace); setActiveAppId(null); }} className={`relative w-8 h-8 flex items-center justify-center rounded-sm border-2 text-sm font-semibold ${isActive ? "border-blue-500 bg-gray-800" : "border-gray-600 hover:border-gray-400 bg-gray-700"}`}>
                {workspace}
                {hasApps && <span className={`absolute bottom-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full ${isActive ? "bg-blue-400" : "bg-gray-400"}`} />}
              </button>
            );
          })}
        </div>

        <div className="task-list absolute left-40 top-1/2 flex -translate-y-1/2 gap-2">
          {currentApps.map((app) => {
            const meta = APP_META[app.name];
            return (
              <button key={app.id} type="button" onClick={() => focusApp(app.id)} aria-label={`${app.minimized ? "Restore" : "Focus"} ${meta.label}`} title={`${app.minimized ? "Restore" : "Focus"} ${meta.label}`} className={`w-8 h-8 rounded-md border-2 flex items-center justify-center ${app.id === activeAppId ? "border-blue-500 bg-gray-700" : app.minimized ? "border-yellow-500 bg-gray-900" : "border-gray-700 hover:border-gray-500"}`}>
                <img src={meta.icon} alt="" className="w-5 h-5" />
              </button>
            );
          })}
        </div>

        <div className="active-title mx-auto hidden max-w-xs truncate text-sm text-cyan-200 md:block">
          {activeApp ? APP_META[activeApp.name].title : "Sadia Kali Portfolio"}
        </div>

        <div className="ml-auto flex items-center gap-4">
          <SystemIcons />
          <span className="text-sm font-mono">{time.toLocaleTimeString()}</span>
        </div>
      </header>

      <main className="flex min-h-0 flex-1">
        <aside className="dock w-16 flex flex-col items-center justify-between py-4 bg-black/20 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-4">
            {dockApps.map((appName) => {
              const meta = APP_META[appName];
              const running = currentApps.some((app) => app.name === appName);
              return (
                <button key={appName} type="button" onClick={() => openApp(appName)} aria-label={`Open ${meta.label}`} title={meta.label} className={`relative rounded-md p-1 transition-transform duration-150 hover:scale-110 focus:outline focus:outline-2 focus:outline-cyan-400 ${running ? "bg-cyan-950/70" : ""}`}>
                  <img src={meta.icon} alt="" className="w-8" />
                  {running && <span className="absolute -bottom-1 left-1/2 h-1 w-5 -translate-x-1/2 rounded-full bg-cyan-400" />}
                </button>
              );
            })}
          </div>

          <button type="button" aria-label="Change wallpaper" title="Change wallpaper" onClick={() => setShowWallpaperModal(true)} className="mb-2">
            <img src="/kali-wallpaper.jpg" alt="" className="w-12 h-12 rounded-md border border-cyan-500 shadow-md hover:scale-105 transition-transform" />
          </button>
        </aside>

        <section className="desktop-area relative min-w-0 flex-1 overflow-hidden p-4" style={{ backgroundImage: `url('${wallpaper}')`, backgroundSize: "cover", backgroundPosition: "center" }}>
          <div className="quick-files grid w-fit grid-cols-2 gap-3 text-xs text-cyan-100 sm:grid-cols-3">
            {[["About", "About_Sadia.txt"], ["Projects", "Projects"], ["Resume", "Resume.pdf"], ["Contact", "Contact.txt"]].map(([label, fileName]) => (
              <button key={fileName} type="button" onClick={() => openDesktopItem(fileName)} className="w-24 rounded border border-cyan-700 bg-black/55 px-2 py-2 text-center backdrop-blur-sm hover:border-cyan-300" title={`Open ${label} in Files`}>
                <img src="/folder-icon.png" alt="" className="mx-auto mb-1 h-7 w-7" />
                {label}
              </button>
            ))}
          </div>

          {currentApps.map(renderApp)}

          {fileViewer && <FileViewer fileName={fileViewer.fileName} node={fileViewer.node} onClose={() => setFileViewer(null)} zIndex={topZIndex + 2} />}
        </section>
      </main>

      {contextMenu.visible && (
        <ul className="absolute z-[200] w-52 rounded border border-cyan-600 bg-black text-sm text-cyan-300 shadow-xl" style={{ top: contextMenu.y, left: contextMenu.x }}>
          {[["Open Terminal", "terminal"], ["Open Files", "folder"], ["Open Browser", "browser"], ["Refresh", "refresh"], ["Change Wallpaper", "wallpaper"]].map(([label, action]) => (
            <li key={action} className="cursor-pointer px-4 py-2 hover:bg-cyan-700" onClick={() => handleContextOption(action)}>{label}</li>
          ))}
        </ul>
      )}

      {showWallpaperModal && (
        <div className="absolute inset-0 z-[210] flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-2xl rounded-md bg-gray-900 p-6 text-white">
            <h2 className="mb-4 text-xl">Choose a Wallpaper</h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {wallpapers.map((img, index) => (
                <button key={img} type="button" aria-label={`Use wallpaper ${index + 1}`} onClick={() => { setWallpaper(img); setShowWallpaperModal(false); }} className={`border-2 ${wallpaper === img ? "border-cyan-300" : "border-transparent"} hover:border-cyan-500`}>
                  <img src={img} alt="" className="h-32 w-full object-cover" />
                </button>
              ))}
            </div>
            <button type="button" onClick={() => setShowWallpaperModal(false)} className="mt-4 rounded bg-gray-700 px-4 py-2 hover:bg-gray-600">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Desktop;
