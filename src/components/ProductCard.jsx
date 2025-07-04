import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    
    <div className="border rounded-xl p-4 shadow hover:shadow-lg transition">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-48 object-contain mb-2"
      />
      <h3 className="text-lg font-semibold line-clamp-2">{product.title}</h3>
      <p className="text-blue-600 font-bold mt-1">${product.price}</p>
      <Link
        to={`/products/${product.id}`}
        className="inline-block mt-2 text-sm text-white bg-blue-600 px-3 py-1 rounded hover:bg-blue-700"
      >
        View Details
      </Link>
    </div>
  );
}

export default ProductCard;
