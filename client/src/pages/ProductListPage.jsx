import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

function ProductListPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/products") // adjust if your backend port/path is different
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  return (
    <main className="bg-gradient-to-b from-gray-500 to-white min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mt-10">
        {/* Page Title */}
        <h1 className="text-3xl md:text-3xl font-bold text-black text-center mb-10">
          All Products
        </h1>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard
                key={product._id} // assuming MongoDB _id
                id={product._id}
                image={product.image}
                name={product.name}
                description={product.description}
                price={product.price}
              />
            ))
          ) : (
            <p className="text-center col-span-full text-gray-700 text-lg">
              No products available
            </p>
          )}
        </div>
      </div>
    </main>
  );
}

export default ProductListPage;
