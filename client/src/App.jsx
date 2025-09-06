import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import ProductListPage from "./pages/ProductListPage";
import Navbar from "./components/Navbar";
import ProductDetailPage from "./pages/ProductDetailPage";
import Orders from "./pages/order.page";
import OrderSubmitForm from "./components/OrderSubmitForm";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/products" element={<ProductListPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/checkout" element={<OrderSubmitForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
