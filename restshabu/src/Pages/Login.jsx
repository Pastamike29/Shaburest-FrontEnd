import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { Helmet } from 'react-helmet';
import Forget from '../Compo/Modal/Forget';
import axios from 'axios';
function Login( {isLoggedIn, onLogin }) { 
  let navigate = useNavigate();
const [logindata,setLogindata] = useState({
  username: '',
  password:''
});
const [error,setError] = useState('');
const handleInputChange = (e) => {
  const { name, value } = e.target;
  setLogindata({
    ...logindata,
    [name]: value
  });
};
const validateForm = () => { 
   if (!logindata.username && !logindata.password) {
    alert('Username and password are required')
    setError('Username and password are required');
    return false;
  }
 else if(!logindata.username) {
    alert('Username is required')
    setError('Username is required');
    return false;
        }
  else if(!logindata.password) {
    alert('Password is required')
    setError('Password is required');
    return false; }
 
  else if(logindata.password.length < 8) {
    alert('Password must be more than 8 characters')
    setError('Password must be more than 8 characters');
    return false; }
 else if(logindata.password.length > 16) {
    alert('Password cannot exceed more than 16 characters')
    setError('Password cannot exceed more than 16 characters');
    return false; }
  setError('');
  return true;
};

const handleFormSubmit = async (e) => {
  e.preventDefault();
  if (validateForm()) {
    try {
      const formData = new FormData();
      formData.append('username', logindata.username);
      formData.append('password', logindata.password);

      const response = await axios.post('http://localhost:2929/0/auth/user', formData);

      if (response && response.data) {
        const { token } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('loggedInUser', logindata.username);
        window.alert('Login complete');

        const userResponse = await axios.get('http://localhost:2929/0/user');
        const userData = userResponse.data;
        const foundUser = userData.find(user => user.username === logindata.username);

        if (foundUser && foundUser.role === 'ADMIN') {
          navigate('/adminmanagebook');
        } else if (foundUser && foundUser.role === 'USER') {
          onLogin();
          navigate('/');
        }
      }
    } catch (error) {
      alert('Incorrect username or password');
      setError('Incorrect username or password');
    }
  }
};

  //openmodal
  const [openModal, setOpenModal] = useState(false);
  const toggleModal = () => {
    setOpenModal(!openModal);
  };
    return (
    <><Helmet>
      <title>
       Login
      </title>
    </Helmet>
    <div className='login'>{openModal && <Forget closeModal={setOpenModal}/>  }
        <div className='login-contain'>
          <h1 className=''>LOGIN</h1>
          <form className="login-fields" onSubmit={handleFormSubmit}>
            <div>{error && <p className='loginerror'>{error}</p>}<input type="text" name='username'  minlength="6" maxlength='30' placeholder="Username" className="form-control" 
             value={logindata.username} onChange={handleInputChange}
            /></div>          
            <div><input type="password" name='password' placeholder="Password"
             minlength="8" maxlength='16' className="form-control" value={logindata.password} onChange={handleInputChange}
            />
             </div>
             <div>
             
            <button  type='submit' className="signin-butt">Login Now</button></div>
           
          </form>
          <div className='login-rolebutt'>
            <div className="">
              <Link to="" style={{textDecoration:"none" ,color:"black"}} onClick={toggleModal}><p>Forgot password?</p></Link>
            </div>
            <div className="">
              <Link to="/signup" style={{textDecoration:"none" ,color:"black"}}><p>Don't have account</p></Link>
            </div> 
             </div>
        </div>
      </div></>
  )
}

export default Login