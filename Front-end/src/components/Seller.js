import React from 'react'
import Navbar from './Navbar';
import Footer from './Footer';
import Form from './Form';
import Connect from './Connect';
import './Hero.css'

function Seller(){
    return (
        <div>
            <Navbar />
            <div className='hero'>
                <br></br>
                <h2>Sell <span className='primary'>Options</span></h2>
                <div className='container'>
                    <div className='left'>
                        <Form />
                    </div>
                    <div className='right'>
                        <h1>Current Price of <span className='primary'>MMD</span> Token:</h1>
                        <br></br>
                        <h2>$55.28</h2>
                        <div className='input-container'>
                            <Connect />   
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Seller;