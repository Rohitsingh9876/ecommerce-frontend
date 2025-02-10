import React, { useState } from 'react';
import axios from 'axios';

const AddProduct = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image_url, setImageUrl] = useState('');
    const [stock, setStock] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token'); 

        try {
            const response = await axios.post('http://localhost:3000/api/products', {
                name,
                description,
                price,
                image_url,
                stock,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`, 
                },
            });
            alert('Product added successfully!');
        } catch (error) {
            console.error('Error adding product:', error.response.data);
            alert('Failed to add product!');
        }
    };

    return (
        <div>
            <h1>Add Product</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Product Name"
                    required
                />
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Product Description"
                    required
                />
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Price"
                    required
                />
                <input
                    type="text"
                    value={image_url}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="Image URL"
                    required
                />
                <input
                    type="number"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    placeholder="Stock"
                    required
                />
                <button type="submit">Add Product</button>
            </form>
        </div>
    );
};

export default AddProduct;
