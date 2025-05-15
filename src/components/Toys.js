import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
function Toys() {
  const [toys, setToys] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/Toys')
      .then(response => response.json())
      .then(data => setToys(data))
      .catch(error => console.error('Error fetching toys data:', error));
  }, []);

  return (
    <div>
      <h2>Toys</h2>
      <div className="row">
        {toys.map(toys => (
          <div className="col-md-4" key={toys.product_id}>
            <Link to = {`/Toys/${toys.product_id}`} className="text-decoration-none">
            <div className="card mb-4" style={{ margin: '15px' }}>
              <img src={toys.image_url} className="card-img-top" alt={toys.name} />
              <div className="card-body">
                <h5 className="card-title">{toys.name}</h5>
                <p className="card-text">{toys.description}</p>
                <p className="card-text" style={{color:'Red'}}>Price: ${toys.price}</p>
                <p className="card-text">Stock: {toys.stock}</p>
              </div>
            </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Toys;
