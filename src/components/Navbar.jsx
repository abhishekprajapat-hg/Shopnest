import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useTheme } from "../contexts/ThemeContext";

function Navbar() {
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const { darkMode, setDarkMode } = useTheme();

  return (
    <nav className="bg-white dark:bg-gray-900 dark:text-white shadow-md p-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-blue-600">
        ShopNest
      </Link>
      <div className="space-x-4">
        <Link to="/" className="text-gray-600 hover:text-blue-600">
          Home
        </Link>
        <Link to="/products" className="text-gray-600 hover:text-blue-600">
          Products
        </Link>
        <Link to="/cart" className="text-gray-600 hover:text-blue-600">
          Cart{" "}
          {totalItems > 0 && (
            <span className="ml-1 text-sm text-white bg-blue-600 px-2 py-0.5 rounded-full">
              {totalItems}
            </span>
          )}
        </Link>
        <Link to="/login" className="text-gray-600 hover:text-blue-600">
          Login
        </Link>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="ml-4 px-2 py-1 border rounded text-sm"
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
