import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './navbar/Navbar'
import './UserPortal.css'
function UserPortal() {
  return (
    <div>
      <Navbar />
      <div><Outlet /></div>
    </div>
  )
}

export default UserPortal