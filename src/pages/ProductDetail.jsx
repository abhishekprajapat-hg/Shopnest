import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";

function ProductDetail() {
  const { id } = useParams();
  const { dispatch } = useCart(); // ✅ moved up here (before any return)

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

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
    dispatch({ type: "ADD_TO_CART", payload: product });
    navigate("/checkout");
  };
  return (
    <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-10 p-6">
      <img
        src={product.image}
        alt={product.title}
        className="w-full md:w-1/2 h-96 object-contain"
      />
      <div className="flex-1">
        <h2 className="text-2xl font-bold mb-2">{product.title}</h2>
        <p className="text-gray-700 mb-4">{product.description}</p>
        <p className="text-xl text-blue-600 font-semibold mb-2">
          ${product.price}
        </p>
        <div className="mb-4">
          <label className="mr-2 font-medium">Quantity:</label>
          <div className="flex items-center border rounded w-fit overflow-hidden">
            <button
              className="bg-gray-200 dark:bg-gray-700 px-3 py-1 text-lg"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            >
              –
            </button>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => {
                const val = Math.max(1, parseInt(e.target.value) || 1);
                setQuantity(val);
              }}
              className="w-14 text-center py-1 dark:bg-gray-800 dark:text-white border-l border-r border-gray-300 dark:border-gray-600"
            />
            <button
              className="bg-gray-200 dark:bg-gray-700 px-3 py-1 text-lg"
              onClick={() => setQuantity((q) => Math.min(10, q + 1))} // Optional max 10
            >
              +
            </button>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
          <button
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            onClick={handleBuyNow}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
