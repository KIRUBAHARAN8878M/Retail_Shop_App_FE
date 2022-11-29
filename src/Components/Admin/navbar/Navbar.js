import React, { useContext } from 'react'
import './Navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'
import AdminContext from '../../Context/adminContext';
import { useNavigate } from 'react-router-dom';


function Navbar() {
  let navigate = useNavigate();
  const context = useContext(AdminContext);
  const { open, setOpen } = context;
  const handleClick = () => setOpen(!open);

  return (
    <nav>
      <div className='nav_left'>
        <h5>Retail Shop App</h5>
      </div>
      <h5>
        Admin
      </h5>
      <div className='menu_icon' onClick={handleClick}>
        <span>  {open ? <FontAwesomeIcon icon={faXmark} /> : <FontAwesomeIcon icon={faBars} />} </span>
      </div>
    </nav>
  )
}

export default Navbar