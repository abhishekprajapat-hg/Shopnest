import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../contexts/CartContext";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { dispatch } = useCart();

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (!product)
    return <p className="text-center text-lg">Product not found.</p>;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch({ type: "ADD_TO_CART", payload: product });
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate("/cart");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-12">
      {/* Image */}
      <div className="bg-white p-6 rounded-2xl shadow-md flex items-center justify-center">
        <div className="bg-white rounded-xl p-6">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-[400px] mx-auto object-contain"
          />
        </div>
      </div>

      {/* Info */}
      <div className="space-y-4 bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          {product.title}
        </h2>

        <p className="text-gray-600 dark:text-gray-300">
          {product.description}
        </p>

        <p className="text-3xl font-bold text-blue-600">${product.price}</p>

        {/* Quantity Selector */}
        <div className="flex items-center gap-4">
          <label className="font-medium dark:text-white">Quantity:</label>
          <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded overflow-hidden">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-lg"
            >
              −
            </button>
            <span className="px-4 py-1 text-lg dark:text-white">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-lg"
            >
              +
            </button>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <button
            onClick={handleAddToCart}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 rounded w-full"
          >
            Add to Cart
          </button>
          <button
            onClick={handleBuyNow}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded w-full"
          >
            Buy Now
          </button>
        </div>

        {/* Delivery / Returns */}
        <div className="mt-6 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <p>
            🚚 Free delivery by <strong>3-5 business days</strong>
          </p>
          <p>🔁 7-day return policy</p>
          <p>✅ Cash on Delivery available</p>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
