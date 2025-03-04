import "./SessionCard.scss";

export default function SessionCard({ sessionOS }) {
  return (
    <div className="sessionCard">
      <div className="row noPaddingTop">{sessionOS}</div>
      <div>
        <div className="row noPaddingTop">
          <div className="col label">Browser</div>
          <div className="col val">Chrome 73.0</div>
        </div>
        <div className="row noPaddingTop">
          <div className="col label">Location</div>
          <div className="col val">New York, NY, USA (108.60.123.78)</div>
        </div>
        <div className="row noPaddingTop">
          <div className="col label">First login</div>
          <div className="col val">Earlier today</div>
        </div>
      </div>
      <div className="sessionCardFooter">
        <a href="/">Log out</a>
      </div>
    </div>
  );
}
