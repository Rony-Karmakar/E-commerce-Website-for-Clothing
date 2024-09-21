import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import LoginForm from './pages/LoginForm'
import './App.css'
import { Navbar } from './components/Navbar'
import RegisterPage from './pages/RegisterPage';
import Product from './pages/Product'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart';
import Footer from './components/Footer'
import PlaceOrder from './pages/PlaceOrder'
import Wishlists from './pages/Wishlists'
import Orders from './pages/Orders';
import UserProfile from './pages/UserProfile'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Navbar/>      
      <Routes>
        <Route path="/Log" element={<LoginForm/>}></Route>
        <Route path="/" element={<Home />} />
        <Route path="/Register" element={<RegisterPage />} />
        <Route path="/Products" element={<Product />} />
        <Route path="/Product/:productId" element={<ProductDetails />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Wishlists" element={<Wishlists/>}></Route>
        <Route path="/Place-Order" element={<PlaceOrder/>} />
        <Route path="/orders" element={<Orders/>} />
        <Route path="/Profile" element={<UserProfile/>} />
      </Routes> 
      <Footer/>
    </div>
  )
}

export default App
