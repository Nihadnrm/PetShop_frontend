import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { getWishlistApi, deleteWishlistApi } from "../Services/AllApi";
import { toast } from "react-toastify";
import "./petcard.css";

function Wishlist() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  useEffect(() => {
    handlegetdata();
  }, []);

  const handlegetdata = async () => {
    try {
      setLoading(true);
      const response = await getWishlistApi();
      if (response.status === 200) setData(response.data);
    } catch (err) {
      toast.error("Failed to fetch wishlist");
    } finally {
      setLoading(false);
    }
  };

  const handledelete = async (id) => {
    try {
      const response = await deleteWishlistApi(id);
      if (response.status === 200) {
        toast.success("Item removed from wishlist");
        handlegetdata();
      } else {
        toast.error("Something went wrong");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <Header />
      <div className="container-fluid bg-white">
        <h2 className="mb-4 text-center text-primary pt-4">Your Wishlist</h2>
        <section className="py-5">
          <div className="container px-4 px-lg-5 mt-5">
            {loading ? (
              <div className="text-center my-5">
                <div
                  className="spinner-border text-primary"
                  role="status"
                  style={{ width: "3rem", height: "3rem" }}
                ></div>
                <p className="mt-2 text-muted">Loading wishlist...</p>
              </div>
            ) : (
              <div className="row g-3 row-cols-2 row-cols-md-3 row-cols-lg-4 justify-content-center">
                {data.length > 0 ? (
                  data.map((item) => (
                    <div key={item._id} className="col mb-4">
                      <div className="card h-100 shadow-sm border-0">
                        <img
                          src={item.petId.image}
                          alt={item.petId.breed}
                          className="card-img-top img-fluid pet-img"
                        />

                        <div className="card-body p-2 text-center">
                          <p className="mb-1">
                            Breed: <span className="fw-bold text-success">{item.petId.breed}</span>
                          </p>
                          <p className="mb-1">
                            Gender: <span className="text-muted">{item.petId.gender}</span>
                          </p>
                          <p className="mb-1">
                            Age: <span className="text-muted">{item.petId.age}</span>
                          </p>
                          <p className="mb-1">
                            Color: <span className="text-muted">{item.petId.color}</span>
                          </p>
                          <p className="mb-1">
                            Size: <span className="text-muted">{item.petId.size}</span>
                          </p>
                          <h6 className="text-primary mt-2">{item.petId.price}</h6>
                        </div>

                        <div className="card-footer p-2 pt-0 border-top-0 bg-transparent text-center">
                          <button
                            className="btn btn-sm border-0"
                            onClick={() => handledelete(item._id)}
                          >
                            <i className="fa-solid fa-trash fa-sm"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <h4 className="text-danger text-center">No items in Wishlist</h4>
                )}
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}

export default Wishlist;
