import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Home({ searchTerm }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const categories = [
    "electronics",
    "jewelery",
    "men's clothing",
    "women's clothing",
  ];

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.slice(0, 8)));
    setLoading(false); // showing only 8
  }, []);
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white">
      <section className="my-6 max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white dark:from-blue-700 dark:to-indigo-700 py-12 px-6 md:px-12 rounded-lg shadow-lg"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Text Section */}
            <motion.div
              initial={{ x: -40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex-1"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-2">
                🔥 Deal of the Day
              </h2>
              <p className="text-lg mb-4">
                Get up to <span className="font-bold">50% OFF</span> on top
                electronics and fashion items. Limited time only!
              </p>
              <a
                href="/category/electronics"
                className="inline-block bg-white text-blue-700 font-semibold px-6 py-2 rounded-full hover:bg-gray-100 transition"
              >
                Shop Now
              </a>
            </motion.div>

            {/* Image Section */}
            <motion.div
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex-1"
            >
              <img
                src="/images/deal-banner.png"
                alt="Deal Product"
                className="w-full max-w-md mx-auto rounded-lg shadow"
              />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* 📂 Category Cards */}
      <section className="max-w-6xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Link
              key={category}
              to={`/category/${encodeURIComponent(category)}`}
              className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 p-6 rounded text-center font-semibold capitalize shadow-sm"
            >
              {category}
            </Link>
          ))}
        </div>
      </section>

      {/* 🛍️ Featured Products from API */}
      <section className="max-w-6xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading
            ? [...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse bg-gray-100 dark:bg-gray-800 h-60 rounded"
                />
              ))
            : filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition bg-white dark:bg-gray-800"
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-60 object-contain bg-white"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold line-clamp-2">
                      {product.title}
                    </h3>
                    <p className="text-blue-600 font-bold mt-2">
                      ${product.price}
                    </p>
                    <Link
                      to={`/products/${product.id}`}
                      className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                    >
                      View
                    </Link>
                  </div>
                </div>
              ))}
        </div>
      </section>

      {/* 💥 Promo Banner */}
      <section className="bg-yellow-300 dark:bg-yellow-600 text-center py-10 px-4 mt-6">
        <h2 className="text-3xl font-bold mb-2">🔥 Big Sale: Up to 50% OFF!</h2>
        <p className="text-lg mb-4">
          Only this week — grab your favorite products!
        </p>
        <Link
          to="/products"
          className="bg-black text-white px-6 py-3 rounded-lg text-lg hover:bg-gray-800"
        >
          Explore Deals
        </Link>
      </section>
    </div>
  );
}

export default Home;
