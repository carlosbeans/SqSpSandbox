import { useState } from "react";
import LoginTable from "../LoginTable/LoginTable";
import ModalSidebar from "../ModalSidebar/ModalSidebar";
import SessionCard from "../SessionCard/SessionCard";
import "./Modal.scss";

export default function Modal() {
  const [isVisible, setIsVisible] = useState(true);
  const [opacity, setOpacity] = useState(1);
  const [isClosed, setIsClosed] = useState(false);

  const closeModal = () => {
    event.preventDefault();
    setOpacity(0);
    setIsClosed(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 300);
  }; // Matches transition duration

  return (
    <div className={`modal ${isClosed ? "closed" : ""}`}>
      <ModalSidebar onClose={closeModal} />
      <div className="modalPanel">
        <div className="row">
          <span className="sectionTitle">Account Activity</span>
        </div>
        <div className="panelSection">
          <div className="row">
            <div className="col">
              <h3>Active sessions</h3>
              <p>All your active and current sessions</p>
            </div>
          </div>
          <div className="activeSessions">
            <SessionCard sessionOS="macOS" />
            <SessionCard sessionOS="Safari" />
            <SessionCard sessionOS="macOS" />
          </div>
        </div>
        <div className="panelSection">
          <div className="row">
            <div className="col">
              <h3>Login history</h3>
              <p>Your logins from the past 90 days</p>
            </div>
          </div>
          <LoginTable />
          <div className="modalFooter">
            <p>
              Keep your account secure.{" "}
              <a
                href="https://support.squarespace.com/hc/en-us/articles/360001239268-Security-tips-for-protecting-your-account"
                target="_blank"
              >
                Learn more
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
