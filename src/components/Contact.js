import React from 'react';

const Contact = () => {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div style={styles.container}>
            <h2>Contact Us:</h2>
            <p>If you have any questions or feedback, feel free to reach out:</p>
            <ul>
              <li>Email: Vivekgami8125@gmail.com</li>
              <li>Phone: +8238468743</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    marginTop: '2vh',
    marginLeft: '2vw',
  },
};

export default Contact;