import { animate, stagger } from "animejs";
import { useState, useEffect, useRef, forwardRef } from "react";

const DOT_SIZE = 24;

const DotGrid = forwardRef((props, ref) => {
  const gridRef = useRef(null);
  const [gridSize, setGridSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setGridSize({
          width: Math.floor(width / DOT_SIZE),
          height: Math.floor(height / DOT_SIZE),
        });
      }
    });

    if (gridRef.current) {
      resizeObserver.observe(gridRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const handleDotClick = (e) => {
    const index = e.target.dataset.index;
    animateFromIndex(parseInt(index, 10));
  };

  const animateFromIndex = (index) => {
    if (index === undefined) {
      return;
    }

    animate(".dot-point", {
      scale: [
        { to: 1.35, easing: "easeOutSine", duration: 250 },
        { to: 1, easing: "easeInOutQuad", duration: 500 },
      ],
      translateY: [
        { to: -15, easing: "easeOutSine", duration: 250 },
        { to: 1, easing: "easeInOutQuad", duration: 500 },
      ],
      opacity: [
        { to: 1, easing: "easeOutSine", duration: 250 },
        { to: 0.5, easing: "easeInOutQuad", duration: 500 },
      ],
      backgroundColor: [
        { to: "#22c55e", easing: "easeOutSine", duration: 250 },
        { to: "#a8a29e", easing: "easeInOutQuad", duration: 500 },
      ],
      delay: stagger(80, {
        grid: [gridSize.width, gridSize.height],
        from: parseInt(index, 10),
      }),
    });
  };

  const dots = [];
  let index = 0;

  for (let i = 0; i < gridSize.width; i++) {
    for (let j = 0; j < gridSize.height; j++) {
      dots.push(
        <div
          className="group cursor-crosshair rounded-full bg-transparent p-2 transition-all duration-300 hover:bg-green-500"
          data-index={index}
          key={`${i}-${j}`}
        >
          <div
            className="dot-point h-2 w-2 rounded-full bg-stone-400 opacity-50 group-hover:bg-neutral-600"
            data-index={index}
          />
        </div>,
      );
      index++;
    }
  }

  return (
    <div className="relative h-full w-full">
      <div
        ref={gridRef}
        onClick={handleDotClick}
        style={{
          gridTemplateColumns: `repeat(${gridSize.width}, 1fr)`,
          gridTemplateRows: `repeat(${gridSize.height}, 1fr)`,
        }}
        className="absolute z-0 grid h-full w-full"
      >
        {dots}
      </div>
    </div>
  );
});

DotGrid.displayName = "DotGrid";

export default DotGrid;
