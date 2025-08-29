import React from 'react';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import './admin.css'; 
import AdminHome from './AdminHome';
import ViewCustomers from './ViewCustomers';
import ViewSellers from './ViewSellers'
import AddSeller from './AddSeller'
import ViewSellerApplicants from './ViewSellerApplicants'
export default function AdminNavBar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    localStorage.removeItem('admin');
    navigate('/');
    window.location.reload()
  };

  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/viewcustomers">View Customers</Link></li>
          <li><Link to="/addseller">Add Seller</Link></li>
          <li><Link to="/viewsellers">View Sellers</Link></li>
          <li><Link to="/viewsellerapplicants">View Seller Applicants </Link></li>
          <li><Link to="/" className="logout-button" onClick={handleLogout}>Logout</Link></li>

        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<AdminHome />} exact />
        <Route path="/viewcustomers" element={<ViewCustomers />} exact />
        <Route path="/viewsellerapplicants"  element={<ViewSellerApplicants />} exact />
        <Route path="/addseller" element={<AddSeller />} exact />
        <Route path="/viewsellers" element={<ViewSellers />} exact />
      </Routes>
    </div>
  );
}