import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';
import './Home.css'
import Slider from '../Compo/Slider/Slider'
import data_promo from '../Compo/Item/data'
import Item from '../Compo/Item/Item'
import Deal1 from '../Compo/Assets/deal1.svg'
import Deal2 from '../Compo/Assets/deal2.png'
import Deal3 from '../Compo/Assets/deal3.svg'
import intro from '../Compo/Assets/intro.gif';
import holdclick from '../Compo/Assets/HoldClick.gif';
import nom from '../Compo/Assets/nom.jpg';
import menushabu from '../Compo/Assets/menushabu.jpg'
import { FaArrowDown } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import {Helmet} from 'react-helmet'
import Tablepromo from '../Compo/Modal/Tablepromo'
import myAudioFile from '../Compo/Assets/ethphsaamtaa.mp3';
function Home() {
  const[openModal2, setOpenModal2] = useState(false);
  const toggleModal2 =() => {
   setOpenModal2(!openModal2)
  }
  const[openModal, setOpenModal] = useState(false);
  const toggleModal =() => {
   setOpenModal(!openModal)
  }
  const [isPlaying, setIsPlaying] = useState(false);
  const audio = new Audio(myAudioFile);

  const handleClick = () => {
    if (!isPlaying) {
      audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [imageSrc, setImageSrc] = useState(nom); 
  const handleMouseEnter = () => {
    setIsMouseOver(true);
    setImageSrc(holdclick);
  };
  const handleMouseLeave = () => {
    setIsMouseOver(false);
    setImageSrc(nom);
  };
  const [randomSeed, setRandomSeed] = useState('');
  const [showContent, setShowContent] = useState(false);
  useEffect(() => {
    if (openModal) {
      generateRandomSeed();
      setShowContent(true);
    } else {
      setShowContent(false);
      resetAnimation();
    }
  }, [openModal]);
  const generateRandomSeed = () => {  
    const seeds = [
      'ช่วงนี้ดวงชะตาจะมืดมน อาจส่งผลไปจนแก่ มาถึงแน่ไม่แปรผัน ต้องสั่งชุดรวมหมูติดมันตอนนี้เลย!!!',
      'ช่วงนี้ระวังหน่อย เข้าร้านชาบูบ่อย ๆ จะอร่อยแน่นอนทุกเมนู พร้อมส่วนลด 10% ในครั้งถัดไป',
      'น้ำใสใช่ว่าจะไม่มีพิษ ช่วงนี้ระวังคนใกล้ชิดหักหลัง แต่ถ้าอยากกินเนื้อแทรกมัน ต้องสั่งหมูสันคอ',
      'มีแววต้องอกหักเสียใจ รีบสั่งหมูไม้ไผ่แก้เลย',
      'อนาคตจะได้เจอคนที่ใช่ แม้เนิ่นนานไม่รู้เมื่อไร สั่งไก่คาราเกะมารอก่อนนะ',
      'ช่วงนี้ระวังเงินไหลออก บอกตามตรงแต่งไงต่อฉันท้อใจ เอาเป็นว่ามีโปร มา 4 จ่าย 3 รีบชวนเพื่อน ๆ มากินกันเยอะ ๆ นะ',
      'ช่วงนี้ดวงดี คิดสิ่งใดก็จะสำเร็จเสร็จดั่งหวัง หากแต่สั่งเกี๊ยวหมูคู่น้ำจิ้ม อร่อยแน่นอน',
    ];
    const randomIndex = Math.floor(Math.random() * seeds.length);
    setRandomSeed(seeds[randomIndex]);
  };
  const resetAnimation = () => {
    setShowContent(false); // Reset animation-related state
    setRandomSeed(''); // Reset the randomSeed state
  };
  return (
    <>
    <Helmet>
      <title>
       Home
      </title>
    </Helmet>
    <div className='Slider-con'><Slider /></div>
  <div className='promos-head'>  
  <h1>SHABU PROMOTION<hr /></h1>
     <div className="promos-item">
      {data_promo.map((item,i)=>{
        return <Item key={i} id={item.id} name={item.name} image={item.image} promo={item.promo}/>
      })}
     </div><Link style={{color:"black" ,paddingTop:'30px'}} onClick={toggleModal2}>ดูรายละเอียดเพิ่มเติม</Link>
     <FaArrowDown/>{openModal2 && <Tablepromo closeModal={setOpenModal2}/>  }
    </div>
    <div  className='promos-deal'>
      <div className='promos-deal-head'><h1>โปรโมชั่นเพียบ</h1>
      <p>การันตีความอร่อย จองเลย !!</p>
      <Link to= '/queue'><button className='promos-butt'>&#60;&#60;จองคิว&#62;&#62;</button></Link></div>
    </div>
    <div className='strength'>
            <div className='strength-item'>
        <img src={Deal1} alt="" /> <div className='intro'>
          <h3>จองง่าย</h3>
          <p>ง่ายเพียงไม่กี่ขั้นตอน</p>
        </div>
        </div>
     

      <div className='strength-item'>
        <img src={Deal2} alt="" />
<div className='intro'>
          <h3>ประหยัดเวลา</h3>
          <p>ไม่ต้องรอเสียเวลา เพราะคุณจองแล้ว</p>
        </div>
</div> 
      <div className='strength-item'>
        <img src={Deal3} alt="" />
<div className='intro'>
          <h3>คุณภาพดีที่สุด</h3>
          <p>วัตถุดิบสดใหม่คัดสรรเพื่อคุณลูกค้า</p>
      </div>
                 </div>
            </div>
            <div className='menu'>
            <div className='menu-head'>
                <h1>SHABU MENU <hr /></h1>
                <Link to='/ingredient'><img src={menushabu} alt="" /></Link></div>
                <Link to='/ingredient'><button className='menu-butt'> ดูเมนูทั้งหมด </button></Link>
                </div>
                <div className='menu'>
                <div className='menu-head'>
                <h1>SHABU SIAMESE <hr /></h1></div></div>
                <img
        src={imageSrc}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => {
          handleClick();
          toggleModal(); // Assuming you want to open the modal when clicking the image
        }}
        style={{ height:'300px',cursor:'pointer' }}
      />
                <div className="seed-container">
        {openModal && (
          <Modal
            key={openModal ? 'modal-open' : 'modal-closed'}
            isOpen={openModal}
            onRequestClose={() => setOpenModal(false)}
            contentLabel="Modal"
            style={{
              overlay: {
                display: 'grid',
                placeItems: 'center',
              },
              content: {
                textAlign: 'center',
                margin: '90px',
                backgroundImage: `url(${intro})`,
                backgroundSize: '100% 100%',
              },
            }}
          >
          {showContent && (
            <>
              <h2 style={{ fontSize: '36px' }}>เจ้าหม้อชาบูทำนายดวงเปิดออกแล้ว!! พบว่า!!!</h2>
              
              <h2 style={{  marginTop: '40px' ,fontSize: '40px' }}>{randomSeed}</h2>
              
              <button
            className="menu-butt"
            style={{ marginTop: '50px' }}
            onClick={() => setOpenModal(false)}>ปิดหน้าต่าง</button>
            </>
          )}
         </Modal>
      )}
    </div>
  </>
);
}

export default Home