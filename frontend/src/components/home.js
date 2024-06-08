import React, { useState, useEffect } from 'react';
import { Button, Card, Row, Col } from 'react-bootstrap';
import axios from 'axios';

function Home() {
  const [menuItems, setMenuItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  //caling the api "api/menu" to load json file from server
  useEffect(() => {
    axios.get('http://localhost:3000/api/menu')
      .then(response => setMenuItems(response.data))
      .catch(error => console.error('Error fetching menu items:', error));

    const savedCartItems = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(savedCartItems);
  }, []);

// this fucntion will add items to cart
  function addToCart(item) {
    setCartItems(prevCartItems => {
      const updatedCart = [...prevCartItems, { ...item, quantity: 1 }];
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  }

  function isItemInCart(itemId) {
    return cartItems.some(item => item.id === itemId);
  }

  return (
    <div className="container">
      <h1>Menu</h1>
      <Row>
        {menuItems.map(item => (
          <Col key={item.id} sm={12} md={6} lg={4} xl={3} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>{item.description}</Card.Text>
                <Card.Text>${item.price.toFixed(2)}</Card.Text>
                {/* This button is handling the identifier fucntionality if item has been added or not */}
                <Button
                  variant={isItemInCart(item.id) ? 'secondary' : 'primary'}
                  disabled={isItemInCart(item.id)}
                  onClick={() => addToCart(item)}
                >
                  {isItemInCart(item.id) ? 'Added' : 'Add Item to cart'}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Home;
