import React, { useState } from 'react';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    profile: {
      firstName: '',
      lastName: '',
      bio: '',
      location: ''
    }
  });
  
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      profile: {
        ...prevState.profile,
        [name]: value
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:5000/user/createUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create user');
      }
  
      const data = await response.json();
      setMessage('User registered successfully!'); // Mensaje de éxito
      setError(''); // Limpiar posibles mensajes de error
      console.log('User created successfully:', data);
    } catch (error) {
      setError(error.message); // Mensaje de error
      setMessage(''); // Limpiar mensaje de éxito
      console.error('Error:', error.message);
    }
  };
  
  const formStyle = {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '50px',
    border: '2px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '70vh',
    backgroundColor: '#ffffff'
  };

  const messageStyle = {
    padding: '10px',
    borderRadius: '5px',
    marginBottom: '15px',
    textAlign: 'center',
    fontWeight: 'bold'
  };

  return (
    <div style={containerStyle}>
      <div style={formStyle}>
        <h1>Register</h1>
        {message && <div style={{ ...messageStyle, backgroundColor: '#d4edda', color: '#155724' }}>{message}</div>}
        {error && <div style={{ ...messageStyle, backgroundColor: '#f8d7da', color: '#721c24' }}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>First Name:</label>
            <input
              type="text"
              name="firstName"
              value={formData.profile.firstName}
              onChange={handleProfileChange}
              required
            />
          </div>
          <div>
            <label>Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={formData.profile.lastName}
              onChange={handleProfileChange}
              required
            />
          </div>
          <div>
            <label>Bio:</label>
            <textarea
              name="bio"
              value={formData.profile.bio}
              onChange={handleProfileChange}
            />
          </div>
          <div>
            <label>Location:</label>
            <input
              type="text"
              name="location"
              value={formData.profile.location}
              onChange={handleProfileChange}
            />
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;

