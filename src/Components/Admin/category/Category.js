import React from 'react'
import { Outlet } from 'react-router-dom'
import './Category.css'
function Category() {
  return (
    <div>
      <Outlet/>
    </div>
  )
}

export default Category