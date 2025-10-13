import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "./Header";
import { addToWishlistApi, addtocartApi } from "../Services/AllApi";
import { toast } from "react-toastify";
import { addtocartcontext, addwishlistcontext } from "../ContextApi/Context";

function SearchResult() {
  const location = useLocation();
  const results = location.state?.pets || [];
  const nav = useNavigate();

  const { cart, setcart } = useContext(addtocartcontext);
  const { wishlist, setwishlist } = useContext(addwishlistcontext);

  // Add to wishlist
  const handleWishlist = async (petId) => {
    try {
      const response = await addToWishlistApi({ petId });
      if (response.status === 200) {
        setwishlist(prev => [...prev, response.data]); // update context
        toast.success("Item added to wishlist");
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast.info("Pet already in wishlist");
      } else {
        toast.error("Not added to wishlist, something went wrong");
      }
      console.error(error);
    }
  };

  // Add to cart
  const handleCart = async (petId, quantity = 1) => {
    try {
      const response = await addtocartApi({ petId, quantity });
      if (response.status === 200) {
        setcart(prev => [...prev, response.data]); // update context
        const cartItem = response.data;
        if (cartItem.quantity === quantity) {
          toast.success("Item added to cart 🛒");
        } else if (cartItem.quantity > quantity) {
          toast.info(`Quantity increased → ${cartItem.quantity} ✅`);
        }
      } else {
        toast.error("Not added to cart, something went wrong ❌");
      }
    } catch (err) {
      toast.error("Not added to cart, something went wrong ❌");
    }
  };

  // Navigate to buy page
  const handleBuyPage = (item) => {
    sessionStorage.setItem("petdata", JSON.stringify(item));
    nav("/buy");
  };

  // Navigate to details page
  const handleDetails = (item) => {
    sessionStorage.setItem("details", JSON.stringify(item));
    nav("/details");
  };

  return (
    <>
      <Header />

      <div className="container-fluid">
        <h2 className="mb-4 text-center text-primary">Search Results</h2>
        <section className="py-5">
          <div className="container px-4 px-lg-5 mt-5">
            <div className="row gx-2 gx-lg-3 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
              {results.length > 0 ? (
                results.map((item, index) => (
                  <div key={index} className="col mb-4 shadow">
                    <div className="card h-100 shadow-sm" style={{ fontSize: "0.85rem" }}>
                      <button onClick={() => handleDetails(item)} className="border-0 w-100 p-0">
                        <img
                          className="card-img-top img-fluid"
                          src={item.image}
                          alt={item.breed}
                          style={{ objectFit: "cover", height: "150px" }}
                        />
                      </button>

                      <div className="card-body p-2 text-center">
                        <p className="mb-1">
                          Breed: <span className="fw-bold text-success">{item.breed}</span>
                        </p>
                        <p className="mb-1">Gender: <span className="text-muted">{item.gender}</span></p>
                        <p className="mb-1">Age: <span className="text-muted">{item.age}</span></p>
                        <p className="mb-1">Color: <span className="text-muted">{item.color}</span></p>
                        <p className="mb-1">Size: <span className="text-muted">{item.size}</span></p>
                        <p className="mb-1">Price: <span className="text-muted">{item.price}</span></p>
                      </div>

                      <div className="card-footer p-2 pt-0 border-top-0 bg-transparent text-center">
                        <button className="btn btn-sm me-1" onClick={() => handleCart(item._id)}>
                          <i className="fa-solid fa-cart-arrow-down" style={{ color: "#63ea1a" }}></i>
                        </button>
                        <button className="btn btn-sm me-1" onClick={() => handleWishlist(item._id)}>
                          <i className="fa-solid fa-heart" style={{ color: "#f90606" }}></i>
                        </button>
                        <button className="btn btn-sm btn-success" onClick={() => handleBuyPage(item)}>
                          Buy
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <h2 className="text-center">No pets found.</h2>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default SearchResult;
