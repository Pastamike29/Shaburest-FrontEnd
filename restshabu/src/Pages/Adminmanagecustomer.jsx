import React,{useState,useEffect} from 'react'
import './CSS/Adminmanagecustomer.css'
import { Space, Typography} from 'antd'
import Adminleftbar from '../Adminchoice/adminleftbar'
import Adminnavbar from '../Adminchoice/adminnavbar'
import Footer from'../Compo/Footer/Adminfooter'
import { Helmet } from 'react-helmet'
import axios from 'axios'
import{BsFillTrashFill , BsFillPencilFill}from 'react-icons/bs'
import Addmodal from '../Compo/Modal/Addmanagecus'
function Adminmanagecustomer() {
  const[openModal, setOpenModal] = useState(false);
  const toggleModal =() => {
   setOpenModal(!openModal)
   setRowToEdit(null)
  }
  
  const [rows,setRows] = useState ([]);
  useEffect(() => {
    // Function to fetch data using Axios
    const fetchData = async () => {
      try {
        // Make an API request using Axios (replace 'API_ENDPOINT' with your actual API endpoint)
        const response = await axios.get('http://localhost:2929/0/user');

        // Assuming the response.data contains an array of booking objects
        setRows(response.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    // Call the function to fetch data when the component mounts
    fetchData();
  }, []);
        const [rowToEdit,setRowToEdit] = useState(null)
        const handleDeleteRows = async (targetIndex) => {
          try {
            const userIdToDelete = rows[targetIndex].userId; // Assuming userId is retrieved correctly
        console.log(userIdToDelete)
            // Make a DELETE request to the backend endpoint with the userId in the URL
            await axios.delete(`http://localhost:2929/0/user/${userIdToDelete}`);
            
            // If the request succeeds, update the state to remove the deleted row
            setRows(rows.filter((_, idx) => idx !== targetIndex));
          } catch (error) {
            // Handle errors here
            console.error('Error deleting data: ', error);
            // Additional error handling based on error types (request, response, etc.)
          }
        };
        const handleSubmit = (newRow) => {
          rowToEdit === null ?setRows([...rows,newRow]) :
          setRows(rows.map((currRow,idx) => {
            if(idx !== rowToEdit) return currRow

            return newRow;
          }))
        }
        const handleEditRow = (idx) => {
        setRowToEdit(idx);
        setOpenModal(true);

        }

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
        <Typography.Title level={2} className='Title-dash-align'>Customer List</Typography.Title>
       { openModal && <Addmodal closeModal={setOpenModal}
         onSubmit={handleSubmit} defaultValue = {rowToEdit !== null && rows[rowToEdit]} />  }
         <div><button  onClick={toggleModal} style={{cursor:'pointer',display:'flex', justifyContent:'center',color:'white',backgroundColor:'#f07935',marginLeft:'5px'}}>
          Add</button></div>
    
        <div className='table-wrapper'>
        <table className='admin-table-con'>
            <thead>
              <tr>
              <th>ชื่อผู้ใช้</th>
                <th>ชื่อ-สกุลลูกค้า</th>
                <th>อีเมลลูกค้า</th>
                <th>เบอร์โทรศัพท์</th>
                <th>วันเกิด</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                rows.map((row,idx) => {
                  return (
                  <tr key={idx}>
                    <td> {row.username}</td>
                    <td> {row.firstLastName}</td>
                    <td> {row.email}</td>
                    <td> {row.phonenumber}</td>
                    <td> {row.dob}</td>
                    <td>
                  <span className='actions'> 
                    <BsFillTrashFill className='delete-btn-admin' onClick={()=> handleDeleteRows(idx)}/>
                    <BsFillPencilFill onClick={()=> handleEditRow(idx)}/>
                  </span>
                </td>
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

export default Adminmanagecustomer