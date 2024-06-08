import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import Home from './components/home';
import Cart from './components/cart';
import PastOrders from './components/pastorders';
import { Navbar, Nav } from 'react-bootstrap';

// reference - https://react-bootstrap.netlify.app/docs/components/navbar/
// Navbar fucntion to display below tabs on UI, there is no additional navbar component created in this assignment , i'm using it in app only
function App() {
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand>EatStreet Restaurant</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/cart">Cart</Nav.Link>
          <Nav.Link as={Link} to="/past-orders">Orders</Nav.Link>
        </Nav>
      </Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/past-orders" element={<PastOrders />} />
      </Routes>
    </div>
  );
}

export default App;
