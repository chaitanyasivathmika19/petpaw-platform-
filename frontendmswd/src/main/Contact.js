import React from 'react';

export default function Contact() {
  return (
<div style={styles.container}>
  <h2 style={styles.heading}>CONTACT DETAILS</h2>
  <p style={styles.paragraph}>
    "Hey Pet Parents! &  Pet lovers!", feel free to reach out for further details without any hesitation 🐾
    <br /><br />
    <strong>Name:</strong> Chaitanya Sivathmika Yalamandala <br />
    <strong>University:</strong> KL University <br />
    <strong>Phone:</strong> <a href="tel:+919988187444">+91 99881 87444</a> <br />
    <strong>Email:</strong> 
      <a href="mailto:petspaw0516@gmail.com">petspaw0516@gmail.com</a> <br/>
      (Alternative: <a href="mailto:sivathmikayalamandala33@gmail.com">sivathmikayalamandala33@gmail.com</a>) <br />
    <strong>Location:</strong> Guntur, Andhra Pradesh, India <br />
    <strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/chaitanya-sivathmika-y-0b985124b/" target="_blank">linkedin.com/in/chaitanya-sivathmika-y</a> <br />
    <strong>GitHub:</strong> <a href="https://github.com/chaitanyasivathmika19" target="_blank">github.com/chaitanyasivathmika19</a>
    <br /><br />
    <em>Happy to connect with fellow pet lovers! 🐕🐾</em>
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