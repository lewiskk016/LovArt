import React from "react";
import "./AboutUs.css";
import "./goku.png"

function AboutUs() {
  return (
    <div className="about-us-container">
      <div className="about-us-box">
      <img src={require('./goku.png')} alt="Member 1" />
        <h3>Angelo Ciffone</h3>
        <h4>Backend Lead</h4>
        <p>I am a full-stack engineer with expertise in Ruby and JavaScript. With a strong foundation in both back-end and front-end development, I have experience building robust and scalable web applications. I enjoy leveraging my skills to tackle complex challenges and deliver high-quality solutions that meet user needs and drive business value.</p>
        <div className="social-links">
        <a className="social-link" href="https://github.com/aciffone23">
            <i className="fab fa-github-square"></i>
        </a>
        <a className="social-link" href="have to put in">
            <i className="fab fa-linkedin"></i>
        </a>
        </div>
      </div>
      {/* Repeat the above structure for the other three members */}
      <div className="about-us-box">
        {/* Member 2 content */}
        <img src={require('./spike.png')} alt="Member 1" />
        <h3>Kevin Lewis</h3>
        <h4>Team Lead</h4>
        <p>I am a highly motivated full-stack engineer with a passion for building robust applications. With a solid foundation in JavaScript, React, and Rails, I possess the technical skills necessary to develop innovative solutions and bring ideas to life. I thrive in collaborative environments, leveraging my strong problem-solving abilities to tackle complex challenges and deliver high-quality code.</p>
        <div className="social-links">
        <a className="social-link" href="https://github.com/lewiskk016">
            <i className="fab fa-github-square"></i>
        </a>
        <a className="social-link" href="https://www.linkedin.com/in/kevin-lewis-5b0baa27b/">
            <i className="fab fa-linkedin"></i>
        </a>
        </div>
      </div>
      <div className="about-us-box">
      <img src={require('./candy.jpeg')} alt="Member 1" />
        <h3>Merve Dogan-Espaillat</h3>
        <h4>Frontend Lead</h4>
        <p>I am proficient in both front-end and back-end development. My skill set includes proficiency in front-end technologies such as HTML, CSS, and JavaScript, as well as back-end languages like Ruby and SQL. I am experienced in building responsive and intuitive user interfaces, as well as developing robust server-side functionalities. </p>
        <div className="social-links">
        <a className="social-link" href="https://github.com/mervedespaillat">
            <i className="fab fa-github-square"></i>
        </a>
        <a className="social-link" href="https://www.linkedin.com/in/merve-do%C4%9Fan-espaillat-872298161/">
            <i className="fab fa-linkedin"></i>
        </a>
        </div>
      </div>
      <div className="about-us-box">
      <img src={require('./bert.webp')} alt="Member 1" />
        <h3>Ethan Mercado</h3>
        <h4>Flex Lead</h4>
        <p>Description of Member 1</p>
        <div className="social-links">
        <a className="social-link" href="https://github.com/Ethanjonm">
            <i className="fab fa-github-square"></i>
        </a>
        <a className="social-link" href="https://www.linkedin.com/in/ethan-mercado-31312717a/">
            <i className="fab fa-linkedin"></i>
        </a>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
