import React from "react";
import Container from "./Container";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuthorized } from "../../redux/user/selectors";

export default function Header() {
  const isAuthorized = useSelector(selectIsAuthorized);

  return (
    <header>
      <Container>
        <Link to="/" className="text-dark">
          <span className="text-green">psychologists</span>.services
        </Link>
        <nav>
          <ul>
            <li>
              <Link to="">Home</Link>
            </li>
            <li>
              <Link to="">Psychologists</Link>
            </li>
          </ul>
        </nav>

        {isAuthorized ? <div></div> : <div></div>}
      </Container>
    </header>
  );
}
