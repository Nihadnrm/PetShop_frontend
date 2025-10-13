import React, { useState, useEffect } from 'react';
import { getcartApi, addtocartApi, deletecartApi } from '../Services/AllApi';
import { toast } from 'react-toastify';
import Header from '../components/Header';

function Cart() {
  const [datas, setdatas] = useState([]);
  const [total, settotal] = useState(0);
  const [userdata, setuserdata] = useState("");
  const [totalpet, settotalpet] = useState("");

  const handlegetcart = async () => {
    const response = await getcartApi();
    if (response.status === 200) {
      setdatas(response.data);
      const totalAmount = response.data.reduce((prev, item) => {
        const cleanPrice = Number(item.petId.price.replace(/[^0-9.]/g, ""));
        return prev + cleanPrice * item.quantity;
      }, 0);
      settotal(totalAmount);
      settotalpet(response.data.length);
    } else {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    const user = sessionStorage.getItem("userData");
    if (user) setuserdata(JSON.parse(user));
  }, []);

  useEffect(() => {
    handlegetcart();
  }, []);

  const handleincrement = async (petId) => {
    if (!userdata) return toast.warning("You have to login first");
    const response = await addtocartApi({ petId, quantity: 1 });
    if (response.status === 200) handlegetcart();
    else toast.error("Something went wrong!");
  };

  const handledecrement = async (petId) => {
    if (!userdata) return toast.warning("You have to login first");
    const response = await addtocartApi({ petId, quantity: -1 });
    if (response.status === 200) handlegetcart();
    else toast.error("Something went wrong!");
  };

  const handledelete = async (id) => {
    const response = await deletecartApi(id);
    if (response.status === 200) handlegetcart();
    else toast.error("Something went wrong");
  };

  return (
    <>
      <Header />
      <div className="container-fluid py-5" style={{backgroundColor: "white"}}>
        <h2 className="mb-4 text-center text-primary">🛒 Your Cart</h2>

        <div className="row">
          {/* Cart Items */}
          {datas.length > 0 ? (
            datas.map((item) => (
              <div key={item._id} className="col-12 mb-4">
                <div className="card shadow-sm">
                  <div className="row g-0 align-items-center p-3">
                    {/* Image */}
                    <div className="col-12 col-md-3 text-center mb-3 mb-md-0">
                      <img
                        src={item.petId.image}
                        alt=""
                        className="img-fluid rounded"
                        style={{ maxHeight: '100px', objectFit: 'cover' }}
                      />
                    </div>

                    {/* Details */}
                    <div className="col-12 col-md-6 mb-3 mb-md-0">
                      <h5 className="fw-bold">{item.petId.breed}</h5>
                      <p className="mb-1">Unit Price: <strong>{item.petId.price}</strong></p>
                      <div className="d-flex align-items-center gap-2 flex-wrap">
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() => handledecrement(item.petId._id)}
                        >−</button>
                        <span className="fw-bold">{item.quantity}</span>
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() => handleincrement(item.petId._id)}
                        >+</button>
                      </div>
                    </div>

                    {/* Total + Delete */}
                    <div className="col-12 col-md-3 text-md-end text-center">
                      <p className="mb-2">
                        Total: <strong>₹{item.quantity * Number(item.petId.price.replace(/[^0-9.]/g, ""))}</strong>
                      </p>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handledelete(item._id)}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="alert alert-light text-center shadow-sm py-5 w-100">
              <i className="fa-solid fa-cart-shopping fa-2x text-secondary mb-3"></i>
              <h5 className="text-muted">Your cart is empty.</h5>
            </div>
          )}

          {/* Order Summary */}
          <div className="col-12 col-lg-4 mt-4 mt-lg-0">
            <div className="card bg-light shadow-sm">
              <div className="card-body">
                <h5 className="text-dark mb-3">🧾 Order Summary</h5>
                <hr />
                <p className="mb-2">Total Products: <strong>{totalpet}</strong></p>
                <p>Total Amount: <strong>₹{total}</strong></p>
                <button className="btn btn-success w-100 mt-3">Proceed to Checkout</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
