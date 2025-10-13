import React from 'react'
import './adminauth.css'
import Form from 'react-bootstrap/Form';
import { useState } from 'react';


function AdminAuth() {

    const[authstate,setauthstate]=useState(false)
    const yellow = { backgroundColor: "red" }; 
    const green = { backgroundColor: "orange" }; 
    
      const handleauth=()=>{
        setauthstate(!authstate)
      }

  return (
    <>
    <div
      className="container-fluid d-flex justify-content-center align-items-center bg-light"
      style={{ minHeight: '100vh' }} id='auth'
    >
      <div className="row bg-white shadow rounded-4 overflow-hidden w-75">
        <div className="col-md-6 d-flex justify-content-center align-items-center p-4 bg-light">
          <img
            src="https://img.freepik.com/free-vector/login-concept-illustration_114360-739.jpg?semt=ais_hybrid&w=740" alt="Login Illustration" className="img-fluid rounded" style={{ maxWidth: '22rem' }}
          />
        </div>

        <div className="col-md-6 p-5" style={authstate ? green:yellow}  >
          <h3 className="text-center text-primary fw-bold mb-4">
            {
              authstate? <> Register</>:<>Login</>
            }
           

          </h3>

          <Form.Floating className="mb-3">
            <Form.Control id="floatingInputCustom"type="email" placeholder="name@example.com" />
            <label htmlFor="floatingInputCustom">Email address</label>
          </Form.Floating>

          {
            authstate &&
            <>
              <Form.Floating className="mb-3">
            <Form.Control id="floatingInputCustom"type="username" placeholder="name@example.com" />
            <label htmlFor="floatingInputCustom">username</label>
          </Form.Floating>
            </>
          }
         

          <Form.Floating className="mb-3">
            <Form.Control  id="floatingPasswordCustom" type="password" placeholder="Password"/>
            <label htmlFor="floatingPasswordCustom">Password</label>
          </Form.Floating>

          <div className="d-grid mb-3">
            {
              authstate?
              <>
              <button className="btn btn-primary py-2">Register</button>

              </>
              :
              <>
              
              <button className="btn btn-primary py-2">Login</button>

              </>
            }
          </div>

          <div className="text-center">
           
             <button className='btn btn-link' onClick={handleauth}>
          {
            authstate?
            <>
            already a user?
            </>
            :
            <>
            are you new?
            </>

          }
        </button>
          </div>
        </div>
      </div>
    </div>
    
    </>
  )
}

export default AdminAuth