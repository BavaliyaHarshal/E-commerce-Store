import React, { memo, useEffect, useState } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { fetchResource, postResource } from "../api/storeData";

const AddProduct = memo(() => {
  const navigate = useNavigate();

  const [allCategories, setAllCategories] = useState([]);
  useEffect(() => {
    fetchResource("products")
      .then((products) => {
        setAllCategories(Array.from(new Set(products.map((e) => e.category))));
      })
      .catch(() => setAllCategories([]));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const imageFile = formData.get("image");
    let imageFileName = "";
    if (imageFile && imageFile.name) {
      imageFileName = imageFile.name;
    }

    const newProduct = {
      title: formData.get("title"),
      price: parseFloat(formData.get("price")),
      category: formData.get("category") || "Uncategorized",
      image: imageFileName ? `/images/${imageFileName}` : "",
    };

    try {
      await postResource("products", newProduct);
      e.target.reset();
      alert("Product added successfully!");
      navigate("/products");
    } catch (error) {
      console.log(error);
      alert("Failed to add product!");
    }
  };

  return (
    <>
      <Header />
      <Navbar />

      <style>
        {`
          .add-product-container {
            min-height: 100vh;
          }
          .add-product-title {
            color: #333;
          }
          .add-product-form {
            max-width: 500px;
            margin: auto;
            padding: 20px;
            background: #fff;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          }
          .add-product-form .form-label {
            font-weight: bold;
          }
          .add-product-form .form-control,
          .add-product-form .form-select {
            border-radius: 4px;
            border: 1px solid #ccc;
          }
          .add-product-form .form-control:focus,
          .add-product-form .form-select:focus {
            border-color: #007bff;
            box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
          }
          .add-product-form .btn {
            background-color: #007bff;
            color: #fff;
            border: none;
            border-radius: 4px;
            padding: 10px 15px;
            transition: background-color 0.3s, transform 0.2s;
          }
          .add-product-form .btn:hover {
            background-color: #0056b3;
            transform: translateY(-2px);
          }
          .add-product-form .form-text {
            font-size: 0.9rem;
            color: #6c757d;
          }
          @media (max-width: 600px) {
            .add-product-form {
              width: 90%;
            }
            .add-product-form .form-control,
            .add-product-form .form-select {
              width: 100%;
            }
            .add-product-form .form-label {
              font-size: 0.9rem;
            }
            .add-product-form .btn {
              width: 100%;
              padding: 12px;
            }
          }
        `}
      </style>

      <div className="add-product-container mt-5">
        <h2 className="text-center add-product-title">Add New Product</h2>
        <div className="d-flex justify-content-center align-items-center mb-4">
          <form onSubmit={handleSubmit} className="add-product-form">
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                type="text"
                className="form-control"
                name="title"
                required
                autoComplete="off"
                placeholder="Enter product title"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Price</label>
              <input
                type="number"
                className="form-control"
                name="price"
                required
                autoComplete="off"
                placeholder="Enter product price"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Category</label>
              <select
                className="form-select"
                name="category"
                autoComplete="off"
                required
              >
                <option>Select a category</option>
                {allCategories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Image File</label>
              <input
                type="file"
                className="form-control"
                name="image"
                required
                accept="image/*"
              />
            </div>
            <button type="submit" className="btn btn-primary w-100 mt-2">
              Add Product
            </button>
          </form>
        </div>
      </div>
    </>
  );
});

export default AddProduct;
