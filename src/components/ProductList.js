import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Cards.css';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/getproduct', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setProducts(response.data);
            } catch (err) {
                setError(err.response ? err.response.data.message : 'Error fetching products');
            }
        };

        fetchProducts();
    }, []);

    if (error) {
        return <div className="alert alert-danger">Error: {error}</div>;
    }

    return (
        <div className="container mt-2" style={{backgroundColor:'white'}}>
            <h1 className="text-center">Best Products </h1>
            <div className="row">
                {products.map(product => (
                    <div className="col-md-4 mb-4" key={product.product_id}>
                        <Link to={`/getproducts/${product.product_id}`} className="text-decoration-none">
                            <div className="card">
                                {product.image_url && (
                                    <img src={product.image_url} className="card-img-top" alt={product.name} />
                                )}
                                <div className="card-body">
                                    <h5 className="card-title">{product.name}</h5>
                                    <p className="card-text">{product.description}</p>
                                    <p className="card-text" style={{ color: 'Red' }}>
                                        <strong>Price: ₹ {product.price}</strong>
                                    </p>
                                    <p className="card-text">Stock: {product.stock}</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
