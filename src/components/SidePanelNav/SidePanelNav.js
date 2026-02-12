//css
import "./SidePanelNav.scss";
import { Link } from "react-router-dom";

export default function SidePanelNav() {
    return (
        <div className="sidePanelNavContainer">
            <Link to="/domains" className="backLink">← DOMAINS LIST</Link>
            <nav className="sidePanelNav">
                <ul>
                    <li><Link to="/domainoverview">Overview</Link></li>
                    <li>DNS
                        <ul>
                            <li><Link to="/dns-settings">DNS Settings</Link></li>
                            <li><Link to="/">Domain Nameservers</Link></li>
                            <li><Link to="/">Nameserver Registration</Link></li>
                            <li><Link to="/">DNSSEC</Link></li>
                        </ul>
                    </li>
                    <li>Website</li>
                    <li>Email</li>
                    <li>Permissions</li>
                    <li>Billing</li>
                </ul>
            </nav>
        </div>
    );
}