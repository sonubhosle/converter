import React from 'react'
import './Converters.css'
import Convert_Card from './Convert_Card'
import { media } from './Data'

const Converters = () => {
    return (
        <div className='convert_container section'>

            {
                media.map((con, indx) => <Convert_Card convert={con} key={indx} />)
            }
        </div>
    )
}

export default Converters