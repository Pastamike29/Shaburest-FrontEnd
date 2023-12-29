import React,{useState,useEffect} from 'react'
import './CSS/Adminmanagepayment.css'
import { Space, Typography} from 'antd'
import Adminleftbar from '../Adminchoice/adminleftbar'
import Adminnavbar from '../Adminchoice/adminnavbar'
import Footer from'../Compo/Footer/Adminfooter'
import { Helmet } from 'react-helmet'
import axios from 'axios'
function Adminmanagepayment() {
    const[openModal, setOpenModal] = useState(false);
    const [rows,setRows] = useState ([]);
    useEffect(() => {
      // Function to fetch data using Axios
      const fetchData = async () => {
        try {
          // Make an API request using Axios (replace 'API_ENDPOINT' with your actual API endpoint)
          const response = await axios.get('http://localhost:2929/0/payment');
  
          // Assuming the response.data contains an array of booking objects
          setRows(response.data);
        } catch (error) {
          console.error('Error fetching data: ', error);
        }
      };
  
      // Call the function to fetch data when the component mounts
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
          <Typography.Title level={2} className='Title-dash-align'>Payment List</Typography.Title>
          <div className='table-wrapper'>
          <table className='admin-table-con'>
              <thead>
                <tr>
                  <th>รหัสชำระเงิน</th>
                  <th>ชื่อเจ้าของบัญชี</th>
                  <th>ยอดชำระเงิน</th>
                  <th>วันที่ชำระเงิน</th>
                  <th>สถานะชำระเงิน</th>
                </tr>
              </thead>
              <tbody>
                {
                  rows.map((row,idx) => {
                    return (
                    <tr key={idx}>
                      <td> {row.paymentId}</td>
                      <td> {row.accountName}</td>
                      <td> {row.price}</td>
                      <td> {row.paymentDate}</td>
                      <td> {row.statusPay}</td>
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
export default Adminmanagepayment