import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { updateProfileApi } from '../Services/AllApi'
import base_url from '../Services/baseUrl'

function EditProfile() {
  const [userdata, setuserdata] = useState({
    username: '',
    email: '',
    phone: '',
    pin: '',
    address: '',
    profile: ''
  })
  const [preview, setpreview] = useState('')

  const nav = useNavigate()

  useEffect(() => {
    const data = sessionStorage.getItem('userData')
    if (data) setuserdata(JSON.parse(data))
  }, [])

  useEffect(() => {
    if (userdata.profile && userdata.profile.type) {
      setpreview(URL.createObjectURL(userdata.profile))
    } else if (typeof userdata.profile === 'string' && userdata.profile !== '') {
      setpreview(`${base_url}/images/${userdata.profile}`)
    } else {
      setpreview('')
    }
  }, [userdata.profile])

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const phoneRegex = /^[0-9]{10}$/
  const pinRegex = /^[0-9]{6}$/

  const handleEdit = async () => {
    const { username, email, phone, pin, address, profile } = userdata

    if (!username || !email || !phone || !pin || !address) {
      toast.error('All fields are required')
      return
    }

    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address')
      return
    }

    if (!phoneRegex.test(phone)) {
      toast.error('Phone number must be exactly 10 digits')
      return
    }

    if (!pinRegex.test(pin)) {
      toast.error('PIN code must be exactly 6 digits')
      return
    }

    const headers = {
      Authorization: `token ${sessionStorage.getItem('token')}`,
      'Content-Type': profile && profile.type ? 'multipart/form-data' : 'application/json'
    }

    const response = await updateProfileApi(userdata, headers)

    if (response?.status === 200) {
      toast.success('Profile updated successfully')
      sessionStorage.setItem('userData', JSON.stringify(response.data))
      nav('/userauth')
    } else {
      toast.error('Something went wrong, please try again')
    }
  }

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6 shadow p-4 rounded bg-white">

          <h5 className="text-primary mb-4 text-center">Edit Profile</h5>

          <form>
            <div className="d-flex justify-content-center mb-4">
              <label htmlFor="fl">
                <img
                  src={
                    preview ||
                    'https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg'
                  }
                  alt="Profile"
                  className="rounded-circle shadow"
                  style={{ width: '100px', height: '100px', objectFit: 'cover', cursor: 'pointer' }}
                />
              </label>
              <input
                type="file"
                id="fl"
                style={{ display: 'none' }}
                onChange={(e) => setuserdata({ ...userdata, profile: e.target.files[0] })}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                value={userdata.username}
                onChange={(e) => setuserdata({ ...userdata, username: e.target.value })}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={userdata.email}
                onChange={(e) => setuserdata({ ...userdata, email: e.target.value })}
              />
            </div>

            <div className="row">
              <div className="mb-3 col-12 col-md-6">
                <label htmlFor="mobile" className="form-label">Mobile</label>
                <input
                  type="tel"
                  className="form-control"
                  id="mobile"
                  value={userdata.phone}
                  onChange={(e) => setuserdata({ ...userdata, phone: e.target.value })}
                  maxLength="10"
                />
              </div>

              <div className="mb-3 col-12 col-md-6">
                <label htmlFor="pincode" className="form-label">Pincode</label>
                <input
                  type="text"
                  className="form-control"
                  id="pincode"
                  value={userdata.pin}
                  onChange={(e) => setuserdata({ ...userdata, pin: e.target.value })}
                  maxLength="6"
                />
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="address" className="form-label">Address</label>
              <textarea
                className="form-control"
                id="address"
                rows="3"
                value={userdata.address}
                onChange={(e) => setuserdata({ ...userdata, address: e.target.value })}
              ></textarea>
            </div>

            <div className="d-grid">
              <button type="button" className="btn btn-primary" onClick={handleEdit}>
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditProfile
