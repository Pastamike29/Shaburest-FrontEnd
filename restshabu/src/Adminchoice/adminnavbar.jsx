import React from 'react';
import './adminnavbar.css';
import logo from '../Compo/Assets/resticon.png';
import { Space } from 'antd';
import { FaLock } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
function Adminnavbar({ isLoggedIn, onLogout }) {
  const loggedInUser = localStorage.getItem('loggedInUser');
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    const confirmed = window.confirm('Do you want to logout');
    if (confirmed) {
      localStorage.removeItem('loggedInUser');
      navigate('/login');
    }
  };
  return (
    <>
    <div className='admin-navbar'>
      <img src={logo} alt="" style={{width:'5rem',height:'5rem',paddingLeft:'30px'}} />
      <ul className="admin-navbar-contain">
      <h2 className='admin-menu-deco'>SinnCosTan Shabu Admin Manage System </h2></ul>
          <Space> <Link to='/userdetail' style={{fontSize:'18px', textDecoration:'underline',color:'black'}}>{loggedInUser}</Link>
          <button className='loginbutt'><div style={{ textDecoration: 'none', color: '#ea7521', fontSize: '15px' }} onClick={handleLogoutClick}><FaLock /> LOGOUT</div>
             </button>
           
          </Space>
        </div>
        </>
  )
}

export default Adminnavbar