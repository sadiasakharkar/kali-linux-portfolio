import React, { useState, useEffect } from "react";
import { Volume2, Wifi, BatteryFull, Lock } from "lucide-react";

const SystemIcons = () => {
  // State variables to handle toggles and battery level
  const [isWifiOn, setIsWifiOn] = useState(true);
  const [isVolumeOn, setIsVolumeOn] = useState(true);
  const [isLocked, setIsLocked] = useState(false);
  const [batteryLevel, setBatteryLevel] = useState(100); // Example for battery level

  // Handle Wi-Fi toggle
  const toggleWifi = () => {
    setIsWifiOn(!isWifiOn);
  };

  // Handle Volume toggle
  const toggleVolume = () => {
    setIsVolumeOn(!isVolumeOn);
  };

  // Handle Lock toggle
  const toggleLock = () => {
    setIsLocked(!isLocked);
  };

  // Handle battery level simulation (decreases over time)
  useEffect(() => {
    const interval = setInterval(() => {
      setBatteryLevel((prevLevel) => {
        if (prevLevel <= 0) {
          clearInterval(interval); // Stop when battery level reaches 0
          return 0;
        }
        return prevLevel - 1; // Decrease battery level by 1 every second
      });
    }, 1000); // Update every second
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  // Handle battery icon color (green if > 20%, red if < 20%)
  const batteryIconColor =
    batteryLevel < 20 ? "text-red-500" : "text-green-500";

  return (
    <div className="flex items-center space-x-2 text-white px-4">
      {/* Wi-Fi Icon */}
      <Wifi
        className={`w-5 h-5 cursor-pointer transition-all duration-150 
          ${
            isWifiOn
              ? "text-blue-400 hover:text-blue-500"
              : "text-gray-600 hover:text-gray-400"
          }`}
        onClick={toggleWifi}
        title={isWifiOn ? "Turn off Wi-Fi" : "Turn on Wi-Fi"}
      />

      {/* Volume Icon */}
      <Volume2
        className={`w-5 h-5 cursor-pointer transition-all duration-150 
          ${
            isVolumeOn
              ? "text-blue-400 hover:text-blue-500"
              : "text-gray-600 hover:text-gray-400"
          }`}
        onClick={toggleVolume}
        title={isVolumeOn ? "Mute" : "Unmute"}
      />

      {/* Battery Icon */}
      <BatteryFull
        className={`w-5 h-5 cursor-pointer transition-all duration-150 
          ${batteryIconColor} hover:text-white`}
        title={`Battery: ${batteryLevel}%`}
      />

      {/* Lock Icon */}
      <Lock
        className={`w-5 h-5 cursor-pointer transition-all duration-150 
          ${
            isLocked
              ? "text-red-400 hover:text-red-500"
              : "text-green-400 hover:text-green-500"
          }`}
        onClick={toggleLock}
        title={isLocked ? "Unlock" : "Lock"}
      />
    </div>
  );
};

export default SystemIcons;
