import React from 'react'
import { Link } from 'react-router-dom';
import logo from '../Images/logopng.png'
const Navbar = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light text-light ">
                <div className="container-fluid" >
                    <Link className="navbar-brand" to="home">
                        <img src={logo} alt="" style={{width:"3rem" , height:"3rem" , borderRadius:"10rem"}} />
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item" >
                                <Link className="nav-link active" to="home" aria-current="page" href="#">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="Compare" href="#">Cities</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navba  rDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    All services
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><Link className="dropdown-item" to="MeraigHall" href="#">Merrage Halls</Link></li>
                                    <li><Link className="dropdown-item" to="Food" href="#">Food</Link></li>
                                    <li><Link className="dropdown-item" to="Photography" href="#">Photoraphy </Link></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="form" href="#">Form</Link>
                            </li>
                        </ul>
                        <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>

        </>
    );
};

export default Navbar;
