import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CompareServices = () => {
  const [city, setCity] = useState('Lahore');
  const [cityData, setCityData] = useState([]);

  const fetchCityData = () => {
    axios
      .get(`http://localhost:3001/posts?city=${city}`)
      .then((res) => {
        setCityData(res.data);
      })
      .catch((err) => {
        console.log(err, 'error');
      });
  };

  useEffect(() => {
    fetchCityData();
  }, [city]);

  return (
    <div>
      <div className="city-button-container">
        <h2>Services Cities</h2>
      </div>
      <div className="city-button-container">
        <button className={`city-button ${city === 'Lahore' ? 'active' : ''}`} onClick={() => setCity('Lahore')}>
          Lahore
        </button>
        <button className={`city-button ${city === 'Islamabad' ? 'active' : ''}`} onClick={() => setCity('Islamabad')}>
          Islamabad
        </button>
        <button className={`city-button ${city === 'Karachi' ? 'active' : ''}`} onClick={() => setCity('Karachi')}>
          Karachi
        </button>
      </div>
      <div className="card-container">
        {cityData.map((item, index) => (
          <div key={index} className="card" style={{ width: '18rem' }}>
            <img
              style={{ width: '14rem', height: '7rem', borderRadius: '0.5rem' }}
              src={item.image}
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h2 style={{ textDecoration: 'underline', color: '#008080' }} className="card-title">
                {item.name}
              </h2>
              <h5 className="card-title">Service: {item.serviceType}</h5>
              <p className="card-text">City: {item.city}</p>
              <p>Price: {item.price}Pkr</p>
              <p className="card-text">Phone: {item.phone}</p>
              <p className="card-text">ParkingSpace: {item.parkingSpace}</p>
              <p className="card-text">Staff: {item.staff}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompareServices;
