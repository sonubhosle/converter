import React from 'react'
import './Loader.css'
import { RiRefreshLine } from "react-icons/ri";

const Loader = () => {
  return (
    <div className='loader'>
    <p><RiRefreshLine  className='spinner' /> Loading</p>
    </div>
  )
}

export default Loader