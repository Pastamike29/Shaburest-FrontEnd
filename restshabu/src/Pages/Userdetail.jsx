import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import shabuuicon from '../Compo/Assets/resticon.png';
import './UserDetail.css';

function Userdetail() {
  const [currentUser, setCurrentUser] = useState(null);
  const loggedInUser = localStorage.getItem('loggedInUser');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:2929/0/user'); // Replace with your API endpoint
        if (response.status === 200) {
          const userData = response.data;
          const foundUser = userData.find(user => user.username === loggedInUser);
          setCurrentUser(foundUser); // Update state with the current user's data
        } else {
          console.error('Error fetching data. Status:', response.status);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  },);
  var today = new Date();
  var loginDate = new Date(today.setDate(today.getDate())).toISOString().split("T")[0];
  const currTime = new Date().toLocaleTimeString();
  return (
    <div className="user-head">
      <h1 style={{ fontSize: '50px', padding: '0px', margin: '0px' }}>Profile</h1>
      <div className="user-position">
        <div className="user-position-left">
          <img src={shabuuicon} style={{ width: '150px', height: '150px' }} alt="" />
          <div>
            {currentUser && (
              <div>
                <p>Login date: {loginDate}</p>
                <p>Login time: {currTime}</p>
              </div>
            )}
          </div>
        </div>
        <div className="user-position-right">
          <div style={{ textAlign: 'left' }}>
            <h2 style={{ fontSize: '28px' }}>Information</h2>
            {currentUser && (
              <div>
                <p>Username: {currentUser.username}</p>
                <p>Email Address: {currentUser.email}</p>
                <p>Firstname: {currentUser.firstName}</p>
                <p>Surname: {currentUser.lastName}</p>
                <p>Phone Number: {currentUser.phonenumber}</p>
                <p>Date of Birth: {currentUser.dob}</p>
              </div>
            )}
            <Link to="/">
              <button className="backto-butt">Go To Homepage</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Userdetail;
