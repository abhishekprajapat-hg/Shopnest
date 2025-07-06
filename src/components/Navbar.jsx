import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { LogIn, UserPlus, User, LogOut, Sun, Moon } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";

function Navbar({ searchTerm, setSearchTerm }) {
  const { cartItems } = useCart();
  const { user, logout } = useAuth();
  const { darkMode, setDarkMode } = useTheme();
  const [suggestions, setSuggestions] = useState([]);
  const [products, setProducts] = useState([]);
  const inputRef = useRef(null);
  const location = useLocation();

  // Autofocus search with `/`
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

  // Fetch all products once for suggestions
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then(setProducts);
  }, []);

  // Update suggestions
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

  // Clear search on route change
  useEffect(() => {
    setSearchTerm("");
    setSuggestions([]);
  }, [location.pathname]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 shadow-md px-6 py-3">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-tight text-blue-600 dark:text-white"
        >
          ShopNest
        </Link>

        {/* Search */}
        <div className="relative flex-1 max-w-xl">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search for products, brands and more"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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

        {/* Right-side icons */}
        <div className="flex items-center gap-4">
          {/* Cart */}
          <Link
            to="/cart"
            className="relative text-gray-700 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
          >
            <FaShoppingCart size={22} />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                {cartItems.length}
              </span>
            )}
          </Link>

          {/* Auth buttons */}
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

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="text-gray-600 dark:text-gray-300 hover:text-yellow-500"
            title="Toggle theme"
          >
            {darkMode ? <Sun size={22} /> : <Moon size={22} />}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
