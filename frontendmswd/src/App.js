import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'; 
import CustomerNavBar from './customer/CustomerNavBar';
import AdminNavBar from './admin/AdminNavBar';
import MainNavBar from './main/MainNavBar';
import logo from '../src/Images/logo.jpg';
import './App.css'
import SellerNavBar from './seller/SellerNavBar';
//import config from '../src/config'

function App() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isCustomerLoggedIn, setIsCustomerLoggedIn] = useState(false);
  const [isSellerLoggedIn, setIsSellerLoggedIn] = useState(false);

  useEffect(() => {
    const adminLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
    const CustomerLoggedIn = localStorage.getItem('isCustomerLoggedIn') === 'true';
    const sellerLoggedIn = localStorage.getItem('isSellerLoggedIn') === 'true';
    
    setIsAdminLoggedIn(adminLoggedIn);
    setIsCustomerLoggedIn(CustomerLoggedIn);
    setIsSellerLoggedIn(sellerLoggedIn);
  }, []);

  const onAdminLogin = () => {
    localStorage.setItem('isAdminLoggedIn', 'true');
    setIsAdminLoggedIn(true);
  };

  const onCustomerLogin = () => {
    localStorage.setItem('isCustomerLoggedIn', 'true');
    setIsCustomerLoggedIn(true);
  };

  const onSellerLogin = () => {
    localStorage.setItem('isSellerLoggedIn', 'true');
    setIsSellerLoggedIn(true);
  };

  return (
    <div className="App" style={{}}>
      <header className="header">
        <img src={logo} alt="Logo" className="logo-image" />
      </header>
      <h1>PETS PAW</h1>
      <Router>
      {isAdminLoggedIn ? (
          <AdminNavBar />
        ) : isCustomerLoggedIn ? (
          <CustomerNavBar />
        ) : isSellerLoggedIn ? (
          <SellerNavBar />
        ) : (
          <MainNavBar
            onAdminLogin={onAdminLogin}
            onCustomerLogin={onCustomerLogin}
            onSellerLogin={onSellerLogin}
          />
        )}
      </Router>
    </div>
  );
}

export default App;