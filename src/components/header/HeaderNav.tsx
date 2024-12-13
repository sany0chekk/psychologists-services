import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { selectIsAuthorized } from "../../redux/user/selectors";

interface Props {
  className?: string;
}

export default function HeaderNav({ className }: Props) {
  const isAuthorized = useSelector(selectIsAuthorized);
  const navLinkStyles = ({ isActive }: { isActive: boolean }) =>
    `font-bold laptop:font-normal text-2xl max-laptop:uppercase laptop:text-base text-dark relative transition-opacity hover:opacity-70 ${
      isActive
        ? "max-laptop:text-green laptop:after:content-[''] laptop:after:absolute laptop:after:-bottom-3 laptop:after:left-1/2 laptop:after:-translate-x-1/2 laptop:after:w-2 laptop:after:h-2 laptop:after:bg-green laptop:after:rounded-full laptop:after:overflow-hidden"
        : ""
    }`;

  return (
    <nav className={`${className}`}>
      <ul className="max-laptop:w-full flex flex-col laptop:flex-row items-center gap-6 laptop:gap-10">
        <li>
          <NavLink to="/" className={navLinkStyles}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="psychologists" className={navLinkStyles}>
            Psychologists
          </NavLink>
        </li>
        {isAuthorized && (
          <li>
            <NavLink to="favorites" className={navLinkStyles}>
              Favorites
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}
