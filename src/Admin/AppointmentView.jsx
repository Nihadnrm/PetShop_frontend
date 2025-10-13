import React, { useState, useEffect } from 'react';
import AdminHeader from './AdminHeader';
import { getappointmentApi, updateAppointmentStatusApi } from '../Services/AllApi';
import { toast } from 'react-toastify';

function AppointmentView() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await getappointmentApi();
    if (response.status === 200) setData(response.data);
    else toast.error("Something went wrong");
  };

  const handleStatusChange = async (id, status) => {
    try {
      const response = await updateAppointmentStatusApi(id, status);
      if (response.status === 200) {
        setData(prev => prev.map(item => (item._id === id ? { ...item, status } : item)));
        toast.success("Status updated successfully");
      }
    } catch (e) {
      toast.error("Failed to update status");
      console.log(e);
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "pending":
        return { backgroundColor: "#ffc107", color: "#212529" };
      case "completed":
        return { backgroundColor: "#198754", color: "#fff" };
      default:
        return {};
    }
  };

  return (
    <>
      <AdminHeader />
      <div className="container-fluid py-4" style={{ backgroundColor: "white", minHeight: "100vh" }}>
        <div className="card shadow p-3 p-md-4 rounded mx-auto" style={{ maxWidth: "98%" }}>
          <h4 className="mb-4 text-center text-primary">
            <i className="fa-solid fa-calendar-check me-2"></i>
            Pet Appointment Bookings
          </h4>

          {/* Responsive Table */}
          <div className="table-responsive">
            <table className="table table-hover table-striped table-bordered text-center align-middle">
              <thead className="table-dark">
                <tr>
                  <th>Appointment ID</th>
                  <th>Pet Name</th>
                  <th>Pet Type</th>
                  <th>Breed</th>
                  <th>Service</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Owner Name</th>
                  <th>Contact</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {data.length > 0 ? (
                  data.map((item) => (
                    <tr key={item._id}>
                      <td style={{ wordBreak: "break-word" }}>{item._id}</td>
                      <td>{item.petname}</td>
                      <td>{item.category}</td>
                      <td>{item.breed}</td>
                      <td>{item.service}</td>
                      <td>{item.date}</td>
                      <td>{item.time}</td>
                      <td>{item.owner}</td>
                      <td>{item.contact}</td>
                      <td>
                        <select
                          className="form-select form-select-sm"
                          value={item.status}
                          onChange={(e) =>
                            handleStatusChange(item._id, e.target.value)
                          }
                          style={{
                            fontWeight: 600,
                            ...getStatusStyle(item.status),
                          }}
                        >
                          <option value="pending">Pending</option>
                          <option value="completed">Completed</option>
                        </select>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="10" className="text-danger">
                      No appointments
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Extra Responsive Styling for Small Screens */}
      <style jsx="true">{`
        @media (max-width: 768px) {
          table th,
          table td {
            font-size: 0.8rem;
            white-space: nowrap;
          }
          h4 {
            font-size: 1.1rem;
          }
        }

        @media (max-width: 576px) {
          table {
            font-size: 0.75rem;
          }
          .card {
            padding: 1rem !important;
          }
          select.form-select-sm {
            font-size: 0.75rem;
            padding: 0.25rem;
          }
        }
      `}</style>
    </>
  );
}

export default AppointmentView;
