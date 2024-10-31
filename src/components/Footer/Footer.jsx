import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-sections">
        {/* Kontaktinformation */}
        <div className="footer-section">
          <h4>Kontakt</h4>
          <p>Telefon: 123-456 789</p>
          <p>Email: info@example.com</p>
        </div>

        {/* Snabblänkar */}
        <div className="footer-section">
          <h4>Snabblänkar</h4>
          <ul className="footer-link-list">
            <li>
              <a href="/kontakt">Kontakt</a>
            </li>
            <li>
              <a href="/hjalp">Hjälp</a>
            </li>
          </ul>
        </div>

        {/* Sociala medier */}
        <div className="footer-section">
          <h4>Följ oss</h4>
          <div className="footer-social-icons">
            <a
              href="https://facebook.com"
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook />
            </a>
            <a
              href="https://instagram.com"
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
            <a
              href="https://twitter.com"
              aria-label="Twitter"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>
      <p className="footer-copyright">
        © {new Date().getFullYear()} Kreativa Bakelser AB. Alla rättigheter
        förbehållna.
      </p>
    </footer>
  );
};

export default Footer;
