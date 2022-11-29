import React from "react";
import "./SideNavbar.css";
import NavItems from "./NavItems";
import {faGaugeHigh,faPalette,faUser,faRightFromBracket,faListCheck,faInbox} from '@fortawesome/free-solid-svg-icons'
function SideNavbar() {  
  const data = [
    {
      menuName: "DASHBOARD",
      to: "/home",
      icon:faGaugeHigh,
    },
    {
      menuName: "BRAND",
      to: "/home/brand",
      icon:faPalette,
    },
    {
      menuName: "CATEGORY",
      to: "/home/category",
      icon:faListCheck,
    },
    {
      menuName: "PRODUCTS",
      to: "/home/products",
      icon:faInbox,
    },
    {
      menuName: "USERS",
      to: "/home/users",
      icon:faUser,
    },
    {
      menuName: "LOGOUT",
      to: "/",
      icon:faRightFromBracket,
    },
  ];
  return (
    <div className="sidebar">
      <div>
        {data.length > 0 &&
          data.map((val, index) => {
            return <NavItems values={val} key={index} />;
          })}
      </div>
    </div>
  );
}

export default SideNavbar;
