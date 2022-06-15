import React from 'react'
import {Link} from 'react-router-dom'
import './Header.css';

export default function Header() {

  
  return (
    <div>
        <div className='header'>
        <p>Herolo Weather Task</p>
        </div>
        <div className='buttons'>
        <Link to='/home'><button>Home</button></Link>
        <Link to='/favorites'><button>Favorites</button></Link>
        </div>

    </div>
  )
}
