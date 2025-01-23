import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import pimg from '../../Assets/admin.png'; // Default profile image
import './adminpage.css'; // Import the CSS for styling
import { FaEdit } from 'react-icons/fa'; // Importing an edit icon from react-icons

const AdminPage = () => {
  const [adminData, setAdminData] = useState(null); // Store admin data fetched from server
  const [error, setError] = useState(''); // Error message state
  const [editing, setEditing] = useState(false); // Toggle edit mode
  const [newImage, setNewImage] = useState(null); // Store the new image file
  const [profileImage, setProfileImage] = useState(pimg); // Store profile image
  const navigate = useNavigate();

  // Admin details state (default values, can be updated)
  const [adminName, setAdminName] = useState('Raj Agrawal');
  const [adminEmail, setAdminEmail] = useState('admin@deliverysystem.com');
  const [adminContact, setAdminContact] = useState('+123456789');

  useEffect(() => {
    // Fetch the token from localStorage (assuming it's saved there after login)
    const token = localStorage.getItem('token');

    // If token is available, make a request to the /admin route
    if (token) {
      fetch('http://localhost:5000/admin', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, // Add JWT token to the Authorization header
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Access denied');
          }
          return response.json();
        })
        .then((data) => {
          setAdminData(data); // Store the admin data if access is granted
          setAdminName(data.name || 'Raj Agrawal');
          setAdminEmail(data.email || 'admin@deliverysystem.com');
          setAdminContact(data.contact || '+123456789');
        })
        .catch((error) => {
          setError(error.message); // Handle errors such as "Access denied"
        });
    } else {
      setError('No token found. Please login.');
    }
  }, []); // The useEffect will run when the component mounts

  // Handle image selection
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Generate a URL for the selected image
      setNewImage(imageUrl); // Set the new image for preview
    }
  };

  // Handle saving the new image and details
  const handleSaveChanges = () => {
    if (newImage) {
      setProfileImage(newImage); // Update the profile image only if a new one is selected
    }
    setEditing(false); // Exit edit mode
    setNewImage(null); // Clear the new image preview
  };

  return (
    <div className="admin-layout">
      {/* Navbar */}
      <header className="navbarA">
        <div className="navbar-right">
          <input 
            type="text" 
            placeholder="Search..." 
            className="search-barA" 
          />
          <button className="logout-buttonA" onClick={() => {
            localStorage.removeItem('token'); // Clear token on logout
            navigate('/login'); // Redirect to login page
          }}>
            Logout
          </button>
        </div>
      </header>

      {/* Sidebar */}
      <div className="sidebarA">
        <div className="admin-profile">
          <img src={profileImage} alt="Admin" className="profile-image" />

          {/* Edit Icon */}
          <button className="edit-icon" onClick={() => setEditing(true)}>
            <FaEdit />
          </button>

          {editing && (
            <div className="edit-profile">
              {/* Upload new image */}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              {newImage && (
                <div className="image-preview">
                  <img src={newImage} alt="New Profile Preview" className="preview-image" />
                </div>
              )}

              {/* Edit Name */}
              <div className="edit-field">
                <input
                  type="text"
                  value={adminName}
                  onChange={(e) => setAdminName(e.target.value)}
                />
              </div>

              {/* Edit Email */}
              <div className="edit-field">
                <input
                  type="email"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                />
              </div>

              {/* Edit Contact Number */}
              <div className="edit-field">
                <input
                  type="text"
                  value={adminContact}
                  onChange={(e) => setAdminContact(e.target.value)}
                />
              </div>

              {/* Save and Cancel buttons */}
              <div className="button-row">
                <button className="save-buttonA" onClick={handleSaveChanges}>
                  Done
                </button>
                <button className="cancel-buttonA" onClick={() => setEditing(false)}>
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {!editing && (
          <>
            {/* Admin Name, Email, and Contact */}
            <h3 className="admin-name">{adminName}</h3>
            <p className="admin-email">{adminEmail}</p>
            <p className="admin-contact">{adminContact}</p>
          </>
        )}

        <div className="button-A">
          <li className="menu">
            <button className="nav-button" onClick={() => navigate('/admin/joinrequest')}>
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
      </div>

      {/* Main Content */}
      <div className="admin-content">
        {error ? (
          <div>Error: {error}</div>
        ) : (
          <div>
            {adminData ? (
              <div>
                <h1>Welcome, {adminData.name}</h1>
                <p>{JSON.stringify(adminData)}</p> {/* Display admin data */}
              </div>
            ) : (
              <p>Loading admin data...</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
