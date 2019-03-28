import React from "react";
import "../styles/Header.css";
import logo from "../images/logo.jpg";

const Header = () => {
  return (
    <header className="header">
      <img className="header__img" src={logo} alt="PGS-software" />
    </header>
  );
};

export default Header;
