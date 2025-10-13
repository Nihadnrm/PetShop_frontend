import React from 'react';
import AdminHeader from './AdminHeader';
import { useEffect, useState } from 'react';
import { allusersApi } from '../Services/AllApi';
import { deleteuserApi } from '../Services/AllApi';
import { toast } from 'react-toastify';

function Customers() {

  const [userdata, setuserdata] = useState([])


  useEffect(() => {
    getdata()

  }, [])

  const getdata = async () => {
    const response = await allusersApi()
    if (response.status === 200) {
      setuserdata(response.data)
    }
    else {
      console.log(response);

    }
  }

  const handledelete=async(id)=>{
    const response=await deleteuserApi(id)
    if(response.status===200){
      toast.success("delete successfully")
      getdata()
    }
    else{
      toast.error("something went wrong")
    }

  }


  return (
    <>
      <AdminHeader />
      <div className="container-fluid " style={{backgroundColor:"white"}}>
      <div className=" px-2 ">
        <div className="card shadow rounded p-4 ">
          <h4 className="mb-4 text-center text-success">
            <i className="fa-solid fa-person me-2" style={{ color: '#75a4f5' }}></i>
            Customer Details
          </h4>

          <div className="table-responsive ">
            <table className="table table-hover table-striped table-bordered text-center align-middle">
              <thead className="table-dark">
                <tr>
                  <th>Customer</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>PIN</th>
                  <th>Address</th>
                  <th>Orders</th>
                  <th>Joined</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {
                  userdata.length > 0 ?
                    userdata.map((item) => (
                      <tr>
                        <td>
                          <strong>{item.username}</strong>
                          <br />
                          <small className="text-muted">ID: {item._id}</small>
                        </td>
                        <td>{item.email}</td>
                        <td>{item.phone}</td>
                        <td>{item.pin}</td>
                        <td>{item.address}</td>
                        <td>5</td>
                        <td>
                          {item.loginTime
                            ? new Date(item.loginTime).toLocaleString()
                            : "Not Available"}
                        </td>
                        <td><button className='btn' onClick={()=>handledelete(item._id)}><i className="fa-solid fa-trash"></i></button></td>
                      </tr>

                    ))
                    :
                    <tr>
                      <td colSpan="7">
                        <h5 className="text-warning text-center mb-0">No users found</h5>
                      </td>
                    </tr>
                }

              </tbody>
            </table>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}

export default Customers;
