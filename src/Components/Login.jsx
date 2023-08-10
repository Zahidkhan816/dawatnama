import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Login = ({ setLoggedIn }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        if (username === 'admin' && password === '12345') {
            setLoggedIn(true);
            navigate('/form');
        } else {
            toast("invalid User Id and Password")
        }
    };

    return (
        <div className="login-container">
            <ToastContainer />
            <h2>Login For Admin Data</h2>
            <div className="login-inputs">
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button className='btn-primary text-center' onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;
