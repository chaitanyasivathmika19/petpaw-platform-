import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './seller.css';
import config from '../config'

export default function UpdateSellerProfile() {
  const [sellerData, setSellerData] = useState({
    fullname: '',
    gender: '',
    dateofbirth: '',
    company:'',
    username:'',
    email: '',
    password: '',
    address: '',
    contact: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [initialSellerData, setInitialSellerData] = useState({});

  useEffect(() => {
    const storedSellerData = localStorage.getItem('seller');
    if (storedSellerData) {
      const parsedSellerData = JSON.parse(storedSellerData);
      setSellerData(parsedSellerData);
      setInitialSellerData(parsedSellerData);
    }
  }, []);

  const handleChange = (e) => {
    setSellerData({ ...sellerData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {};
      for (const key in sellerData) {
        if (sellerData[key] !== initialSellerData[key] && initialSellerData[key] !== '') {
          updatedData[key] = sellerData[key]; 
        }
      }
      if (Object.keys(updatedData).length !== 0) {
        // There are changes
        updatedData.email = sellerData.email;
        const response = await axios.put(`${config.url}/updatesellerprofile`, updatedData);
        setMessage(response.data);
        setError('');
        const res = await axios.get(`${config.url}/sellerprofile/${sellerData.email}`);
        localStorage.setItem("seller", JSON.stringify(res.data));
      } else {
        // No changes
        setMessage("No Changes in Seller Profile");
        setError("");
      }
    } catch (error) {
      setError(error.response.data);
      setMessage('');
    }
  };
  
  return (
    <div>
      <h3 align="center"><u>Update Profile</u></h3>
      {message ? <h4 align="center">{message}</h4> : <h4 align="center" style={{ color: 'red' }}>{error}</h4>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Full Name</label>
          <input type="text" id="fullname" value={sellerData.fullname} onChange={handleChange} required />
        </div>
        <div>
          <label>Gender</label>
          <input type="text" id="gender" value={sellerData.gender} readOnly />
        </div>
        <div>
          <label>Date of Birth</label>
          <input type="date" id="dateofbirth" value={sellerData.dateofbirth} readOnly />
        </div>
        <div>
          <label>Email</label>
          <input type="email" id="email" value={sellerData.email} readOnly />
        </div>
        <div>
          <label>Password</label>
          <input type="password" id="password" value={sellerData.password} onChange={handleChange} required />
        </div>
        <div>
          <label>Company</label>
          <input type="text" id="company" value={sellerData.company} readOnly />
        </div>
        <div>
          <label>Username</label>
          <input type="text" id="username" value={sellerData.username} onChange={handleChange} />
        </div>
        <div>
          <label>Address</label>
          <input type="text" id="address" value={sellerData.address} onChange={handleChange} required />
        </div>
        <div>
          <label>Contact</label>
          <input type="number" id="contact" value={sellerData.contact} onChange={handleChange} required />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}