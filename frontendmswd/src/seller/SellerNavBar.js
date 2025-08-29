import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import SellerHome from './SellerHome';
import SellerProfile from './SellerProfile';
import UpdateSellerProfile from './UpdateSellerProfile';
import AddProduct from './AddProduct';
import ViewDelivers from './ViewDeliveries'; 
import './seller.css';

export default function SellerNavBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isSellerLoggedIn');
    localStorage.removeItem('seller');

    navigate('/');
    window.location.reload();
  };

  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/sellerhome">Home</Link></li>
          <li className="dropdown">
            <button className="dropbtn">Profile</button>
            <div className="dropdown-content">
              <Link to="/sellerprofile">View Profile</Link>
              <Link to="/updatesellerprofile">Update Profile</Link>
            </div>
          </li>
          <li><Link to="/addproduct">Add Product</Link></li> {/* Corrected the link text */}
          <li><Link to="/viewdelivers">View Deliverys</Link></li> {/* Added View Delivers link */}
          <li><Link to="/" className="logout-button" onClick={handleLogout}>Logout</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/sellerhome" element={<SellerHome />} exact />
        <Route path="/sellerprofile" element={<SellerProfile />} exact />
        <Route path="/updatesellerprofile" element={<UpdateSellerProfile />} exact />
        <Route path="/addproduct" element={<AddProduct />} exact />
        <Route path="/viewdelivers" element={<ViewDelivers />} exact /> 
      </Routes>
    </div>
  );
}