import React from 'react'
import './Hero.css'
import Connect from './Connect.js'

const Hero = () => {
    return (
        <div className='hero'>
            <div className='container'>

                {/* Left Side */}
                <div className='left'>
                    <h2>Buy & Sell MMD Option Contracts 24/7 using your MetaMask Wallet</h2>
                    <h3 style={{color: 'green'}}>Lowest fees in the market</h3>
                </div>

                {/* Right Side */}
                <div className='right'>
                    <div className='input-container'>
                        <Connect />   
                    </div>
                    <div className='input-container'>
                        <div className='btn-group'>
                            <a href="./seller">
                                <button className='btn'>Option Seller</button>
                            </a>
                        </div>    
                    </div>
                    <div className='input-container'>
                        <div className='btn-group'>
                            <a href="./buyer">
                                <button className='btn'>Option Buyer</button>
                            </a>
                        </div>    
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero;
