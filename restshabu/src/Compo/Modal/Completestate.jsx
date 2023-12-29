import React from 'react'
import './Completestate.css'
import suclogo from '../Assets/suclogo.png'
import { Link } from 'react-router-dom'
function Completestate({closeModal}) {
  return (
    <>
    <div className='btn-close'>
    <button onClick={()=>closeModal(false)} style={{backgroundColor:'white' , border:'none', fontSize: '30px'}}> X </button>
            </div>
    <div className='complete-modalbackground'>
        <div className='complete-modalcon'>
    <h2  style={{margin:'0px'}}>ส่งข้อมูลการชำระเงิน</h2>
    <p>กดปุ่มOK เพื่อส่งข้อมูล</p>
    <img src={suclogo} alt="" style={{width:'200px',height:'200px'}} />
    <div className='role-butt-complete'>
    <Link to='/queue'><button className='okbutt-complete'>OK</button></Link>
    <button onClick={()=>closeModal(false)} className='cancelbutt-complete'>Cancel</button></div>
    </div></div>
    </>

  )
}

export default Completestate