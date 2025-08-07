import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from './Pages/Home'
import Contact from './Pages/Contact'
import About from './Pages/About'
import Collection from './Pages/Collection'
import Product from './Pages/Product'
import Login from './Pages/Login'
import Orders from './Pages/Orders'
import PlaceOrder from './Pages/PlaceOrder'
import Cart from './Pages/Cart'
import Navbar from './Component/Navbar'
import Footer from './Component/Footer.jsx'
import { ToastContainer, toast } from 'react-toastify';
// import SearchBar from './Component/SearchBar.jsx'


const App = () => {
  return (
    <div className='px-5 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <ToastContainer/>
      <Navbar/> 
      
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='about' element={<About/>}/>
        <Route path='/collection' element={<Collection/>}/>
        <Route path='/product/:productId' element={<Product/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/Order' element={<Orders/>}/>
        <Route path='/placeorder' element={<PlaceOrder/>}/>
        <Route path='cart' element={<Cart/>}/>
      </Routes>
       <Footer/>
      
    </div>
  )
}

export default App