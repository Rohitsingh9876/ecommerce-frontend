import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
import Account from './components/Account';
import Cart from './components/Bottel';
import CarouselElectronic from './components/CarouselElectronic';
import Footer from './components/Footer';
import Laptop from './components/Laptop';
import Mobile from './components/Mobile';
import Navbar from './components/Navbar';
import ProductDetail from './components/ProductDetail';
import ProductList from './components/ProductList';
import SearchResult from './components/SearchResult';
import Toys from './components/Toys';
import UserDetails from './components/UserDetails';
import About from './components/About';

function ConditionalCarousel() {
    const location = useLocation();
    if (location.pathname === '/') {
        return <CarouselElectronic />;
    }
    return null; 
}

function App() {
    const [token, setToken] = useState(null);
    
    return (  
        <Router>
             
             <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'lightblue' }}>
                <Navbar />
                <h1 className="text-center" style={{color: 'yellow'}}>Welcome to Shopseller </h1>
                {/* Top banner image */}
                {/* <img
                    src="https://rukminim2.flixcart.com/fk-p-flap/1000/1000/image/21378f37d3811509.jpg?q=50" 
                    alt="Error"
                    style={{ width: '100%', height: 'auto', margin: '10px auto'}} 
                />   */}
                <ConditionalCarousel />
                <div className="container"  style={{ flex: '1' }}>
                    <Routes>
                        {/* Dynamic product details route */}
                        <Route path="/getproducts/:id" element={<ProductDetail />} /> 
                        <Route path="/electronics/:id" element={<ProductDetail />} /> 
                        <Route path="/laptops/:id" element={<ProductDetail />} /> 
                        <Route path="/mobiles/:id" element={<ProductDetail />} /> 
                        <Route path="/toys/:id" element={<ProductDetail />} /> 
                       
                        {/* Other routes for home page */}
                        <Route path="/" element={<ProductList />} /> 
                        <Route path="/mobiles" element={<Mobile />} />
                        <Route path="/laptop" element={<Laptop />} />
                        <Route path="/toys" element={<Toys />} />
                        <Route path="/search" element={<SearchResult />} />
                        <Route path="/account" element={<Account />} />
                        <Route path="/userdetails" element={<UserDetails />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/about" element={<About />} /> 

                    </Routes>
                </div>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
