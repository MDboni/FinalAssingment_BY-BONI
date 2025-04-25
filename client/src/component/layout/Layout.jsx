import React from 'react'
import AppNavbar from './AppNavbar'
import Footer from './Footer'
import {Toaster} from "react-hot-toast";

const Layout = (props) => {
  return (
    <div>
        <AppNavbar/>


        {props.children}

        <Toaster position="bottom-center"/>

        <Footer/>
    </div>
  )
}

export default Layout