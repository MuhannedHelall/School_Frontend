import React from 'react';
import { Link } from 'react-router-dom';

import route from 'src/routes';

import './css/styles.css';
import './css/normalize.css';
import visa from './css/visa.png';
import './css/fontawesome.min.css';
import paypal from './css/paypal.png';
import favicon from './css/favicon.ico';
import software from './css/software.png';
import mobile02 from './css/mobile01.png';
import master from './css/master-card.png';
import mobile from './css/mobile-hori.png';
import americanExpress from './css/american-ex.png';

function LandingView() {
  return (
    <div>
      <div className="header">
        <div className="container">
          <img className="logo" src={favicon} alt="" />
          <div className="links">
            <span className="icon">
              <span />
              <span />
              <span />
            </span>
            <ul>
              <li>
                <Link to={route.login}>Login</Link>
              </li>
              <li>
                <a href="#services">Services</a>
              </li>
              {/* <li>
                <a href="#portfolio">Client Reviews</a>
              </li> */}
              <li>
                <a href="#about">About</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="landing">
        <div className="content">
          <h2>Best Software For Your Work Monitor</h2>
          <p>
            Launch your campaign and benefit from our expertise on designing and managing conversion
            centered bootstrap v5 html page.
          </p>
        </div>
        <img src={software} alt="" />
        <svg className="wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#f6f6f6"
            fillOpacity="1"
            d="M0,256L34.3,229.3C68.6,203,137,149,206,144C274.3,139,343,181,411,208C480,235,549,245,617,229.3C685.7,213,754,171,823,170.7C891.4,171,960,213,1029,229.3C1097.1,245,1166,235,1234,234.7C1302.9,235,1371,245,1406,250.7L1440,256L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"
          />
        </svg>
      </div>

      <div className="features">
        <div className="container">
          <div className="feat">
            <i className="fas fa-magic fa-3x" />
            <h3>Seo Services</h3>
            <p>
              Nisi aenean vulputate eleifend tellus vitae eleifend enim a Aliquam eleifend aenean
              elementum semper.
            </p>
          </div>
          <div className="feat">
            {/* <!-- <i className="fa-regular fa-gem fa-3x"></i> --> */}
            <i className="fa-solid fa-envelope-open-text fa-3x" />
            <h3> Email Marketing</h3>
            <p>
              Allegedly, a Latin scholar established the origin of the established text by compiling
              unusual word.
            </p>
          </div>
          <div className="feat">
            <i className="fa-sharp fa-solid fa-magnifying-glass-chart fa-3x" />
            <h3> Data Analysis</h3>
            <p>
              It seems that only fragments of the original text remain in only fragments the Lorem
              Ipsum texts used today.
            </p>
          </div>
          <div className="feat">
            <i className="fa-sharp fa-solid fa-tachograph-digital fa-3x" />
            <h3> Digital Marketing</h3>
            <p>
              It seems that only fragments of the original text remain in only fragments the Lorem
              Ipsum texts used today.
            </p>
          </div>
          <div className="feat">
            <i className="fa-solid fa-earth-americas fa-3x" />
            <h3> Social Media Marketing</h3>
            <p>
              It seems that only fragments of the original text remain in only fragments the Lorem
              Ipsum texts used today.
            </p>
          </div>
          <div className="feat">
            <i className="fa-sharp fa-solid fa-clock fa-3x" />
            <h3> Link Building</h3>
            <p>
              It seems that only fragments of the original text remain in only fragments the Lorem
              Ipsum texts used today.
            </p>
          </div>
        </div>
      </div>

      <div className="services" id="services">
        <img src={mobile} alt="" />
        <div className="container">
          <h3>Chose your perfect Plan</h3>
          <p>
            Start working with <span> Landrick</span> that can provide everything you need to
            generate awareness, drive traffic, connect.
          </p>
        </div>
        <div className="cards">
          <div className="card shadow">
            <ul>
              <li className="pack">Basic</li>
              <li id="basic" className="price bottom-bar">
                &dollar;199.99
              </li>
              <li className="bottom-bar">500 GB Storage</li>
              <li className="bottom-bar">2 Users Allowed</li>
              <li className="bottom-bar">Send up to 3 GB</li>
              <li>
                <button type="button" className="btn">
                  Learn More
                </button>
              </li>
            </ul>
          </div>
          <div className="card active">
            <ul>
              <li className="pack">Professional</li>
              <li id="professional" className="price bottom-bar">
                &dollar;249.99
              </li>
              <li className="bottom-bar">1 TB Storage</li>
              <li className="bottom-bar">5 Users Allowed</li>
              <li className="bottom-bar">Send up to 10 GB</li>
              <li>
                <button type="button" className="btn active-btn">
                  Learn More
                </button>
              </li>
            </ul>
          </div>
          <div className="card shadow">
            <ul>
              <li className="pack">Master</li>
              <li id="master" className="price bottom-bar">
                &dollar;399.99
              </li>
              <li className="bottom-bar">2 TB Storage</li>
              <li className="bottom-bar">10 Users Allowed</li>
              <li className="bottom-bar">Send up to 20 GB</li>
              <li>
                <button type="button" className="btn">
                  Learn More
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="about" id="about">
        <div className="container">
          <h2 className="special-heading">About</h2>
          <p>less is more work.</p>
          <div className="about-content">
            <div className="image">
              <img src={mobile02} alt="" />
            </div>
            <div className="text">
              <h2>Carry out Marketing Initiatives : Landrick</h2>
              <hr />
              <p>
                You can combine all the Landrick templates into a single one, you can take a
                component from the Application theme and use it in the Website.
              </p>
              <div className="sign">
                <i className="fa fa-check-circle" />
                <p>Digital Marketing Solutions for Tomorrow</p>
              </div>
              <div className="sign">
                <i className="fa fa-check-circle" />
                <p>Our Talented & Experienced Marketing Agency</p>
              </div>
              <div className="sign">
                <i className="fa fa-check-circle" />
                <p>Create your own skin to match your brand</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="contact" id="contact">
        <div className="container">
          <h2 className="special-heading">Contact</h2>
          <h2 className="font">See everything about your employee at one place</h2>
          <p className="font">
            Start working with<span> Landric </span>k that can provide everything you need to
            generate
            <br />
            awareness, drive traffic, connect.
          </p>
          <div className="info">
            <p className="label" />
            <a href="mailto:leonagency@mail.com?subject=Contact" className="link">
              leonagency@mail.com
            </a>
            <div className="social">
              find us social networks
              <i className="fab fa-youtube" />
              <i className="fab fa-facebook-f" />
              <i className="fab fa-twitter" />
            </div>
          </div>
        </div>
      </div>

      <div className="footer">
        &copy;2021 <span>Leon</span>All Right Reserved
        <div className="pay">
          <img src={visa} alt="" width="36px" height="25px" />
          <img src={master} alt="" width="36px" height="25px" />
          <img src={paypal} alt="" width="36px" height="25px" />
          <img src={americanExpress} alt="" width="36px" height="25px" />
        </div>
      </div>
    </div>
  );
}

export default LandingView;
