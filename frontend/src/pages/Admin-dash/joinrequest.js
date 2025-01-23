import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const JoinRequest = () => {
  
  // Sample data for join requests
  const mockJoinRequests = [
    { id: 1, name: 'Pizza Palace', location: 'Downtown' },
    { id: 2, name: 'Burger Haven', location: 'Uptown' },
    { id: 3, name: 'Sushi World', location: 'East Side' },
  ];

  // State for join requests
  const [joinRequests, setJoinRequests] = useState(mockJoinRequests);
  const navigate = useNavigate();

  

  // Handle approval of a restaurant
  const handleApprove = (id) => {
    console.log(`Approved restaurant ID: ${id}`);
    setJoinRequests((prevRequests) => prevRequests.filter((request) => request.id !== id));
  };

  // Handle denial of a restaurant
  const handleDeny = (id) => {
    console.log(`Denied restaurant ID: ${id}`);
    setJoinRequests((prevRequests) => prevRequests.filter((request) => request.id !== id));
  };

  return (
    <div className="admin-layout">      
        <div className="button-A">
          <li className="menu">
            <button className="nav-button" onClick={() => navigate('/admin/joinrequests')}>
              View Join Request
            </button>
            <button className="nav-button" onClick={() => navigate('/admin/delivered-orders')}>
              Delivered Orders
            </button>
            <button className="nav-button" onClick={() => navigate('/admin/feedback')}>
              Feedback
            </button>
          </li>
        </div>
    
      {/* Main Content Area */}
      <div className="content-area">
        <h2>Join Requests</h2>
        <table className="requests-table">
          <thead>
            <tr>
              <th>Restaurant Name</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {joinRequests.map((request) => (
              <tr key={request.id}>
                <td>{request.name}</td>
                <td>{request.location}</td>
                <td>
                  <button className="approve-button" onClick={() => handleApprove(request.id)}>
                    Approve
                  </button>
                  <button className="deny-button" onClick={() => handleDeny(request.id)}>
                    Deny
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JoinRequest;
