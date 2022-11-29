import React, { useState, useContext } from 'react'
import './Navbarz.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark, faUser ,faHouseUser,faRightFromBracket,faTasks} from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import UserContext from '../../Context/usercContext'


function Navbar() {
  const context = useContext(UserContext)
  const { username } = context
  let navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleClick = () => setOpen(!open);
  const closeMenu = () => setOpen(false);
  return (
    <>
      <nav>
        <div className='nav_left'>
          <h5><span className='hed text-white'>Reatil Shop App</span></h5>
        </div>
        <div>
        </div>
        <div className='nav_rights' id={open ? null : "hides"} >
          <span className='me-2'>User : {username ? username : window.localStorage.getItem("name")}</span>
          <div onClick={closeMenu}> <span className='zz'><FontAwesomeIcon icon={faHouseUser} /></span>
            <span  className='uu' onClick={() => {
              navigate("/user-portal");
            }} >Home</span>
          </div>
          <div onClick={closeMenu}>
          <span className='zz'><FontAwesomeIcon icon={faTasks} /></span>
            <span className='uu' onClick={() => {
              navigate("/user-portal/your-order");
            }} > Your Order</span>
          </div>
          <div className='d-flex justify-content-center align-items-center ' onClick={closeMenu}>
          <span className='zz'><FontAwesomeIcon icon={faUser} /></span>
            <span className='uu' onClick={() => {
              navigate("/user-portal/profile-page");
            }} >Profile</span>
          </div>
          <div onClick={closeMenu}>
          <span className='zz'><FontAwesomeIcon icon={faRightFromBracket} /></span>
            <span className='uu'
              onClick={() => {
                window.localStorage.removeItem("token")
                window.localStorage.removeItem("name")
                window.localStorage.removeItem("isAdmin")
                window.localStorage.removeItem("userId")
                navigate("/");
              }}>Logout</span>
          </div>
        </div>
        <div className='menu_icon' onClick={handleClick}>
          <span>  {open ? <FontAwesomeIcon icon={faXmark} /> : <FontAwesomeIcon icon={faBars} />} </span>
        </div>
      </nav>
    </>
  )
}

export default Navbar