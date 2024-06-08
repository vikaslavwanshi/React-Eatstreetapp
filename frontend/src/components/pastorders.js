import React, { useState, useEffect } from 'react';
import { Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import axios from 'axios';

function PastOrders() {
  const [pastOrders, setPastOrders] = useState([]);

  useEffect(() => {
    fetchPastOrders();
  }, []);

  function fetchPastOrders() {
    axios.get('http://localhost:3000/api/orders') // Using the API to fetch the orders
      .then(response => setPastOrders(response.data))
      .catch(error => console.error('Error fetching past orders:', error));
  }

  function handleRemoveOrder(id) {
    axios.delete(`http://localhost:3000/api/orders/${id}`) // Using the API to delete the correct items
      .then(response => {
        const updatedOrders = pastOrders.filter(order => order.id !== id);
        setPastOrders(updatedOrders);
      })
      .catch(error => console.error('Error removing order:', error));
  }

  return (
    <div className="container">
      <h1>Orders History</h1>
      <ListGroup>
        {pastOrders.map(order => (
          <ListGroupItem key={order.id}>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h5>Order #{order.id}</h5>
                <p>Date: {new Date(order.date).toLocaleString()}</p>
                <p>Total Amount: ${order.total.toFixed(2)}</p>
                <p>Items:</p>
                <ul>
                  {order.items.map(item => (
                    <li key={item.id}>{item.name} - {item.quantity}</li>
                  ))}
                </ul>
              </div>
              <Button variant="danger" onClick={() => handleRemoveOrder(order.id)}>Remove</Button>
            </div>
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
}

export default PastOrders;
