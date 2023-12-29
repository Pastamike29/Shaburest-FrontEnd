import React, { useRef,useState} from 'react';
import './Question.css'
import place from '../Compo/Assets/contactplace.jpg'
import plogo from '../Compo/Assets/locationicon.png'
import { Helmet } from 'react-helmet'
import emailjs from '@emailjs/browser';
function Question() {
  const form = useRef();
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [phone, setphone] = useState('');
  const [contact, setcontact] = useState('');
  const [detail, setdetail] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    setcontact('');
    setname('');
    setdetail('');
    setphone('');
    setemail('');};
  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.sendForm('service_p9cvjuh', 'template_afqj6sg', form.current, 'WYWgEL_OXdZUbb7VS')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
    handleSubmit(e)
  };
  return (
    <>
     <Helmet>
      <title>
       Contact us
      </title>
    </Helmet>
      <img src={place} className="img-place" alt="" />
    <div className='place-head'>
      <h1><img src={plogo} alt="" style={{width:"60px",height:"60px"}} />Contact Us</h1></div>
     <div className="contact">
    <div className="contact-content"> 
    <div className='contact-left'>
     <h3>SINNCOSTAN SHABU ADDRESS</h3>
     <p className='body-detail2' style={{display:'block'}}>
 ที่อยู่ : 107 หมู่ที่ 6 ถนนรังสิต-นครนายก คลอง16 <br />อำเภอองครักษ์ จังหวัดนครนายก 26120
 <br /><br />
 เบอร์โทร : โทรศัพท์ 0-2649-5000 โทรสาร 0-3732-2616</p>
 <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3869.4865541839786!2d100.97950517500868!3d14.107459688960034!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d9f58a2f74ff3%3A0x78e525c902b7e4c4!2z4Lih4Lir4Liy4Lin4Li04LiX4Lii4Liy4Lil4Lix4Lii4Lio4Lij4Li14LiZ4LiE4Lij4Li04LiZ4LiX4Lij4Lin4Li04LmC4Lij4LiSIOC4reC4h-C4hOC4o-C4seC4geC4qeC5jA!5e0!3m2!1sth!2sth!4v1697362761272!5m2!1sth!2sth" style = {{width:"400px" ,height:"600px",border:"0",loading:"lazy" ,referrerpolicy:"no-referrer-when-downgrade"}}>
 </iframe>
     </div>
     <div className="contact-right"> 
     <h3>SINNCOSTAN SHABU CONTACT FORM</h3>
     <form className='contact-form' ref={form} onSubmit={sendEmail}>
     <div className='input-box'>
      <span>ชื่อติดต่อกลับ</span>
      <input type="text" required="required"  onChange={event => setname(event.target.value)}
        value={name} name='from_name' />
      </div>
      <div className='input-box'>
        <span>อีเมลติดต่อกลับ</span>
        <input type='email' required="required"  name='from_email'  onChange={event => setemail(event.target.value)}
        value={email}/>
      </div>
      <div className='input-box'> 
      <span>เบอร์โทรติดต่อ *(xxx-xxx-xxxx)</span>
      <input type='tel' pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" name='from_phone'  onChange={event => setphone(event.target.value)}
        value={phone} required />
      </div>
     <div className='input-box'> 
     <span>เรื่องที่ติดต่อ</span>
     <input type="text" name='message' required="required"  onChange={event => setcontact(event.target.value)}
        value={contact}/>
    
     </div>
     <div className='input-box'>
      <span>รายละเอียด</span>
      <input type="text" name='detail'   required="required"  onChange={event => setdetail(event.target.value)}
        value={detail}/>
     </div>
     <div className='sub-butt'>
     <button type='submit' id='Send'
     style={{background:" #DD590F", borderRadius:"0.3rem",cursor:'pointer', color:'white',width:'60px',height:'auto',fontSize:'18px'}} >
      Send</button></div>
     </form>
     </div>
     </div></div>
</>
  )
}

export default Question