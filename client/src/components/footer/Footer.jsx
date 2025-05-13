import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub } from "react-icons/fa";
import "./footer.scss";

function Footer() {
  return (
    <footer className="footer">
      <div className="footerContainer">
        <div className="footerColumn brand">
          <h2>Space KC</h2>
          <p>Innovating your digital space — web, mobile & beyond.</p>
        </div>

        <div className="footerColumn links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        <div className="footerColumn contact">
          <h3>Contact</h3>
          <p>Email: hello@spacekc.dev</p>
          <p>Phone: +254 712 345 678</p>
          <div className="socialIcons">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaLinkedinIn /></a>
            <a href="https://github.com/Evan-cell" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
          </div>
        </div>

        <div className="footerColumn newsletter">
          <h3>Subscribe</h3>
          <p>Get updates on our latest projects and offers.</p>
          <form className="newsletterForm">
            <input type="email" placeholder="Enter your email" />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>

      <div className="footerBottom">
        <p>© {new Date().getFullYear()} Space KC. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
