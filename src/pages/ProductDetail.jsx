import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../contexts/CartContext";

function ProductDetail() {
  const { id } = useParams();
  const { dispatch } = useCart(); // ✅ moved up here (before any return)

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

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
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
            className="w-20 px-2 py-1 border rounded"
          />
        </div>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductDetail;
