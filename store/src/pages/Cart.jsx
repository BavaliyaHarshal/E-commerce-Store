import React, { memo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import { Modal } from "react-bootstrap";
import {
  deleteResource,
  fetchResource,
  patchResource,
  postResource,
} from "../api/storeData";

const Cart = memo(() => {
  const [cart, setCart] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchResource("cart")
      .then((cartItems) => setCart(cartItems))
      .catch(() => setCart([]));
  }, []);

  const handleAddOne = async (index) => {
    const item = cart[index];
    if (!item) return;
    try {
      await patchResource("cart", item.id, {
        quantity: (item.quantity || 1) + 1,
      });
      const updatedCart = cart.map((c, i) =>
        i === index ? { ...c, quantity: (c.quantity || 1) + 1 } : c
      );
      setCart(updatedCart);
    } catch (error) {
      console.error("Failed to update cart item:", error);
    }
  };

  const handleRemoveOne = async (index) => {
    const item = cart[index];
    if (!item) return;
    try {
      if ((item.quantity || 1) > 1) {
        await patchResource("cart", item.id, { quantity: item.quantity - 1 });
        const updatedCart = cart.map((c, i) =>
          i === index ? { ...c, quantity: c.quantity - 1 } : c
        );
        setCart(updatedCart);
      } else {
        await deleteResource("cart", item.id);
        const updatedCart = cart.filter((_, i) => i !== index);
        setCart(updatedCart);
      }
    } catch (error) {
      console.error("Failed to update cart item:", error);
    }
  };

  const handleCheckout = async () => {
    try {
      const orderId = `ORD-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
      await postResource("orders", {
        id: orderId,
        items: cart,
        date: new Date().toISOString(),
      });
      await Promise.all(cart.map((item) => deleteResource("cart", item.id)));
      setCart([]);
      setShowModal(true);
    } catch (error) {
      console.error("Checkout failed:", error);
    }
  };

  return (
    <>
      <Header />
      <Navbar />

      <style>
        {`
          .cart-media-600 {
            /* Responsive styles for mobile */
          }
          @media (max-width: 600px) {
            .cart-product-card-item {
              flex-direction: column !important;
              align-items: stretch !important;
              gap: 10px !important;
              padding: 8px !important;
            }
            .cart-product-card-item > .cart-product-card-img {
              margin-right: 0 !important;
              margin-bottom: 8px !important;
              width: 100% !important;
              height: 90px !important;
            }
            .cart-product-card-img img {
              height: 90px !important;
            }
          }
          .cart-container {
            max-width: 700px;
            margin: 30px auto;
          }
          .cart-product-card-item {
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            padding: 16px;
            margin-bottom: 20px;
            background: #fff;
            gap: 24px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.04);
            flex-wrap: wrap;
            display: flex;
            align-items: center;
          }
          .cart-product-card-img {
            width: 120px;
            height: 120px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #fafafa;
            border-radius: 8px;
            margin-right: 24px;
            flex-shrink: 0;
          }
          .cart-product-card-img img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            border-radius: 8px;
          }
          .cart-product-card-details {
            flex: 1;
            min-width: 180px;
          }
          .cart-product-card-title {
            font-size: 20px;
            margin-bottom: 8px;
          }
          .cart-product-card-price {
            font-weight: 500;
            color: #333;
            margin-bottom: 6px;
          }
          .cart-product-card-price .cart-per-each {
            font-size: 12px;
            color: #999;
          }
          .cart-product-card-qty {
            margin-bottom: 10px;
          }
          .cart-add-btn, .cart-remove-btn {
            background: #e74c3c;
            color: #fff;
            border: none;
            border-radius: 4px;
            padding: 6px 16px;
            cursor: pointer;
            font-weight: 500;
          }
          .cart-add-btn {
            margin-right: 10px;
          }
          .cart-total {
            text-align: center;
            font-weight: 600;
            padding: 10px 0;
            border-top: 1px solid #e0e0e0;
            border-bottom: 1px solid #e0e0e0;
            background: #f8f9fa;
            border-radius: 8px;
            margin-bottom: 20px;
            font-size: 18px;
          }
          .cart-checkout-btn {
            padding: 10px 20px;
            font-size: 16px;
            font-weight: bold;
            background-color: #007bff;
            color: #fff;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            width: 100%;
            max-width: 300px;
          }
          .cart-empty-alert {
            justify-content: center;
            text-align: center;
            width: 100%;
          }
          .cart-btn-center {
            display: flex;
            justify-content: center;
            margin-top: 1.5rem;
            margin-bottom: 2.5rem;
          }
        `}
      </style>

      <div className="cart-container">
        {cart.length > 0 ? (
          <>
            {cart.map((item, index) => (
              <div className="cart-product-card-item" key={item.id || index}>
                <div className="cart-product-card-img">
                  <img
                    src={item.image || "https://via.placeholder.com/120"}
                    alt={item.title}
                  />
                </div>
                <div className="cart-product-card-details">
                  <h2 className="cart-product-card-title">{item.title}</h2>
                  <div className="cart-product-card-price">
                    ${item.price}
                    <span className="cart-per-each">/each</span>
                  </div>
                  <div className="cart-product-card-qty">
                    Quantity: {item.quantity || 1}
                  </div>
                  <button
                    className="cart-add-btn"
                    onClick={() => handleAddOne(index)}
                  >
                    <i className="bi bi-plus-circle" />
                  </button>
                  <button
                    className="cart-remove-btn"
                    onClick={() => handleRemoveOne(index)}
                  >
                    <i className="bi bi-dash-circle" />
                  </button>
                </div>
              </div>
            ))}
            <div className="cart-total">
              Total: $
              {cart
                .reduce(
                  (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
                  0
                )
                .toFixed(2)}
            </div>
            <div className="cart-btn-center">
              <button className="cart-checkout-btn" onClick={handleCheckout}>
                Checkout
              </button>
            </div>
          </>
        ) : (
          <div className="alert alert-info cart-empty-alert" role="alert">
            Your cart is empty.
          </div>
        )}
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Checkout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Thank you for your purchase!</p>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-secondary"
            onClick={() => {
              setShowModal(false);
              navigate("/products");
            }}
          >
            Continue Shopping
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
});

export default Cart;
