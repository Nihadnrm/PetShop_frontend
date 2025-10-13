import React, { useState, useEffect } from 'react';
import AdminHeader from './AdminHeader';
import { getfeedbackApi } from '../Services/AllApi';
import { toast } from 'react-toastify';

function Feedback() {
  const [data, setData] = useState([]);

  useEffect(() => {
    handleGetFeedback();
  }, []);

  const handleGetFeedback = async () => {
    try {
      const response = await getfeedbackApi();
      if (response.status === 200) {
        setData(response.data);
      } else {
        toast.error("Failed to fetch feedbacks");
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <AdminHeader />
      <div className="container-fluid  p-4" style={{backgroundColor:"white"}}>
        <div className="card shadow p-4 rounded">
          <h4 className="mb-4 text-center text-primary">
            <i className="fa-solid fa-envelope-open-text me-2"></i>Customer Feedback
          </h4>

          <div className="table-responsive">
            <table className="table table-hover text-center align-middle table-bordered">
              <thead className="table-dark">
                <tr>
                  <th>Feedback ID</th>
                  <th>Customer Name</th>
                  <th>Email</th>
                  <th>Message</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {data.length > 0 ? (
                  data.map((item) => (
                    <tr key={item._id}>
                      <td>{item.userId?._id || 'N/A'}</td>
                      <td>{item.userId?.username || 'Unknown'}</td>
                      <td>{item.userId?.email || 'N/A'}</td>
                      <td className="text-wrap text-start text-warning" style={{ minWidth: '200px' }}>
                        {item.feedback}
                      </td>
                      <td>{new Date(item.date).toLocaleDateString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr> 
                    <td colSpan="5" className="text-center text-danger">
                      No Feedback Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Feedback;
