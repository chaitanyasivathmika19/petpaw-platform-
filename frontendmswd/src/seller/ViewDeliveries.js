import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import config from '../config'

export default function ViewDeliveries() {
  const [deliveries, setDeliveries] = useState([]);
  const [error, setError] = useState('');

  const fetchDeliveries = useCallback(async () => {
    try {
      const seller = JSON.parse(localStorage.getItem('seller')); 
      const sellerEmail = seller.email;

      const response = await axios.get(`${config.url}/viewproductorders/${sellerEmail}`);
      const deliveriesData = await Promise.all(response.data.map(async (delivery) => {
        const productResponse = await axios.get(`${config.url}/productbyid/${delivery.productId}`);
        const productName = productResponse.data.name;
        return {
          ...delivery,
          productName: productName,
        };
      }));
      setDeliveries(deliveriesData);
    } catch (error) {
      console.error(error.message);
      setError('No deliveries.');
    }
  }, []);

  const handleStatusUpdate = async (orderId, status) => {
    try {
      const response = await axios.put(`${config.url}/updateproductorderstatus`, { orderId, status });
      console.log(response.data);
      fetchDeliveries();
    } catch (error) {
      console.error(error.message);
      setError('No deliveries.');
    }
  };

  useEffect(() => {
    fetchDeliveries();
  }, [fetchDeliveries]);

  return (
    <div>
      <h2>View Deliveries</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Product Name</th>
            <th>Customer Email</th>
            <th>Status</th>
            <th>Order Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {deliveries.map((delivery) => (
            <tr key={delivery.orderId}>
              <td>{delivery.orderId}</td>
              <td>{delivery.productName}</td> 
              <td>{delivery.customerEmail}</td>
              <td>{delivery.status}</td>
              <td>{delivery.orderTime}</td>
              <td>
                {delivery.status === 'ordered' && (
                  <button onClick={() => handleStatusUpdate(delivery.orderId, 'dispatched')}>
                    Dispatch Out for Delivery
                  </button>
                )}
                {delivery.status === 'dispatched' && (
                  <button onClick={() => handleStatusUpdate(delivery.orderId, 'delivered')}>
                    Delivered
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}