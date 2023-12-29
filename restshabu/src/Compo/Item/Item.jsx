import React from 'react'
import './Item.css'
function Item(props) {
  return (
    <div className='item'>
      <img src={props.image} className='item-img' alt="" />
      <div className="item-promo">
        {props.promo} </div>
      <p>{props.name}</p>
    </div>
  )
}

export default Item