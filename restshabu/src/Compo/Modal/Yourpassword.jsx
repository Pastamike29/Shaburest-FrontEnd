import React,{useEffect,useState} from 'react'
import './Bookdetail.css'
import axios from 'axios';
function Yourpassword({closeModal}) {
   const savedEmail = localStorage.getItem('savedEmail');
  const [currentemai, setCurrentEmail] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:2929/0/user'); // Replace with your API endpoint
        if (response.status === 200) {
          const reserveData = response.data;
          const foundreserve = reserveData.find(user => user.email === savedEmail);
          setCurrentEmail(foundreserve); // Update state with the current user's data
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
                <h1  style={{margin:'0px'}}>ข้อมูลบัญชีของคุณ</h1>
            <div className='book-align'>
            <div className='book-align-left'>
                <p>ชื่อผู้ใช้ของคุณ:</p>
                <p>รหัสผ่านของคุณ:</p>
               </div>
               <div className='book-align-right'>
              <p>{currentemai ? currentemai.username : 'N/A'}</p>
              <p>{currentemai ? currentemai.password : 'N/A'}</p>
               </div>
               
            </div>
            <div className='role-butt-bookdetail'>
                <button onClick={()=>closeModal(false)} style={{color:'black',backgroundColor:'#EFEFEF'}}>ปิดหน้าต่าง</button>
            </div>
        </div></div>
  )
}

export default Yourpassword