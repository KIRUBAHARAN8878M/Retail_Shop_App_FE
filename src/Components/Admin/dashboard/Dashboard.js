import React, { useContext,useEffect,useState } from "react";
import "./Dashboard.css";
import Inventory from './inventory/Inventory';
import DashItem from "./DashItem";
import AdminContext from "../../Context/adminContext";

import {faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import BarChart from "./BarChart";
function Dashboard() {
  const context = useContext(AdminContext);
  const [year,setYear] = useState(new Date().getFullYear())
  const { dashboardOverview,getDashboardBarChart,dashboardBarChart } = context;

  const data = [
    {
      title: "Total Products",
      value: dashboardOverview.totalProducts,
      color: "rgb(255, 73, 209)",
      theam: "primary",
      icon: faPenToSquare,
    },
    {
      title: "Total Quantity Bought",
      value: dashboardOverview.bought,
      color: "rgb(255, 73, 209)",
      theam: "success",
      icon: "fa-dollar-sign",
    },
    {
      title: "Sold",
      value: dashboardOverview.sold,
      color: "rgb(255, 73, 209)",
      theam: "warning",
      icon: "fa-comments",
    },

    {
      title: "Out Of Stock",
      value: dashboardOverview.outOfStock,
      color: "rgb(255, 73, 209)",
      theam: "info",
      icon: "fa-clipboard-list"
    },
    {
      title: "Available Stock",
      value: dashboardOverview.totalAvaliableStock,
      color: "rgb(255, 73, 209)",
      theam: "warning",
      icon: "fa-comments",
    },

  ];


  useEffect(()=>{
    getDashboardBarChart(year)
  },[year])

  useEffect(()=>{
    getDashboardBarChart(2022)
  },[])

  const yearz = (new Date()).getFullYear();
  const years = Array.from(new Array(10),( val, index) => yearz - index );
  return (
    <>
      <div className="p-3">
        <div className="comman_header">DASHBOARD/OVERVIEW</div>
        <div className="row p-2">
          {data.length > 0 && data.map((val, i) => {
            return <DashItem value={val} key={i}></DashItem>;
          })}
        </div>
        <div>
          <Inventory />
        </div>
        <div>
        <div className="comman_header">DASHBOARD/CHART</div>
        <div>
        <div className="d-flex justify-content-start align-items-center p-3">
        <label className="tt">Yearly Sale Report : - </label>
        <select className="form-select shadow-none w-25 ms-1"  name="" id="" onChange={(e)=> setYear(e.target.value)} value={year}>
          <option value="default"> Select a Year</option>
          {
            years.map((item,index)=>{
              return <option key={index} value = {item}>{item}</option>
            })
          }
          </select>
        </div>
        <div className="rr">

          {
             dashboardBarChart.month ? <BarChart year = {year}/> : <div> NO Data Found </div>
          }
           
        </div>
        </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
