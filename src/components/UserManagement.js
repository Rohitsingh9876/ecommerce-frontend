import React, { useState } from 'react';
import { registerUser } from '../services/api';
import 'bootstrap/dist/css/bootstrap.min.css';

function UserManagement() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mobile, setMobile] = useState('');
    const [address, setAddress] = useState('');
    const [pincode, setPincode] = useState('');
    const [errorMessage, setErrorMessage] = useState(""); // State for error messages
    const [showRegisterForm, setShowRegisterForm] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorMessage(""); // Clear previous errors

        try {
            await registerUser({ username, email, password, mobile, address, pincode });
            alert('User registered successfully!');
            resetForm();
        } catch (error) {
            console.error('Error registering user:', error);
            
            if (error.message) {
                setErrorMessage(error.message);
            } else {
                setErrorMessage("Registration failed! Please try again.");
            }
        }
    };

    const resetForm = () => {
        setUsername('');
        setEmail('');
        setPassword('');
        setMobile('');
        setAddress('');
        setPincode('');
        setShowRegisterForm(false);
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-end mb-3">
                <button className="btn btn-primary" onClick={() => setShowRegisterForm(true)}>
                    Sign Up
                </button>
            </div>

            {showRegisterForm && (
                <div className="mb-4">
                    <h1>User Registration</h1>
                    <form onSubmit={handleSubmit}>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required className="form-control mb-2" />
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required className="form-control mb-2" />
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required className="form-control mb-2" />
                        <input type="text" value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="Mobile" required className="form-control mb-2" />
                        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" required className="form-control mb-2" />
                        <input type="text" value={pincode} onChange={(e) => setPincode(e.target.value)} placeholder="Pincode" required className="form-control mb-2" />
                        
                        {/* Display Error Message */}
                        {errorMessage && <p className="alert alert-danger">{errorMessage}</p>}

                        <button type="submit" className="btn btn-success">Register</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default UserManagement;
