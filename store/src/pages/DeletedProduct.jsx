import React, { memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import { Modal } from "react-bootstrap";
import { deleteResource, fetchResource, postResource } from "../api/storeData";

const DeletedProduct = memo(() => {
  const [showActionModal, setShowActionModal] = useState(false);
  const [actionType, setActionType] = useState("");
  const [deletedProducts, setDeletedProducts] = useState([]);
  const navigate = useNavigate();
  const handleActionClick = (type) => {
    setActionType(type);
    setShowActionModal(true);
  };

  useEffect(() => {
    fetchResource("deletedProducts")
      .then(setDeletedProducts)
      .catch(() => setDeletedProducts([]));
  }, []);

  const handleActionConfirm = async () => {
    if (actionType === "restore") {
      try {
        await Promise.all(
          deletedProducts.map((prod) => postResource("products", prod))
        );
        await Promise.all(
          deletedProducts.map((prod) =>
            deleteResource("deletedProducts", prod.id)
          )
        );
        setDeletedProducts([]);
        setShowActionModal(false);
        navigate("/products");
      } catch (error) {
        console.log(error);
        alert("Failed to restore products!");
      }
    } else if (actionType === "delete") {
      try {
        await Promise.all(
          deletedProducts.map((prod) =>
            deleteResource("deletedProducts", prod.id)
          )
        );
        setDeletedProducts([]);
        setShowActionModal(false);
      } catch (error) {
        console.log(error);
        alert("Failed to delete products!");
      }
    }
  };

  return (
    <>
      <Header />
      <Navbar />

      <style>
        {`
          .deleted-product-bg {
            min-height: 100vh;
            padding: 40px 0;
          }
          .deleted-product-fade-in {
            animation: fadeInDeletedProduct 0.8s;
          }
          @keyframes fadeInDeletedProduct {
            from {
              opacity: 0;
              transform: translateY(-20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .deleted-product-container {
            max-width: 90%;
            margin: auto;
            padding: 20px;
            border-radius: 10px;
          }
          .deleted-product-center {
            min-height: 40vh;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          @media (max-width: 600px) {
            .deleted-product-bg {
              padding: 10px 0;
            }
            .list-group {
              max-width: 98vw !important;
            }
            .list-group-item {
              flex-direction: column !important;
              align-items: flex-start !important;
              gap: 8px !important;
            }
            .list-group-item img {
              width: 40px !important;
              height: 40px !important;
              margin-bottom: 6px !important;
            }
          }
        `}
      </style>

      <div className="deleted-product-bg deleted-product-fade-in">
        <div className="deleted-product-container">
          <h2>Deleted Products</h2>
          <h4>Your deleted products will appear here.</h4>
        </div>

        {deletedProducts.length === 0 ? (
          <div className="deleted-product-center">
            <div className="alert alert-info">No products deleted yet.</div>
          </div>
        ) : (
          <>
            <ul
              className="list-group mb-4"
              style={{ maxWidth: 600, margin: "0 auto" }}
            >
              {deletedProducts.map((prod, idx) => (
                <li
                  key={prod.id || idx}
                  className="list-group-item d-flex align-items-center"
                >
                  <img
                    className="deleted-product-img"
                    src={prod.image}
                    alt={prod.title}
                    style={{
                      width: 50,
                      height: 50,
                      objectFit: "contain",
                      marginRight: 16,
                    }}
                  />
                  <span>{prod.title}</span>
                </li>
              ))}
            </ul>
            <div className="d-flex justify-content-center gap-3">
              <button
                className="btn btn-primary"
                style={{ marginTop: 5 }}
                onClick={() => handleActionClick("restore")}
              >
                <i className="bi bi-arrow-clockwise"></i> Restore Products
              </button>
              <button
                className="btn btn-danger"
                style={{ marginTop: 5 }}
                onClick={() => handleActionClick("delete")}
              >
                <i className="bi bi-trash"></i> Permanently Delete
              </button>
            </div>
          </>
        )}

        <Modal
          show={showActionModal}
          onHide={() => setShowActionModal(false)}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>
              {actionType === "restore"
                ? "Restore Products"
                : "Permanently Delete Products"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {actionType === "restore"
              ? "Are you sure you want to restore all deleted products?"
              : "Are you sure you want to permanently delete all deleted products? This cannot be undone."}
          </Modal.Body>
          <Modal.Footer>
            <button
              className="btn btn-secondary"
              onClick={() => setShowActionModal(false)}
            >
              Cancel
            </button>
            <button
              className={`btn btn-${
                actionType === "restore" ? "primary" : "danger"
              }`}
              onClick={handleActionConfirm}
            >
              {actionType === "restore" ? "Restore" : "Delete"}
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
});

export default DeletedProduct;
