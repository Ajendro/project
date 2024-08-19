import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [correo, setCorreo] = useState('');
  const [contrasenia, setContrasenia] = useState('');
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('authToken'));
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = {
      correo,
      contrasenia,
      username
    };

    try {
      const response = await fetch('http://localhost:5000/auth/createAuth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      const result = await response.json();
      if (response.ok) {
        console.log('Autenticación exitosa:', result);
        localStorage.setItem('authToken', result.token);
        setIsLoggedIn(true);
        alert('Inicio de sesión exitoso');
        navigate('/home'); // Redirige a la página principal o deseada
      } else {
        console.error('Error en login:', result.error);
        alert(result.error);
      }
    } catch (error) {
      console.error('Error en la petición:', error);
      alert('Error en la petición');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    alert('Sesión cerrada exitosamente');
    navigate('/login'); // Redirige a la página de login
  };

  return (
    <div style={styles.loginContainer}>
      <form onSubmit={handleSubmit} style={styles.loginForm}>
        <div>
          <label>Correo:</label>
          <input
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            value={contrasenia}
            onChange={(e) => setContrasenia(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button}>Iniciar Sesión</button>
        {isLoggedIn && (
          <button type="button" onClick={handleLogout} style={styles.button}>Cerrar Sesión</button>
        )}
      </form>
    </div>
  );
};

const styles = {
  loginContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '60vh',
    backgroundColor: '#ffffff',
  },
  loginForm: {
    backgroundColor: '#ffffff',
    padding: '50px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '300px',
  },
  input: {
    width: '100%',
    padding: '10px',
    border: '1px solid #000000',
    borderRadius: '4px',
    marginBottom: '15px',
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#646464',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginBottom: '10px',
  },
};

export default Login;
