import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import config from "../config";

function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`${config.BASE_URL}/api/products`) // ✅ fetch from backend
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  return (
    <main className="bg-gradient-to-b from-gray-900 via-gray-500 to-white text-white">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/background.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 text-center px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-orange-500">
            Discover Our Exclusive Watch Collection
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-300">
            Explore timeless designs that suit every style.
          </p>
          <Link
            to="/products"
            className="mt-6 inline-block bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg shadow-md transition duration-300"
          >
            View All Products
          </Link>
        </div>
      </section>

      {/* Featured Products Section */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mt-12">
        <h2 className="text-2xl font-bold text-black text-center mb-8">
          Featured Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.length > 0 ? (
            products
              .sort(() => 0.5 - Math.random()) // ✅ random shuffle
              .slice(0, 3) // ✅ pick 3 random
              .map((product) => (
                <ProductCard
                  key={product._id}
                  id={product._id}
                  image={product.image}
                  name={product.name}
                  description={product.description}
                  price={product.price}
                />
              ))
          ) : (
            <p className="text-center col-span-full text-gray-700 text-lg">
              Loading products...
            </p>
          )}
        </div>

        {/* View All Products Button */}
        <div className="mt-12 text-center">
          <Link
            to="/products"
            className="inline-block bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold shadow-md hover:bg-orange-600 transition duration-300"
          >
            View All Products <span className="text-lg">→</span>
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  );
}

export default HomePage;
