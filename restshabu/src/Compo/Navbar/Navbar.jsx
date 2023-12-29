import React from 'react'
import './Navbar.css'
import logo from '../Assets/resticon.png'
import { useLocation } from 'react-router-dom';
import { FaLock } from "react-icons/fa";
import { FaHome } from 'react-icons/fa';
import { FaConciergeBell } from 'react-icons/fa';
import { FaEnvelope } from 'react-icons/fa';
import {Link} from 'react-router-dom'
import {BsFillJournalBookmarkFill} from 'react-icons/bs'
function Navbar({ isLoggedIn, onLogout }) {
  const usernamelogin = localStorage.getItem('loggedInUser');
  const handleLogoutClick = () => {
    const confirmed = window.confirm("Do you want to logout");
    if (confirmed) {
        onLogout(); // This will only execute if the user clicks "OK"
        localStorage.removeItem('loggedInUser');
    }
  };
  const location = useLocation();
  const shouldHideNavbar = () => {
    const adminRoutes = [
      '/admin',
      '/admineditmenu',
      '/admineditpromo',
      '/adminmanagebook',
      '/adminmanagetable',
      '/adminmanagecustomer',
      '/adminmanagepayment',
      '/userdetail','/pdf',
      '*'
    ];
    return adminRoutes.includes(location.pathname);
  };
  return (
     <> {!shouldHideNavbar() && <><header className='nav-headcolor'>
      </header><div className='navbar'>
      <Link to='/'><div className='nav-logo'><img src={logo} alt="" />
        </div></Link>
       
        <ul className='nav-menu'>
          <li><Link className='menu-deco' to='/'><FaHome /><hr />HOME PAGE</Link></li>
          <li><Link className='menu-deco' to='/ingredient'><FaConciergeBell /><hr />SHABU MENU</Link></li>
          <li><Link className='menu-deco' to='/queue'><BsFillJournalBookmarkFill /><hr />BOOK TABLE</Link></li>
          <li><Link className='menu-deco' to='/question'><FaEnvelope /><hr />CONTACT US</Link></li> 
           <div className="nav-login-signup">
           {isLoggedIn ? (
          <><button className='loginbutt' onClick={handleLogoutClick}><Link style={{ textDecoration: 'none', color: '#ea7521', fontSize: '15px' }} to='/login'><FaLock /> LOGOUT</Link>
             </button>
             <Link to='/userdetail' style={{fontSize:'18px', textDecoration:'underline',color:'black'}}>{usernamelogin}</Link></>
          ) :(
          <><button className='loginbutt'><Link style={{ textDecoration: 'none', color: '#ea7521', fontSize: '15px' }} to='/login'><FaLock /> LOGIN</Link>
              </button><button className='signupbutt'><Link style={{ textDecoration: 'none', color: 'white', fontSize: '15px' }} to='/signup'>SIGN UP</Link></button></>)}
        </div>
        </ul>
      
      </div></>}</>
  )
}

export default Navbar