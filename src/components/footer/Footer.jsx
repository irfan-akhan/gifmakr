import React, { Component } from 'react';
import './Footer.css';

class Footer extends Component {
  render() {
    return (
      <footer id="footer">
        <div className="footer_nav">
          <h1>v2g</h1>
          <div>
            <a href="#how-it-works">How it works</a>
            <a href="#get-started">Get Started</a>
          </div>
        </div>
        <div className="copy_right">
          <h2>Built by Khan_Irfan</h2>
          <h3>&copy; 2021 v2g</h3>
        </div>
        <div className="contact_info">
          <h2>Contact</h2>
          <h3>
            Hello there, My name is Irfan and I'm an aspiring web developer
          </h3>

          <div className="social_links">
            <a
              href="https://www.linkedin.com/in/irfan-khan-4a40b31b4/"
              target="_blank"
            >
              <img
                src="https://i.ibb.co/w7wrHq4/linkedin.png"
                alt="linkedin"
              ></img>
            </a>
            <a href="https://github.com/Irfan-akhan" target="_blank">
              <img src="https://i.ibb.co/SKB76WQ/github.png" alt="github"></img>
            </a>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
