import React, { useState, useEffect } from "react";
import AdminHeader from "./AdminHeader";
import { getordersApi, updateorderstatusApi } from "../Services/AllApi";
import { toast } from "react-toastify";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await getordersApi();
      if (response.status === 200) {
        setOrders(response.data);
      } else {
        toast.error("Failed to fetch orders");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong while fetching orders");
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await updateorderstatusApi(orderId, newStatus);
      if (response.status === 200) {
        toast.success("Status updated successfully");
        setOrders((prev) =>
          prev.map((order) =>
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        );
      } else {
        toast.error("Failed to update status");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong while updating status");
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "pending":
        return { backgroundColor: "#ffc107", color: "#212529" };
      case "shipped":
        return { backgroundColor: "#0d6efd", color: "#fff" };
      case "delivered":
        return { backgroundColor: "#198754", color: "#fff" };
      default:
        return { backgroundColor: "#fff", color: "#000" };
    }
  };

  const formatDate = (date) => {
    const d = new Date(date || Date.now());
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <>
      <AdminHeader />
      <div
        className="container-fluid py-4 px-3"
        style={{ backgroundColor: "white", minHeight: "100vh" }}
      >
        <div
          className="card shadow rounded p-3 p-md-4 bg-transparent mx-auto"
          style={{ maxWidth: "95%" }}
        >
          <h4 className="mb-4 text-center text-primary">
            <i className="fa-solid fa-box-open me-2"></i>Order Management
          </h4>

          <div className="table-responsive">
            <table className="table table-hover table-striped table-bordered text-center align-middle">
              <thead className="table-dark">
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Address</th>
                  <th>Image</th>
                  <th>Pet Name</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.length > 0 ? (
                  orders.map((item) => (
                    <tr key={item._id}>
                      <td style={{ wordBreak: "break-word" }}>{item._id}</td>
                      <td>
                        <strong>{item.userId?.username || "Unknown User"}</strong>
                      </td>
                      <td style={{ wordBreak: "break-word" }}>{item.address || "-"}</td>
                      <td>
                        <img
                          src={item.petId?.image || "/default-pet.jpg"}
                          alt={item.petId?.breed || "Pet"}
                          className="img-fluid rounded"
                          style={{ maxHeight: "70px", width: "auto" }}
                        />
                      </td>
                      <td>
                        <span className="badge bg-info text-dark px-3 py-2 rounded-pill">
                          {item.petId?.breed || "Unknown"}
                        </span>
                        <br />
                        <small>
                          Age: {item.petId?.age || "-"} • Gender: {item.petId?.gender || "-"} • Color: {item.petId?.color || "-"}
                        </small>
                      </td>
                      <td className="fw-bold text-success">{item.petId?.price || "-"}</td>
                      <td>
                        <select
                          className="form-select form-select-sm mx-auto"
                          value={item.status || "pending"}
                          onChange={(e) => handleStatusChange(item._id, e.target.value)}
                          style={{
                            fontWeight: 600,
                            minWidth: "100px",
                            ...getStatusStyle(item.status),
                          }}
                        >
                          <option value="pending">Pending</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                        </select>
                      </td>
                      <td>{formatDate(item.createdAt)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center">
                      <h5 className="text-muted">No Orders</h5>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Custom Responsive Styles */}
      <style jsx="true">{`
        @media (max-width: 768px) {
          .card {
            padding: 1rem !important;
          }
          table th,
          table td {
            font-size: 0.8rem;
            white-space: nowrap;
          }
          img {
            max-height: 60px !important;
          }
        }

        @media (max-width: 576px) {
          table {
            font-size: 0.75rem;
          }
          h4 {
            font-size: 1.1rem;
          }
          .badge {
            font-size: 0.7rem;
            padding: 0.3rem 0.5rem;
          }
        }
      `}</style>
    </>
  );
}

export default Orders;
