import React from 'react';
import AdminHeader from './AdminHeader';
import Addpetmodal from './Addpetmodal';
import { useNavigate } from 'react-router-dom';
import EditpetModal from './EditpetModal';
import { useState,useEffect } from 'react';
import { getpets } from '../Services/AllApi';
import { toast } from 'react-toastify';
import { deletepets } from '../Services/AllApi';

function Pets() {

  useEffect(()=>{
   handlegetPets()
 
  },[])

  const[pets,setpets]=useState([])

  const nav = useNavigate()

  const hanndleDetails = (petdetails) => {
    sessionStorage.setItem("pet",JSON.stringify(petdetails))
    nav('/petdetails')
  }

  const handlegetPets=async()=>{
     const response= await getpets()
     if(response.status===200){
       setpets(response.data)
     }
     else{
      toast.error("something went wrong")
     }
  }

  const handledeletepets=async(id)=>{
    const response=await deletepets(id)
    if(response.status===200){
      handlegetPets()
    }
    else{
      toast.error("something went wrong")
    }
  }


  return (
    <>
      <AdminHeader />

      <div className="container-fluid " style={{overflowY: 'auto',backgroundColor:"white"}}>
        <div className="d-flex justify-content-between align-items-center my-5 ">
          <h3 className="text-primary">🐾 Available Pets</h3>
          <Addpetmodal data={handlegetPets} />
        </div>

        <div className="table-responsive shadow rounded">
          <table className="table table-hover align-middle text-center">
            <thead className="table-dark">
              <tr>
                <th>Category</th>
                <th>Image</th>
                <th>Breed</th>
                <th>Gender</th>
                <th>Age</th>
                <th>Color</th>
                <th>Size</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                pets.length>0?
                pets.map((item)=>(
                 <tr>
                <td>{item.category}</td>
                <td>
                  <img
                    src={item.image}
                    alt=""
                    style={{ maxHeight: '60px',maxWidth:"60px", borderRadius: '5px', objectFit: 'cover' }}
                  />
                </td>
                <td>{item.breed}</td>
                <td>{item.gender}</td>
                <td>{item.age}</td>
                <td>{item.color}</td>
                <td>{item.size}</td>
                <td className="fw-bold text-success">{item.price}</td>
                <td>
                  <div className="d-flex justify-content-center gap-2">
                    <button className="btn btn-outline-primary btn-sm" title="View" onClick={()=>hanndleDetails(item)}>
                      <i className="fa-solid fa-eye"></i>
                    </button>
                    <EditpetModal data={item} data2={handlegetPets} />

                    <button className="btn btn-outline-danger btn-sm" title="Delete" onClick={()=>handledeletepets(item._id)}>
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
                ))
                :
                <h3 className='text-center text-danger'>No Pets Added</h3>
              }
             
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Pets;
