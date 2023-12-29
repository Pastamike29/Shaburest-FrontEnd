import React,{useState,useEffect} from 'react'
import './CSS/Adminmanagebook.css'
import { Space, Typography} from 'antd'
import Adminleftbar from '../Adminchoice/adminleftbar'
import Adminnavbar from '../Adminchoice/adminnavbar'
import Footer from'../Compo/Footer/Adminfooter'
import { Helmet } from 'react-helmet'
import axios from 'axios'
function Adminmanagebook() {
  const [rows,setRows] = useState ([]);
  useEffect(() => {
  const fetchData = async () => {
    try {
      const [usersResponse, paymentsResponse, reservationsResponse] = await Promise.all([
        axios.get('http://localhost:2929/0/user'),
        axios.get('http://localhost:2929/0/payment'),
        axios.get('http://localhost:2929/0/reserveData')
      ]);

      if (
        usersResponse.status === 200 &&
        paymentsResponse.status === 200 &&
        reservationsResponse.status === 200
      ) {
        const users = usersResponse.data;
        const payments = paymentsResponse.data;
        const reservations = reservationsResponse.data;

        console.log('Users:', users);
        console.log('Payments:', payments);
        console.log('Reservations:', reservations);

        const combinedData = users.map(user => {
          const userPayment = payments.find(payment => payment.userId === user.userId);
          const userReservation = reservations.find(reservation => reservation.userId === user.userId);
        
          if (userPayment && userReservation) {
            return {
              ...user,
              payment: userPayment,
              reservation: userReservation
            };
          }
          
          return null; // Return null for users without both reservation and payment IDs
        }).filter(Boolean);

        console.log('Combined Data:', combinedData);

        setRows(combinedData);
      } else {
        console.error('Error fetching data.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchData();
}, []);
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
        <Typography.Title level={2} className='Title-dash-align'>Booking List</Typography.Title>
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
              {
                rows.map((row,idx) => {
                  return (
                  <tr key={idx}>  
                  <td> {row.reservation ? row.reservation.reserveDataId : ''}</td>
                  <td> {row.payment ? row.payment.paymentId : ''}</td>
                    <td> {row.username}</td>
                    <td> {row.reservation ? row.reservation.reserveDate : ''}</td>
                    <td> {row.reservation ? row.reservation.reserveTime : ''}</td>
                    <td> {row.reservation ? row.reservation.tableTypes : ''}</td>
                    <td> {row.reservation ? row.reservation.tableNumberType : ''}</td>
                    <td> {row.reservation ? row.reservation.valueOfCustomer : ''}</td>
                    <td> {row.reservation ? row.reservation.reserveStatus : ''}</td>
                    
                  </tr>
                  );
                })}
            </tbody>
        </table></div> 
     </div>
      </Space>
   <Footer/>
    </div>
    </>
  )
}

export default Adminmanagebook