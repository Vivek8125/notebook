import React from 'react';

const About = () => {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div style={styles.container}>
            <h2>About Note App</h2>
            <p>Welcome to Note App! This is a simple note-taking application built with React.</p>
            <p>Features:</p>
            <ul>
              <li>Easy to use interface for creating, editing, and deleting notes.</li>
              <li>Responsive design that works well on both desktop and mobile devices.</li>
              <li>Uses React Router for navigation between different pages.</li>
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

export default About;