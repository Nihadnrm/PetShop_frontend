import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { addfeedbackApi } from '../Services/AllApi';
import { toast } from 'react-toastify';

function Footer() {
  const [sendfeedback, setsendfeedback] = useState({ feedback: "" });
  const [userdata, setuserdata] = useState(null);

  const nav = useNavigate();

  useEffect(() => {
    const storedUser = sessionStorage.getItem("userData");
    if (storedUser) {
      setuserdata(JSON.parse(storedUser));
      console.log(userdata);
      
    }
  }, []);

  const handlefeedback = async () => {
    if (!userdata) {
      toast.warning("You must log in to send feedback");
      nav("/userauth");
      return;
    }

    if (!sendfeedback.feedback.trim()) {
      toast.warning("Feedback cannot be empty");
      return;
    }

    try {
      const response = await addfeedbackApi(sendfeedback);

      if (response.status === 200) {
        toast.success("Feedback sent successfully");
        setsendfeedback({ feedback: "" });
      } else {
        toast.error("Something went wrong!");
      }
    } catch (err) {
      console.error(err);
      toast.info("first login then feedback 🙂");
    }
  };

  return (
    <footer className="bg-dark text-light">
      <div className="container">
        <div className="row gy-4">
          {/* About Section */}
          <div className="col-12 col-md-6 col-lg-4">
            <h4 className="fw-bold text-center mb-3">Petshop</h4>
            <p style={{ textAlign: 'justify' }}>
              Welcome to Pet Shop, your friendly online store for everything your furry, feathery, or scaly friends need! From premium pet food and toys to grooming essentials and accessories, we provide high-quality products for dogs, cats, birds, fish, rabbits, and more. We’re here to make pet parenting easy, fun, and affordable.
            </p>
          </div>

          {/* Links Section */}
          <div className="col-12 col-md-6 col-lg-2">
            <h5 className="fw-bold text-center mb-3">Links</h5>
            <div className="d-flex flex-column align-items-center">
              <Link to="/" className="text-light mb-2 text-decoration-none">Home</Link>
              <Link to="/userauth" className="text-light mb-2 text-decoration-none">Login</Link>
              <Link to="/userauth" className="text-light mb-2 text-decoration-none">Register</Link>
            </div>
          </div>

          {/* Feedback Section */}
          <div className="col-12 col-lg-6">
            <h5 className="fw-bold text-center mb-3">Feedback</h5>
            <div className="mb-3">
              <textarea
                className="form-control"
                rows="3"
                placeholder="Enter your feedback..."
                onChange={(e) => setsendfeedback({ feedback: e.target.value })}
                value={sendfeedback.feedback}
              />
            </div>
            <div className="text-center">
              <button className="btn btn-success px-4" onClick={handlefeedback}>
                Send
              </button>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="row mt-5 pt-4 border-top">
          <div className="col-12 col-lg-8 mx-auto d-flex flex-column flex-md-row justify-content-between text-center text-md-start gap-3">
            <div>
              <i className="fa-solid fa-location-dot me-2"></i>
              Rakul Pet Care Pvt. Ltd.<br />
              Plot No. 30, Block-H, Indraprasth Yojna, Ghaziabad-201102, Uttar Pradesh
            </div>
            <div>
              <i className="fa-solid fa-phone me-2"></i>
              +91 8590909641
            </div>
            <div>
              <i className="fa-brands fa-instagram me-2"></i>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="text-dark text-decoration-none"
              >
                Follow us
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center py-3 mt-4 border-top">
          <small>&copy; {new Date().getFullYear()} Petshop. All rights reserved.</small>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
