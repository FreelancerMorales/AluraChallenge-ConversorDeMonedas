import React from "react";
import style from "./Layout.module.css";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <div className={style.footer}>
      <a href="https://github.com/WiusGH" target="_blank" rel="noreferrer">
        <FaGithub className={style.icon} />
      </a>
      <a
        href="https://discordapp.com/channels/@me/.the_noob_morales/"
        target="_blank"
        rel="noreferrer"
      >
        Antonio Morales - Desarrollador fullstack
      </a>
      <a
        href="https://www.linkedin.com/in/antonio-morales-02b2b6275/"
        target="_blank"
        rel="noreferrer"
      >
        <FaLinkedin className={style.icon} />
      </a>
    </div>
  );
};

export default Footer;
