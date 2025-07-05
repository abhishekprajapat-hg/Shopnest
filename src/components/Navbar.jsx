import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import {
  LogIn,
  UserPlus,
  User,
  LogOut,
  Moon,
  Sun,
} from "lucide-react";

function Navbar({ searchTerm, setSearchTerm }) {
  const inputRef = useRef(null);
  const location = useLocation();
  const { cartItems } = useCart();
  const { user, logout } = useAuth();
  const { darkMode, setDarkMode } = useTheme();

  const [products, setProducts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  // Focus search with "/"
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "/") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  // Fetch all products (once)
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then(setProducts);
  }, []);

  // Filter suggestions
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSuggestions([]);
    } else {
      setSuggestions(
        products.filter((p) =>
          p.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, products]);

  // Clear search when route changes
  useEffect(() => {
    setSearchTerm("");
    setSuggestions([]);
  }, [location.pathname]);

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-4 relative z-50">
      {/* Logo */}
      <Link to="/" className="text-2xl font-extrabold text-blue-600">
        ShopNest
      </Link>

      {/* Search Input */}
      <div className="relative w-full max-w-xl mx-4">
        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search for products, brands and more"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-2 rounded-full border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {searchTerm && (
          <div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-800 border dark:border-gray-700 mt-2 rounded shadow-lg max-h-60 overflow-auto z-50">
            {suggestions.length > 0 ? (
              suggestions.map((item) => (
                <Link
                  key={item.id}
                  to={`/products/${item.id}`}
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => setSearchTerm("")}
                >
                  {item.title}
                </Link>
              ))
            ) : (
              <div className="px-4 py-3 text-gray-500 dark:text-gray-400">
                No products found
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right Section: Theme, Cart, Auth */}
      <div className="flex items-center gap-5">
        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          title={darkMode ? "Light Mode" : "Dark Mode"}
          className="text-gray-600 dark:text-gray-300 hover:text-yellow-500 transition"
        >
          {darkMode ? <Sun size={22} /> : <Moon size={22} />}
        </button>

        {/* Cart Icon */}
        <Link
          to="/cart"
          className="relative flex items-center gap-1 text-gray-700 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
        >
          <FaShoppingCart size={20} />
          <span>Cart</span>
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-3 bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {cartItems.length}
            </span>
          )}
        </Link>

        {/* Auth Icons */}
        {user ? (
          <>
            <Link
              to="/profile"
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600"
              title="Profile"
            >
              <User size={22} />
            </Link>
            <button
              onClick={logout}
              className="text-gray-600 dark:text-gray-300 hover:text-red-500"
              title="Logout"
            >
              <LogOut size={22} />
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600"
              title="Login"
            >
              <LogIn size={22} />
            </Link>
            <Link
              to="/signup"
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600"
              title="Signup"
            >
              <UserPlus size={22} />
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
