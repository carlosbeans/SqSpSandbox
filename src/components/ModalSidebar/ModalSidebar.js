import "./ModalSidebar.scss";

export default function ModalSidebar({ onClose }) {
  const handleClose = (event) => {
    onClose();
  };
  return (
    <div className="modalSidebar">
      <div className="row">
        <a href="" className="close" onClick={onClose}>
          Close
        </a>
      </div>
      <div className="row">
        <span className="pageTitle">Settings</span>
      </div>
      <nav>
        <div className="primaryNav">
          <a href="/">Profile</a>
          <a href="/">Account & Security</a>
          <a href="/">Notifications</a>
          <a href="/">Language</a>
        </div>
        <div className="secondaryNav">
          <a href="/">Help</a>
          <a href="/">Log out</a>
        </div>
      </nav>
    </div>
  );
}
