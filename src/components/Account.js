import axios from 'axios';
import React, { useState, useEffect } from 'react';

function Account() {
    const [orders, setOrders] = useState([]); // To store the orders
    const [loading, setLoading] = useState(false); // To manage loading state
    const [error, setError] = useState(''); // To store error message

    // Fetch orders from API
    const fetchOrders = async () => {
        setLoading(true); // Start loading
        const token = localStorage.getItem('token'); // Retrieve token from localStorage

        if (!token) {
            alert('Please log in to view your orders.');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.get('http://localhost:3000/api/users/account', {
                headers: {
                    Authorization: `Bearer ${token}`, // Attach token in Authorization header
                },
            });
            // Check the structure of the response
            console.log('Fetched Orders:', response.data);
            
            // Ensure response contains the expected orders data and wrap it in an array if it's not
            const fetchedOrders = Array.isArray(response.data) ? response.data : [response.data];
            if (fetchedOrders.length === 0) {
                setError('You did not order anything.');
            } else {
                setOrders(fetchedOrders); // Set orders state with fetched data
                setError(''); // Clear any previous error messages
            }
        } catch (error) {
            console.error('Error fetching orders:', error.response?.data || error.message);
            setError(error.response?.data || 'Failed to fetch orders. Please try again.');
        } finally {
            setLoading(false); // Stop loading
        }
    };

    // Use useEffect to fetch orders when the component is mounted
    useEffect(() => {
        fetchOrders();
    }, []); // Empty dependency array means it runs only once when the component is mounted

    // Render order items in a list
    const renderOrders = () => (
        <ul className="list-group">
            {orders.map((order) => (
                <li key={order.order_id} className="list-group-item d-flex align-items-center mb-2">
                    <img
                        src={order.image_url}
                        alt={order.product_name}
                        className="img-thumbnail"
                        style={{ width: '50px', height: '50px', marginRight: '10px' }}
                    />
                    <span>
                        <strong>{order.product_name}</strong> - ₹{order.amount}
                    </span>
                </li>
            ))}
        </ul>
    );

    return (
        <div className="container mt-4">
            {loading ? (
                <p>Loading orders...</p>
            ) : (
                <div>
                    {error ? (
                        <p>{error}</p> // Show error message if any
                    ) : (
                        renderOrders() // Render orders if available
                    )}
                </div>
            )}
        </div>
    );
}

export default Account;
