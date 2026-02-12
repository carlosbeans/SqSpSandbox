import React from 'react';
import { Link } from "react-router-dom";
import "./Button.scss";

interface ButtonProps {
  buttonLabel: string;
  to?: string;
}

export default function Button({ buttonLabel, to = '/' }: ButtonProps) {
  return <Link to={to} className="button primary">{buttonLabel}</Link>;
}
