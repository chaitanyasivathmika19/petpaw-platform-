import React, { useEffect, useState } from 'react';
import './seller.css';

export default function SellerProfile() {
  const [sellerData, setSellerData] = useState(null);

  useEffect(() => {
    const storedSellerData = localStorage.getItem('seller');
    if (storedSellerData) {
      const parsedSellerData = JSON.parse(storedSellerData);
      setSellerData(parsedSellerData);
    }
  }, []);

  return (
    sellerData ? (
      <div className='profile-card'>
        <p><strong>Full Name:</strong> {sellerData.fullname}</p>
        <p><strong>Gender:</strong> {sellerData.gender}</p>
        <p><strong>Date of Birth:</strong> {sellerData.dateofbirth}</p>
        <p><strong>Shop:</strong> {sellerData.company}</p>
        <p><strong>Email:</strong> {sellerData.email}</p>
        <p><strong>Address:</strong> {sellerData.address}</p>
        <p><strong>Contact:</strong> {sellerData.contact}</p>
      </div>
    ) : (
      <p>No Seller Data Found</p>
    )
  );
}