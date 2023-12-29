import React, { useContext } from 'react'
import './CSS/Adminmenu.css'
import Item from '../Compo/Item/Item3'
import { Space, Typography} from 'antd'
import Adminleftbar from '../Adminchoice/adminleftbar'
import Adminnavbar from '../Adminchoice/adminnavbar'
import Footer from'../Compo/Footer/Adminfooter'
import { Helmet } from 'react-helmet'
import { Shopcontext } from '../Context/Shopcontext'
function Adminmenu(props) {
    const{ingredata}  = useContext(Shopcontext)
  return (
    <><Helmet>
    <title>
      Manage System for Admin
    </title>
  </Helmet>
    <div className='admin-contain'>
    <Adminnavbar/> 
    <Space className='SideMenuAndPagecontain'> 
       <Adminleftbar/>
       <div className='align-table-adminmangemenu'>
        <Typography.Title level={2} className='Title-dash-align'>ShabuMenu List</Typography.Title>
        <div className='shop-category'>
              <div className='shopcat-indexsort'>
                  <h1>{props.desthai} ({props.deseng}) <hr /> </h1>
                 <button style={{cursor:'pointer',display:'flex', justifyContent:'center',color:'white',backgroundColor:'#f07935',marginLeft:'5px'}}>
          Add</button>
                  <div className='shopcat-product'>
                      {ingredata.map((item, i) => {
                          if (props.category === item.category) {
                              return <Item key={i} id={item.id} image={item.image} />
                          }
                          else {
                              return null
                          }
                      })}
                  </div> </div></div>
     </div>
      </Space>
    <Footer/>

    </div>
    </>
  )
}

export default Adminmenu