import React from 'react'
import "./About.css";
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className='about'>
       <p><b>Messages v1.0.0</b></p>
       <p>
        Üzenetküldő alkalmazás React Vite keretrendszer és Firebase használatának
       </p>
        <ul>
          <li><Link to='/'>Message</Link>: itt láthatók a küldött/fogadott üzenetek</li>
          <li><Link to='/users'>Users</Link>: felhasználók listája</li>
          <li><Link to='/about'>About</Link>: alkalmazás leírása</li>
          <li><Link to='/login'>Login</Link>: bejelentkezés az alkalmazásba</li>
        </ul>
    </div>
  )
}

export default About
