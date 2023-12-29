import React, { useContext } from 'react'
import './CSS/Shopcategory.css'
import { Shopcontext } from '../Context/Shopcontext'
import Item from '../Compo/Item/Item2'
import thankrestpic from '../Compo/Assets/thankrestpic.jpg'
import { Helmet } from 'react-helmet'
function Shopcategory(props) {
    const{ingredata}  = useContext(Shopcontext)
  return (
    <><Helmet>
          <title>
              {props.desthai}
          </title>
      </Helmet>
      <div className='shop-category'>
              <div className='shopcat-indexsort'>
                  <img src={thankrestpic} alt="" className='shopcat-img' />
                  <h1>{props.desthai} ({props.deseng}) <hr /></h1>
                  <div className='shopcat-product'>
                      {ingredata.map((item, i) => {
                          if (props.category === item.category) {
                              return <Item key={i} id={item.id} image={item.image} />
                          }
                          else {
                              return null
                          }
                      })}
                  </div>
              </div>
          </div></>
  )
}

export default Shopcategory