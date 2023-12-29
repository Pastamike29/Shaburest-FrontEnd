import React from 'react'
import './Item2.css'
function Item2(props) {
  return (
    <div className='item2'>
      <img src={props.image} className='item2-img' alt="" />
    </div>
  )
}

export default Item2