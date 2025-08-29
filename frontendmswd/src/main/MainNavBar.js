// MainNavBar.jsx
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Registration from './../customer/Registration';
import Contact from './Contact';
import AdminLogin from './../admin/AdminLogin';
import CustomerLogin from './../customer/CustomerLogin';
import ViewProducts from './ViewProducts';
import './style.css';
import SellerLogin from '../seller/SellerLogin';
import SellerRegistration from './SellerRegistration'

export default function MainNavBar({ onAdminLogin, onCustomerLogin, onSellerLogin }) {
  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/viewproducts">Our Products</Link></li>
          <li className="dropdown">
            <span>Registration</span>
            <div className="dropdown-content">
            <li><Link to="/registration">Customer Registration</Link></li>
            <li><Link to="/sellerapplicantregistration">Seller Registration</Link></li>
            </div>
          </li>&nbsp;
          <li className="dropdown">
            <span>Login</span>
            <div className="dropdown-content">
              <Link to="/customerlogin">Customer</Link>
              <Link to="/sellerlogin">Seller</Link>
              <Link to="/adminlogin">Admin</Link>
            </div>
          </li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/about" element={<About />} exact />
        <Route path="/viewproducts" element={<ViewProducts />} exact />
        <Route path="/registration" element={<Registration />} exact />
        <Route path="/sellerapplicantregistration" element={<SellerRegistration />} exact />
        <Route path="/customerlogin" element={<CustomerLogin onCustomerLogin={onCustomerLogin}/>} exact />
        <Route path="/sellerlogin" element={<SellerLogin onSellerLogin={onSellerLogin}/>} exact />
        <Route path="/contact" element={<Contact />} exact />
        <Route path="/adminlogin" element={<AdminLogin onAdminLogin={onAdminLogin} />} exact />
      </Routes>
    </div>
  );
}