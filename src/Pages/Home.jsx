import React from 'react'
import Banner from '../Components/Banner/Banner'
import Converters from '../Components/Converters/Converters'
import Data_Priority from '../Components/Data_Priority/Data_Priority'
import Loader from '../Components/Loader/Loader'
import Privacy_Security from '../Components/Privacy_Security/Privacy_Security'

const Home = () => {
  return (
    <div className='home_section'>
    <Banner />
    <Converters/>
    <Privacy_Security/>
    <Data_Priority/>
    </div>
  )
}

export default Home