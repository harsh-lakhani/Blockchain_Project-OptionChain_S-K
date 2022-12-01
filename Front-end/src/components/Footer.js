import React from 'react'
import './Footer.css'

const Footer = () => {
    return (
        <div className='footer'>
            <div className='container'>
                <div className='col col-1'>
                    <h1>Option<span className='primary'>DeFi</span></h1>
                </div>
            </div>
            <div className='container'>
                <div className='col col-1'>
                    <h5>This is a web app created for MSBD5017 project.</h5>
                </div>
            </div>
        </div>
    )
}

export default Footer
