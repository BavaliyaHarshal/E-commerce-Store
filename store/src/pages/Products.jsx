import React, { memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  fetchResource,
  postResource,
  patchResource,
} from "../api/storeData";

const Products = memo(() => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchResource("products")
      .then((data) => {
        setAllProducts(data);
        setFilteredProducts(data);
      })
      .catch((error) => {
        console.log("failed to fetch products", error);
      });
  }, [navigate]);

  const handleAddToCart = async (product) => {
    try {
      const cart = await fetchResource("cart");
      const existing = cart.find((item) => item.productId === product.id);

      if (existing) {
        await patchResource("cart", existing.id, {
          quantity: existing.quantity + 1,
        });
      } else {
        await postResource("cart", {
          ...product,
          productId: product.id,
          quantity: 1,
        });
      }
      toast(`Added ${product.title} to cart!`);
    } catch (error) {
      toast.error("Failed to add to cart!");
      console.error(error);
    }
  };

  const categories = Array.from(new Set(allProducts.map((e) => e.category)));

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    if (category === "") {
      setFilteredProducts(allProducts);
    } else {
      setFilteredProducts(allProducts.filter((p) => p.category === category));
    }
  };

  return (
    <>
      <Header />
      <Navbar />
      <ToastContainer />

      <style>
        {`
          .products-bg {
            min-height: 100vh;
            background: linear-gradient(120deg, #e0f7fa 0%, #80deea 100%);
            padding: 40px 0;
          }
          .products-list {
            display: flex;
            flex-wrap: wrap;
            gap: 24px;
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
            justify-content: center;
          }
          .product-card {
            width: 320px;
            min-height: 420px;
            background: #fff;
            border-radius: 12px;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 18px 14px;
            box-sizing: border-box;
          }
          .product-card img {
            width: 180px;
            height: 180px;
            object-fit: contain;
            margin-bottom: 16px;
          }
          .home-fade-in {
            animation: fadeInHome 0.8s;
          }
          @keyframes fadeInHome {
            from { opacity: 0; transform: scale(0.98) translateY(20px); }
            to { opacity: 1; transform: scale(1) translateY(0); }
          }
          @media (max-width: 900px) {
            .products-list {
              gap: 18px;
              max-width: 100vw;
            }
            .product-card {
              width: 48vw;
              min-width: 220px;
            }
          }
          @media (max-width: 600px) {
            .products-bg {
              padding: 10px 0;
            }
            .products-list {
              flex-direction: column;
              gap: 10px;
              max-width: 100vw;
              padding: 0 8px;
            }
            .product-card {
              width: 100%;
              min-width: unset;
            }
            .search-container {
              min-width: 100% !important;
              padding: 0 8px;
            }
            .form-select {
              width: 100% !important;
              max-width: 100vw !important;
            }import { API_BASE } from './../api/storeData';

          }
          .products-search-container {
            min-width: 50%;
            position: relative;
            display: flex;
            justify-content: center;
          }
          .products-add-btn {
            display: flex;
            justify-content: center;
            margin-top: 1rem;
            margin-left: 0.5rem;
          }
        `}
      </style>

      <div className="products-search-container search-container">
        <select
          className="form-select mt-3"
          value={selectedCategory}
          onChange={handleCategoryChange}
          style={{ maxWidth: 300 }}
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c.charAt(0).toUpperCase() + c.slice(1)}
            </option>
          ))}
        </select>
        <button
          className="btn btn-primary products-add-btn mt-3 ms-2"
          onClick={() => navigate("/add-product")}
        >
          <i className="bi bi-plus-lg me-2"> Add Product</i>
        </button>
      </div>

      <div className="products-bg">
        <div className="products-list">
          {filteredProducts.map((product, index) => (
            <div key={index} className="home-fade-in product-card">
              <ProductCard
                id={product.id}
                title={product.title}
                image={product.image}
                product={product}
                onAddToCart={handleAddToCart}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
});

export default Products;
