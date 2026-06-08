import React, { useEffect, useRef, useState } from "react";

const clamp = (value, min, max) => Math.min(Math.max(value, min), Math.max(min, max));

const getDesktopBounds = (width, height) => {
  if (typeof window === "undefined") return { maxX: 900, maxY: 600 };
  const isMobile = window.innerWidth <= 760;
  const reservedBottom = isMobile ? 112 : 24;
  const reservedTop = isMobile ? 16 : 8;
  const reservedLeft = isMobile ? 12 : 0;
  return {
    maxX: Math.max(reservedLeft, window.innerWidth - width - 24),
    maxY: Math.max(reservedTop, window.innerHeight - height - reservedBottom),
    reservedLeft,
    reservedTop,
  };
};

const WindowFrame = ({
  title,
  children,
  onClose,
  onMinimize,
  onFocus,
  isActive,
  zIndex = 50,
  defaultPosition = { x: 96, y: 72 },
  defaultSize = { width: 600, height: 420 },
  minSize = { width: 360, height: 280 },
  className = "",
  contentClassName = "",
}) => {
  const frameRef = useRef(null);
  const dragState = useRef(null);
  const resizeState = useRef(null);
  const [position, setPosition] = useState(defaultPosition);
  const [size, setSize] = useState(defaultSize);
  const [isMaximized, setIsMaximized] = useState(false);

  useEffect(() => {
    const bounds = getDesktopBounds(defaultSize.width, defaultSize.height);
    setPosition({
      x: clamp(defaultPosition.x, bounds.reservedLeft, bounds.maxX),
      y: clamp(defaultPosition.y, bounds.reservedTop, bounds.maxY),
    });
    setSize({
      width: Math.max(defaultSize.width, minSize.width),
      height: Math.max(defaultSize.height, minSize.height),
    });
  }, [defaultPosition.x, defaultPosition.y, defaultSize.height, defaultSize.width, minSize.height, minSize.width]);

  const startDrag = (event) => {
    if (isMaximized || event.button !== 0) return;
    event.preventDefault();
    onFocus?.();
    const rect = frameRef.current.getBoundingClientRect();
    dragState.current = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  };

  const startResize = (event) => {
    event.preventDefault();
    event.stopPropagation();
    onFocus?.();
    resizeState.current = {
      x: event.clientX,
      y: event.clientY,
      width: size.width,
      height: size.height,
    };
  };

  useEffect(() => {
    const handleMove = (event) => {
      if (dragState.current) {
        const bounds = getDesktopBounds(size.width, size.height);
        setPosition({
          x: clamp(event.clientX - dragState.current.x, bounds.reservedLeft, bounds.maxX),
          y: clamp(event.clientY - dragState.current.y, bounds.reservedTop, bounds.maxY),
        });
      }

      if (resizeState.current) {
        const width = Math.max(minSize.width, resizeState.current.width + event.clientX - resizeState.current.x);
        const height = Math.max(minSize.height, resizeState.current.height + event.clientY - resizeState.current.y);
        const bounds = getDesktopBounds(width, height);
        setSize({ width: Math.min(width, window.innerWidth - 32), height: Math.min(height, window.innerHeight - 96) });
        setPosition((current) => ({
          x: clamp(current.x, bounds.reservedLeft, bounds.maxX),
          y: clamp(current.y, bounds.reservedTop, bounds.maxY),
        }));
      }
    };

    const stopInteraction = () => {
      dragState.current = null;
      resizeState.current = null;
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", stopInteraction);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", stopInteraction);
    };
  }, [minSize.height, minSize.width, size.height, size.width, onFocus]);

  const frameStyle = {
    zIndex,
    left: isMaximized ? 0 : position.x,
    top: isMaximized ? 0 : position.y,
    width: isMaximized ? "100%" : size.width,
    height: isMaximized ? "100%" : size.height,
  };

  return (
    <section
      ref={frameRef}
      aria-label={title}
      onMouseDown={onFocus}
      className={`kali-window absolute overflow-hidden rounded-sm border font-mono shadow-2xl ${isActive ? "border-[#3aaed8]" : "border-[#1f4153]"} ${className}`}
      style={frameStyle}
    >
      <div
        className={`kali-titlebar flex h-8 select-none items-center justify-between border-b px-2 text-[13px] ${isActive ? "border-[#256f8d] bg-[#142a36] text-cyan-100" : "border-[#1b3645] bg-[#0d1a22] text-slate-300"}`}
        onMouseDown={startDrag}
        onDoubleClick={() => setIsMaximized((value) => !value)}
      >
        <div className="flex min-w-0 items-center gap-2">
          <span className="h-3 w-3 rounded-sm border border-cyan-700 bg-[#061a20] shadow-inner" />
          <span className="truncate">{title}</span>
        </div>
        <div className="flex items-center gap-1">
          <button type="button" aria-label={`Minimize ${title}`} title="Minimize" onMouseDown={(event) => event.stopPropagation()} onClick={onMinimize} className="kali-window-button">_</button>
          <button type="button" aria-label={isMaximized ? `Restore ${title}` : `Maximize ${title}`} title={isMaximized ? "Restore" : "Maximize"} onMouseDown={(event) => event.stopPropagation()} onClick={() => setIsMaximized((value) => !value)} className="kali-window-button">□</button>
          <button type="button" aria-label={`Close ${title}`} title="Close" onMouseDown={(event) => event.stopPropagation()} onClick={onClose} className="kali-window-button close">×</button>
        </div>
      </div>
      <div className={`h-[calc(100%-2rem)] overflow-auto bg-[#071014] ${contentClassName}`}>{children}</div>
      {!isMaximized && <div aria-hidden="true" onMouseDown={startResize} className="absolute bottom-0 right-0 h-4 w-4 cursor-se-resize border-b-2 border-r-2 border-cyan-600/80" />}
    </section>
  );
};

export default WindowFrame;
