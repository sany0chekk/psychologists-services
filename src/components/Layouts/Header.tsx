import React from "react";
import Container from "./Container";
import { Link, NavLink } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { selectIsAuthorized } from "../../redux/user/selectors";
import AuthHeader from "../auth/AuthHeader";
import UserHeader from "../user/UserHeader";

export default function Header() {
  // const isAuthorized = useSelector(selectIsAuthorized);
  const isAuthorized = false;

  const navLinkStyles = ({ isActive }: { isActive: boolean }) =>
    `font-normal text-base text-dark relative transition-opacity hover:opacity-70 ${
      isActive
        ? "after:content-[''] after:absolute after:-bottom-3 after:left-1/2 after:-translate-x-1/2 after:w-2 after:h-2 after:bg-green after:rounded-full after:overflow-hidden"
        : ""
    }`;

  return (
    <header className="py-6 border-b">
      <Container className="flex items-center justify-between">
        <Link to="/" className="text-dark">
          <span className="text-green">psychologists</span>.services
        </Link>
        <nav>
          <ul className="flex items-center gap-10">
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

        {isAuthorized ? <UserHeader /> : <AuthHeader />}
      </Container>
    </header>
  );
}
