import { useState, useRef, useCallback } from "react";
import "./LoginTable.scss";
import EventPopover from "../EventPopover/EventPopover";

export default function LoginTable() {
  // State to track which row is currently being hovered,
  // setting the position of the popover relative to the
  // table row, creating references to the table rows
  const [hoveredRowIndex, setHoveredRowIndex] = useState(null);
  const [popoverPosition, setPopoverPosition] = useState({ x: 0, y: 0 });
  const rowRefs = useRef([]);

  // Throttled mouse move handler
  const handleMouseMove = useCallback((index, event) => {
    const row = rowRefs.current[index];
    if (!row) return;

    const rowRect = row.getBoundingClientRect();
    const mouseX = event.clientX - rowRect.left;
    const mouseY = event.clientY - rowRect.top;

    // Determine popover position based on mouse X relative to row center
    const offset = 22;
    const isRightOfCenter = mouseX > rowRect.width / 2;

    setPopoverPosition({
      x: isRightOfCenter
        ? event.clientX - rowRect.left + offset
        : event.clientX - rowRect.left - offset,
      y: mouseY,
    });
  }, []);

  return (
    <div className="table loginTable">
      {[...Array(8)].map((_, index) => (
        <div
          className="tr"
          key={index}
          // Add mouse enter and leave event handlers
          onMouseEnter={() => setHoveredRowIndex(index)}
          onMouseLeave={() => {
            setHoveredRowIndex(null);
            setPopoverPosition({ x: 0, y: 0 });
          }}
          onMouseMove={(event) => handleMouseMove(index, event)}
          ref={(el) => (rowRefs.current[index] = el)}
        >
          {hoveredRowIndex === index && (
            <div
              style={{
                position: "absolute",
                left: `${popoverPosition.x}px`,
              }}
              className="eventPopoverContainer"
            >
              <EventPopover
                locationVal="New York, NY"
                timestampVal="03:04:05 GMT"
                dateVal="Tue Oct. 15, 2024"
                ipValue="108.60.123.78"
                browserVal="Chrome 73.0"
              />
            </div>
          )}
          <span className="osVal">MacOS</span>
          <span className="timeVal">8 min ago</span>
          <span className="timeVal">New York</span>
        </div>
      ))}
    </div>
  );
}
