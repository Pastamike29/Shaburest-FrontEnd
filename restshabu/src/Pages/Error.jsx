import React from 'react'
import './Error.css'
import { Link } from 'react-router-dom'
function Error() {
  return (
    <div class="notfound">
    <div class="notfound-404">
    <h1>404</h1>
    </div>
    <h2>Oops! This Page Could Not Be Found</h2>
    <p>Sorry but the page you are looking for does not exist, have been removed. name changed or is temporarily unavailable</p>
    <Link to ='/'><button className='error-butt'>Go To Homepage</button></Link>
    </div>
  )
}

export default Error