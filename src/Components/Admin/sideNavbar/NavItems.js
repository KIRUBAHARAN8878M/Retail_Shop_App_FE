import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import AdminContext from '../../Context/adminContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
function NavItems({ values }) {
  const context = useContext(AdminContext);
  const { setOpen } = context;
  const closeMenu = () => setOpen(false);
  const navLinkStyle = { color: 'black' }
  return (
    <>
      <NavLink to={values.to} style={({ isActive }) => isActive ? navLinkStyle : null} onClick={closeMenu}><span className='kk'><FontAwesomeIcon icon={values.icon} /></span>{values.menuName}</NavLink>
    </>
  )
}

export default NavItems