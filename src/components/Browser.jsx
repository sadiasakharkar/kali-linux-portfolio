import React, { useState } from "react";
import WindowFrame from "./WindowFrame";

const results = [
  {
    title: "Sadia Sakharkar - GitHub",
    url: "https://github.com/sadiasakharkar",
    description: "Repositories, experiments, and software projects.",
  },
  {
    title: "AgriYield Pro",
    url: "#projects",
    description: "Machine learning crop-yield prediction project.",
  },
  {
    title: "Kali Portfolio",
    url: "https://kali-linux-portfolio.vercel.app",
    description: "Linux-style interactive developer portfolio.",
  },
];

const Browser = ({ title, onClose, onMinimize, isActive, onFocus, zIndex, defaultPosition, defaultSize }) => {
  const [query, setQuery] = useState("Sadia Sakharkar portfolio");
  const [searched, setSearched] = useState(true);

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
      className="bg-[#0b1014] text-white"
      contentClassName="bg-[#0b1014]"
    >
      <div className="flex gap-2 border-b border-cyan-900 bg-[#101820] p-3">
        <input
          aria-label="Browser address and search bar"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={(event) => event.key === "Enter" && setSearched(true)}
          className="min-w-0 flex-1 rounded border border-cyan-700 bg-black px-3 py-2 text-sm text-cyan-100 outline-none focus:border-cyan-300"
        />
        <button type="button" onClick={() => setSearched(true)} className="rounded bg-cyan-700 px-4 py-2 text-sm hover:bg-cyan-600">
          Search
        </button>
      </div>

      <div className="space-y-4 p-5 text-sm">
        <h2 className="text-xl font-semibold text-cyan-300">Brave Search</h2>
        {searched && (
          <div className="space-y-4">
            {results.map((result) => (
              <article key={result.title} className="rounded border border-cyan-900 bg-black/40 p-3">
                <a href={result.url} target={result.url.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="text-base text-blue-400 underline">
                  {result.title}
                </a>
                <p className="mt-1 text-xs text-green-300">{result.url}</p>
                <p className="mt-2 text-cyan-100">{result.description}</p>
              </article>
            ))}
          </div>
        )}
      </div>
    </WindowFrame>
  );
};

export default Browser;
