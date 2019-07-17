import React from "react";
import "../styles/Header.css";
// import logo from "../images/logo.jpg";
import logo from "../images/itunes-brands.svg";

const Header = () => {
  return (
    <header className="header">
      <img className="header__img" src={logo} alt="iTunes logo" />
    </header>
  );
};

export default Header;
