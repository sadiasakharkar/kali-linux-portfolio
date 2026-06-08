import React, { useEffect, useRef, useState } from "react";

const WindowFrame = ({
  title,
  children,
  onClose,
  onMinimize,
  onFocus,
  isActive,
  zIndex = 50,
  defaultPosition = { x: 64, y: 56 },
  defaultSize = { width: 600, height: 420 },
  minSize = { width: 340, height: 280 },
  className = "",
  contentClassName = "",
}) => {
  const frameRef = useRef(null);
  const dragState = useRef(null);
  const resizeState = useRef(null);
  const [position, setPosition] = useState(defaultPosition);
  const [size, setSize] = useState(defaultSize);
  const [isMaximized, setIsMaximized] = useState(false);

  const startDrag = (event) => {
    if (isMaximized) return;
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
        setPosition({
          x: Math.max(0, event.clientX - dragState.current.x),
          y: Math.max(0, event.clientY - dragState.current.y),
        });
      }

      if (resizeState.current) {
        setSize({
          width: Math.max(
            minSize.width,
            resizeState.current.width + event.clientX - resizeState.current.x
          ),
          height: Math.max(
            minSize.height,
            resizeState.current.height + event.clientY - resizeState.current.y
          ),
        });
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
  }, [minSize.height, minSize.width, size.height, size.width]);

  return (
    <section
      ref={frameRef}
      aria-label={title}
      onMouseDown={onFocus}
      className={`absolute overflow-hidden rounded-md border font-mono shadow-xl ${
        isActive ? "border-cyan-400" : "border-green-700"
      } ${className}`}
      style={{
        zIndex,
        left: isMaximized ? 0 : position.x,
        top: isMaximized ? 0 : position.y,
        width: isMaximized ? "100%" : size.width,
        height: isMaximized ? "100%" : size.height,
      }}
    >
      <div
        className="flex h-9 items-center justify-between border-b border-green-700 bg-[#101820] px-3 text-sm text-green-300"
        onMouseDown={startDrag}
      >
        <span className="truncate">{title}</span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label={`Minimize ${title}`}
            title="Minimize"
            onMouseDown={(event) => event.stopPropagation()}
            onClick={onMinimize}
            className="h-4 w-4 rounded-sm border border-yellow-400 text-yellow-300 leading-3"
          >
            -
          </button>
          <button
            type="button"
            aria-label={isMaximized ? `Restore ${title}` : `Maximize ${title}`}
            title={isMaximized ? "Restore" : "Maximize"}
            onMouseDown={(event) => event.stopPropagation()}
            onClick={() => setIsMaximized((value) => !value)}
            className="h-4 w-4 rounded-sm border border-green-400 text-green-300 leading-3"
          >
            □
          </button>
          <button
            type="button"
            aria-label={`Close ${title}`}
            title="Close"
            onMouseDown={(event) => event.stopPropagation()}
            onClick={onClose}
            className="h-4 w-4 rounded-sm border border-red-400 text-red-300 leading-3"
          >
            x
          </button>
        </div>
      </div>
      <div className={`h-[calc(100%-2.25rem)] overflow-auto ${contentClassName}`}>
        {children}
      </div>
      {!isMaximized && (
        <div
          aria-hidden="true"
          onMouseDown={startResize}
          className="absolute bottom-0 right-0 h-3 w-3 cursor-se-resize bg-green-400"
        />
      )}
    </section>
  );
};

export default WindowFrame;
