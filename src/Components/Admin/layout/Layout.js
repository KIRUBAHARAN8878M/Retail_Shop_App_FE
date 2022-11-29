import React, { useContext } from "react";
import "./Layout.css";
import Navbar from "../navbar/Navbar";
import SideNavbar from "../sideNavbar/SideNavbar";
import { Outlet } from "react-router-dom";
import AdminContext from "../../Context/adminContext";

function Layout() {
  const context = useContext(AdminContext);
  const { open } = context;
  return (
    <div className="main">
      <Navbar />
      <div className="contain">
        <div id="left-side" className={open ? null : " hide "}><SideNavbar /></div>
        <div className="right-side"><Outlet /></div>
      </div>
    </div>
  );
}

export default Layout;
