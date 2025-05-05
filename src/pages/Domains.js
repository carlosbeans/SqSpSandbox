import Button from "../components/Button/Button";
import "../styles/styles.scss";

export default function Domains() {
  return (
    <div className="container">
      <div className="row space-between">
        <h1>Domains</h1>
        <Button buttonLabel={"Get a Domain"} />
      </div>

      <div className="domainsDashboard">Domains here</div>
    </div>
  );
}
