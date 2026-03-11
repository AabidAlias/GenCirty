/**
 * components/NamePositioner.jsx
 * Shows the uploaded certificate template and lets the user
 * drag a resizable box to set the exact name position.
 * Returns { nameXCm, nameYCm, textBoxWidthCm } to parent.
 */
import { useRef, useState, useEffect, useCallback } from "react";

const CM_PER_PX_DISPLAY = 1; // will be calculated from actual image

export default function NamePositioner({ templateFile, onPositionChange }) {
  const containerRef = useRef(null);
  const imgRef = useRef(null);
  const [imgUrl, setImgUrl] = useState(null);
  const [imgNaturalSize, setImgNaturalSize] = useState({ w: 1, h: 1 });
  const [displaySize, setDisplaySize] = useState({ w: 1, h: 1 });

  // Box state in display pixels
  const [box, setBox] = useState({ x: 100, y: 100, w: 300, h: 60 });
  const [dragging, setDragging] = useState(false);
  const [resizing, setResizing] = useState(false);
  const dragStart = useRef(null);

  // Create object URL for the uploaded file
  useEffect(() => {
    if (!templateFile) return;
    const url = URL.createObjectURL(templateFile);
    setImgUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [templateFile]);

  // Once image loads, get natural size and set initial box to center
  const handleImgLoad = () => {
    const img = imgRef.current;
    if (!img) return;
    setImgNaturalSize({ w: img.naturalWidth, h: img.naturalHeight });
    setDisplaySize({ w: img.offsetWidth, h: img.offsetHeight });
    // Initial box: centered horizontally, at ~45% height
    const bw = img.offsetWidth * 0.6;
    const bh = 55;
    setBox({
      x: (img.offsetWidth - bw) / 2,
      y: img.offsetHeight * 0.45,
      w: bw,
      h: bh,
    });
  };

  // Convert display px → cm using natural image dimensions
  const toCm = useCallback((px, axis) => {
    const img = imgRef.current;
    if (!img) return 0;
    const scale = axis === "x"
      ? imgNaturalSize.w / img.offsetWidth
      : imgNaturalSize.h / img.offsetHeight;
    const naturalPx = px * scale;
    return +(naturalPx / 118).toFixed(2); // 118px per cm at 300 DPI
  }, [imgNaturalSize]);

  // Emit position whenever box changes
  useEffect(() => {
    onPositionChange({
      nameXCm: toCm(box.x, "x"),
      nameYCm: toCm(box.y + box.h / 2, "y"), // center of box
      textBoxWidthCm: toCm(box.w, "x"),
    });
  }, [box, toCm]);

  // ── Drag to move ──
  const onMouseDownMove = (e) => {
    e.preventDefault();
    setDragging(true);
    dragStart.current = { mx: e.clientX, my: e.clientY, bx: box.x, by: box.y };
  };

  // ── Drag to resize (right edge) ──
  const onMouseDownResize = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setResizing(true);
    dragStart.current = { mx: e.clientX, bw: box.w };
  };

  useEffect(() => {
    const onMove = (e) => {
      if (dragging && dragStart.current) {
        const dx = e.clientX - dragStart.current.mx;
        const dy = e.clientY - dragStart.current.my;
        const img = imgRef.current;
        if (!img) return;
        setBox((b) => ({
          ...b,
          x: Math.max(0, Math.min(dragStart.current.bx + dx, img.offsetWidth - b.w)),
          y: Math.max(0, Math.min(dragStart.current.by + dy, img.offsetHeight - b.h)),
        }));
      }
      if (resizing && dragStart.current) {
        const dx = e.clientX - dragStart.current.mx;
        setBox((b) => ({
          ...b,
          w: Math.max(80, dragStart.current.bw + dx),
        }));
      }
    };
    const onUp = () => { setDragging(false); setResizing(false); };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => { window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseup", onUp); };
  }, [dragging, resizing]);

  if (!templateFile) return null;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-700">📍 Position Name on Certificate</h3>
        <div className="text-xs text-gray-400 bg-gray-50 px-3 py-1 rounded-full border">
          X: <strong>{toCm(box.x, "x")} cm</strong> &nbsp;|&nbsp;
          Y: <strong>{toCm(box.y + box.h / 2, "y")} cm</strong> &nbsp;|&nbsp;
          W: <strong>{toCm(box.w, "x")} cm</strong>
        </div>
      </div>

      <p className="text-xs text-gray-400">
        🖱️ <strong>Drag</strong> the red box to position the name. <strong>Drag right edge</strong> to resize width.
      </p>

      <div
        ref={containerRef}
        className="relative border-2 border-red-200 rounded-xl overflow-hidden bg-gray-100 select-none"
        style={{ maxHeight: "420px" }}
      >
        {imgUrl && (
          <img
            ref={imgRef}
            src={imgUrl}
            alt="Certificate template"
            onLoad={handleImgLoad}
            className="w-full h-auto block"
            draggable={false}
          />
        )}

        {/* Draggable name box */}
        <div
          onMouseDown={onMouseDownMove}
          style={{
            position: "absolute",
            left: box.x,
            top: box.y,
            width: box.w,
            height: box.h,
            cursor: dragging ? "grabbing" : "grab",
          }}
          className="group"
        >
          {/* Box outline */}
          <div className="w-full h-full border-2 border-red-500 bg-red-500/10 rounded flex items-center justify-center relative">
            <span className="text-red-600 text-xs font-bold select-none pointer-events-none bg-white/80 px-2 py-0.5 rounded">
              Name goes here
            </span>

            {/* Resize handle — right edge */}
            <div
              onMouseDown={onMouseDownResize}
              className="absolute right-0 top-0 bottom-0 w-3 cursor-ew-resize flex items-center justify-center"
            >
              <div className="w-1 h-8 bg-red-500 rounded-full opacity-60 group-hover:opacity-100" />
            </div>

            {/* Corner dots */}
            {["top-0 left-0", "top-0 right-0", "bottom-0 left-0", "bottom-0 right-0"].map((pos) => (
              <div key={pos} className={`absolute ${pos} w-2.5 h-2.5 bg-red-500 rounded-full -translate-x-1/2 -translate-y-1/2`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
