import React, { useState, useEffect } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { FaBars, FaTimes } from 'react-icons/fa';
import { RiHome6Line, RiRefreshLine } from "react-icons/ri";
import { FiInfo } from "react-icons/fi";
import { BsTelephone } from "react-icons/bs";
import { LuCircleHelp } from "react-icons/lu";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="header">
      <div className="left_logo">
        <Link to={'/'}>
          <div className="logo_icon"><RiRefreshLine className='spinner' size={30} /></div> Convert
        </Link>
      </div>
      <div className="center_menu">
        <Link to='' className="nav_link">Home</Link>
        <Link to='/converters' className="nav_link">Converters</Link>
        <Link to='/about' className="nav_link">About</Link>
        <Link to='/contact' className="nav_link">Contact</Link>
        <Link to='/tools' className="nav_link">Tools</Link>
      </div>

      <div className={`mobile_menu ${isOpen ? 'open' : ''}`}>
        <div className="mobile_logo">
          <Link to={'/'}><RiRefreshLine /> Convert.io</Link>
        </div>
        <div className="items">
          <Link to='' className="mobile_link"><RiHome6Line size={22} /> Home</Link>
          <Link to='/converters' className="mobile_link"><FaArrowRightArrowLeft size={22} /> Converters</Link>
          <Link to='/about' className="mobile_link"><FiInfo size={22} /> About</Link>
          <Link to='/contact' className="mobile_link"><BsTelephone size={22} /> Contact</Link>
          <Link to='/tools' className="mobile_link"><LuCircleHelp size={22} /> Tools</Link>
        </div>
        <div className="center_btns">
          <div className="button-group-two ">
            <Link to="/signin" className="btn-signin-two">Sign In</Link>
            <Link to="/get-started" className="btn-started-two">Get Started</Link>
          </div>
        </div>
      </div>

      <div className="button-group">
        <Link to="/signin" className="btn-signin">Sign In</Link>
        <Link to="/get-started" className="btn-started">Get Started</Link>
      </div>
      <div className="menu_icon" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </div>
    </div>
  );
};

export default Header;
