import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Signup() {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", geolocation: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: credentials.name,
      email: credentials.email,
      password: credentials.password,
      location: credentials.geolocation
    };

    console.log("Payload to be sent:", payload);

    try {
      const response = await fetch("http://localhost:5000/api/createuser", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const json = await response.json();
      console.log("Response from server:", json);

      if (!json.success) {
        alert("Enter valid credentials");
      } else {
        console.log("User created successfully:", json);
        // Optionally, you could redirect the user to the login page
      }
    } catch (error) {
      console.error('Error during signup:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={credentials.name}
                onChange={onChange}
                id="name"
                placeholder="Enter your name"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={credentials.email}
                onChange={onChange}
                id="email"
                aria-describedby="emailHelp"
                placeholder="Enter email"
              />
              <small id="emailHelp" className="form-text text-muted">
                We'll never share your email with anyone else.
              </small>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={credentials.password}
                onChange={onChange}
                id="password"
                placeholder="Password"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="geolocation" className="form-label">
                Address
              </label>
              <input
                type="text"
                className="form-control"
                name="geolocation"
                value={credentials.geolocation}
                onChange={onChange}
                id="geolocation"
                placeholder="Enter your address"
              />
            </div>
            <div className="mb-4">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
            <div>
              <Link to="/login" className="btn btn-outline-danger mt-2">
                Already a user
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
