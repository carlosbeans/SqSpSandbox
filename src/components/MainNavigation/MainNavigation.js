import { Link } from "react-router-dom";

//css
import "../MainNavigation/MainNavigation.scss";

//components
import Logo from "../Logo/Logo";

export default function MainNavigation() {
  return (
    <nav>
      <div className="mainNavigation">
        <div className="logoContainer">
          <Link className="mainNavLink" to="/" id="logo">
            <Logo color="#000" size="44" />
          </Link>
        </div>
        <div className="mainNavLinks">
          <Link className="mainNavLink" to="SelectAndDrag">
            Selectable Cards
          </Link>
          <Link className="mainNavLink" to="CodePreview">
            Code Preview
          </Link>
          <Link className="mainNavLink" to="Domains">
            Domains
          </Link>
          <Link className="mainNavLink" to="Websites">
            Websites
          </Link>
          <Link className="mainNavLink" to="DomainWebsiteConnection">
            Domain Website Connection
          </Link>
        </div>
      </div>
      <div className="avatarContainer">
        <div className="avatar"></div>
      </div>
    </nav>
  );
}
