import React from 'react'
import { useEffect,useState } from 'react'

function PetDetail() {

useEffect(()=>{
const petdetail=JSON.parse(sessionStorage.getItem("pet"))
setpetdetail(petdetail)

},[])

const[petdetail,setpetdetail]=useState("")



  return (
   <>
   <section className="py-5 bg-light">
        <div className="container px-4 px-lg-5 my-5">
          <div className="row gx-4 gx-lg-5 align-items-center shadow rounded-4 bg-white p-4">
            
            <div className="col-md-6 text-center">
              <img
                className="img-fluid rounded shadow-sm"
                src={petdetail.image}
                alt=""
                style={{ maxHeight: '400px', objectFit: 'cover' }}
              />
            </div>

            <div className="col-md-6">
              <small className="text-muted d-block mb-2">Dog ID: {petdetail._id}</small>
              <h2 className="fw-bold mb-3">Breed: <span className="text-primary">{petdetail.breed}</span></h2>
              
              <div className="mb-3">
                <p className="mb-1"><strong>Gender:</strong>{petdetail.gender}</p>
                <p className="mb-1"><strong>Age:</strong>{petdetail.age}</p>
                <p className="mb-1"><strong>Color:</strong>{petdetail.color}</p>
                <p className="mb-1"><strong>Size:</strong>{petdetail.size}</p>
              </div>

              <div className="fs-4 text-success fw-semibold mb-4">{petdetail.price}</div>

           

             
            </div>

          </div>
        </div>
      </section>
   </>
  )
}

export default PetDetail