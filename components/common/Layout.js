import React from 'react'
import Footer from './Footer'
import Header from './Header'

export default function Layout({ children }) {
    return (
        <>
            <div className='main-container'>
                <Header />
                {children}
                {/* <div className="push"></div> */}
                <div className="push"></div>
            </div>
            <Footer />
        </>
    )
}
