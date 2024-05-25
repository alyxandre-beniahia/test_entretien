import React, { useState } from 'react';
import { useNavigate } from'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const res = await axios.post('http://localhost:5000/api/login', formData);
      const {token} = res.data;
  
      if (token) {
        alert('Login successful');
        localStorage.setItem('token', token);
        navigate('/profile');
      } else {
        alert('Login failed');
      }
    } catch (error) {
      alert('Login failed');
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h4>Connexion</h4>
            </div>
            <div className="card-body text-center">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Courriel</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Mot de passe</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block m-4 ">
                  Se connecter
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
