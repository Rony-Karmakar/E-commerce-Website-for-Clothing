import { Routes, Route, Outlet } from 'react-router-dom';
import Home from './pages/Home'
import LoginForm from './pages/LoginForm'
import './App.css'
import Navbar from './components/Navbar';
import RegisterPage from './pages/RegisterPage';
import Product from './pages/Product'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart';
import Footer from './components/Footer'
import PlaceOrder from './pages/PlaceOrder'
import Wishlists from './pages/Wishlists'
import Orders from './pages/Orders';
import Search from './pages/Search'
import UserProfile from './pages/UserProfile'
import Details from './pages/Details'
import TotalOrders from './pages/TotalOrders';
import PreviousOrdersDetails from './components/PreviousOrdersDetails';
import ConfirmationPage from './pages/ConfirmationPage';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import VerifyEmail from './pages/VerifyEmail';

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/Log" element={<LoginForm />} />
      <Route path="/Register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/Products" element={<Product />} />
        <Route path="/Search/:name" element={<Search />} />
        <Route path="/Product/:id" element={<ProductDetails />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Wishlists" element={<Wishlists />} />
        <Route path="/Place-Order" element={<PlaceOrder />} />
        <Route path="/Orders" element={<Orders />} />
        <Route path="/TotalOrders" element={<TotalOrders />} />
        <Route path="/PreviousOrderDetails" element={<PreviousOrdersDetails />} />
        <Route path="/Profile" element={<UserProfile />} />
        <Route path="/Details" element={<Details />} />
        <Route path="/Confirmation/payment/:id" element={<ConfirmationPage />} />
      </Route>
    </Routes>
  );
}

export default App;

