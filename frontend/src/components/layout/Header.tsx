import React from "react";
import style from "./Layout.module.css";
import logo from "../../assets/images/alura.svg";

const Header = () => {
  return (
    <div className={style.header}>
      <img src={logo} alt="logo" />
      <h1>Conversor de monedas</h1>
    </div>
  );
};

export default Header;
