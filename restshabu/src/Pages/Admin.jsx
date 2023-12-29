import React from 'react'
import './Admin.css'
import { Space, Typography,Card, Statistic} from 'antd'
import Adminleftbar from '../Adminchoice/adminleftbar'
import Adminnavbar from '../Adminchoice/adminnavbar'
import Footer from'../Compo/Footer/Adminfooter'
import tableicon from '../Compo/Assets/tableicon.png'
import tableicon2 from '../Compo/Assets/tableicon2.png'
import cusicon from '../Compo/Assets/cusicon.png'
import paymenticon from '../Compo/Assets/paymentmoney.png'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
function Admin() {
  return (
    <><Helmet>
    <title>
      Manage System for Admin
    </title>
  </Helmet>
    <div className='admin-contain'>
    <Adminnavbar/> 
    <Space className='SideMenuAndPagecontain'> 
       <Adminleftbar/>
       <div className='align-table-adminmange'>
     <Typography.Title level={2} className='Title-dash-align'>Dashboard </Typography.Title>
        <Space direction='horizontal'>
        <DashboardCard icon={tableicon} title={"Total Table Booked"} value={15}/>
        <DashboardCard icon={tableicon2}title={"Remaining Tables"} value={10}/>
        <DashboardCard icon={cusicon}title={"All Today's Customers"} value={100}/>
        <DashboardCard icon={paymenticon}title={"Today's income"} value={"1,000,000 ฿"}/>
        </Space>
        <Typography.Title level={2} className='Title-dash-align'>Recent Booking</Typography.Title>
        <div className='table-wrapper'>
        <table className='admin-table-con'>
            <thead>
              <tr>
                <th>รหัสการจอง</th>
                <th>รหัสชำระเงิน</th>
                <th>ชื่อผู้ใช้</th>
                <th>วันที่</th>
                <th>เวลา/รอบ</th>
                <th>รูปแบบโต๊ะ</th>
                <th>หมายเลขโต๊ะ</th>
                <th>จำนวนคน</th>
                <th>สถานะการจอง</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>A0025</td>
                <td>P0027</td>
                <td>teera42</td>
                <td>2023-12-1</td>
                <td>13:30-15:30</td>
                <td>A</td>
                <td>1</td>
                <td>2</td>
                <td>Wait to check</td>
              </tr>
              <tr>
                <td>A0025</td>
                <td>P0027</td>
                <td>teera42</td>
                <td>2023-12-1</td>
                <td>13:30-15:30</td>
                <td>A</td>
                <td>1</td>
                <td>2</td>
                <td>Wait to check</td>
              </tr>
              <tr>
                <td>A0025</td>
                <td>P0027</td>
                <td>teera42</td>
                <td>2023-12-1</td>
                <td>13:30-15:30</td>
                <td>A</td>
                <td>1</td>
                <td>2</td>
                <td>Wait to check</td>
              </tr>
            </tbody>
        </table></div> <div className='Linktobook'><Link to='/adminmanagebook'style={{color:'black',marginBottom:'50px'}}>ManageBookData</Link></div>
      </div>
      </Space><Footer/>
    </div>
    </>
  )
}

function DashboardCard({title,value,icon}){
  return(
  <Card>
        <Space direction='horizontal'>
        <img src={icon} alt="" style={{width:'40px',height:'40px'}}/>
        <Statistic title={title} value={value}/>
        </Space>
      </Card>);
}

export default Admin