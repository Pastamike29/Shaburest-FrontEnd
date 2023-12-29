import React from 'react'
import { useState,useEffect } from 'react';
import './Payment.css'
import payqr from '../Compo/Assets/36904.jpg'
import bankpic from '../Compo/Assets/bankimg.png'
import Modal from '../Compo/Modal/Completestate'
import { Helmet } from 'react-helmet';
import axios from "axios"
function Payment() { 
  const loggedInUser = localStorage.getItem('loggedInUser');
  const [currentUser, setCurrentUser] = useState(null);
  const [historyData, setHistoryData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:2929/0/user');
        if (response.status === 200) {
          const userData = response.data;
          const foundUser = userData.find((user) => user.username === loggedInUser);
          if (foundUser) {
            setCurrentUser(foundUser);
            console.log('Found user:', foundUser);
          } else {
            console.error('User not found for username:', loggedInUser);
          }
        } else {
          console.error('Error fetching data. Status:', response.status);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
  
    fetchData();
  }, [loggedInUser]);
  
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
  const [paymentdata, setPaymentData] = useState({
    userId: currentUser ? currentUser.userid : '',
    accountName: '',
    price: 0,
    paymentDate: '',
    statusPicture: '',
    statusPay: 'Complete',
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentData({
      ...paymentdata,
      [name]: value,
      userId: currentUser ? currentUser.userid : '', // Ensure userId is updated properly
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting data:', paymentdata);
  
    try {
      const updatedpaymentData = {
        ...paymentdata,
        userId: currentUser ? currentUser.userId : '',
      };
  
      const response = await axios.post('http://localhost:2929/0/payment', updatedpaymentData); // Use updatedpaymentData here
      console.log('Payment successful!', response.data);
      toggleModal();
      // Add further logic here upon successful registration
    } catch (error) {
      console.error('Payment failed!', error);
      // Handle error states, e.g., display an error message to the user
    }
  };
  const [file, setFile] = useState();
    function handleChange(e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));}
        const[openModal, setOpenModal] = useState(false);
        const toggleModal =() => {
         setOpenModal(!openModal)}
  return (
    <>
    <Helmet>
      <title>
        Payment
      </title>
    </Helmet>
    <div className='payment'>{openModal && <Modal closeModal={setOpenModal}/>  } 
    <div className='payment-head'><h1>ข้อมูลการจอง</h1>
    </div>
    <div className='bookdata-block'>
      <div className='bookdata-block-content'>
        <div className='bookdata-block-left'>
              <p>รหัสการจอง:</p>
              <p>ชื่อผู้ใช้:</p>
               <p>วันที่: </p>
               <p>เวลา/รอบ:</p> 
               <p>รูปแบบโต๊ะ:</p>
               <p>หมายเลขโต๊ะ:</p>
               <p>จำนวนคน:</p>
               <p>สถานะ:</p></div>
               <div className='bookdata-block-right'>
               <p>{currentreserve ? currentreserve.reserveDataId : 'N/A'}</p>
              <p>{loggedInUser}</p>
              <p>{currentreserve ? currentreserve.reserveDate : 'N/A'}</p>
              <p>{currentreserve ? currentreserve.reserveTime : 'N/A'}</p>
              <p>{currentreserve ? currentreserve.tableTypes : 'N/A'}</p>
              <p>{currentreserve ? currentreserve.tableNumberType : 'N/A'}</p>
              <p>{currentreserve ? currentreserve.valueOfCustomer : 'N/A'}</p>
              <p>{currentreserve ? currentreserve.reserveStatus : 'N/A'}</p>
               </div></div></div>
      <div className='payment-title'><h1>ชำระเงิน</h1></div> 
      <div className='payment-block'>
        <div className='payment-bank-detail'>
          <div className='payment-bank-img'>
          <img src={bankpic} alt="" style={{width:'80px', height:'80px'}}/></div>
          <div className='payment-bank-detail-p'>
          <p>ชื่อบัญชี: นายธีรล้าน รวยอยู่แล้ว</p>
          <p>หมายเลขบัญชี: 999-011-1234</p></div>
        </div>
      <div className='payment-img-align'><img src={payqr}  className='pay-qr'/></div>
      <div className='payment-detail'>
    <h5 style={{color:'red'}}>*หมายเหตุ โอนแล้วไม่รับคืนนะครับคุณลูกค้า</h5>
    </div>
    <div className='form-pay-align'>
    <form className='form-payment' onSubmit={handleFormSubmit}>
      <div className='form-payment-con'>
      <h4>ชื่อเจ้าของบัญชี:</h4>
      <input type="text" placeholder='Paymentname' name='accountName' value={paymentdata.accountName} onChange={handleInputChange} required/></div>
      <div className='form-payment-con'>
      <h4>ยอดชำระเงิน(มัดจำ):</h4> 
      <input value={paymentdata.price=50} name='price' onChange={handleInputChange} required /></div>
      <div className='form-payment-con'>
      <h4>วันที่ชำระเงิน</h4>
        <input type="date"  name='paymentDate' value={paymentdata.paymentDate} onChange={handleInputChange} required/></div>
        <div className='form-input-recipe'>
        <h5>กรุณาอัพโหลดรูปภาพสลิป(.pdf,.webp,.png,.jpg,.jpeg เท่านั้น)</h5>
         <input type="file" onChange={handleChange} style={{marginBottom:'30px'}} required/>
         <img src={file} style={{ width: '400px', height: '600px', display: 'flex', border: '2px solid black' }} /> </div>        
         <div className='senddatapay-butt'>
         <button type='submit'>ยืนยันส่งข้อมูล</button></div></form></div>
    </div></div>
    </>
  )
}

export default Payment
 //<div className='payment-title'><h1>ชำระเงิน</h1></div> 
//      <div><img src={payqr}  className='pay-qr'/></div>
//     <h5 style={{color:'red'}}>*หมายเหตุ โอนแล้วไม่รับคืนนะครับคุณลูกค้า</h5>
//     <div className="payment">
//       <h5>กรุณาอัพโหลดรูปภาพสลิป(.pdf,.webp,.png,.jpg,.jpeg เท่านั้น)</h5>
//       <div className='payment-block'>
//         <div className='input-slipimg'>
//           <input type="file" onChange={handleChange} />
//           <br /><br />
//           <img src={file} style={{ width: '500px', height: '400px', display: 'flex', border: '2px solid black' }} /></div></div>
//     </div> 