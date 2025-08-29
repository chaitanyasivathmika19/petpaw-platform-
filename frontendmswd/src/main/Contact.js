import React from 'react';

export default function Contact() {
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>CONTACT DETAILS</h2>
      <p style={styles.paragraph}>
        Heyoo !! Pet lovers, you can contact for further details without any hesitation
        <br />
        You can contact us at:
        <br />
        Phone: <a href="tel:+91 6399789568">6399789568</a>
        <br />
        Email: <a href="For further clarifications mail to petspaw0516@gmail.com">petspaw0516@gmail.com</a>
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