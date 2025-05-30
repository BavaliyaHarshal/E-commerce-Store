import React, { memo } from "react";
import { Link } from "react-router-dom";
import { deleteResource, postResource } from "../api/storeData";

const ProductCard = memo(({ id, title, image, product, onAddToCart }) => {
  const handleDelete = async () => {
    try {
      await deleteResource("products", id);
      await postResource("deletedProducts", product);
      alert(`Deleted ${product.title} from store!`);
      window.location.reload();
    } catch (error) {
      alert("Failed to delete product!");
      console.error(error);
    }
  };

  return (
    <>
      <style>
        {`.product-card {
            padding: 16px;
            display: flex;
            flex-direction: column;
            border-radius: 12px;
            background: #fff;
            transition: transform 0.2s;
            overflow: hidden;
          }
          .product-card-img {
            width: 100%;
            height: auto;
            object-fit: cover;
            display: block;
          }
          .product-card-body {
            padding: 16px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            flex-grow: 1;
          }
          .product-card-title {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 12px;
            text-align: center;
          }
          .btn {
            font-size: 14px;
            padding: 8px 12px;
            border-radius: 8px;
            transition: background-color 0.2s, transform 0.2s;
            &:hover {
              background-color: darken(#007bff, 5%);
              transform: translateY(-2px);
            }
          }
          @media (max-width: 600px) {
            .product-card {
              width: 90%;
            }
            .product-card-img {
              width: 100% !important;
              height: auto !important;
            }
            .product-card-body {
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

      <div className="product-card">
        <img className="product-card-img" src={image} alt={title} />
        <div className="product-card-body">
          <h2 className="product-card-title">{title}</h2>
          <div className="product-card-actions d-flex" style={{ gap: 15 }}>
            <Link
              to={`/product-description/${id}`}
              className="btn btn-info"
              style={{ marginTop: 5 }}
            >
              <i className="bi bi-eye"> View</i>
            </Link>

            <Link
              to={`/edit-product/${id}`}
              className="btn btn-info"
              style={{ marginTop: 5 }}
            >
              <i className="bi bi-pencil-square"> Edit</i>
            </Link>

            <button
              className="btn btn-danger"
              style={{ marginTop: 5 }}
              onClick={handleDelete}
            >
              <i className="bi bi-trash"> Delete</i>
            </button>
          </div>

          <button
            className="btn btn-primary mt-2 w-100"
            style={{ marginTop: 5 }}
            onClick={() => onAddToCart(product)}
          >
            <i className="bi bi-cart-plus"> Add to Cart</i>
          </button>
        </div>
      </div>
    </>
  );
});

export default ProductCard;
