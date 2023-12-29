import React from 'react';
import { Link } from 'react-router-dom';
import './Signup.css';
import { Helmet } from 'react-helmet';
import Modal from '../Compo/Modal/OtpModal';
import { useState } from 'react';
import axios from 'axios';

function Signup() {
  const [signupdata, setsignupData] = useState({
    firstLastName: '',
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phonenumber: '',
    dob: '',
    to: '',
    otp: '',
    bcc: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'firstName') {
      setsignupData({
        ...signupdata,
        [name]: value,
        firstLastName: `${value} ${signupdata.lastName}`,
      });
    } else if (name === 'lastName') {
      setsignupData({
        ...signupdata,
        [name]: value,
        firstLastName: `${signupdata.firstName} ${value}`,
      });
    } else {
      setsignupData({
        ...signupdata,
        [name]: value,
      });
    }
  };

  const [openModal, setOpenModal] = useState(false);
  const toggleModal = () => {
    setOpenModal(!openModal);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get('http://localhost:2929/0/user');

      // Check if the username already exists in the response data
      const existingUser = response.data.find(user => user.username === signupdata.username);
      const existingemail = response.data.find(user => user.email === signupdata.email);
      if (existingUser) {
        alert('Username already exists, please change the username');
        return;
      }
      else if (existingemail) {
        alert('Email already exists, please use a different email');
        return;
      }

      const registrationResponse = await axios.post('http://localhost:2929/0/user', signupdata);
      console.log('Registration successful!', registrationResponse.data);

      const emailConfirmation = {
        to: signupdata.email,
        bcc: [signupdata.email],
        subject: '',
        body: '',
      };

      const emailResponse = await axios.post('http://localhost:2929/0/email', emailConfirmation);
      toggleModal();
      // Further logic upon successful registration
      setsignupData({ ...signupdata, otp: emailResponse.data });
      localStorage.setItem('signupOTP', emailResponse.data);
    } catch (error) {
      console.error('Registration error:', error);
      if (error.response && error.response.status === 409) {
        console.log('Username already exists');
      }
      // Handle other error states
    }
  };

  return (
    <>
      <Helmet>
        <title>Sign up</title>
      </Helmet>
      <div className='signup'>
        {openModal && <Modal closeModal={setOpenModal} />}
        <form className='signup-contain' onSubmit={handleFormSubmit}>
          <h1 className=''>SIGN UP</h1>
          <div className="signup-fields">
            <input type='text' placeholder="Username" name='username' minLength="6" maxLength='30' value={signupdata.username} onChange={handleInputChange} required />
            <input type='email' placeholder="Email Address" name='email' value={signupdata.email} onChange={handleInputChange} required />
            <input type="password" placeholder="Password" name='password' value={signupdata.password} minLength="8" maxLength='16' onChange={handleInputChange} required />
          </div>
          <div className="signup-fields">
            <div className='signup-field-name'>
              <input type='text' placeholder="Firstname" name='firstName' value={signupdata.firstName} onChange={handleInputChange} required />
              <input type="text" placeholder='Lastname' name='lastName' value={signupdata.lastName} onChange={handleInputChange} required />
            </div>
            <input type='tel' placeholder="Phone Number *(xxx-xxx-xxxx)" name='phonenumber' value={signupdata.phonenumber} pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" onChange={handleInputChange} required />
            <label htmlFor="date" style={{ textAlign: "left" }}>Date of birth</label>
            <input type="date" style={{ marginBottom: "20px", border: '2px solid black' }} name='dob' value={signupdata.dob} onChange={handleInputChange} required />
          </div>
          <button className='regis-butt' type='submit'>REGISTER</button>
          <p className='signup-alr'>Already Registered?<Link to='/login' style={{ textDecoration: "none" }}><span className='span-login'>Login here</span></Link></p>
        </form>
      </div>
    </>
  );
}

export default Signup;