import React from "react";
import "./SelectableCard.scss";
export default function SelectableCard({
  title,
  description,
  isHighlighted,
  cardRef,
}) {
  return (
    <div
      className="selectableCard"
      ref={cardRef}
      style={{
        transition: "all 0.2s ease",
        userSelect: "none",
        borderColor: isHighlighted ? "#2196f3" : "#e0e0e0",
        backgroundColor: isHighlighted
          ? "rgba(33, 150, 243, 0.1)"
          : "transparent",
      }}
    >
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}
