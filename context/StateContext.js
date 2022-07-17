import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);
  let foundProduct;
  let index;

  // Handlers && Functions
  // Increase Quantity
  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };

  // Decrease Quantity
  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;
      return prevQty - 1;
    });
  };

  // Addto cart Function
  const onAdd = (product, quantity) => {
    const checkIfProductInCart = cartItems.find(
      (item) => item._id == product._id
    );
    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );
    setTotalQuantities((prevTotalQuantity) => prevTotalQuantity + quantity);

    if (checkIfProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id == product._id) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          };
        }
      });
      setCartItems(updatedCartItems);
      toast.success(`${qty} more of ${product.name} added to cart`);
    } else {
      product.quantity = quantity;
      setCartItems([...cartItems, { ...product }]);
      toast.success(`${qty}  ${product.name} added to cart`);
    }
  };

  // Cart Handlers
  const onRemove = (id) => {
    setCartItems((prevCartItems) =>
      prevCartItems.filter((item) => item._id !== id)
    );
    let removedProduct = cartItems.find((item) => item._id === id);
    let removedProductQuantity = removedProduct.quantity;
    setTotalQuantities(
      (prevTotalQuantity) => prevTotalQuantity - removedProductQuantity
    );
    let removedProductPrice = removedProduct.price;
    let removedProductTotalPrice = removedProductPrice * removedProductQuantity;
    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice - removedProductTotalPrice
    );
  };
  const toggleCartItemQuantity = (id, value) => {
    foundProduct = cartItems.find((item) => item._id === id);
    index = cartItems.findIndex((item) => item._id === id);
    let newCartItems = cartItems.filter((item) => item._id !== id);

    if (value === "increase") {
      newCartItems.splice(index, 0, {
        ...foundProduct,
        quantity: foundProduct.quantity + 1,
      });
      setCartItems([...newCartItems]);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
      setTotalQuantities((prevTotalQuantity) => prevTotalQuantity + 1);
    } else if (value === "decrease") {
      if (foundProduct.quantity > 1) {
        newCartItems.splice(index, 0, {
          ...foundProduct,
          quantity: foundProduct.quantity - 1,
        });
        setCartItems([...newCartItems]);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
        setTotalQuantities((prevTotalQuantity) => prevTotalQuantity - 1);
      } else {
        onRemove(id);
      }
    }
  };

  return (
    <Context.Provider
      value={{
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        showCart,
        totalQuantities,
        setShowCart,
        toggleCartItemQuantity,
        onRemove,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
