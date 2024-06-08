import React, { useState, useEffect } from 'react';
import { Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import axios from 'axios';
import './cart.css';

// creating state variables here
function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [totalCost, setTotalCost] = useState(0);

// using useState function with the above created state variables 
// to calclulate total items cost  and handling remove fucntionality, and quantity change.
  useEffect(() => {
    const savedCartItems = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(savedCartItems);
    calculateTotal(savedCartItems);
  }, []);

  const calculateTotal = (items) => {
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotalCost(total);
  };

  const handleQuantityChange = (id, delta) => {
    const updatedCartItems = cartItems.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + delta } : item
    ).filter(item => item.quantity > 0);

    setCartItems(updatedCartItems);
    localStorage.setItem('cart', JSON.stringify(updatedCartItems));
    calculateTotal(updatedCartItems);
  };

  const handleRemove = (id) => {
    const updatedCartItems = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCartItems);
    localStorage.setItem('cart', JSON.stringify(updatedCartItems));
    calculateTotal(updatedCartItems);
  };

  const handleOrder = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty. Please add items to the cart before placing an order.');
      return;
    }
    axios.post('http://localhost:3000/api/cart', { items: cartItems })
      .then(response => {
        alert('Order placed successfully');
        setCartItems([]);
        setTotalCost(0);
        localStorage.removeItem('cart');
        //we are  redirecting here to a confirmation page , this will open a new modal which says "order placed successfully".
      })
      .catch(error => {
        console.error('Error placing order:', error);
        alert('Failed to place order. Please try again later.');
      });
  };
  
  return (
    <div className="container">
      <h1>Your Cart</h1>
      <ListGroup>
        {cartItems.map(item => (
          <ListGroupItem key={item.id}>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                {/* displaying the items from state variable cartItems */}
                <h5>{item.name}</h5>
                <p>Price: ${item.price}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
              {/* i have added buttons to increase , descrease and to remove the items from the cart */}
              <div className="button-group">
                <Button variant="secondary" onClick={() => handleQuantityChange(item.id, 1)}>+</Button>
                <span className="button-space"></span> 
                <Button variant="secondary" onClick={() => handleQuantityChange(item.id, -1)}>-</Button>
                <span className="button-space"></span>
                <Button variant="danger" onClick={() => handleRemove(item.id)}>Remove</Button>
              </div>
            </div>
          </ListGroupItem>
        ))}
      </ListGroup>
      <h3>Total Amount: ${totalCost.toFixed(2)}</h3>
      <Button variant="success" onClick={handleOrder}>Order </Button>
    </div>
  );
};

export default Cart;
