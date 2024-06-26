import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Client-side validation
        if (!credentials.email || !credentials.password) {
            setError("Please enter both email and password.");
            return;
        }
        
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        
        const json = await response.json();
        if (response.ok) {
            localStorage.setItem('token', json.authtoken);
            console.log("Stored Token:", json.authtoken);
            props.showAlert("Successfully Login", "success");
            navigate("/");
        } else {
            props.showAlert("Invalid Details", "danger");
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="w-40">
                        <form onSubmit={handleSubmit}>
                            <h1 className="mb-4">Login Page</h1>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    value={credentials.email}
                                    onChange={onChange}
                                    id="email"
                                    name="email"
                                    aria-describedby="emailHelp"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    id="password"
                                    value={credentials.password}
                                    onChange={onChange}
                                    required
                                />
                            </div>
                            {error && <div className="alert alert-danger" role="alert">{error}</div>}
                            <button
                                type="submit"
                                className="btn btn-primary"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;