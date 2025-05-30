import React, { memo, useEffect, useState } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import { fetchResource } from "../api/storeData";

const ProductDescription = memo(() => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchResource("products")
      .then((productsArr) => {
        const found = productsArr.find((p) => String(p.id) === String(id));
        setProduct(found || null);
      })
      .catch((error) => {
        console.error("Failed to fetch products from API:", error);
        setProduct(null);
      });
  }, [id, navigate, location.key]);

  return !product ? (
    <>
      <Header />
      <Navbar />
      <div className="product-desc-loading">Loading...</div>
    </>
  ) : (
    <>
      <Header />
      <Navbar />

      <style>
        {`
          .product-desc-container {
            min-height: 100vh;
            padding: 20px;
            text-align: center;
            border-radius: 12px;
          }
          .product-desc-card {
            padding: 16px;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            border-radius: 12px;
            transition: transform 0.2s;
            overflow: hidden;
            border: 1px solid #ccc;
            background: #fff;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          }
          .product-desc-img {
            width: min(100%, 300px);
            height: auto;
            object-fit: cover;
            display: block;
          }
          .product-desc-body {
            padding: 16px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            flex-grow: 1;
            border-radius: 12px;
          }
          .product-desc-title {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 12px;
            text-align: center;
          }
          .product-desc-loading {
            text-align: center;
            margin-top: 2rem;
          }
          @media (max-width: 600px) {
            .product-desc-card {
              width: 90%;
            }
            .product-desc-img {
              width: 100% !important;
              height: auto !important;
            }
            .product-desc-body {
              padding: 12px !important;
            }
            .btn {
              width: 100% !important;
              margin-top: 8px !important;
              padding: 12px 16px !important;
            }
          }
        `}
      </style>

      <div className="product-desc-container mt-4">
        <h2>Product Description</h2>
        <h4>Details of the selected product.</h4>

        <div className="product-desc-card">
          <img
            src={product.image}
            alt={product.title}
            className="product-desc-img"
          />
          <div className="product-desc-body">
            <h2 className="product-desc-title">
              <strong>Title:</strong> {product.title}
            </h2>
            <div className="product-card-price">
              <strong>Price:</strong> ${product.price}
            </div>
            <h6 className="product-card-category">
              <strong>Category:</strong> {product.category}
            </h6>
          </div>
        </div>
      </div>
    </>
  );
});

export default ProductDescription;
