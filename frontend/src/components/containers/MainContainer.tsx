import React from "react";
import style from "./MainContainer.module.css";

const MainContainer = ({ children }: { children: React.ReactNode }) => {
  return <main className={style.mainContainer}>{children}</main>;
};

export default MainContainer;
