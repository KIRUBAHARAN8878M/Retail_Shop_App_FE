import React from "react";
import "./Brand.css";
import { Outlet } from 'react-router-dom'
function Brand() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default Brand;
