import { useState } from "react";
import BootScreen from "./components/BootScreen";
import Desktop from "./components/Desktop";
import Browser from "./components/Browser";

function App() {
  const [isBootFinished, setIsBootFinished] = useState(false);
  const [isBrowserOpen, setIsBrowserOpen] = useState(false);

  const handleBootFinish = () => {
    console.log("Boot process finished, transitioning to desktop...");
    setIsBootFinished(true);
  };

  const openBrowser = () => {
    setIsBrowserOpen(true);
    // Optionally, you can trigger opening Brave's search engine here as well
    window.open("https://search.brave.com", "_blank");
  };

  return (
    <div className="App">
      {!isBootFinished ? (
        <BootScreen onFinish={handleBootFinish} />
      ) : isBrowserOpen ? (
        <Browser />
      ) : (
        <Desktop openBrowser={openBrowser} />
      )}
    </div>
  );
}

export default App;
