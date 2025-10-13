import commonApi from "./commonApi";
import base_url from "./baseUrl";


//users api

export const registerApi=async(data)=>{
    return await commonApi(`${base_url}/register`,"POST","",data)

}
export const LoginApi=async(data)=>{
    return await commonApi(`${base_url}/login`,"POST","",data)

}
export const updateProfileApi=async(data,header)=>{

    return await commonApi(`${base_url}/update`,"PUT",header,data)

}
export const allusersApi=async()=>{

    return await commonApi(`${base_url}/allusers`,"GET","","")

}
export const deleteuserApi = async (id) => {
  const header = {
Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    "Content-Type": "application/json",
  };

  return await commonApi(`${base_url}/deleteuser/${id}`, "DELETE", header);
};

//adminApi
export const adminregisterApi=async(data)=>{
  return await commonApi(`${base_url}/adminregister`,"POST","",data)
}
export const adminloginApi=async(data)=>{
  return await commonApi(`${base_url}/adminlogin`,"POST","",data)
}

//pets api

export const addpets=async(data)=>{
  return await commonApi(`${base_url}/addpets`,"POST","",data)
}
export const getpets=async()=>{
  return await commonApi(`${base_url}/getpets`,"GET")
}
export const editpets=async(id,data)=>{
  const header = {
   Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    "Content-Type": "application/json",
  };

  return await commonApi(`${base_url}/editpet/${id}`,"PUT",header,data)
}
export const deletepets=async(id)=>{
     const header = {
   Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    "Content-Type": "application/json",
  };
  return await commonApi(`${base_url}/deletepet/${id}`,"DELETE",header)
}

//feedback

export const addfeedbackApi = async (data) => {
  const header = {
    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    "Content-Type": "application/json",
  };
  return await commonApi(`${base_url}/addfeedback`, "POST", header, data);
};

export const getfeedbackApi = async () => {
  const header = {
    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    "Content-Type": "application/json",
  };
  return await commonApi(`${base_url}/getfeedback`, "GET", header);
};

//appointment api

export const addappointmentApi = async (data) => {
  const header = {
    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    "Content-Type": "application/json",
  };
  return await commonApi(`${base_url}/addappointment`, "POST", header, data);
};

export const getappointmentApi = async () => {
  const header = {
    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    "Content-Type": "application/json",
  };
  return await commonApi(`${base_url}/getappointment`, "GET", header);
};
export const getuserappointmentApi = async () => {
  const header = {
    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    "Content-Type": "application/json",
  };
  return await commonApi(`${base_url}/getuserappointment`, "GET", header);
};


export const updateAppointmentStatusApi = async (id, status) => {
  const header = {
    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    "Content-Type": "application/json",
  };

  
  return await commonApi(`${base_url}/appointment/status`, "PUT", header, { id, status });
};


//wishlistApi

export const addToWishlistApi = async (data) => {
  const header = {
    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    "Content-Type": "application/json",
  };
  return await commonApi(`${base_url}/addtowish`,"POST", header,data);
};
export const getWishlistApi = async () => {
  const header = {
    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    "Content-Type": "application/json",
  };
  return await commonApi(`${base_url}/getwishlist`,"GET",header);
};
export const deleteWishlistApi = async (id) => {
  const header = {
    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    "Content-Type": "application/json",
  };
  return await commonApi(`${base_url}/deletefromwishlist/${id}`,"DELETE",header);
};

//cartApi

export const addtocartApi = async (data) => {
  const header = {
    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    "Content-Type": "application/json",
  };
  return await commonApi(`${base_url}/addtocart`, "POST", header, data);
}
export const getcartApi = async () => {
  const header = {
    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    "Content-Type": "application/json",
  };
  return await commonApi(`${base_url}/getcart`,"GET",header);
}
export const deletecartApi = async (id) => {
  const header = {
    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    "Content-Type": "application/json",
  };
  return await commonApi(`${base_url}/deletecart/${id}`,"DELETE",header);
}

//payment

export const paymentApi = async (data) => {
  const header = {
    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    "Content-Type": "application/json",
  };
  return await commonApi(`${base_url}/pay`, "POST", header, data);
};
export const getordersApi = async () => {
  
  return await commonApi(`${base_url}/getorders`, "GET");
};

export const getuserordersApi = async () => {
  const header = {
    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    "Content-Type": "application/json",
  };
  return await commonApi(`${base_url}/getuserorders`, "GET", header);
};
export const updateorderstatusApi = async (id,status) => {
  const header = {
    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    "Content-Type": "application/json",
  };
  return await commonApi(`${base_url}/updateorderstatus`, "PUT", header,{id,status});
};





