import { forwardRef } from "react";
import type { JSX } from "react";
import { NavLink } from "react-router-dom";

interface ButtonProp {
  value: string;
  path: string;
}

const Buttons = forwardRef<HTMLAnchorElement, ButtonProp>(({ value, path }, ref): JSX.Element => {
  return (
    <NavLink 
      ref={ref}
      to={path} 
      className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
    >
      {value}
    </NavLink>
  );
});

export default Buttons;