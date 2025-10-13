import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import base_url from '../Services/baseUrl';
import { authcontext } from '../ContextApi/Context';
import Header from '../components/Header';
import { getuserordersApi, getuserappointmentApi } from '../Services/AllApi';

function Profile() {
  const [userdata, setuserdata] = useState({});
  const [orders, setorders] = useState([]);
  const [appointments, setappointments] = useState([]);

  const nav = useNavigate();
  const { setauthing } = useContext(authcontext);

  useEffect(() => {
    const storeduser = sessionStorage.getItem("userData");
    if (storeduser) setuserdata(JSON.parse(storeduser));

    handlegetorders();
    handleuserAppointments();
  }, []);

  const handlelogout = () => {
    sessionStorage.clear();
    nav("/");
    setauthing(false);
  };

  const handlegetorders = async () => {
    const response = await getuserordersApi();
    if (response.status === 200) setorders(response.data);
  };

  const handleuserAppointments = async () => {
    const response = await getuserappointmentApi();
    if (response.status === 200) setappointments(response.data);
  };

  // Status badge classes
  const getStatusClass = (status) => {
    switch (status) {
      case "delivered":
        return "bg-success text-white";
      case "shipped":
        return "bg-primary text-white";
      case "pending":
        return "bg-secondary text-white";
      default:
        return "bg-secondary text-white";
    }
  };

  return (
    <>
      <Header />
      <div className="container-fluid py-4 mb-4" style={{minHeight:"70vh", backgroundColor: "white"}}>
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10 shadow p-4 rounded bg-white">

            {/* ---------- User Info Section ---------- */}
            <div className="row">
              <div className="col-12 col-md-6 border-end mb-4 mb-md-0 d-flex flex-column align-items-center text-center text-md-start">
                <img
                  src={
                    userdata.profile
                      ? `${base_url}/images/${userdata.profile}`
                      : "https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg"
                  }
                  alt="Profile"
                  className="mb-3 rounded-circle shadow"
                  style={{ width: "120px", height: "120px", objectFit: "cover" }}
                />

                <h5 className="fw-bold mb-3 text-primary">{userdata.username}</h5>

                <ul className="list-group list-group-flush w-100 small">
                  <li className="list-group-item border-0">
                    <i className="fa-solid fa-envelope text-secondary me-2"></i>
                    <strong>Email:</strong> <span className="text-muted">{userdata.email || "N/A"}</span>
                  </li>
                  <li className="list-group-item border-0">
                    <i className="fa-solid fa-phone text-secondary me-2"></i>
                    <strong>Phone:</strong> <span className="text-muted">{userdata.phone || "N/A"}</span>
                  </li>
                  <li className="list-group-item border-0">
                    <i className="fa-solid fa-location-dot text-secondary me-2"></i>
                    <strong>Address:</strong> <span className="text-muted">{userdata.address || "N/A"}</span>
                  </li>
                  <li className="list-group-item border-0">
                    <i className="fa-solid fa-map-pin text-secondary me-2"></i>
                    <strong>Pin:</strong> <span className="text-muted">{userdata.pin || "N/A"}</span>
                  </li>
                </ul>

                <div className="d-flex gap-2 mt-4 flex-wrap justify-content-center justify-content-md-start">
                  <Link className="btn btn-outline-primary px-4" to="/editprofile">
                    <i className="fa-solid fa-pen me-1"></i> Edit Profile
                  </Link>
                  <button className="btn btn-outline-danger px-4" onClick={handlelogout}>
                    <i className="fa-solid fa-right-from-bracket me-1"></i> Logout
                  </button>
                </div>
              </div>

              {/* ---------- Orders Section ---------- */}
              <div className="col-12 col-md-6">
                <h4 className="text-warning mb-4 text-center text-md-start">My Orders</h4>
                {orders.length > 0 ? (
                  <div className="d-flex flex-column gap-3">
                    {orders.map((item, index) => (
                      <div key={index} className="shadow-sm rounded p-3 d-flex flex-column flex-sm-row align-items-center gap-3 border">
                        <img
                          src={item.petId?.image || "https://via.placeholder.com/80"}
                          alt={item.petId?.breed || "Pet"}
                          className="rounded"
                          style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                        />
                        <div className="flex-grow-1 text-center text-sm-start">
                          <h6 className="mb-1 fw-bold">{item.petId?.breed || "N/A"}</h6>
                          <p className="mb-0 text-muted small">Gender: {item.petId?.gender || "N/A"}</p>
                          <p className="mb-0 text-muted small">Size: {item.petId?.size || "N/A"}</p>
                          <p className="mb-0 text-muted small">Age: {item.petId?.age || "N/A"}</p>
                          <p className="mb-0 text-muted small">Color: {item.petId?.color || "N/A"}</p>
                          <p className="mb-0 fw-bold text-success">{item.petId?.price || "N/A"}</p>
                        </div>
                        <div className="text-center text-sm-end">
                          <span className={`px-2 py-1 rounded ${getStatusClass(item.status)}`}>
                            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                          </span>
                          {(item.status === 'pending' || item.status === 'shipped') && (
                            <div className="small text-muted mt-1" style={{ fontStyle: 'italic' }}>
                              {item.status === 'pending' && '• Get in one week'}
                              {item.status === 'shipped' && '• Get in 1-2 days'}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <h5 className="text-center">No Orders</h5>
                )}
              </div>
            </div>

            {/* ---------- Appointments Section ---------- */}
            <div className="mt-5">
              <h4 className="text-warning mb-3 text-center text-md-start">My Appointments</h4>
              {appointments.length > 0 ? (
                <div className="d-flex flex-column gap-3">
                  {appointments.map((item, index) => (
                    <div
                      key={item._id}
                      className="shadow-sm rounded p-3 bg-white d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 border"
                    >
                      <div>
                        <h6 className="mb-1">Appointment #{index + 1}</h6>
                        <p className="mb-0 small">
                          <span className="fw-bold">Date & Time:</span>{" "}
                          <span className="text-primary">{item.date}, {item.time}</span>
                          <span className="fw-bold ms-2">Service:</span>{" "}
                          <span className="text-primary">{item.service}</span>
                          <span className="fw-bold ms-2">Pet Name:</span>{" "}
                          <span className="text-primary">{item.petname || "N/A"}</span>
                        </p>
                      </div>
                      <div>
                        <span
                          className={`px-2 py-1 rounded text-white ${
                            item.status === 'completed'
                              ? 'bg-success'
                              : item.status === 'pending'
                              ? 'bg-warning text-dark'
                              : 'bg-secondary'
                          }`}
                        >
                          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <h5 className="text-center">No Appointments</h5>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
