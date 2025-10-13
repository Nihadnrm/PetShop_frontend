import React from 'react';
import { useState, useEffect } from 'react';

function Details() {

  const [petdetails, setpetdetails] = useState("")

  useEffect(() => {
    const pet = JSON.parse(sessionStorage.getItem("details"))
    setpetdetails(pet)
  }, [])


  return (
    <>
      <section className="py-5 bg-light" data-aos="fade-up-left">
        <div className="container px-4 px-lg-5 my-5">
          <div className="row gx-4 gx-lg-5 align-items-center shadow rounded-4 bg-white p-4">

            <div className="col-md-6 text-center">
              <img
                className="img-fluid rounded shadow-sm"
                src={petdetails.image}
                alt=""
                style={{ maxHeight: '400px', objectFit: 'cover' }}
              />
            </div>

            <div className="col-md-6">
              <h2 className="fw-bold mb-3">Breed: <span className="text-primary">{petdetails.breed}</span></h2>

              <div className="mb-3">
                <p className="mb-1"><strong>Gender:</strong>{petdetails.gender}</p>
                <p className="mb-1"><strong>Age:</strong>{petdetails.age}</p>
                <p className="mb-1"><strong>Color:</strong>{petdetails.color}</p>
                <p className="mb-1"><strong>Size:</strong>{petdetails.size}</p>
              </div>

              <div className="fs-4 text-success fw-semibold mb-4">{petdetails.price}</div>

              

             
            </div>

          </div>
        </div>
      </section>
    </>
  );
}

export default Details;
