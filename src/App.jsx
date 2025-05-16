import React, { lazy, Suspense } from 'react'
import './App.css'
import {Routes,Route} from 'react-router-dom';
import Loader from './Components/Loader/Loader';
import Header from './Components/Header/Header';
const Home = lazy(() => import('./Pages/Home'));
const Converters = lazy(() => import('./Pages/Converters/Converters'));
const Not_Found = lazy(() => import('./Components/Not_Found/Not_Found'));
const About = lazy(() => import('./Pages/About/About'));
const Contact = lazy(() => import('./Pages/Contact/Contact'));
const Help = lazy(() => import('./Pages/Help/Help'));


const App = () => {
  return (
    <Suspense fallback={<Loader/>}>
      <Header />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/converters' element={<Converters/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/help' element={<Help/>} />
        <Route path='/*' element={<Not_Found/>} />
      </Routes>
    </Suspense>
  )
}

export default App