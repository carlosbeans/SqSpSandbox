import Button from "../components/Button/Button";

export default function Domains() {
  return (
    <div className="container">
      <div className="row">
        <h1>Domains</h1>
        <Button buttonLabel={"Get a Domain"} />
      </div>

      <div className="domainsDashboard">Domains here</div>
    </div>
  );
}
