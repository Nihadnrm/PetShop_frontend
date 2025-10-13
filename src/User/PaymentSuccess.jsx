import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";

function PaymentSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const purchaseData = JSON.parse(localStorage.getItem("purchaseData"));
    if (!purchaseData) return;

    const templateParams = {
      username: purchaseData.username,
      breed: purchaseData.breed,
      price: purchaseData.price,
      email: purchaseData.email,
      date: new Date().toLocaleString(),
    };
    console.log(templateParams);

    emailjs
      .send(
        "service_4why4kd",       // EmailJS service ID
        "template_tn2f40n",      // EmailJS template ID
        templateParams,
        "RxV2nYRkmYYVHN87h"     // EmailJS public key
      )
      .then()
      .catch((err) => toast.error("Failed to send purchase email."));
  }, []);

  const handleGoHome = () => {
    const user = JSON.parse(localStorage.getItem("userData"));
    navigate(user ? "/profile" : "/");
  };

  return (
    <div className="container-fluid" style={{ height: "100vh", maxWidth: "100vw" }}>
      <div className="d-flex justify-content-center align-items-center h-100">
        <div className="row w-100 h-75">
          <div className="col-12 col-md-6 d-flex flex-column justify-content-center align-items-center text-center mb-4 mb-md-0">
            <h2 className="text-primary my-3">Congratulations</h2>
            <h6 className="my-3">
              Thank you for shopping with our Petshop. Hope you have a good time with us
            </h6>
            <button className="btn btn-primary mt-2" onClick={handleGoHome}>Go Home</button>
          </div>
          <div className="col-12 col-md-6 d-flex justify-content-center align-items-center">
            <img
              src="https://i.pinimg.com/originals/32/b6/f2/32b6f2aeeb2d21c5a29382721cdc67f7.gif"
              alt="Payment Success"
              className="img-fluid gif-responsive"
            />
          </div>
        </div>
      </div>

      {/* Responsive GIF style */}
      <style>
        {`
          @media (max-width: 576px) {
            .gif-responsive {
              max-height: 150px !important;
            }
          }
          @media (min-width: 577px) and (max-width: 768px) {
            .gif-responsive {
              max-height: 200px !important;
            }
          }
          @media (min-width: 769px) {
            .gif-responsive {
              max-height: 300px !important;
            }
          }
        `}
      </style>
    </div>
  );
}

export default PaymentSuccess;
