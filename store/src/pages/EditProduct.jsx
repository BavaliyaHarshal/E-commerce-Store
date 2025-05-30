import React, { memo, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import { fetchResource, patchResource } from "../api/storeData";

const EditProduct = memo(() => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [form, setForm] = useState({
    title: "",
    price: "",
    image: "",
  });

  useEffect(() => {

    fetchResource("products")
      .then((productsArr) => {
        const found = productsArr.find((p) => String(p.id) === String(id));
        setProduct(found || null);
        if (found) {
          setForm({
            title: found.title,
            price: found.price,
            image: found.image,
          });
        }
      })
      .catch((error) => {
        console.error("Failed to fetch products from API:", error);
        setProduct(null);
      });
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await patchResource("products", id, {
        title: form.title,
        price: parseFloat(form.price),
        image: form.image,
      });
      alert("Product updated successfully!");
      navigate("/products");
    } catch (error) {
      alert("Failed to update product. Please try again later.");
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return !product ? (
    <>
      <Header />
      <Navbar />
      <div className="edit-product-loading">Loading...</div>
    </>
  ) : (
    <>
      <Header />
      <Navbar />

      <style>
        {`
          .edit-product-container {
            min-height: 100vh;
            padding: 20px;
            text-align: center;
            border-radius: 12px;
          }
          .edit-product-card {
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
          .edit-product-img {
            width: min(100%, 300px);
            height: auto;
            object-fit: cover;
            display: block;
          }
          .edit-product-body {
            padding: 16px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            flex-grow: 1;
            border-radius: 12px;
          }
          .edit-product-title {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 12px;
            text-align: center;
          }
          .edit-product-loading {
            text-align: center;
            margin-top: 2rem;
          }
          @media (max-width: 600px) {
            .edit-product-card {
              width: 90%;
            }
            .edit-product-img {
              width: 100% !important;
              height: auto !important;
            }
            .edit-product-body {
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

      <div className="edit-product-container mt-4">
        <h2>Edit Product</h2>
        <h4>Update the details of the selected product.</h4>

        <div className="edit-product-card">
          <img
            className="edit-product-img"
            src={product.image}
            alt={product.title}
          />
          <div className="edit-product-body">
            <form
              onSubmit={handleSubmit}
              style={{ maxWidth: 500, width: "100%", margin: "0 auto" }}
            >
              <div className="mb-3">
                <label className="form-label">Title</label>
                <input
                  className="form-control"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Price</label>
                <input
                  className="form-control"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  required
                />
              </div>
              {/* <div className="mb-5">
                <label className="form-label">Image Filename</label>
                <input
                  className="form-control"
                  name="image"
                  value={form.image}
                  onChange={handleChange}
                  required
                  placeholder="e.g. product1.jpg"
                />
                <div className="form-text">
                  Enter the image filename from <code>public/images</code> (e.g. <code>product1.jpg</code>)
                </div>
              </div> */}
              <div className="d-flex justify-content-center align-items-center mb-5">
                <button className="btn btn-primary" type="submit">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
});

export default EditProduct;
