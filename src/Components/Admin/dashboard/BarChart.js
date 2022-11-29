import React, { useState,useContext, useEffect } from 'react';
import AdminContext from "../../Context/adminContext";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
// import faker from 'faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement, 
  Title,
  Tooltip,
  Legend
);


// export const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: 'top',
//       },
//       title: {
//         display: true,
//         text: 'Chart.js Bar Chart',
//       },
//     },
//   };
  
//   const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  
//   export const data = {
//     labels,
//     datasets: [
//       {
//         label: 'Dataset 1',
//         data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
//         backgroundColor: 'rgba(255, 99, 132, 0.5)',
//       },
//       {
//         label: 'Dataset 2',
//         data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
//         backgroundColor: 'rgba(53, 162, 235, 0.5)',
//       },
//     ],
//   };


 function BarChart() {
  const context = useContext(AdminContext);
const { getDashboardBarChart,dashboardBarChart } = context;


const { month } = dashboardBarChart
const {  january,february,march,april,may,june,july,august,september,october,november,december} = month  

const options = {
  responsive: true,
plugins: {
 legend: {
   position: 'top',
 },
 title: {
   display: true,
   text: 'Yearly Sale Report ',
 },
},

}

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const data = {
labels,
   datasets: [
     {
       label: 'Amount ',
       data: [january,february,march,april,may,june,july,august,september,october,november,december],
       backgroundColor: 'rgba(255, 99, 132, 0.5)',
     }
    
   ]
}
    return <>
    <Bar options={options} data={data} />
    </>
  }


  export default BarChart;

