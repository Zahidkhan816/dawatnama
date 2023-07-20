import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const [getData, setGetData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const ShowList = () => {
    axios
      .get('http://localhost:3001/posts')
      .then((res) => {
        localStorage.setItem('New', JSON.stringify(res.data));
        if (res.data === '' || res.data === null) {
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

  const handleModalOpen = (item) => {
    setSelectedItem(item);
  };

  const handleModalClose = () => {
    setSelectedItem(null);
  };

  return (
    <>
      <ToastContainer />
      <div className="card-container">
        {getData.map((item, index) => (
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
              <p>Price: {item.price}Pkr</p>
              <p className="card-text">
                Description:
                {expandedItems.includes(index)
                  ? item.description
                  : truncateText(item.description, 15)}
                {item.description &&
                  item.description.split(' ').length > 15 && (
                    <button onClick={() => handleLearnMore(index)} className="learn-more-button">
                      {expandedItems.includes(index) ? 'Show Less' : 'Learn More'}
                    </button>
                  )}
              </p>
              <p className="card-text">Phone: {item.phone}</p>
              <p className="card-text">ParkingSpace: {item.parkingSpace}</p>
              <p className="card-text">Staff: {item.staff}</p>
              <p className="card-text">
                Address:
                {expandedItems.includes(index)
                  ? item.address
                  : truncateText(item.address, 15)}
                {item.address && item.address.split(' ').length > 15 && (
                  <button onClick={() => handleLearnMore(index)} className="learn-more-button">
                    {expandedItems.includes(index) ? 'Show Less' : 'Learn More'}
                  </button>
                )}
              </p>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={() => handleModalOpen(item)}
              >
                Launch demo modal
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedItem && (
        <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Modal title
                </h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleModalClose} />
              </div>
              <div className="modal-body">
                <div>
                  <h2>{selectedItem.name}</h2>
                  <p>Service: {selectedItem.serviceType}</p>
                  <p>Price: {selectedItem.price}Pkr</p>
                  <p>Description: {selectedItem.description}</p>
                  <p>Phone: {selectedItem.phone}</p>
                  <p>ParkingSpace: {selectedItem.parkingSpace}</p>
                  <p>Staff: {selectedItem.staff}</p>
                  <p>Address: {selectedItem.address}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
