import React, { useState, useEffect, useContext } from 'react';
import { getpets, addToWishlistApi, addtocartApi } from '../Services/AllApi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { addtocartcontext, addwishlistcontext, petcallcontext } from '../ContextApi/Context';

function Petcard() {
  const [category, setCategory] = useState("");
  const [petinfo, setPetinfo] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  const { cart, setcart } = useContext(addtocartcontext);
  const { wishlist, setwishlist } = useContext(addwishlistcontext);
  const { handlePetcards } = useContext(petcallcontext);

  const nav = useNavigate();

  useEffect(() => {
    const savedCategory = sessionStorage.getItem("selectedcategory");
    setCategory(savedCategory);
  }, []);

  useEffect(() => {
    fetchAndFilterPets();
  }, [category]);

  const fetchAndFilterPets = async () => {
    try {
      setLoading(true); // Start loading
      const response = await getpets();
      const pets = response.data;
      const filtered = category ? pets.filter(item => item.category === category) : pets;
      setPetinfo(filtered);
    } catch (err) {
      toast.error("Failed to fetch pets");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handlewishlist = async (petId) => {
    try {
      const response = await addToWishlistApi({ petId });
      if (response.status === 200) {
        setwishlist(prev => [...prev, response.data]);
        toast.success("Item added to wishlist");
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast.info("Pet already in wishlist");
      } else {
        toast.error("Not added to wishlist, something went wrong");
      }
    }
  };

const handlecart = async (petId, quantity = 1) => {
  try {
    const response = await addtocartApi({ petId, quantity });

    if (response.status === 200) {
      const data = response.data;

      if (data.removed) {
        // If item was deleted previously, treat next add normally
        toast.success("Item added to cart 🛒");
      } else {
        // If quantity > 1, it means item existed and got incremented
        if (quantity < data.quantity) {
          toast.info("Quantity incremented in cart 🛒");
        } else {
          toast.success("Item added to cart 🛒");
        }
      }

      // Update cart state
      setcart(prev => {
        const exists = prev.find(item => item._id === data._id);
        if (exists) {
          // Update quantity
          return prev.map(item =>
            item._id === data._id ? { ...item, quantity: data.quantity } : item
          );
        } else {
          // Add new item
          return [...prev, data];
        }
      });
    }
  } catch (err) {
    toast.error("Not added to cart, something went wrong ❌");
  }
};



  const handlebuypage = (item) => {
    sessionStorage.setItem("petdata", JSON.stringify(item));
    nav("/buy");
  };

  const handleDetails = (item) => {
    sessionStorage.setItem("details", JSON.stringify(item));
    nav("/details");
  };

  return (
    <>
      <Header />
      <div className='container-fluid'  style={{backgroundColor:"white"}}>
        <h2 className="mb-4 text-center text-primary ">{category || "All Pets"}</h2>
        <section className="py-5">
          <div className="container px-4 px-lg-5 mt-5">

            {/* Loading Spinner */}
            {loading ? (
              <div className="text-center my-5">
                <div className="spinner-border text-primary" role="status" style={{ width: "3rem", height: "3rem" }}></div>
                <p className="mt-2 text-muted">Loading pets...</p>
              </div>
            ) : (
              <div className="row gx-2 gx-lg-3 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                {petinfo.length > 0 ? (
                  petinfo.map((item, index) => (
                    <div key={index} className="col mb-4 shadow">
                      <div className="card h-100 shadow-sm" style={{ fontSize: '0.85rem' }}>
                        <button onClick={() => handleDetails(item)}>
                          <img
                            className="card-img-top img-fluid"
                            src={item.image}
                            alt={item.breed}
                            style={{ objectFit: 'cover', height: '150px' }}
                          />
                        </button>

                        <div className="card-body p-2 text-center">
                          <p className="mb-1">Breed: <span className="fw-bold text-success">{item.breed}</span></p>
                          <p className="mb-1">Gender: <span className="text-muted">{item.gender}</span></p>
                          <p className="mb-1">Age: <span className="text-muted">{item.age}</span></p>
                          <p className="mb-1">Color: <span className="text-muted">{item.color}</span></p>
                          <p className="mb-1">Size: <span className="text-muted">{item.size}</span></p>
                          <p className="mb-1">Price: <span className="text-muted">{item.price}</span></p>
                        </div>

                        <div className="card-footer p-2 pt-0 border-top-0 bg-transparent text-center">
                          <button className="btn btn-sm me-1" onClick={() => handlecart(item._id)}>
                            <i className="fa-solid fa-cart-arrow-down" style={{ color: "#63ea1a" }}></i>
                          </button>
                          <button className="btn btn-sm me-1" onClick={() => handlewishlist(item._id)}>
                            <i className="fa-solid fa-heart" style={{ color: "#f90606" }}></i>
                          </button>
                          <button className="btn btn-sm btn-success" onClick={() => handlebuypage(item)}>Buy</button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <h2 className="text-center">No pets</h2>
                )}
              </div>
            )}

          </div>
        </section>
      </div>
    </>
  );
}

export default Petcard;
