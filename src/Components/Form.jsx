import axios from 'axios'
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Form = () => {
  const [getList, setGetList] = useState([])
  const [serviceTypeOptions] = useState(["Meraige Hall", "Food", "Photography"]);
  const [staffOptions] = useState(["Male", "Female"]);
  const cityOptions = ["Lahore", "Islamabad", "Karachi"];

  const [data, setData] = useState({
    name: "",
    address: "",
    phone: "",
    city: "",
    serviceType: "Meraige Hall",
    price: "",
    description: "",
    parkingSpace: "",
    sittingCapacity: "",
    staff: "",
    foodItems: [],
  });
  const [updateData, setUpdaTEData] = useState({
    id: "",
    name: "",
    address: "",
    city: "",
    phone: "",
    serviceType: "",
    price: "",
    description: "",
    parkingSpace: "",
    sittingCapacity: "",
    staff: ""
  });

  const Datasubmit = () => {
    axios.post("http://localhost:3001/posts", data)
      .then((res) => {
        console.log(res)
        toast.success("Task Submited Successfully")
        ShowList()
        setData(
          {
            name: "",
            address: "",
            city: "",
            phone: "",
            serviceType: "",
            price: "",
            description: "",
            parkingSpace: "",
            sittingCapacity: "",
            staff: "",
          }
        )
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const ShowList = () => {
    axios.get("http://localhost:3001/posts")
      .then((res) => {
        console.log(res)
        localStorage.setItem("New", JSON.stringify(res.data))
        if (res.data == "" || res.data == null) {
          toast("No Task is in To Do List ")
          setGetList(res.data)
        }
        else {
          setGetList(res.data)
        }

      })
      .catch((err) => {
        console.log(err, "error")
      })
  }
  const deleteItems = (id) => {
    axios.delete(`http://localhost:3001/posts/${id}`)
      .then(resp => {
        console.log(resp)
        toast("Task Delete")
        ShowList()
      })
      .catch(error => {
        console.log(error, "error")
      })

  }
  const updateitem = () => {
    axios.put(`http://localhost:3001/posts/${updateData.id}`, updateData)
      .then((resp) => {
        console.log(resp);
        toast("Data Update Successfully");
        ShowList();
      })
      .catch((error) => {
        console.log(error, "error");
      });
  };

  useEffect(() => {
    ShowList()
  }, [])


  // handle service type
  const handleServiceTypeChange = (e) => {
    const selectedServiceType = e.target.value;
    setData((prevData) => ({
      ...prevData,
      serviceType: selectedServiceType,
      parkingSpace: selectedServiceType === "Meraige Hall" ? "" : prevData.parkingSpace,
      sittingCapacity: selectedServiceType === "Meraige Hall" ? "" : prevData.sittingCapacity,
      foodItems: selectedServiceType === "Food" ? [] : prevData.foodItems
    }));
  };
  const handleFoodItemsChange = (e) => {
    setData((prevData) => ({
      ...prevData,
      foodItems: e.target.value.split("\n")
    }));
  };
  return (
    <>
      <div>
        <ToastContainer />
        <h3 className='Heading'>Admin Data</h3>
        <div className='Inputs-table '>
          <div className="col-lg-4 inputs">
            <label htmlFor="exampleInputEmail1" className="form-label">Name:</label>
            {/* <input className="form-control" onChange={(e) => setData({ ...data, name: e.target.value })} value={data.name} type="text" name="" id="exampleInputPassword1" /> */}
            <textarea
              value={data.name}
              className="form-control"
              id="exampleInputPassword1"
              onChange={(e) => setData({ ...data, name: e.target.value })}
            ></textarea>
          </div>
          <div className="col-lg-4 inputs">
            <label htmlFor="exampleInputPassword1" className="form-label">Address:</label>
            {/* <input className="form-control" value={data.address} onChange={(e) => setData({ ...data, address: e.target.value })} type="text" name="" id="" /> */}
            <textarea
              value={data.address}
              className="form-control"
              id="exampleInputPassword1"
              onChange={(e) => setData({ ...data, address: e.target.value })}
              placeholder='Address '
            ></textarea>
          </div>
          <div className="col-lg-4 inputs">
            <label htmlFor="exampleInputCity" className="form-label">City:</label>
            <select
              id="exampleInputCity"
              className="form-control"
              value={data.city}
              onChange={(e) => setData({ ...data, city: e.target.value })}
            >
              {cityOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          <div className="col-lg-4 inputs">
            <label htmlFor="exampleInputPassword1" className="form-label">Phone</label>
            <input
              value={data.phone}
              className="form-control"
              id="exampleInputPassword1"
              onChange={(e) => setData({ ...data, phone: e.target.value })}
              placeholder='Phone Number'
            ></input>
          </div>
          <div className="col-lg-4 inputs">
            <label htmlFor="exampleInputPassword1" className="form-label">Service Type:</label>
            <select
              className="form-control"
              value={data.serviceType}
              onChange={handleServiceTypeChange}
            >
              {serviceTypeOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          {data.serviceType === "Food" && (
            <div className="col-lg-4 inputs">
              <label htmlFor="foodItemsInput" className="form-label">Food Items:</label>
              <input value={data.foodItems.join("\n")}
                className="form-control"
                id="foodItemsInput"
                onChange={handleFoodItemsChange} type="text" />
            </div>
          )}
          <div className="col-lg-4 inputs">
            <label htmlFor="exampleInputPassword1" className="form-label">Price (Per-Head):</label>
            <input type="number"
              value={data.price}
              className="form-control"
              id="exampleInputPassword1"
              onChange={(e) => setData({ ...data, price: e.target.value })}
            />
          </div>
          <div className="col-lg-4 inputs">
            <label htmlFor="exampleInputPassword1" className="form-label">Description:</label>
            <textarea
              value={data.description}
              className="form-control"
              id="exampleInputPassword1"
              onChange={(e) => setData({ ...data, description: e.target.value })}
            />
          </div>
          {data.serviceType === "Meraige Hall" && (
            <div className="col-lg-4 inputs">
              <label htmlFor="exampleInputPassword1" className="form-label">Parking Space:</label>
              <input type='number'
                value={data.parkingSpace}
                className="form-control"
                id="exampleInputPassword1"
                onChange={(e) => setData({ ...data, parkingSpace: e.target.value })}
              />
            </div>
          )}
          {data.serviceType === "Meraige Hall" && (
            <div className="col-lg-4 inputs">
              <label htmlFor="exampleInputPassword1" className="form-label"> Sitting Capacity:</label>
              <input type='number'
                value={data.sittingCapacity}
                className="form-control"
                id="exampleInputPassword1"
                onChange={(e) => setData({ ...data, sittingCapacity: e.target.value })}
              />
            </div>
          )}
          <div className="col-lg-4 inputs">
            <label htmlFor="exampleInputPassword1" className="form-label">Staff:</label>
            <select
              className="form-control"
              value={data.staff}
              onChange={(e) => setData({ ...data, staff: e.target.value })}
            >
              {staffOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          <div style={{ textAlign: "center" }}>
            <button className='SubmitBtn mt-3' onClick={Datasubmit}>Submit</button>
          </div>
        </div>
        <div>
          <div className="table-container">
            <div style={{ textAlign: "center" }}>
              <h4> List of Data</h4>
            </div>
            <table>
              <thead>
                <tr >
                  <th>Name</th>
                  <th>Address</th>
                  <th>City</th>
                  <th>Phone</th>
                  <th>Serive</th>
                  <th>Price</th>
                  <th>Parking space</th>
                  <th>Staff</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  getList.map((items, index) => {
                    return (
                      <tr key={index}>
                        <td> {items.name}</td>
                        <td>{items.address}</td>
                        <td>{items.city}</td>
                        <td>{items.phone}</td>
                        <td>{items.serviceType}</td>
                        <td>{items.price}</td>
                        <td>{items.parkingSpace}</td>
                        <td>{items.staff}</td>
                        <td style={{ textAlign: "center" }}> <button className='Deletebtn' onClick={() => deleteItems(items.id)}><i className="fa fa-trash" aria-hidden="true"></i> delete
                        </button>  <button className='Editbtn' data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                          onClick={() => setUpdaTEData({
                            name: items.name,
                            address: items.address,
                            city: items.city,
                            id: items.id,
                            serviceType: items.serviceType,
                            phone: items.phone,
                            staff: items.staff,
                            price: items.price,
                            parkingSpace: items.parkingSpace,
                            foodItems: items.foodItems
                          })}
                        >
                            Update </button> </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
        {/* Modal */}
        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">Update User</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
              </div>
              <div className="modal-body">
                <div className="col-lg-12">
                  <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                  <input type="text" value={updateData.name} onChange={(e) => setUpdaTEData({ ...updateData, name: e.target.value })} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div className="col-lg-12 inputs">
                  <label htmlFor="exampleInputPassword1" className="form-label">Address:</label>
                  <textarea
                    value={updateData.address}
                    className="form-control"
                    id="exampleInputPassword1"
                    onChange={(e) => setUpdaTEData({ ...updateData, address: e.target.value })}
                  ></textarea>
                </div>
                <div className="col-lg-12 inputs">
                  <label htmlFor="exampleInputCity" className="form-label">City:</label>
                  <select
                    id="exampleInputCity"
                    className="form-control"
                    value={data.city}
                    onChange={(e) => setUpdaTEData({ ...updateData, city: e.target.value })}
                  >
                    {cityOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
                <div className="col-lg-12">
                  <label htmlFor="exampleInputEmail1" className="form-label">Phone</label>
                  <input type="text" value={updateData.phone} onChange={(e) => setUpdaTEData({ ...updateData, phone: e.target.value })} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Phone Number' />
                </div>
                <div className="col-lg-12 inputs">
                  <label htmlFor="staffInput" className="form-label">Service Type:</label>
                  <select
                    id="staffInput1"
                    className="form-control"
                    value={updateData.staff}
                    onChange={(e) => setUpdaTEData({ ...updateData, serviceType: e.target.value })}
                  >
                    {serviceTypeOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
                <div className="col-lg-12 inputs">
                  <label htmlFor="exampleInputPrice" className="form-label">Price:</label>
                  <input type="number" value={updateData.price} onChange={(e) => setUpdaTEData({ ...updateData, price: e.target.value })} className="form-control" id="exampleInputPrice" required placeholder="Enter price" />
                </div>
                <div className="col-lg-12 inputs">
                  <label htmlFor="exampleInputPrice" className="form-label">Parking Space:</label>
                  <input type="number" value={updateData.parkingSpace} onChange={(e) => setUpdaTEData({ ...updateData, parkingSpace: e.target.value })} className="form-control" id="exampleInputPrice" required placeholder="Parking space" />
                </div>
                <div className="col-lg-12 inputs">
                  <label htmlFor="exampleInputDescription" className="form-label">Description:</label>
                  <input type="text" value={updateData.description} onChange={(e) => setUpdaTEData({ ...updateData, description: e.target.value })} className="form-control" id="exampleInputDescription" required placeholder="Description" />
                </div>
                <div className="col-lg-12 inputs">
                  <label htmlFor="staffInput2" className="form-label">Staff:</label>
                  <select
                    id="staffInput2"
                    className="form-control"
                    value={updateData.staff}
                    onChange={(e) => setUpdaTEData({ ...updateData, staff: e.target.value })}
                  >
                    <option value="">Select Staff</option>
                    {staffOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="SubmitBtn btn btn-secondary addBtn" data-bs-dismiss="modal">Close</button>
                <button type="button" className=" SubmitBtn btn btn-primary addBtn" data-bs-dismiss="modal" onClick={() => updateitem()}>Save Changes</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default Form