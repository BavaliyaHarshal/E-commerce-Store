import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDescription from "./pages/ProductDescription";
import EditProduct from "./pages/EditProduct";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import DeletedProduct from "./pages/DeletedProduct";
import AddUser from "./pages/AddUser";
import AddProduct from "./pages/AddProduct";

function RequireAuth({ children }) {
  const isLoggedIn = !!localStorage.getItem("token");
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return children;
}

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/home"
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
          <Route
            path="/products"
            element={
              <RequireAuth>
                <Products />
              </RequireAuth>
            }
          />
          <Route
            path="/add-product"
            element={
              <RequireAuth>
                <AddProduct />
              </RequireAuth>
            }
          />
          <Route
            path="/product-description/:id"
            element={
              <RequireAuth>
                <ProductDescription />
              </RequireAuth>
            }
          />
          <Route
            path="/edit-product/:id"
            element={
              <RequireAuth>
                <EditProduct />
              </RequireAuth>
            }
          />
          <Route
            path="/cart"
            element={
              <RequireAuth>
                <Cart />
              </RequireAuth>
            }
          />
          <Route
            path="/orders"
            element={
              <RequireAuth>
                <Orders />
              </RequireAuth>
            }
          />
          <Route
            path="/deleted-products"
            element={
              <RequireAuth>
                <DeletedProduct />
              </RequireAuth>
            }
          />
          <Route path="/add-user" element={<AddUser />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
