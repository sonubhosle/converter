import React from 'react'
import { Link } from 'react-router-dom'
import './Banner.css'
import { RiRefreshLine } from "react-icons/ri";

const Banner = () => {
  return (
    <div className='banner'>
        <h2>File Converter</h2>
        <p>Easily convert files from one format to another, online.</p>
        <Link className="btn_explore">
           <RiRefreshLine size={30} className='spinner'/> Convert Free
        </Link>
    </div>
  )
}

export default Banner