import React, { useState, useEffect } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";
import { paymentApi } from "../Services/AllApi"; // Your existing payment API

function Buypage() {
  const [petinfo, setPetinfo] = useState({});
  const [userinfo, setUserinfo] = useState({ name: "", email: "", mobile: "", pin: "", address: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const pets = JSON.parse(sessionStorage.getItem("petdata"));
    if (pets) setPetinfo(pets);
  }, []);

  const validateMobile = (mobile) => /^[6-9]\d{9}$/.test(mobile);
  const validatePin = (pin) => /^\d{6}$/.test(pin);
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handlePay = async () => {
    if (!userinfo.name || !userinfo.email || !userinfo.mobile || !userinfo.pin || !userinfo.address) {
      return toast.error("Please fill all fields");
    }
    if (!validateEmail(userinfo.email)) return toast.error("Invalid email");
    if (!validateMobile(userinfo.mobile)) return toast.error("Invalid mobile number");
    if (!validatePin(userinfo.pin)) return toast.error("Invalid pincode");
    if (!petinfo._id) return toast.error("Pet info missing");

    setLoading(true);

    try {
      const cleanPrice = Number(petinfo.price.toString().replace(/[^0-9.]/g, ""));
      if (isNaN(cleanPrice) || cleanPrice <= 0) return toast.error("Invalid price");

      const data = { petId: petinfo._id, ...userinfo, price: cleanPrice };
      const response = await paymentApi(data);
      if (!response?.data?.sessionId) return toast.error("Payment session not created");

      // Save purchase info to localStorage before Stripe redirect
      localStorage.setItem(
        "purchaseData",
        JSON.stringify({
          username: userinfo.name,
          email: userinfo.email,
          breed: petinfo.breed,
          price: cleanPrice,
        })
      );

      const stripe = await loadStripe("pk_test_51SADpV3P289eOjejkEdL1Nk3XavyFayIqqjYpQ8eWhr0XJLK2MgpmiyXuZikq9FF6qgAyuLQwRkBAhcqa44oR9eD00oiont1m9");
      if (!stripe) return toast.error("Stripe failed to load");

      const result = await stripe.redirectToCheckout({ sessionId: response.data.sessionId });
      if (result.error) toast.error(result.error.message || "Stripe checkout error");
    } catch (err) {
      console.error("Payment failed:", err);
      toast.error(err.response?.data?.message || "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  const displayPrice = petinfo.price ? petinfo.price.toString().replace(/[^0-9.]/g, "") : 0;

  return (
    <div className="container my-5">
      <div className="row g-4">
        {/* Delivery Info */}
        <div className="col-md-6">
          <div className="card p-4 shadow rounded-4">
            <h4 className="mb-4 text-primary">Delivery Information</h4>

            <FloatingLabel label="Full Name" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Enter full name"
                value={userinfo.name}
                onChange={(e) => setUserinfo({ ...userinfo, name: e.target.value })}
              />
            </FloatingLabel>

            <FloatingLabel label="Email" className="mb-3">
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={userinfo.email}
                onChange={(e) => setUserinfo({ ...userinfo, email: e.target.value })}
              />
            </FloatingLabel>

            <FloatingLabel label="Mobile Number" className="mb-3">
              <Form.Control
                type="tel"
                placeholder="1234567890"
                value={userinfo.mobile}
                maxLength={10}
                onChange={(e) => setUserinfo({ ...userinfo, mobile: e.target.value })}
              />
              {userinfo.mobile && !validateMobile(userinfo.mobile) && (
                <small className="text-danger">Invalid mobile number</small>
              )}
            </FloatingLabel>

            <FloatingLabel label="Pincode" className="mb-3">
              <Form.Control
                type="text"
                placeholder="123456"
                value={userinfo.pin}
                maxLength={6}
                onChange={(e) => setUserinfo({ ...userinfo, pin: e.target.value })}
              />
              {userinfo.pin && !validatePin(userinfo.pin) && (
                <small className="text-danger">Invalid pincode</small>
              )}
            </FloatingLabel>

            <FloatingLabel label="Shipping Address" className="mb-3">
              <Form.Control
                as="textarea"
                placeholder="Enter address"
                style={{ height: "120px" }}
                value={userinfo.address}
                onChange={(e) => setUserinfo({ ...userinfo, address: e.target.value })}
              />
            </FloatingLabel>
          </div>
        </div>

        {/* Order Summary */}
        <div className="col-md-5">
          <div className="card p-4 shadow rounded-4">
            <h4 className="mb-4 text-success">Order Summary</h4>
            {petinfo?.image && (
              <img
                src={petinfo.image}
                alt="Pet"
                className="img-fluid rounded mb-3"
                style={{ width: "100%", maxHeight: "200px", objectFit: "cover" }}
              />
            )}
            <ul className="list-group list-group-flush">
              <li className="list-group-item"><strong>Breed:</strong> {petinfo.breed}</li>
              <li className="list-group-item"><strong>Gender:</strong> {petinfo.gender}</li>
              <li className="list-group-item"><strong>Color:</strong> {petinfo.color}</li>
              <li className="list-group-item"><strong>Age:</strong> {petinfo.age}</li>
              <li className="list-group-item"><strong>Size:</strong> {petinfo.size}</li>
              <li className="list-group-item"><strong>Price:</strong> {petinfo.price}</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Payment Button */}
      <div className="row mt-4">
        <div className="col-md-6">
          <button
            className="btn btn-primary w-100 py-3 rounded-pill"
            onClick={handlePay}
            disabled={loading}
          >
            {loading ? "Processing..." : `Confirm Purchase - ₹${displayPrice}`}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Buypage;
