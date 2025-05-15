import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UpdateUserDetails from './UpdateUserDetails';

const UserDetails = () => {
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showEditForm, setShowEditForm] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const token = localStorage.getItem('token'); // Get token from localStorage
                const response = await axios.get('http://localhost:3000/api/users/userdeatils', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.data && response.data.length > 0) {
                    setUserDetails(response.data[0]); // Assuming the first user in the array is relevant
                } else {
                    console.error('No user details available');
                }
            } catch (error) {
                console.error('Error fetching user details:', error);
                navigate('/login'); // Redirect to login if there's an error
            } finally {
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, [navigate]);

    const handleEditProfileClick = () => {
        setShowEditForm(true); // Show the update form
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!userDetails) {
        return <div>No user data available</div>;
    }

    return (
        <div className="user-details-container">
            <div className="user-details">
                <p><strong>Username:</strong> {userDetails.username}</p>
                <p><strong>Email:</strong> {userDetails.email}</p>
                <p><strong>Mobile:</strong> {userDetails.mobile}</p>
                <p><strong>Address to be Delivered:</strong> {userDetails.address}</p>
                <p><strong>Pincode:</strong> {userDetails.pincode}</p>
            </div>

            {!showEditForm && (
                <button className="btn btn-primary" onClick={handleEditProfileClick}>
                    Edit
                </button>
            )}

{showEditForm && (
                <UpdateUserDetails
                    userDetails={userDetails}
                    setUserDetails={setUserDetails}
                    setShowEditForm={setShowEditForm}
                />
            )}
        </div>
    );
};

export default UserDetails;
