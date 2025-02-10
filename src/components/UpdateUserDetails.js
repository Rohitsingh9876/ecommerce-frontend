import axios from 'axios';
import React, { useState } from 'react';

const UpdateUserDetails = ({ userDetails, setUserDetails, setShowEditForm }) => {
    const [formData, setFormData] = useState({ username: userDetails.username || "",
        email: userDetails.email || "",
        mobile: userDetails.mobile || "",
        address: userDetails.address || "",
        pincode: userDetails.pincode || "", });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSaveChanges = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                'http://localhost:3000/api/users/update',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 200) {
                alert('Details updated successfully');
                setUserDetails(formData); // Update the user details in the parent component
                setShowEditForm(false); // Close the update form
            }
        } catch (error) {
            console.error('Error updating user details:', error);
            alert('Failed to update details. Please try again.');
        }
    };

    const handleCancel = () => {
        setShowEditForm(false); // Hide the update form without saving
    };

    return (
        <div className="update-user-details-container">
            <h3>Update Profile</h3>
            <form>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        className="form-control"
                        value={formData.username}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="mobile" className="form-label">Mobile</label>
                    <input
                        type="text"
                        id="mobile"
                        name="mobile"
                        className="form-control"
                        value={formData.mobile}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        className="form-control"
                        value={formData.address}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="pincode" className="form-label">Pincode</label>
                    <input
                        type="text"
                        id="pincode"
                        name="pincode"
                        className="form-control"
                        value={formData.pincode}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="button" className="btn btn-success me-2" onClick={handleSaveChanges}>
                    Save Changes
                </button>
                <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default UpdateUserDetails;
