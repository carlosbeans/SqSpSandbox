import { Link } from "react-router-dom";

//css
import "../MainNavigation/MainNavigation.scss";


//components
import Logo from "../Logo/Logo";
import Avatar from "../Avatar/Avatar";

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
          <Link className="mainNavLink" to="Domains">
            Domains
          </Link>
          <Link className="mainNavLink" to="Websites">
            Websites
          </Link>          
          <Link className="mainNavLink" to="Experiments">
            Experiments
          </Link>          
        </div>
      </div>
      <div className="userInfo">
        <div className="userInfoLinks row vertical-center">
          <Link className="mainNavLink" to="#">
            Help
          </Link>
          <Link className="mainNavLink" to="#">
            Account Settings
          </Link>
          <Avatar />
        </div>        
      </div>
    </nav>
  );
}
