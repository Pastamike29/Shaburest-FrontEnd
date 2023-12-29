import React from 'react'
import './OtpModal.css'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
function OtpModal({closeModal}) {
  const navigate = useNavigate();
  const [otp,setOtp] = useState(new Array(5).fill(""));
  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);
    // Focus next input
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };
  const resetOtpInput = () => {
    setOtp(new Array(5).fill(''));
    // Reset the OTP input fields
    const firstInput = document.getElementById('otp-input-0');
    if (firstInput) {
      firstInput.focus();
    }
  };
  const handleResend = () => {
    // Logic to resend OTP using localStorage or any other method
    const newOtp = generateOtp(); // Generate a new OTP
    localStorage.setItem('signupOTP', newOtp); // Store the new OTP in localStorage
    setOtp(new Array(5).fill('')); // Reset the OTP input fields
    // You can also trigger an API call here to resend OTP
  };
  const handleVerifyOTP = () => {
    const otpString = otp.join('');
    const storedOtp = localStorage.getItem('signupOTP');
    console.error(storedOtp)

    if (otpString === storedOtp) {
      window.alert('OTP is correct!');
      window.alert('Signup complete');
      // Handle correct OTP scenario
      navigate('/login'); // Redirect to login page or perform further action
    } else {
      window.alert('OTP is incorrect!');
      resetOtpInput();
      // Handle incorrect OTP scenario
    }
  };
  const generateOtp = () => {
    // Logic to generate a new OTP (Example: 6-digit OTP)
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    return otp.slice(0, 5); // Return a 5-digit OTP
  };
  
  return (
    <div className="otp-modalbackground">
    <div className='otp-card'>
      <div className='close-butt'>
    <button onClick={()=>closeModal(false)} style={{backgroundColor:'white',fontSize: '30px'}} > X </button></div>
        <h1 style={{margin:'0'}}>OTP Verification</h1>
        <p>Code has been sent to your email</p>
        <div className='otp-input'>
          {
            otp.map((data,index) => {
              return  <input
              id={`otp-input-${index}`}
              className="otp-num"
              type="text"
              name="otp"
              maxLength="1"
              key={index}
              value={data}
              onChange={e => handleChange(e.target, index)}
              onFocus={e => e.target.select()}
            />
            })
          }
        </div>
        <p>Didn't get the otp  <Link onClick={handleResend}>Resend</Link></p>
       <button onClick={handleVerifyOTP} style={{color:'white' , backgroundColor:'#f07935'}}>Verify</button>
    </div>
    </div>
  )
}

export default OtpModal