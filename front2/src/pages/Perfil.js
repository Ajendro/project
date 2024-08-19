import React from 'react';

const Perfil = () => {
  // Datos simulados para el perfil del usuario
  const userProfile = {
    username: 'johndoe',
    profile: {
      firstName: 'John',
      lastName: 'Doe',
      bio: 'Desarrollador web.',
      location: 'Ciudad de Loja, Ecuador',
      avatar: 'https://via.placeholder.com/150', // URL a la imagen del avatar
    },
    createdAt: '2021-01-01',
  };

  return (
    <div style={styles.container}>
      <div style={styles.profileCard}>
        <img
          src={userProfile.profile.avatar}
          alt="Avatar"
          style={styles.avatar}
        />
        <h2 style={styles.username}>{userProfile.username}</h2>
        <p style={styles.name}>
          {userProfile.profile.firstName} {userProfile.profile.lastName}
        </p>
        <p style={styles.bio}>{userProfile.profile.bio}</p>
        <p style={styles.location}>{userProfile.profile.location}</p>
        <p style={styles.createdAt}>
          Miembro desde: {new Date(userProfile.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

// Estilos en línea
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f4f4f4',
    fontFamily: 'Arial, sans-serif',
  },
  profileCard: {
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
    textAlign: 'center',
    width: '300px',
  },
  avatar: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    marginBottom: '15px',
  },
  username: {
    fontSize: '22px',
    fontWeight: 'bold',
    margin: '10px 0',
  },
  name: {
    fontSize: '18px',
    margin: '5px 0',
  },
  bio: {
    fontSize: '16px',
    color: '#666',
    margin: '10px 0',
  },
  location: {
    fontSize: '14px',
    color: '#888',
    margin: '10px 0',
  },
  createdAt: {
    fontSize: '14px',
    color: '#aaa',
    marginTop: '20px',
  },
};

export default Perfil;
