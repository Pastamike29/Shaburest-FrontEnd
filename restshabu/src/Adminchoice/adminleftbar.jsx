import React from 'react'
import './adminleftbar.css'
import {Layout,Menu} from'antd';
import {HomeOutlined,CalendarOutlined,HolderOutlined,SettingOutlined,UserOutlined} from '@ant-design/icons'; 
import { FaMoneyCheck } from "react-icons/fa";
import { Link } from 'react-router-dom';
const {Sider}=  Layout;
function adminleftbar() {
  return (
    <>
    <div className='Sidemenu'>
     <Sider className='admin-sidebar' style={{width:'auto',backgroundColor:'white'}}>
              <Menu theme='light' mode='inline'className='adminside-menu'>
                {/* <Menu.Item key='home' icon={<HomeOutlined />}><Link to='/admin'>Dashboard</Link>
                </Menu.Item> */}
                <Menu.SubMenu key='Booking' icon={<CalendarOutlined />} title='Booking'>
                  <Menu.Item key='managebook' >
                <Link to='/adminmanagebook'> ManageBooking</Link>
                </Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu key='Table' icon={<HolderOutlined />} title='Table'>  
                 <Menu.Item key='managetable'>
                 <Link to='/adminmanagetable'> ManageTable</Link>
                 </Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu key='Customer' icon={<UserOutlined />} title='Customer'>
                <Menu.Item key='managecustomer'>
                <Link to='/adminmanagecustomer'>ManageCustomer</Link>
                 </Menu.Item>
                 </Menu.SubMenu>
                 <Menu.SubMenu key='Payment' icon={<FaMoneyCheck />} title='Payment'>
                <Menu.Item key='managepayment'>
                <Link to='/adminmanagepayment'>ShowPayment</Link>
                 </Menu.Item>
                 </Menu.SubMenu>
                <Menu.SubMenu key='setting' icon={<SettingOutlined />} title='Setting'>
                <Menu.Item key='home'>
                <Link to='/'>Home</Link>
                 </Menu.Item> 
                 <Menu.Item key='Logout'>
                <Link to='/login'>Log out</Link>
                 </Menu.Item>
                </Menu.SubMenu>
              </Menu>
        </Sider></div>

      </>
  )
}

export default adminleftbar