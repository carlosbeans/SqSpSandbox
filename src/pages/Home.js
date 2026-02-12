import Modal from "../components/Modal/Modal";
export default function Home() {
  return (
    <>
      {/* <Modal /> */}
      <div className="container">
        <div className="row space-between">
          <div className="col">
            <h1>Account Dashboard</h1>
          </div>
          <div className="col">
            <button className="btn primary">Create Website</button>
          </div>
        </div>
      </div>
    </>
  );
}
