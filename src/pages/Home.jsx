import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.slice(0, 8)));
    setLoading(false); // showing only 8
  }, []);

  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white">
      {/* 🎠 CAROUSEL SECTION */}
      <section className="w-full">
        <Carousel
          autoPlay
          infiniteLoop
          showThumbs={false}
          showStatus={false}
          interval={3000}
          transitionTime={700}
          swipeable
        >
          <div>
            <img
              src="https://e0.pxfuel.com/wallpapers/606/84/desktop-wallpaper-ecommerce-website-design-company-noida-e-commerce-banner-design-e-commerce.jpg"
              alt="Sale 1"
            />
          </div>
          <div>
            <img
              src="https://e0.pxfuel.com/wallpapers/606/84/desktop-wallpaper-ecommerce-website-design-company-noida-e-commerce-banner-design-e-commerce.jpg"
              alt="Sale 2"
            />
          </div>
          <div>
            <img
              src="https://e0.pxfuel.com/wallpapers/606/84/desktop-wallpaper-ecommerce-website-design-company-noida-e-commerce-banner-design-e-commerce.jpg"
              alt="Sale 3"
            />
          </div>
        </Carousel>
      </section>

      {/* 📂 Category Cards */}
      <section className="max-w-6xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            "men's clothing",
            "women's clothing",
            "jewelery",
            "electronics",
          ].map((cat, i) => (
            <Link
              to={`/category/${cat}`}
              key={i}
              className="bg-gradient-to-tr from-blue-500 to-blue-300 dark:from-gray-700 dark:to-gray-600 rounded-xl p-6 text-white text-center font-semibold text-lg shadow hover:scale-105 transition"
            >
              {cat.toUpperCase()}
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
          {products.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition bg-white dark:bg-gray-800"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-60 object-contain bg-gray-100"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold line-clamp-2">
                  {product.title}
                </h3>
                <p className="text-blue-600 font-bold mt-2">${product.price}</p>
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
