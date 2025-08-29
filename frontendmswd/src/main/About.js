import React from 'react';

export default function About() {
  return (
    <div style={styles.container}>
      <h4 style={styles.heading}>ABOUT</h4>
      <p style={styles.paragraph}>
        We are going to help our Paw friends. As animals are part of society, we have a responsibility of taking care of themselves. This website will help to connect a beautiful bonding between pets and the pet lovers. Whoever wants to adopt a pet or buy accessories for their pet, they can have a comfortable and happy shopping over here.
      </p>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '600px',
    margin: 'auto',
    padding: '20px',
    textAlign: 'center',
    backgroundColor: 'lightgrey', 
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
    color: '#333', // Add text color here
  },
  heading: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  paragraph: {
    fontSize: '18px',
    lineHeight: '1.6',
  },
};