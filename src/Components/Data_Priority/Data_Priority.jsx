import React from 'react'
import './Data_Priority.css'
import { LuFileLock2 } from "react-icons/lu";
import { RiDatabaseLine } from "react-icons/ri";
import { TbLockAccess } from "react-icons/tb";
import { Link } from 'react-router-dom';
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { FiZap } from 'react-icons/fi';

const Data_Priority = () => {
    return (
        <div className='priority_container'>
            <div className="h2">We Guard Your Data Like Our Own</div>
            <div className="security">
                <div className="items">
                    <div className="seq_icon"><LuFileLock2 /></div>
                    <div className="seq_title">SSL/TLS <br /> Encryption</div>
                </div>
                <div className="items">
                    <div className="seq_icon">< RiDatabaseLine /></div>
                    <div className="seq_title">Secured Data <br /> Centers</div>
                </div>
                <div className="items">
                    <div className="seq_icon">< TbLockAccess /></div>
                    <div className="seq_title">Access Control <br /> and Authentication</div>
                </div>
                <div className="items">
                    <div className="seq_icon"><FiZap /></div> 
                    <div className="seq_title">Fast & Reliable <br /> Processing</div>
                </div>
            </div>
            <p>Our platform offers seamless and secure file conversion for a wide range of formats, including images, videos, documents, and more. Built with user privacy at its core, we utilize advanced encryption protocols and trusted infrastructure to ensure your data remains safe throughout the conversion process. Whether you're uploading personal photos or important business documents, your files are handled with care and protected from unauthorized access. We don’t store your data longer than necessary, and every step of the process is designed with security and efficiency in mind. Experience fast, reliable, and private file conversion—all in one place.</p>
            <Link className='read_more'> Read More <MdKeyboardDoubleArrowRight size={25} /></Link>
        </div>
    )
}

export default Data_Priority