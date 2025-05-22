import React from 'react'
import { Link } from 'react-router-dom'
import { items } from './Data'
import './Footer.css'
import { FaHeadset,FaRegDotCircle  } from "react-icons/fa";
import { IoMdInformationCircleOutline,IoMdHelpCircleOutline } from "react-icons/io";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { LiaHireAHelper } from "react-icons/lia";
import { RiRefreshLine } from "react-icons/ri";
import { TbPoint } from "react-icons/tb";

const Footer = () => {
  return (
    <div className='footer'>
      <div className="footer_grid">
      {
        items.map((item,indx)=>{
          return(
            <div className="footer_card" key={indx}>
               <h2>{item.category}</h2>
               <div className='links'>
            {item.tools.map((tool, toolIdx) => (
              <Link to='/' key={toolIdx}><TbPoint size={26}/> {tool}</Link>
            ))}
          </div>
            </div>
          )
        })
      }
      </div>
      <div className="menus">
        <Link><IoMdInformationCircleOutline/> About Us</Link>
        <Link><FaHeadset/> Contact Us</Link>
        <Link><MdOutlinePrivacyTip/> Privacy</Link>
        <Link><FaRegDotCircle /> Terms</Link>
        <Link><IoMdHelpCircleOutline/> Help</Link>
        <Link><LiaHireAHelper  /> FAQ</Link>
      </div>
      <div className="privacy_logo">
        <Link className='logo_footer'><div className="logo_icon"><RiRefreshLine className='spinner' size={25} /></div> Converto</Link>
        <p>© Convert.42web.io v1.00 All rights reserved (2025)</p>
      </div>
    </div>
  )
}

export default Footer