import React, {useState} from 'react'
import './Navbar.css'
import {
    Link
  } from "react-router-dom";

const Navbar = () => {
const [click, setClick] = useState(false)


    return (
        <div className='header'>
            <div className='container'>
                <Link to="/">
                    <h1>Option<span className='primary'>DeFi</span></h1>
                </Link>
                <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                    <li>
                        <Link to="/">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/buyer">
                            BEC
                        </Link>
                    </li>
                    <li>
                        <Link to="/seller">
                            Seller
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar