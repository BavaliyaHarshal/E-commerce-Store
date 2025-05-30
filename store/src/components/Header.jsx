import React from "react";

const Header = () => {
  return (
    <>
      <style>
        {`
          .header-fade-in {
            animation: fadeInHeader 0.8s;
          }
          @keyframes fadeInHeader {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
      
      <div className="container-fluid py-3 header-fade-in">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 text-center">
            <h1
              style={{
                letterSpacing: "2px",
                marginBottom: "0.5rem",
                fontSize: "2rem",
                color: "#0097a7",
                wordBreak: "break-word",
              }}
            >
              E-Commerce Store
            </h1>
            <div
              style={{
                width: "80px",
                height: "5px",
                margin: "0 auto",
                background: "linear-gradient(90deg, #00bcd4 0%, #26c6da 100%)",
                borderRadius: "3px",
              }}
            ></div>
          </div>
        </div>
      </div>
      <style>
        {`
          @media (max-width: 600px) {
            .header-fade-in h1 {
              font-size: 1.3rem !important;
            }
            .header-fade-in .col-12 {
              padding: 0 5px !important;
            }
          }
        `}
      </style>
    </>
  );
};

export default Header;
