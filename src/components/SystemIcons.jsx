import React, { useState } from "react";
import { BatteryFull, Lock, Volume2, Wifi } from "lucide-react";

const SystemIcons = () => {
  const [isWifiOn, setIsWifiOn] = useState(true);
  const [isVolumeOn, setIsVolumeOn] = useState(true);
  const [isLocked, setIsLocked] = useState(false);
  const batteryLevel = 97;

  const iconButton = (label, title, onClick, children) => (
    <button type="button" aria-label={label} title={title} onClick={onClick} className="rounded p-1 hover:bg-gray-700 focus:outline focus:outline-2 focus:outline-cyan-400">
      {children}
    </button>
  );

  return (
    <div className="flex items-center gap-1 text-white px-2">
      {iconButton(isWifiOn ? "Turn off Wi-Fi" : "Turn on Wi-Fi", isWifiOn ? "Wi-Fi connected" : "Wi-Fi off", () => setIsWifiOn((value) => !value), <Wifi className={`h-5 w-5 ${isWifiOn ? "text-blue-400" : "text-gray-600"}`} />)}
      {iconButton(isVolumeOn ? "Mute volume" : "Unmute volume", isVolumeOn ? "Volume on" : "Muted", () => setIsVolumeOn((value) => !value), <Volume2 className={`h-5 w-5 ${isVolumeOn ? "text-blue-400" : "text-gray-600"}`} />)}
      {iconButton("Battery status", `Battery: ${batteryLevel}%`, undefined, <BatteryFull className="h-5 w-5 text-green-500" />)}
      {iconButton(isLocked ? "Unlock session" : "Lock session", isLocked ? "Locked" : "Unlocked", () => setIsLocked((value) => !value), <Lock className={`h-5 w-5 ${isLocked ? "text-red-400" : "text-green-400"}`} />)}
    </div>
  );
};

export default SystemIcons;
