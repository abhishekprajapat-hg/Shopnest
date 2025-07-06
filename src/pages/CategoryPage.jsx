import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function CategoryPage() {
  const { name } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/category/${name}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, [name]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 capitalize text-center">
        {name}
      </h2>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-500">No products found in this category.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link
              key={product.id}
              to={`/products/${product.id}`}
              className="border rounded-lg hover:shadow dark:bg-gray-800"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-60 object-contain mb-2 bg-white border rounded-lg"
              />
              <h3 className="font-semibold p-4">{product.title}</h3>
              <p className="text-blue-600 font-bold mt-1 p-4">${product.price}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default CategoryPage;
