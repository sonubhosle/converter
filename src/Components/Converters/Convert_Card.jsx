import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { RiRefreshLine } from "react-icons/ri";

const Convert_Card = ({ convert }) => {
    const Icon = convert.icon;
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Link
            className="convert_card" style={{
                border: isHovered ? `2px solid ${convert.color}` : '2px solid #dbdbdb',
                transition: 'border 0.3s ease',
            }} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}  >
            <div className="icon" style={{ color: convert.color }}>
                <Icon size={40} />
            </div>
            <div
                className="name" style={{ color: isHovered ? convert.color : '#333', transition: 'color 0.3s ease', }}
                onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} >
                {convert.name}
            </div>
            <p className='desc'>{convert.desc}</p>
            <div
                
                className="path_name"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{
                    backgroundColor: convert.color,
                    boxShadow: isHovered
                        ? `0 8px 25px ${convert.color}88`
                        : `0 5px 15px ${convert.color}55`,
                }}
            >
                <RiRefreshLine size={25} /> Convert Now
            </div>
        </Link>
    );
};

export default Convert_Card;
