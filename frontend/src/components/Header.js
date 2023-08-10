import logo from "../images/logo.svg";
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Header({ email, setEmail }) {
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();

  let linkTo = "";
  let linkText = "";
  let handleClick = null;

  function signOut() {
    localStorage.removeItem("jwt");
    navigate("/signin");
    setEmail("");
  }

  if (pathname === "/signup") {
    linkTo = "/signin";
    linkText = "Войти";
    handleClick = null;
  } else if (pathname === "/signin") {
    linkTo = "/signup";
    linkText = "Регистрация";
    handleClick = null;
  } else {
    linkTo = "/signup";
    linkText = "Выйти";
    handleClick = signOut;
  }

  return (
    <header className="header">
      <img src={logo} alt="Место" className="header__logo" />
      <nav className="header__nav">
        <p className="header__nav-email">{email}</p>
        {linkText && (
          <Link to={linkTo} onClick={handleClick} className="header__nav-link">
            {linkText}
          </Link>
        )}
      </nav>
    </header>
  );
}

export default Header;
