import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Login from './Login';
import UserManagement from './UserManagement';
import './Navbar.css';

function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [showSignupForm, setShowSignupForm] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
            setUsername(localStorage.getItem('username'));
        }
    }, []);

    const handleLoginSuccess = (username) => {
        setIsLoggedIn(true);
        setUsername(username);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        setIsLoggedIn(false);
        setUsername('');
        navigate('/');
    };

    const toggleLoginForm = () => {
        setShowLoginForm(prev => !prev);
        setShowSignupForm(false); // Close Signup form when Login form is toggled
    };

    const toggleSignupForm = () => {
        setShowSignupForm(prev => !prev);
        setShowLoginForm(false); // Close Login form when Signup form is toggled
    };

    return (
        <nav className="navbar navbar-expand-lg" style={{ backgroundColor: 'orange' }}>
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                    Shopseller <br />
                    <span style={{ color: 'blue', fontSize: '0.8em' }}>Explore Plus</span>
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/mobiles">Mobile</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/laptop">Laptop</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/toys">Toys</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/sport">Sports</Link>
                        </li>
                    </ul>
                    <form className="d-flex me-3" onSubmit={(e) => {
                        e.preventDefault();
                        const query = e.target.elements.search.value;
                        if (query) {
                            window.location.href = `/search?q=${query}`;
                        }
                    }}>
                        <input className="form-control me-2" type="search" name="search" placeholder="Search for product, Brands" style={{ width: '600px', height: '40px', fontSize: '20px', maxWidth: '100%' }} aria-label="Search" />
                    </form>
                    <ul className="navbar-nav ms-auto">
                        {isLoggedIn ? (
                            <li className="nav-item dropdown">
                                <span className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ fontSize: '24px', fontWeight: 'bold' }}>
                                    {username || 'Account'}
                                </span>
                                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                    <li><Link className="dropdown-item" to="/account">Orders</Link></li>
                                    <li><Link className="dropdown-item" to="/UserDetails">My Profile</Link></li>
                                    <li><Link className="dropdown-item" to="/coupons">Coupons</Link></li>
                                    <li><Link className="dropdown-item" to="/cart">Cart</Link></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
                                </ul>
                            </li>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <button className="nav-link dropdown-toggle" onClick={toggleSignupForm} style={{ cursor: 'pointer', fontSize: '20px' }}>
                                        Sign Up
                                    </button>
                                    <div className={`dropdown-menu dropdown-menu-end ${showSignupForm ? 'show' : ''}`} aria-labelledby="navbarDropdown">
                                        <div className="dropdown-item p-3">
                                            <UserManagement />
                                        </div>
                                    </div>
                                </li>
                                <li className="nav-item">
                                    <button className="nav-link dropdown-toggle" onClick={toggleLoginForm} style={{ cursor: 'pointer', fontSize: '20px' }}>
                                        Login
                                    </button>
                                    <div className={`dropdown-menu dropdown-menu-end ${showLoginForm ? 'show' : ''}`} aria-labelledby="navbarDropdown">
                                        <div className="dropdown-item p-3">
                                            <Login onLoginSuccess={handleLoginSuccess} />
                                        </div>
                                    </div>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
