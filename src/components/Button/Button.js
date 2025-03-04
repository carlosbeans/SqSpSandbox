import { Link } from "react-router-dom";
import "./Button.scss";

export default function Button({ buttonLabel }) {
  return <Link className="button primary">{buttonLabel}</Link>;
}
