import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
 import './SearchResult.css';

const SearchResult = () => {
    const [products, setProducts] = useState([]);
    const location = useLocation();

    useEffect(() => {
        const query = new URLSearchParams(location.search).get('q');
        if (query) {
            fetch(`http://localhost:3000/api/search?q=${query}`)
                .then(response => response.json())
                .then(data => setProducts(data))
                .catch(err => console.error('Error fetching products:', err));
        }
    }, [location.search]);

    return (
        <div>
            <div className="row">
                {products.length > 0 ? (
                    products.map(product => (
                        <div className="col-md-4" key={product.product_id}>
                            <div className="card mb-4">
                                <img src={product.image_url} className="card-img-top" alt={product.name} />
                                <div className="card-body">
                                    <h5 className="card-title">{product.name}</h5>
                                    <p className="card-text">{product.description}</p>
                                    <p className="card-text"><strong>Price: ${product.price}</strong></p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <h1>Sorry, no Result found!</h1>
                )}
            </div>
        </div>
    );
};

export default SearchResult;
