import { useState, useEffect, useRef } from 'react';
import Lottie from 'lottie-web';
import { logoRectangle, application } from '../../assets';
import { FeatureCard, BillingCard } from '../../components';
import './landing.css';
import { Link } from 'react-router-dom';

const Landing = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [toggleIsOn, setToggleIsOn] = useState(false);

  const container = useRef(null);

  useEffect(() => {
    Lottie.loadAnimation({
      container: container.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: require('../../assets/banner.json'),
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
        className: 'lottie-svg-class',
        id: 'lottie-svg-id'
      }
    });

    return () => {
      container.current = null;
    };
  });

  const showDrawerHandler = () => {
    setShowDrawer((prevState) => !prevState);
  };

  const setToggleIsOnHandler = () => {
    setToggleIsOn((prevState) => !prevState);
  };

  return (
    <div className="wrapper">
      <div className="header">
        <img src={logoRectangle} className="header-logo" alt="Clubspace Logo" />
        <i className="fa-solid fa-bars header-hamburger-icon" onClick={showDrawerHandler}></i>
        <div className="header-menu-items">
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          <Link to="/login">Login</Link>
          <a href="#contact">
            <button className="header-menu-items-btn">Let's Talk</button>
          </a>
        </div>
      </div>

      {showDrawer ? (
        <div className="drawer">
          <i className="fa-solid fa-xmark drawer-close-icon" onClick={showDrawerHandler}></i>
          <div className="drawer-menu-items">
            <a href="#features">Features</a>
            <hr />
            <a href="#pricing">Pricing</a>
            <hr />
          </div>
        </div>
      ) : null}

      <div className="hero">
        <div className="hero-background" ref={container}></div>
        <div className="hero-content">
          <p className="hero-title">The Ultimate Club Management App</p>
          <a href="#contact">
            <button className="hero-btn">Let's Talk</button>
          </a>
          <img src={application} alt="Clubspace Application" className="hero-image" />
        </div>
      </div>

      <div></div>

      <div className="features" id="features">
        <p className="features-title">Why Clubspace?</p>
        <div className="feature-card">
          <FeatureCard type="create" padding="1rem" width="300px" />
        </div>
        <div className="feature-card">
          <FeatureCard type="join" padding="1rem" width="300px" />
        </div>
        <div className="feature-card">
          <FeatureCard type="engagement" padding="1rem" width="300px" />
        </div>
      </div>

      <div className="pricing" id="pricing">
        <div className="pricing-info-toggle-group">
          <div className="pricing-title-group">
            <p className="pricing-title">We’ve got a pricing plan for everyone</p>
            <p className="pricing-subtitle">
              We believe clubspace should be available to all, no matter the size{' '}
            </p>
          </div>

          <div className="pricing-toggle">
            {!toggleIsOn ? (
              <p style={{ color: '#020f00', fontWeight: 'bolder' }} className="pricing-toggle-text">
                Billed monthly
              </p>
            ) : (
              <p style={{ color: '#808780' }} className="pricing-toggle-text">
                Billed monthly
              </p>
            )}

            {!toggleIsOn ? (
              <i
                className="fa-solid fa-toggle-off pricing-toggle-icon"
                onClick={setToggleIsOnHandler}
              ></i>
            ) : (
              <p
                style={{ color: '#020f00' }}
                className="pricing-toggle-text pricing-toggle-icon"
                onClick={setToggleIsOnHandler}
              >
                <i className="fa-solid fa-toggle-on"></i>
              </p>
            )}

            {!toggleIsOn ? (
              <p style={{ color: '#808780', fontWeight: 'bolder' }} className="pricing-toggle-text">
                Billed yearly <span className="pricing-save">(save 36%)</span>
              </p>
            ) : (
              <p style={{ color: '#020f00', fontWeight: 'bolder' }} className="pricing-toggle-text">
                Billed yearly <span className="pricing-save">(save 36%)</span>
              </p>
            )}
          </div>
        </div>

        <div className="pricing-cards">
          <BillingCard type="stater" padding="24px" />
          <BillingCard type="growth" padding="24px" />
          <BillingCard type="scale" padding="24px" />
        </div>

        <div className="contact" id="contact">
          <div className="contact-info">
            <p className="contact-info-title">Let’s get in touch today</p>
            <p className="contact-info-content-1">
              We’d love to hear from you. Whether you have a few questions about our platforms or
              want to schedule a customized demo, we’re here to help.
            </p>
            <p className="contact-info-content-2">
              Fill out the form, and we will reach out super fast.
            </p>
          </div>

          <div className="contact-form">
            <p className="contact-form-title">Let’s Talk</p>
            <div className="contact-form-content">Please fill out the form to connect with us.</div>
            <form>
              <div className="contact-form-input-group">
                <label>Full name</label>
                <input type="text" />
              </div>
              <div className="contact-form-input-group">
                <label>Work email</label>
                <input type="email" />
              </div>
              <div className="contact-form-input-group">
                <label>Job title</label>
                <input type="text" />
              </div>
              <div className="contact-form-input-group">
                <label>Organization</label>
                <input type="text" />
              </div>
              <div className="contact-form-input-group">
                <label>Country</label>
                <input type="text" />
              </div>
              <div className="contact-form-input-group">
                <label>How can we help?</label>
                <input type="text" />
              </div>
              <button type="btn" className="submit-btn">
                Let’s Talk
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="footer">
        <div className="footer-logo">
          <img src={logoRectangle} className="header-logo" alt="Clubspace Logo" />
        </div>
        <div className="footer-links">
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
        </div>
      </div>

      <div className="copyright">
        <p>© 2022 Aurora. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Landing;
