import React, { memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import { Modal } from "react-bootstrap";
import { deleteResource, fetchResource } from "../api/storeData";

const Orders = memo(() => {
  const navigate = useNavigate();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [orderToRemove, setOrderToRemove] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {}, [navigate]);

  useEffect(() => {
    fetchResource("orders")
      .then(setOrders)
      .catch(() => setOrders([]));
  }, []);

  const handleConfirmRemove = async () => {
    try {
      await deleteResource("orders", orderToRemove);
      setOrders(orders.filter((order) => order.id !== orderToRemove));
      setShowConfirmModal(false);
      setOrderToRemove(null);
    } catch (error) {
      console.log(error);
      alert("Failed to remove order!");
    }
  };

  const handleRemoveOrder = (orderId) => {
    setOrderToRemove(orderId);
    setShowConfirmModal(true);
  };

  const handleCancelRemove = () => {
    setShowConfirmModal(false);
    setOrderToRemove(null);
  };

  return (
    <>
      <Header />
      <Navbar />

      <style>
        {`
          .orders-container {
            max-width: 90%;
            margin: auto;
            padding: 20px;
            border-radius: 10px;
          }
          .orders-list-group {
            /* No additional styles, but class for clarity */
          }
          .orders-list-group-item {
            border-radius: 8px;
            padding: 15px;
            margin-bottom: 10px;
            height: 120px;
          }
          .remove-order-btn-container {
            /* No additional styles, but class for clarity */
          }
          @media (max-width: 600px) {
            .orders-list-group {
              max-width: 98vw !important;
            }
            .orders-list-group-item {
              flex-direction: column !important;
              align-items: flex-start !important;
              gap: 8px !important;
              height: auto !important;
              padding: 10px !important;
            }
          }
        `}
      </style>

      <div className="container mt-4 orders-container">
        <h2>Orders</h2>
        <h4>Your Previous Orders will appear here.</h4>
        <h6>{orders.length} orders found.</h6>
        <code>This is just a demo.</code>
        {orders.length === 0 ? (
          <>
            <div className="alert alert-info">No orders found.</div>
          </>
        ) : (
          <>
            <ul className="list-group orders-list-group">
              {orders.map((order, index) => (
                <li
                  className="list-group-item mb-3 d-flex justify-content-between align-items-center orders-list-group-item"
                  key={order.id || index}
                >
                  <div>
                    <strong>Order #{order.id}</strong>
                  </div>
                  <ul className="mt-2">
                    {order.items && order.items.length > 0 ? (
                      order.items.map((item, index) => (
                        <li key={index}>
                          {item.title} &times; {item.quantity || 1} — $
                          {item.price}
                        </li>
                      ))
                    ) : (
                      <li>No items in this order.</li>
                    )}
                  </ul>
                  <div className="remove-order-btn-container">
                    <button
                      className="btn btn-danger btn-sm ms-3"
                      onClick={() => handleRemoveOrder(order.id)}
                    >
                      Remove Order
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
      <Modal show={showConfirmModal} onHide={handleCancelRemove} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Remove Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to remove order #{orderToRemove}?
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={handleCancelRemove}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={handleConfirmRemove}>
            Remove
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
});

export default Orders;
