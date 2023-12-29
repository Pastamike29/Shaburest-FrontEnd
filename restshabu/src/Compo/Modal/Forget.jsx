import React, { useState } from 'react';
import axios from 'axios';
import './Forget.css';
import Modal from '../Modal/Yourpassword';

function Forget({ closeModal }) {
  const [email, setEmail] = useState('');
  const [openModal, setOpenModal] = useState(false);

  const toggleModal = () => {
    setOpenModal(!openModal);
  };

  const checkEmailOnServer = async (emailToCheck) => {
    try {
      const response = await axios.get(`http://localhost:2929/0/user`);
      const userWithEmail = response.data.find(user => user.email === emailToCheck);

      if (userWithEmail) {
        alert('Email exists on the server:', emailToCheck);
        toggleModal();
        updateLocalStorage(emailToCheck); // Update local storage when email exists on the server
      } else {
        alert('Email does not exist on the server:', emailToCheck);
      }
    } catch (error) {
      alert('Error checking email:', error);
    }
  };

  const updateLocalStorage = (newEmail) => {
    localStorage.setItem('savedEmail', newEmail);
  };
  return (
    <div className='forget-modalbackground'>{openModal && <Modal closeModal={setOpenModal}/>  }
      <div className='forget-modalContainer'>
        <div className='btn-close'>
          <button onClick={() => closeModal(false)} style={{ backgroundColor: 'white', border: 'none', fontSize: '30px', cursor: 'pointer' }}> X </button>
        </div>
        <h1 style={{ margin: '0px' }}>Forgot Password</h1>
        <p>Enter your email-address</p>
        <input
          type='email'
          required
          placeholder='Enter Email-Address'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div>
          <button className='btn-continue' onClick={() => checkEmailOnServer(email)}>
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

export default Forget;
