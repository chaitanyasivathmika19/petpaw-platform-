import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './admin.css';
import config from '../config'

export default function ViewSellerApplicants() {
  const [sellerApplicants, setSellerApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rejectionMessage, setRejectionMessage] = useState('');

  useEffect(() => {
    fetchSellerApplicants();
  }, []);

  const fetchSellerApplicants = async () => {
    try {
      const response = await axios.get(`${config.url}/viewsellerapplicants`);
      setSellerApplicants(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleChangeStatus = async (applicantEmail, status) => {
    try {
      if (status === 'rejected' && !rejectionMessage.trim()) {
        alert('Please provide a rejection message.');
        return;
      }

      const requestData = {
        email: applicantEmail,
        status: status,
        rejectionMessage: status === 'rejected' ? rejectionMessage : ''
      };

      await axios.post(`${config.url}/changesellerstatus`, requestData);
      fetchSellerApplicants();
      setRejectionMessage(''); 
    } catch (error) {
      console.error(error.message);
    }
  };
  if (loading) {
    return <div>Loading...</div>;
  }

  if (sellerApplicants.length === 0) {
    return <div>No seller applicants found</div>;
  }

  return (
    <div className="table-container">
      <h3>Seller Applicants</h3>
      <table className="seller-applicant-table mx-auto" align="center">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Gender</th>
            <th>Date of Birth</th>
            <th>Company</th>
            <th>Username</th>
            <th>Email</th>
            <th>Address</th>
            <th>Contact</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sellerApplicants.map(applicant => (
            <tr key={applicant._id}>
              <td>{applicant.fullname}</td>
              <td>{applicant.gender}</td>
              <td>{applicant.dateofbirth}</td>
              <td>{applicant.company}</td>
              <td>{applicant.username}</td>
              <td>{applicant.email}</td>
              <td>{applicant.address}</td>
              <td>{applicant.contact}</td>
              <td>{applicant.status}</td>
              <td>
                {applicant.status === 'applied' && (
                  <>
                    <button onClick={() => handleChangeStatus(applicant.email, 'accepted')}>Accept</button>
                    <button onClick={() => handleChangeStatus(applicant.email, 'rejected')}>Reject</button>
                    <input
                      type="text"
                      value={rejectionMessage}
                      placeholder="Enter rejection message"
                      onChange={e => setRejectionMessage(e.target.value)}
                    />
                  </>
                )}
                {applicant.status === 'rejected' && 'Rejected'}
                {applicant.status === 'accepted' && 'Accepted'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}