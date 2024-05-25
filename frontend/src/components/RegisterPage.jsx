import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [passwordMatchError, setPasswordMatchError] = useState('');

  const { username, email, password, confirmPassword } = formData;

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };

    if (name === 'password' || name === 'confirmPassword') {
      const { password, confirmPassword } = updatedFormData;
      if (password !== confirmPassword) {
        setPasswordMatchError('Passwords do not match');
      } else {
        setPasswordMatchError('');
      }
    }

    setFormData(updatedFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordMatchError('Passwords do not match');
      return;
    }
    try {
      const res = await axios.post('http://localhost:5000/api/register', formData);
      console.log(res);

      if (res.data.token) {
        alert('Registration successful');
        navigate('/login');
      } else {
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error during registration:', error.response.data);
    }
  };

  return (
    <div className="container">
      <h1 className="mb-4">Register</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            value={username}
            onChange={handleChange}
            placeholder="Enter your username"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={password}
            onChange={handleChange}
            placeholder="Enter your password"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
          />
          {passwordMatchError && <div className="text-danger">{passwordMatchError}</div>}
        </div>
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;