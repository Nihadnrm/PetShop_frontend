import React, { useState, useContext } from 'react';
import './userauth.css';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { registerApi, LoginApi, adminregisterApi, adminloginApi } from '../Services/AllApi';
import { authcontext } from '../ContextApi/Context';
import emailjs from "@emailjs/browser";

function UserAuth() {
  const [authstate, setauthstate] = useState(false); // false => login, true => register
  const [isAdmin, setIsAdmin] = useState(false);
  const [userdata, setuserdata] = useState({ username: '', email: '', password: '' });

  const nav = useNavigate();
  const { setauthing } = useContext(authcontext);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@#$%^&*!]{6,}$/;

  const handleauth = () => setauthstate(!authstate);
  const toggleUserType = () => setIsAdmin(!isAdmin);

  const handleRegister = async () => {
    const { username, email, password } = userdata;
    if (!username || !email || !password) {
      toast.warning("All fields are required");
      return;
    }
    if (!usernameRegex.test(username)) {
      toast.error("Invalid username");
      return;
    }
    if (!emailRegex.test(email)) {
      toast.error("Invalid email");
      return;
    }
    if (!passwordRegex.test(password)) {
      toast.error("Password must be at least 6 chars with 1 letter & 1 number");
      return;
    }

    try {
      const api = isAdmin ? adminregisterApi : registerApi;
      const response = await api(userdata);

      if (response.status === 200) {
        toast.success(`${isAdmin ? "Admin" : "User"} registered successfully`);

        // Send welcome email
        const templateParams = { username, email };
        emailjs.send("service_4why4kd", "template_0py70k4", templateParams, "RxV2nYRkmYYVHN87h")
          .then(res => console.log("Email sent!", res.status))
          .catch(err => console.error("Email failed:", err));

        setuserdata({ username: "", email: "", password: "" });
        setauthstate(false);
      } else toast.error("Something went wrong");
    } catch (err) {
      toast.error("Registration failed");
    }
  };

  const handleLogin = async () => {
    const { email, password } = userdata;
    if (!email || !password) {
      toast.warning('Email and password are required');
      return;
    }
    if (!emailRegex.test(email)) {
      toast.error('Enter a valid email');
      return;
    }

    try {
      const api = isAdmin ? adminloginApi : LoginApi;
      const response = await api(userdata);

      if (response.status === 200) {
        toast.success('Login successful');
        sessionStorage.setItem('token', response.data.token);
        sessionStorage.setItem('userData', JSON.stringify({
          _id: response.data._id,
          username: response.data.username,
          email: response.data.email,
          profile: response.data.profile,
          phone: response.data.phone,
          pin: response.data.pin,
          address: response.data.address,
        }));
        nav(isAdmin ? '/admindash' : '/');
        setauthing(true);
      }
    } catch {
      toast.error('Invalid credentials');
    }
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center" id="auth">
      <div className="row auth-card w-75 flex-wrap">
        {/* Illustration */}
        <div className="col-md-6 p-0">
          <img
            src="https://img.freepik.com/free-vector/login-concept-illustration_114360-739.jpg?semt=ais_hybrid&w=740"
            alt="Login Illustration"
            className="auth-img"
          />
        </div>

        {/* Form */}
        <div className="col-md-6 auth-form" style={{ backgroundColor: authstate ? '#d4edda' : '#fff3cd' }}>
          <h3 className="text-center text-primary fw-bold mb-4">
            {authstate ? 'Register' : 'Login'} as {isAdmin ? 'Admin' : 'User'}
          </h3>

          <Form.Floating className="mb-3">
            <Form.Control
              type="email"
              placeholder="Email"
              value={userdata.email}
              onChange={(e) => setuserdata({ ...userdata, email: e.target.value })}
            />
            <label>Email address</label>
          </Form.Floating>

          {authstate && (
            <Form.Floating className="mb-3">
              <Form.Control
                type="text"
                placeholder="Username"
                value={userdata.username}
                onChange={(e) => setuserdata({ ...userdata, username: e.target.value })}
              />
              <label>Username</label>
            </Form.Floating>
          )}

          <Form.Floating className="mb-3">
            <Form.Control
              type="password"
              placeholder="Password"
              value={userdata.password}
              onChange={(e) => setuserdata({ ...userdata, password: e.target.value })}
            />
            <label>Password</label>
          </Form.Floating>

          <div className="d-grid mb-3">
            <button
              className="btn btn-primary py-2"
              onClick={authstate ? handleRegister : handleLogin}
            >
              {authstate ? 'Register' : 'Login'}
            </button>
          </div>

          <div className="text-center">
            <button className="btn btn-link" onClick={handleauth}>
              {authstate ? 'Already a user?' : 'Are you new?'}
            </button>
            <br />
            <button className="btn btn-sm btn-outline-dark mt-2" onClick={toggleUserType}>
              Switch to {isAdmin ? 'User' : 'Admin'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserAuth;
