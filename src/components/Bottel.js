import React, { useEffect, useState } from 'react';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState(''); // State for success or error messages

    // Fetch cart items from the backend
    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/users/getcartitems', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch cart items');
                }

                const data = await response.json();
                setCartItems(data);
            } catch (error) {
                console.error('Error fetching cart items:', error);
                setMessage('Failed to load cart items. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchCartItems();
    }, []);

    const handleRemoveFromCart = async (productId) => {
        try {
            const response = await fetch('http://localhost:3000/api/users/deletecart', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ product_id: productId }),
            });

            if (!response.ok) {
                throw new Error('Failed to remove cart item');
            }

            // Update the UI after successful deletion
            setCartItems((prevItems) => prevItems.filter((item) => item.product_id !== productId));
            setMessage('Item removed from cart successfully!'); // Success message

            // Hide the message after 3 seconds
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            console.error('Error removing cart item:', error);
            setMessage('Failed to remove the item. Please try again.');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (cartItems.length === 0) {
        return <div>Your cart is empty</div>;
    }

    return (
        <div>
            <h2>Your Cart</h2>
            {message && <div className="message">{message}</div>} 
            <div className="cart-items">
                {cartItems.map((item) => (
                    <div key={item.product_id} className="cart-item">
                        <img src={item.image_url} alt={item.product_name} width="50" />
                        <div>
                            <h4>{item.product_name}</h4>
                            <p>{item.description}</p>
                        </div>
                        <button onClick={() => handleRemoveFromCart(item.product_id)}
                            style={{
                                backgroundColor: '#f44336', // Red color for the button
                                color: 'white', // Text color white
                                border: 'none', // Remove border
                                padding: '10px 20px', // Add padding
                                borderRadius: '5px', // Rounded corners
                                cursor: 'pointer', // Pointer cursor on hover
                            }}
                            >
                            Remove from Cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Cart;
