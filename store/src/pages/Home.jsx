import React, { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import { fetchResource } from "../api/storeData";

const Home = memo(() => {
  const [products, setProducts] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    fetchResource("products")
      .then((data) => setProducts(data))
      .catch((error) => {
        console.error("Failed to fetch products:", error);
        alert("Failed to fetch products. Please try again later.");
      });
  }, []);

  useEffect(() => {
    if (products.length === 0) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % products.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [current, products]);

  return (
    <>
      <Header />
      <Navbar />

      {/* Carousel */}
      {/* <style>
        {`
          .home-bg {
            min-height: 100vh;
            padding: 40px 0;
          }
          .home-fade-in {
            animation: fadeInHome 0.8s;
          }
          @keyframes fadeInHome {
            from { opacity: 0; transform: scale(0.98) translateY(20px); }
            to { opacity: 1; transform: scale(1) translateY(0); }
          }
          .carousel-container {
            position: relative;
            max-width: 550px;
            margin: 40px auto 0 auto;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #fff;
            border-radius: 12px;
            box-shadow: 0 2px 12px rgba(0,0,0,0.07);
            padding: 16px 0;
            min-height: 400px;
          }
          .carousel-product {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .carousel-img {
            width: 100%;
            max-width: 320px;
            height: 220px;
            object-fit: contain;
            border-radius: 10px;
            box-shadow: 0 1px 8px rgba(0,0,0,0.06);
            background: #fafafa;
          }
          .carousel-product-info {
            margin-top: 18px;
            text-align: center;
          }
          .carousel-product-title {
            font-size: 1.1rem;
            font-weight: 600;
            margin-bottom: 6px;
            color: #333;
          }
          .carousel-product-price {
            font-size: 1.1rem;
            color: #7c3aed;
            font-weight: 500;
          }
          .carousel-btn:active {
            background: #f5e1ff;
          }
          .carousel-btn.left {
            position: absolute;
            left: 10px;
            top: 50%;
            transform: translateY(-50%);
          }
          .carousel-btn.right {
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
          }
          @media (max-width: 600px) {
            .carousel-container {
              max-width: 98vw;
              min-height: 220px;
              padding: 8px 0;
            }
            .carousel-img {
              max-width: 90vw;
              height: 120px;
            }
          }
        `}
      </style>

      <div className="home-bg">
        <h3 className="d-flex justify-content-center me-2 mt-3">Home</h3>

        {products.length > 0 && (
          <div className="carousel-container home-fade-in">
            <Link
              to={`/product-description/${products[current].id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="carousel-product">
                <img
                  className="carousel-img"
                  src={products[current].image}
                  alt={products[current].title}
                />
                <div className="carousel-product-info">
                  <div className="carousel-product-title">
                    {products[current].title}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}
      </div> */}

      {/* Marquee */}
      <style>
        {`
          .container{
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .marquee-container {
            overflow: hidden;
            width: 100%;
            background: #fff;
            border-radius: 12px;
            box-shadow: 0 2px 12px rgba(0,0,0,0.07);
            max-width: 100%;
            min-height: 300px;
            position: relative;
            padding: 16px 0;
          }
          .marquee-track {
            display: flex;
            align-items: center;
            width: fit-content;
            animation: marquee 75s linear infinite;
          }
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .marquee-product {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 300px;
            height: 75%;
            transition: transform 0.2s;
          }
          .marquee-product:hover {
            transform: scale(1.05);
            box-shadow: 0 4px 16px rgba(124,58,237,0.08);
          }
          .marquee-img {
            width: 120px;
            height: 90px;
            object-fit: contain;
            border-radius: 8px;
            background: #fafafa;
            box-shadow: 0 1px 8px rgba(0,0,0,0.06);
          }
          .marquee-title {
            font-size: 1rem;
            font-weight: 500;
            color: #333;
            text-align: center;
            max-width: 200px;
            height: 100%
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          @media (max-width: 600px) {
            .marquee-container {
              max-width: 98vw;
              min-height: 120px;
              padding: 8px 0;
            }
            .marquee-img {
              width: 70px;
              height: 50px;
            }
            .marquee-product {
              min-width: 80px;
            }
          }
        `}
      </style>

      <div className="home-bg">
        <h3 className="d-flex justify-content-center me-2 mt-3">Home</h3>
        {products.length > 0 && (
          <div className="container">
            <div className="marquee-container">
              <div className="marquee-track">
                {[...products, ...products].map((product, idx) => (
                  <Link
                    key={idx}
                    to={`/product-description/${product.id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <div className="marquee-product">
                      <img
                        className="marquee-img"
                        src={product.image}
                        alt={product.title}
                      />
                      <div className="marquee-title">{product.title}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
});

export default Home;
