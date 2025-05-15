import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer style={footerStyle}>
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <h5>About Us</h5>
                        <p>
                            The Shopseller Group is one of India's leading digital commerce
                        </p>
                        <Link to="/about">
                            <button className="btn btn-primary">About Us</button>
                        </Link>
                    </div>
                    <div className="col-md-4">
                        <h5>Contact Us</h5>
                        <p>Email: sopsheller@.com</p>
                        <p>Phone: +223 055 2580</p>
                    </div>
                    <div className="col-md-4">
                        <h5>Follow Us On  </h5>
                        <p>
                            <a href="#" target="_blank">Facebook</a> | <a href="#" target="_blank">Twitter</a> | <a href="#" target="_blank">Instagram</a>
                        </p>
                    </div>
                </div>
                <div className="text-center" style={{ marginTop: '20px' }}>
                    &copy; {new Date().getFullYear()} Shopseller Privated Limited Building Z Tower <br />
                    Banglore 898898, Karatnak, India
                </div>
            </div>
        </footer>
    );
};

const footerStyle = {
    backgroundColor: '#333',
    color: '#fff',
    padding: '20px 0',
    position: 'relative',
    bottom: '0',
    width: '100%',
    marginTop: 'auto',
};

export default Footer;
