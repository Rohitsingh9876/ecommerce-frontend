import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Mobile() {
  const [mobiles, setMobiles] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/mobiles')
      .then(response => response.json())
      .then(data => setMobiles(data))
      .catch(error => console.error('Error fetching mobile data:', error));
  }, []);

  return (
    <div>
      <h2>Phones</h2>
      <div className="row">
        {mobiles.map(mobile => (
          <div className="col-md-4" key={mobile.product_id}>
            <Link to = {`/mobiles/${mobile.product_id}`} className="text-decoration-none">
             <div className="card mb-4" style={{ margin: '15px' }}>
              <img src={mobile.image_url} className="card-img-top" alt={mobile.name} />
              <div className="card-body">
                <h5 className="card-title">{mobile.name}</h5>
                <p className="card-text">{mobile.description}</p>
                <p className="card-text" style={{color:'Red'}}>Price: ${mobile.price}</p>
                <p className="card-text">Stock: {mobile.stock}</p>
              </div>
            </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Mobile;
