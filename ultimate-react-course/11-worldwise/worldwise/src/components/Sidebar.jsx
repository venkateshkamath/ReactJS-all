import React from "react";
import styles from "./Sidebar.module.css";
import Logo from "./Logo";
import { AppNav } from "./AppNav";
import { Outlet } from "react-router-dom";
const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <Outlet />
      <footer className={styles.footer}>
        <p>&copy; Copyright {new Date().getFullYear()} by Venkzy</p>
      </footer>
    </div>
  );
};

export default Sidebar;
