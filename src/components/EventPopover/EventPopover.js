import "./EventPopover.scss";

export default function EventPopover({
  locationVal,
  timestampVal,
  dateVal,
  ipValue,
  browserVal,
}) {
  return (
    <div className="eventPopover">
      <div className="row">
        <div className="col">
          <div className="eyebrow">Location</div>
          <div className="value">{locationVal}</div>
        </div>
        <div className="col">
          <div className="eyebrow">Timestamp</div>
          <div className="value">{timestampVal}</div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="eyebrow">Date</div>
          <div className="value">{dateVal}</div>
        </div>
        <div className="col">
          <div className="eyebrow">IP</div>
          <div className="value">{ipValue}</div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="eyebrow">Browser</div>
          <div className="value">{browserVal}</div>
        </div>
      </div>
    </div>
  );
}
