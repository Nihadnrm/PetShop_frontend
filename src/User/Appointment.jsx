import React, { useState, useEffect } from 'react';
import './appointment.css';
import { addappointmentApi } from '../Services/AllApi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Header from '../components/Header';

function Appointment() {
  const [appointment, setappointment] = useState({
    petname: "", category: "", breed: "", service: "", date: "", time: "", owner: "", contact: ""
  });
  const [userdata, setuserdata] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const nav = useNavigate();

  useEffect(() => {
    const user = sessionStorage.getItem("userData");
    if (user) setuserdata(JSON.parse(user));
  }, []);

  const handleAddAppointment = async () => {
    const { petname, category, breed, service, date, time, owner, contact } = appointment;
    if (!petname || !category || !breed || !service || !date || !time || !owner || !contact) {
      toast.warning("Enter valid inputs");
      return;
    }
    if (!userdata) {
      toast.warning("You must login first!");
      return;
    }

    const response = await addappointmentApi(appointment);
    if (response.status === 200) {
      toast.success("Appointment booked successfully");
      setappointment({ petname: "", category: "", breed: "", service: "", date: "", time: "", owner: "", contact: "" });
      nav("/");
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <Header/>
      <div className='container-fluid p-5' style={{backgroundColor: "white"}}> 
        <div className="appointment-form" data-aos="fade-up-left">
          <h2 className='text-primary'>Book a Pet Appointment</h2>
          <form>
            {/* Pet Name */}
            <div className="mb-3">
              <label className="form-label">Pet Name</label>
              <input type="text" className="form-control" placeholder="e.g. Tommy" 
                onChange={(e) => setappointment({ ...appointment, petname: e.target.value })} />
            </div>

            {/* Pet Type */}
            <div className="mb-3">
              <label className="form-label">Pet Type</label>
              <select className="form-select" onChange={(e) => setappointment({ ...appointment, category: e.target.value })}>
                <option value="" disabled selected>Select</option>
                <option>Dog</option>
                <option>Cat</option>
                <option>Bird</option>
                <option>Other</option>
              </select>
            </div>

            {/* Breed */}
            <div className="mb-3">
              <label className="form-label">Breed Name</label>
              <input type="text" className="form-control" placeholder='e.g. Siberian Husky' 
                onChange={(e) => setappointment({ ...appointment, breed: e.target.value })} />
            </div>

            {/* Service */}
            <div className="mb-3">
              <label className="form-label">Service</label>
              <select className="form-select" onChange={(e) => setappointment({ ...appointment, service: e.target.value })}>
                <option value="" disabled selected>Select a service</option>
                <option>Vet Checkup</option>
                <option>Grooming</option>
                <option>Vaccination</option>
                <option>Dental Care</option>
                <option>Deworming</option>
              </select>
            </div>

            {/* Date */}
            <div className="mb-3">
              <label className="form-label">Preferred Date</label>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => {
                  setappointment({ ...appointment, date: date.toISOString().split("T")[0] });
                  setSelectedDate(date);
                }}
                className="form-control"
                minDate={new Date()}
                placeholderText="Select a date"
                dateFormat="yyyy-MM-dd"
              />
            </div>

            {/* Time */}
            <div className="mb-3">
              <label className="form-label">Preferred Time</label>
              <input type="time" className="form-control" 
                onChange={(e) => setappointment({ ...appointment, time: e.target.value })} />
            </div>

            {/* Owner */}
            <div className="mb-3">
              <label className="form-label">Owner's Name</label>
              <input type="text" className="form-control" placeholder="e.g. John Doe" 
                onChange={(e) => setappointment({ ...appointment, owner: e.target.value })} />
            </div>

            {/* Contact */}
            <div className="mb-3">
              <label className="form-label">Contact (Phone or Email)</label>
              <input type="text" className="form-control" placeholder="e.g. 9876543210 or john@email.com" 
                onChange={(e) => setappointment({ ...appointment, contact: e.target.value })} />
            </div>

            <button type="button" className="btn btn-success" onClick={handleAddAppointment}>
              Book Appointment
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Appointment;
