import React, { useEffect, useState, useContext } from "react";
import { Navbar, Nav, NavDropdown, Container, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./header.css";
import {
  addwishlistcontext,
  addtocartcontext,
  petcallcontext,
} from "../ContextApi/Context.jsx";
import { getWishlistApi, getcartApi, getpets } from "../Services/AllApi.js";
import base_url from "../Services/baseUrl.js";
import { toast } from "react-toastify";

function Header() {
  const [userdata, setuserdata] = useState(null);
  const [allPets, setAllPets] = useState([]); // All pets for search
  const [filteredPets, setFilteredPets] = useState([]); // Search results

  const { wishlist } = useContext(addwishlistcontext);
  const { cart } = useContext(addtocartcontext);
  const { handlePetcards } = useContext(petcallcontext);

  const [wishlength, setwishlength] = useState(0);
  const [carts, setcarts] = useState(0);

  const nav = useNavigate();

  // Load user data
  useEffect(() => {
    const storedata = sessionStorage.getItem("userData");
    if (storedata) setuserdata(JSON.parse(storedata));
  }, []);

  // Load wishlist & cart counts when context changes
  useEffect(() => {
    const fetchWishlist = async () => {
      const response = await getWishlistApi();
      if (response.status === 200) setwishlength(response.data.length);
    };

    const fetchCart = async () => {
      const response = await getcartApi();
      if (response.status === 200) setcarts(response.data.length);
    };

    fetchWishlist();
    fetchCart();
  }, [wishlist, cart]);

  // Fetch all pets once for search
  useEffect(() => {
    const fetchPets = async () => {
      const response = await getpets();
      if (response.status === 200) {
        setAllPets(response.data);
        setFilteredPets(response.data);
      } else {
        toast.error("Failed to fetch pets");
      }
    };
    fetchPets();
  }, []);

  // Handle search input
  const handleSearch = (query) => {
    if (!query) {
      setFilteredPets(allPets); // reset search if empty
      return;
    }

    const results = allPets.filter(
      (item) =>
        item.breed?.toLowerCase().includes(query.toLowerCase()) ||
        item.category?.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredPets(results);
    nav("/search", { state: { pets: results } }); // navigate with results
  };

  return (
    <Navbar expand="lg" bg="light" className="shadow-sm py-3 sticky-top" id="nav">
      <Container fluid>
        {/* Logo */}
        <Link to="/">
          <img
            src="https://png.pngtree.com/png-vector/20220828/ourmid/pngtree-pets-cat-and-dog-vector-png-image_6127516.png"
            alt="Pet Logo"
            style={{ height: "60px" }}
            className="me-3"
          />
        </Link>

        <Navbar.Toggle aria-controls="navbarScroll"  />
        <Navbar.Collapse id="navbarScroll">
          {/* Categories */}
          <Nav className="me-auto ms-3 my-2 my-lg-0" navbarScroll>
            <NavDropdown
              title={<span className="fw-bold text-primary">Categories</span>}
              id="navbarScrollingDropdown"
            >
              {["Dog", "Cat", "Bird", "Fish", "Small Mammals"].map((cat) => (
                <NavDropdown.Item as="div" key={cat}>
                  <button
                    className="btn btn-outline-primary w-100 text-start"
                    onClick={() => handlePetcards(cat)}
                  >
                    {cat === "Dog"
                      ? "🐶 "
                      : cat === "Cat"
                      ? "🐱 "
                      : cat === "Bird"
                      ? "🐦 "
                      : cat === "Fish"
                      ? "🐠 "
                      : "🐹 "}
                    {cat}s
                  </button>
                </NavDropdown.Item>
              ))}
            </NavDropdown>
          </Nav>

          {/* Search */}
          <Form className="d-flex mx-auto" style={{ maxWidth: "400px", width: "100%" }}>
            <Form.Control
              type="search"
              placeholder="Search pets, products..."
              className="me-2 rounded-pill"
              aria-label="Search"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </Form>

          {/* User Links */}
          <div className="d-flex align-items-center flex-wrap gap-3 ms-lg-4 mt-3 mt-lg-0 custom-header-links">
            <Link className="header-link login-link" to="/userauth">
              <i className="fa-solid fa-right-to-bracket me-2"></i> Login
            </Link>

            <Link className="header-link wishlist-link" to="/wishlist">
              <i className="fa-solid fa-heart me-2"></i> Wishlist
              <span
                className="ms-2 d-inline-block rounded-circle bg-danger text-white text-center"
                style={{ width: "24px", height: "24px", lineHeight: "24px", fontSize: "14px" }}
              >
                {wishlength}
              </span>
            </Link>

            <Link className="header-link cart-link" to="/cart">
              <i className="fa-solid fa-cart-shopping me-2"></i> Cart
              <span
                className="ms-2 d-inline-block rounded-circle bg-danger text-white text-center"
                style={{ width: "24px", height: "24px", lineHeight: "24px", fontSize: "14px" }}
              >
                {carts}
              </span>
            </Link>

            <Link to="/profile" className="profile-circle">
              {userdata?.profile ? (
                <img
                  src={`${base_url}/images/${userdata.profile}`}
                  alt="User"
                  style={{ width: "40px", height: "40px", objectFit: "cover", borderRadius: "50%" }}
                />
              ) : (
                <i className="fa-solid fa-user"></i>
              )}
            </Link>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
