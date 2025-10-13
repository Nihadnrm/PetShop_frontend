// Context.js
import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const addwishlistcontext = createContext();
export const addtocartcontext = createContext();
export const authcontext = createContext();
export const petcallcontext = createContext();

function Context({ children }) {
  const [wishlist, setwishlist] = useState([]); // start as array
  const [cart, setcart] = useState([]);         // start as array
  const [authing, setauthing] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const nav = useNavigate();

  const handlePetcards = (category) => {
    setSelectedCategory(category);
    sessionStorage.setItem("selectedcategory", category);
    nav("/petcard");
  };

  return (
    <addwishlistcontext.Provider value={{ wishlist, setwishlist }}>
      <addtocartcontext.Provider value={{ cart, setcart }}>
        <authcontext.Provider value={{ authing, setauthing }}>
          <petcallcontext.Provider value={{ handlePetcards, selectedCategory }}>
            {children}
          </petcallcontext.Provider>
        </authcontext.Provider>
      </addtocartcontext.Provider>
    </addwishlistcontext.Provider>
  );
}

export default Context;
