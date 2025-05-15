import axios from 'axios';
import React, { useState } from 'react';
  function Login({ onLoginSuccess }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showLoginForm, setShowLoginForm] = useState(false);

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/users/login', {
                username,
                password,
            });
            console.log('Login successful:', response.data);

            // Save the token in localStorage
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('username', response.data.username);

            // Notify the parent component
            onLoginSuccess(response.data.username);

            // Reset form state and close login form
            setUsername('');
            setPassword('');
            setShowLoginForm(false);

            alert('Login successful!');
        } catch (error) {
            console.error('Error logging in:', error.response?.data || error.message);
            alert('Login failed: ' + (error.response?.data?.message || error.message));
        }
    };

    const toggleLoginForm = () => {
        setShowLoginForm((prev) => !prev);
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-end mb-3">
                <button className="btn btn-primary" onClick={toggleLoginForm}>
                    {showLoginForm ? 'Close Login' : 'Login'}
                </button>
            </div>
            {showLoginForm && (
                <div>
                    <h1>Login</h1>
                    <form onSubmit={handleLogin}>
                        <div className="form-group mb-1">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter username"
                                required
                                className="form-control"
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter password"
                                required
                                className="form-control"
                            />
                        </div>
                        <button type="submit" className="btn btn-success">Login</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default Login;
