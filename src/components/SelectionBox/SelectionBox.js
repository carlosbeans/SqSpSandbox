export default function SelectionBox({ startPoint, endPoint }) {
  if (!startPoint || !endPoint) return null;

  const left = Math.min(startPoint.x, endPoint.x);
  const top = Math.min(startPoint.y, endPoint.y);
  const width = Math.abs(endPoint.x - startPoint.x);
  const height = Math.abs(endPoint.y - startPoint.y);

  return (
    <div
      style={{
        position: "absolute",
        left,
        top,
        width,
        height,
        border: "2px solid #2196f3",
        backgroundColor: "rgba(33, 150, 243, 0.1)",
        pointerEvents: "none",
        zIndex: 1000,
      }}
    />
  );
}
