import React,{useState,useEffect} from 'react'
import './CSS/Adminmanagetable.css'
import { Space, Typography} from 'antd'
import Adminleftbar from '../Adminchoice/adminleftbar'
import Adminnavbar from '../Adminchoice/adminnavbar'
import Footer from'../Compo/Footer/Adminfooter'
import { Helmet } from 'react-helmet'
import{BsFillTrashFill , BsFillPencilFill}from 'react-icons/bs'
import Addmodal from '../Compo/Modal/Addmanagebook'
import axios from 'axios'
function Adminmanagetable() {
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
        const response = await axios.get('http://localhost:2929/0/table');

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
        const handleDeleteRows = async (targetIndex, tableType, tableNumberType) => {
          try {
            const response = await axios.delete(`http://localhost:2929/0/table/${tableType}/${tableNumberType}`);
            if (response.status === 200) {
              const updatedRows = rows.filter((_, idx) => idx !== targetIndex);
              setRows(updatedRows);
              console.log(tableType)
              console.log(tableNumberType)
              console.log('success');
            } else {
              console.error('Delete request failed:', response.statusText);
              // Handle the failure case as needed
            }
          } catch (error) {
            console.error('Error deleting row:', error.message);
            // Handle error as needed
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
        <Typography.Title level={2} className='Title-dash-align'>Table List</Typography.Title>
        { openModal && <Addmodal closeModal={setOpenModal}
         onSubmit={handleSubmit} defaultValue = {rowToEdit !== null && rows[rowToEdit]} />  }
      <div><button onClick={toggleModal} style={{cursor:'pointer',display:'flex', justifyContent:'center',color:'white',backgroundColor:'#f07935',marginLeft:'5px'}}>
          Add</button>
        </div>
        <div className='table-wrapper-manage'>
        <table className='admin-table-con'>
            <thead>
              <tr>
                <th>หมายเลขโต๊ะ</th>
                <th>รูปแบบโต๊ะ</th>
                <th>จำนวนที่นั่ง</th>
                <th>สถานะ</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody >
              {
                rows.map((row,idx) => {
                  return (
                  <tr key={idx}>
                    <td> {row.tableNumberType}</td>
                    <td> {row.tableType}</td>
                    <td> {row.quantityOfChair}</td>
                    <td> {row.tableStatus}</td>
                    <td>
                  <span className='actions'> 
                  <BsFillTrashFill
  className='delete-btn-admin'
  onClick={() => handleDeleteRows(idx, row.tableType, row.tableNumberType)}
/>
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

export default Adminmanagetable