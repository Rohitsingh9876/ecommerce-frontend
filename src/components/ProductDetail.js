import axios from 'axios';
import { jwtDecode as jwt_decode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]); 
    const [quantity, setQuantity] = useState(1);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/getproduct/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setProduct(response.data);
                console.log('Product fetched:', response.data); 

                const relatedResponse = await axios.get(`http://localhost:3000/api/getrelatedproducts/${response.data.Productname}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setRelatedProducts(relatedResponse.data);
                console.log('Related products fetched:', relatedResponse.data); 
            } catch (err) {
                setError(err.response ? err.response.data.message : 'Error fetching product details');
            }
        };

        fetchProduct();
    }, [id]);

    const handleQuantityChange = (type) => {
        setQuantity(prev => {
            const newQuantity = type === 'increment' ? prev + 1 : Math.max(prev - 1, 1);
            return newQuantity;
        });
    };

    const orderProduct = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const decodedToken = jwt_decode(token);
                const user_id = decodedToken.user_id;     
                const orderData = {
                    user_id,
                    product_id: product.product_id,
                    total_amount: product.price * quantity,
                    Quantity: quantity
                };

                const response = await axios.post('http://localhost:3000/api/order/place', orderData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                alert(`Order placed successfully! Order ID: ${response.data.orderId}`);
            } else {
                alert('User not logged in');
            }
        } catch (error) {
            alert('Error placing order: ' + error.message);
        }
    };

    const handleAddToCart = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('You must be logged in to add products to the cart');
                return;
            }

            const decodedToken = jwt_decode(token);
            const user_id = decodedToken.user_id;

            const cartData = {
                product_id: product.product_id,
            };

            const response = await axios.post('http://localhost:3000/api/users/addcart', cartData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            alert(response.data.message);
        } catch (error) {
            alert('Error adding to cart: ' + error.message);
        }
    };

    if (error) {
        return <div className="alert alert-danger">Error: {error}</div>;
    }

    if (!product) return <div>Loading...</div>;

    const totalPrice = (product.price * quantity).toFixed(2);

    return (
        <div className="container mt-2">
            <h1 className="text-center">{product.name}</h1>
            <div className="row">
                <div className="col-md-6">
                    {product.image_url && (
                        <img src={product.image_url} className="img-fluid" alt={product.name} />
                    )}
                </div>
                <div className="col-md-6">
                    <p>{product.description}</p>
                    <p style={{ color: 'Red' }}><strong>Price (per unit): ₹ {product.price}</strong></p>
                    <p><strong>Total Price: ₹ {totalPrice}</strong></p>
                    <p>Stock: {product.stock}</p>
                    {/* Quantity Selector */}
                    <div className="quantity-selector d-flex align-items-center mb-3">
                        <h3> Quantity : </h3> 
                        <button
                            className="btn btn-light border"
                            onClick={() => handleQuantityChange('decrement')}
                            disabled={quantity === 1}
                        >
                            -
                        </button>
                        <span className="mx-3">{quantity}</span>
                        <button
                            className="btn btn-light border"
                            onClick={() => handleQuantityChange('increment')}
                        >
                            +
                        </button>
                    </div>
                    <button onClick={orderProduct} className="btn btn-primary" style={{ marginRight: '40px', fontSize: '20px' }}>BUY NOW</button>
                    <button onClick={handleAddToCart} className="btn btn-secondary" style={{ backgroundColor: "orange" }}>ADD TO CART</button>
                </div>
            </div>

            {/* Section for related products */}
            <h2 className="mt-4">Similar Products</h2>
            <div className="row">
                {relatedProducts.length > 0 ? (
                    relatedProducts.map(relatedProduct => (
                        <div className="col-md-4 mb-4" key={relatedProduct.product_id}>
                            <Link to={`/getproducts/${relatedProduct.product_id}`} className="text-decoration-none">
                                <div className="card">
                                    {relatedProduct.image_url && (
                                        <img src={relatedProduct.image_url} className="card-img-top" alt={relatedProduct.name} />
                                    )}
                                    <div className="card-body">   
                                        <h5>{relatedProduct.name}</h5>
                                        <p>{relatedProduct.description}</p>
                                        <p className="card-text" style={{ color: 'Red' }}>
                                            <strong>Price: ₹ {relatedProduct.price}</strong>
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))
                ) : (
                    <p>No similar products found.</p>
                )}
            </div>
        </div>
    );
};

export default ProductDetail;
