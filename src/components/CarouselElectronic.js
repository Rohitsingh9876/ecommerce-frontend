import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Elect.css';

function CarouselElectronic() {
  const [items, setItems] = useState([]);
  const [currentGroup, setCurrentGroup] = useState(0); 

  useEffect(() => {
    fetch('http://localhost:3000/api/Electronic') 
      .then(response => response.json())
      .then(data => setItems(data))
      .catch(error => console.error('Error fetching electronics data:', error));
  }, []);

  const chunkArray = (array, size) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };

  const groupedItems = chunkArray(items, 4); 

  const handleNext = () => {
    if (currentGroup < groupedItems.length - 1) {
      setCurrentGroup(currentGroup + 1);
    }
  };

  const handlePrev = () => {
    if (currentGroup > 0) {
      setCurrentGroup(currentGroup - 1);
    }
  };

  return (
    <div className="container my-4" style={{backgroundColor: '#f0f0f0',height: 'auto',padding:'10px'}}>
      <h2> Premium Electronic Products </h2>
      <div id="carouselExample" className="carousel slide" data-bs-ride="false">
        <div className="carousel-inner">
          {groupedItems.map((group, index) => (
            <div className={`carousel-item ${index === currentGroup ? 'active' : ''}`} key={index}>
              <div className="row">
                {group.map(item => (
                  <div className="col-3" key={item.product_id}>
                    {/* Link to navigate to the product detail page */}
                    <Link to={`/electronics/${item.product_id}`} className="text-decoration-none">
                      <div className="card card-outline" style={{ height: 'auto',width:'auto'}}>
                        <img
                          src={item.image_url}
                          className="card-img-top"
                          alt={item.name}
                        />
                        <div className="card-body">
                          <h5 className="card-title">{item.name}</h5>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div> 
        {/* Carousel navigation buttons */}
        <button 
          className="carousel-control-prev" 
          type="button" 
          onClick={handlePrev} 
          disabled={currentGroup === 0} 
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button 
          className="carousel-control-next" 
          type="button" 
          onClick={handleNext} 
          disabled={currentGroup === groupedItems.length - 1}
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden" >Next</span>
        </button>
      </div>
    </div>
  );
}

export default CarouselElectronic;
