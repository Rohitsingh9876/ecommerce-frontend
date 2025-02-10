import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Laptop() {
  const [laptops, setLaptops] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/laptop')
      .then(response => response.json())
      .then(data => setLaptops(data))
      .catch(error => console.error('Error fetching laptop data:', error));
  }, []);

  return (
    <div>
         <h2>Laptops</h2>
      <div className="row">
        {laptops.map(laptop => (
          <div className="col-md-4" key={laptop.product_id}>
           <Link to = {`/laptops/${laptop.product_id}`} className="text-decoration-none">
           <div className="card mb-4" style={{ margin: '15px' }}>
              <img src={laptop.image_url} className="card-img-top" alt={laptop.name} />
              <div className="card-body">
                <h5 className="card-title">{laptop.name}</h5>
                <p className="card-text">{laptop.description}</p>
                <p className="card-text">Price: ${laptop.price}</p>
                <p className="card-text">Stock: {laptop.stock}</p>
              </div>
            </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Laptop;
