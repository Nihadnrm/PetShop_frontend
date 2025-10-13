import React from 'react'
import Header from '../components/Header'
import { Link } from 'react-router-dom'

function PaymentError() {
  return (
    <>
      <Header />

      <div className="container-fluid" style={{ height: "100vh", maxWidth: "100vw" }}>
        <div className="d-flex justify-content-center align-items-center h-100">
          <div className="row w-100 h-75">
            
            <div className="col-12 col-md-6 d-flex flex-column justify-content-center align-items-center text-center mb-4 mb-md-0">
              <h2 className="text-danger my-3">
                Sorry your Payment is Unsuccessful
              </h2>
              <h6 className="my-3">
                We apologize for the inconvenience caused and appreciate your visit at Petshop
              </h6>
              <Link to="/" className="btn btn-primary mt-2">
                Go Home
              </Link>
            </div>

            <div className="col-12 col-md-6 d-flex justify-content-center align-items-center">
              <img
                src="https://i.pinimg.com/originals/9d/16/7e/9d167e72839894c971c90f60ab00d916.gif"
                alt="Payment Error"
                className="img-fluid"
                style={{ maxHeight: "300px" }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PaymentError
