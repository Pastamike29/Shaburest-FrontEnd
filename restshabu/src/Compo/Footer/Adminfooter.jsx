import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom'
import {FaPhoneAlt} from 'react-icons/fa'
import {FaMailBulk} from 'react-icons/fa'
import logo from '../Assets/resticon.png'
import footcom from '../Assets/footcom1.png'
function Adminfooter() {
   return (
   <>
   <div className='footer'>
         <div className="footer-section">
           <div className="footer-links">
             <div className="footer-link-div">
               <h2>SinnCosTan Shabu</h2>
               <img src={logo} alt="" className='foot-logo' />
               <p>วัตถุดิบคุณภาพดี จองง่าย ราคาประหยัด </p>
             </div>
             <div className="footer-link-div">
               <h3>Quick Links</h3>
               <Link to='/' style={{ textDecoration: 'none', color: 'white' }}>
                 <p>Home</p>
               </Link>
               <Link to='/ingredient' style={{ textDecoration: 'none', color: 'white' }}>
                 <p>Shabu menu</p>
               </Link>
               <Link to='/queue' style={{ textDecoration: 'none', color: 'white' }}>
                 <p>Book table</p>
               </Link>
               <Link to='/question' style={{ textDecoration: 'none', color: 'white' }}>
                 <p>Contact us</p>
               </Link>
             </div>
             <div className="footer-link-div">
               <h3>Location</h3>
               <p>107 หมู่ที่ 6 ถนนรังสิต-นครนายก คลอง16 <br />อำเภอองครักษ์ จังหวัดนครนายก 26120 </p>
               <p><FaPhoneAlt />: 0-2649-5000 , 0-3732-2616</p>
               <p><FaMailBulk />: SinnCosTanshabu@gmail.com</p>
             </div>
             <div className="footer-link-div">
               <img src={footcom} alt="" className='foot-logo' />
             </div>
           </div>
         </div>
       </div><div className="footer-copy" style={{background:'white'}}>
           <p> &copy; Copyright 2023|www.SinnCosTanshabu.com  </p>
         </div></>
      )
     }
      export default Adminfooter