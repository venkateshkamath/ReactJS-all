import React from "react";
import Map from "../components/Map";
import styles from "./AppLayout.module.css";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import User from "../components/User";

const AppLayout = () => {
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
      <User />
    </div>
  );
};

export default AppLayout;
