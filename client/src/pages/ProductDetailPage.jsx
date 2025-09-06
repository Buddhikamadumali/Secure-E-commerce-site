import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import axios from "axios";
import { useUser } from "../context/UserContext";

function ProductDetailPage() {
  const { addToCart, cartItems } = useCart();
  const { id } = useParams();
  const navigate = useNavigate();
    const { user } = useUser();


  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  // Fetch product details
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/products/${id}`)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading)
    return <p className="text-center mt-10 text-gray-500">Loading product...</p>;
  if (!product)
    return <p className="text-center text-red-500 mt-10">Product not found!</p>;

  const handleAddToCart = async () => {
    // Check if the cart context is initialized (user logged in)
    if (!user) {
      console.log("user",user);
      alert("Please log in to add products to the cart!");
      window.location("http://localhost:3000/login");
      return;
    }

    const success = await addToCart(product, quantity);
    if (success) {
      alert("Product successfully added to the cart");
    }
  };

  return (
    <div className="mx-auto p-6 mt-15 bg-gradient-to-b from-gray-500 to-white">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 bg-gray-700 text-white px-5 py-2 rounded-lg font-semibold hover:bg-gray-800 transition duration-300"
      >
        ← Back
      </button>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Product Image */}
        <div className="flex justify-center items-center bg-gray-100 rounded-lg p-6">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-96 object-contain"
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-800">{product.name}</h2>
          <p className="text-gray-600 mt-4">{product.description}</p>
          <p className="text-2xl font-semibold text-orange-700 mt-6">
            ${product.price}
          </p>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4 mt-6">
            <label className="text-gray-700">Quantity:</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="w-20 border rounded-md text-center p-1"
              min="1"
            />
            <span className="text-sm text-gray-500">(In stock: {product.stock})</span>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="bg-orange-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-600 transition duration-300 mt-6"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
