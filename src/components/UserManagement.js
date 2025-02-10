import React, { useState, useEffect } from 'react';
import { registerUser,  } from '../services/api';
import 'bootstrap/dist/css/bootstrap.min.css';

function UserManagement({ token }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mobile, setMobile] = useState('');
    const [address, setAddress] = useState('');
    const [pincode, setPincode] = useState('');
   // const [users, setUsers] = useState([]);
    const [showRegisterForm, setShowRegisterForm] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await registerUser({ username, email, password, mobile, address, pincode});
            alert('User registered successfully!');
           // fetchUserList();
            resetForm();
        } catch (error) {
            console.error('Error registering user:', error);
            alert('Registration failed!');
        }
    };

    // const fetchUserList = async () => {
    //     try {
    //         const response = await fetchUsers(token);
    //         setUsers(response.data);
    //     } catch (error) {
    //         console.error('Error fetching users:', error);
    //     }
    // };

    const resetForm = () => {
        setUsername('');
        setEmail('');
        setPassword('');
        setMobile('');
        setAddress('');
        setPincode('');
        
        setShowRegisterForm(false);
    };

    // useEffect(() => {
    //     fetchUserList();
    // }, [token]);

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
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                            required
                            className="form-control mb-2"
                        />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            required
                            className="form-control mb-2"
                        />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                            className="form-control mb-2"
                        />
                         <input
                            type="mobile"
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                            placeholder="mobile"
                            required
                            className="form-control mb-2"
                        />
                         <input
                            type="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="address"
                            required
                            className="form-control mb-2"
                        />
                         <input
                            type="pincode"
                            value={pincode}
                            onChange={(e) => setPincode(e.target.value)}
                            placeholder="pincode"
                            required
                            className="form-control mb-2"
                        />
                        <button type="submit" className="btn btn-success">Register</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default UserManagement;
