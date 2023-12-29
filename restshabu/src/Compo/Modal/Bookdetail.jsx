import React,{useEffect,useState} from 'react'
import './Bookdetail.css'
import { Link } from 'react-router-dom'
import axios from 'axios';
function Bookdetail({closeModal}) {
  const loggedInUser = localStorage.getItem('loggedInUser');
  const [currentreserve, setCurrentReserve] = useState(null);
  const reserveDataId = localStorage.getItem('reserveDataId');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:2929/0/reserveData'); // Replace with your API endpoint
        if (response.status === 200) {
          const reserveData = response.data;
          const foundreserve = reserveData.find(user => user.reserveDataId === reserveDataId);
          setCurrentReserve(foundreserve); // Update state with the current user's data
        } else {
          console.error('Error fetching data. Status:', response.status);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  },);
  return (
    <div className='modalbackground'>
        <div className='modalContainer'>
            <div className='btn-close'>
            <button onClick={()=>closeModal(false)} style={{backgroundColor:'white' , border:'none', fontSize: '30px'}}> X </button>
            </div>
                <h1  style={{margin:'0px'}}>ข้อมูลการจอง</h1>
            <div className='book-align'>
            <div className='book-align-left'>
                <p>รหัสการจอง:</p>
                <p>ชื่อผู้ใช้:</p>
                <p>วันที่:</p>
               <p>เวลา/รอบ:</p> 
               <p>รูปแบบโต๊ะ:</p> 
               <p>หมายเลขโต๊ะ:</p>
               <p>จำนวนคน:</p>
               <p>สถานะ:</p> </div>
               <div className='book-align-right'>
               <p>{currentreserve ? currentreserve.reserveDataId : 'N/A'}</p>
              <p>{loggedInUser}</p>
              <p>{currentreserve ? currentreserve.reserveDate : 'N/A'}</p>
              <p>{currentreserve ? currentreserve.reserveTime : 'N/A'}</p>
              <p>{currentreserve ? currentreserve.tableTypes : 'N/A'}</p>
              <p>{currentreserve ? currentreserve.tableNumberType : 'N/A'}</p>
              <p>{currentreserve ? currentreserve.valueOfCustomer : 'N/A'}</p>
              <p>{currentreserve ? currentreserve.reserveStatus : 'N/A'}</p>
               </div>
               
            </div>
            <div className='role-butt-bookdetail'>
                <button onClick={()=>closeModal(false)} style={{color:'black',backgroundColor:'#EFEFEF'}}>ยกเลิก</button>
                <Link to='/payment'><button style={{color:'white', background:'#f07935'}}>ยืนยันข้อมูล</button></Link>
            </div>
        </div></div>
  )
}

export default Bookdetail