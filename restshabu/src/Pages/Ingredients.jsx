import React from 'react'
import './Ingredients.css'
import restpic from '../Compo/Assets/restpicture.jpg'
import ingrepro from '../Compo/Assets/ing-pro.jpg'
import emppro from '../Compo/Assets/emp-pro.jpg'
import souppro from '../Compo/Assets/soup-pro.jpg'
import saucepro from '../Compo/Assets/sauce-pro.png'
import drinkpro from '../Compo/Assets/drink-pro.jpg'
import {Link} from 'react-router-dom'
import { Helmet } from 'react-helmet'
function Ingredients() {
  return (
   <> <Helmet>
   <title>
    Shabu menu
   </title>
 </Helmet>
   <img src={restpic} alt="" className='promo-img' />
    <div className='ingre-contain'> <h1 >BUFFET SHABU <hr />
      <div className='ingre-com'>
        <div className='ingre-item'>
        <Link to='/shabuingredient' ><img src= {ingrepro}alt="" className='ingre-img' /></Link>
        <div className="ingre-name">วัตถุดิบชาบู</div> </div>
        <div className='ingre-item'>
        <Link to='/snack&dessert'><img src= {emppro}alt=""  className='ingre-img'/></Link>
        <div className="ingre-name">อาหารว่าง ของหวาน</div></div>
        <div className='ingre-item'>
        <Link to='/soup'><img src= {souppro}alt="" className='ingre-img' /></Link>
        <div className="ingre-name">น้ำซุป</div></div>
        </div>
        <div className='ingre-com'>
        <div className='ingre-item'>
        <Link to= '/sauce'><img src= {saucepro}alt="" className='ingre-img' /></Link>
        <div className="ingre-name">น้ำจิ้ม</div></div>
        <div className='ingre-item'>
        <Link to='/drink'><img src= {drinkpro}alt="" className='ingre-img' /></Link>
        <div className="ingre-name">เครื่องดื่ม</div>
        </div>
      </div></h1> 
    </div>
    </>
  )
}

export default Ingredients