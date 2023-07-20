import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Photography = () => {
  const [getData, setGetData] = useState([]);

  const ShowList = () => {
    axios
      .get('http://localhost:3001/posts')
      .then((res) => {
        localStorage.setItem('New', JSON.stringify(res.data));
        if (res.data.length === 0) {
          toast('No Task is in To Do List');
        }
        setGetData(res.data);
      })
      .catch((err) => {
        console.log(err, 'error');
      });
  };

  useEffect(() => {
    ShowList();
  }, []);

  const truncateText = (text, limit) => {
    if (!text) {
      return '';
    }
    const words = text.split(' ');
    if (words.length <= limit) {
      return text;
    }
    return words.slice(0, limit).join(' ') + '...';
  };

  const [expandedItems, setExpandedItems] = useState([]);

  const handleLearnMore = (index) => {
    if (expandedItems.includes(index)) {
      setExpandedItems((prevExpandedItems) =>
        prevExpandedItems.filter((item) => item !== index)
      );
    } else {
      setExpandedItems((prevExpandedItems) => [...prevExpandedItems, index]);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="card-container">
        {getData &&
          getData
            .filter((item) => item.serviceType === 'Photography')
            .map((item, index) => (
              <div key={index} className="card" style={{ width: '18rem' }}>
                <img src="..." className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <h6 className="card-title">Service: {item.serviceType}</h6>
                  <p>Price: {item.price}Pkr</p>
                  <p className="card-text">
                    {expandedItems.includes(index)
                      ? item.description
                      : truncateText(item.description, 15)}
                    {item.description &&
                      item.description.split(' ').length > 15 && (
                        <button
                          onClick={() => handleLearnMore(index)}
                          className="learn-more-button"
                        >
                          {expandedItems.includes(index) ? 'Show Less' : 'Learn More'}
                        </button>
                      )}
                  </p>
                  <p className="card-text">Phone:{item.phone}</p>
                  <p className="card-text">Staff: {item.staff}</p>
                  <p className="card-text">
                    Address:
                    {expandedItems.includes(index)
                      ? item.address
                      : truncateText(item.address, 15)}
                    {item.address && item.address.split(' ').length > 15 && (
                      <button
                        onClick={() => handleLearnMore(index)}
                        className="learn-more-button"
                      >
                        {expandedItems.includes(index) ? 'Show Less' : 'Learn More'}
                      </button>
                    )}
                  </p>
                </div>
              </div>
            ))}
      </div>
    </>
  );
};

export default Photography;
