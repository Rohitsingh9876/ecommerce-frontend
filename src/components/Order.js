import axios from 'axios';
import React, { useState } from 'react';

function Order() {
  const [productId, setProductId] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [quantity, setQuantity] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:3000/api/order/place',
        {
          product_id: productId,
          total_amount: totalAmount,
          Quantity: quantity,
        },
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include token in headers
          },
        }
      );
      setSuccessMessage(response.data.message);
      setErrorMessage('');
      setProductId('');
      setTotalAmount('');
      setQuantity('');
    } catch (err) {
      setErrorMessage(err.response ? err.response.data.message : 'Error placing order');
      setSuccessMessage('');
    }
  };

  return (
    <div className="container">
      <h2>Place an Order</h2>
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <form onSubmit={handlePlaceOrder}>
        <div className="mb-3">
          <label htmlFor="productId" className="form-label">
            Product ID
          </label>
          <input
            type="text"
            id="productId"
            className="form-control"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="totalAmount" className="form-label">
            Total Amount
          </label>
          <input
            type="number"
            id="totalAmount"
            className="form-control"
            value={totalAmount}
            onChange={(e) => setTotalAmount(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="quantity" className="form-label">
            Quantity
          </label>
          <input
            type="number"
            id="quantity"
            className="form-control"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Place Order
        </button>
      </form>
    </div>
  );
}

export default Order;
