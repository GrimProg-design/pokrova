import { forwardRef } from "react";
import type { JSX } from "react";
import { NavLink } from "react-router-dom";

interface ButtonProp {
  value: string;
  path: string;
  isActive: boolean;
}

const Buttons = forwardRef<HTMLAnchorElement, ButtonProp>(({ value, path }, ref): JSX.Element => {
  return (
    <NavLink 
      ref={ref}
      to={path} 
      className={({ isActive }) => (isActive ? "side-nav-link side-active" : "side-nav-link")}
    >
      {value}
    </NavLink>
  );
});

export default Buttons;