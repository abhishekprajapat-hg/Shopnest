import { useCart } from "../contexts/CartContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";

function Checkout() {
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
  });
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const { dispatch } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
    }
  }, [user, navigate]);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!form.name || !form.email || !form.address) {
      setError("Please fill out all fields.");
      return;
    }

    setError(""); // Clear any previous error

    // ✅ Clear cart
    dispatch({ type: "CLEAR_CART" });

    // ✅ Show toast notification
    toast.success("Order placed successfully! 🎉");

    // ✅ Navigate to success page
    navigate("/order-success", { state: { name: form.name } });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 dark:text-white p-4">
      <h2 className="text-2xl font-bold mb-4">🧾 Checkout</h2>
      {error && <p className="text-red-500">{error}</p>}

      <div className="max-w-xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-2 border rounded dark:bg-gray-800"
          />
          <input
            name="email"
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            className="w-full p-2 border rounded dark:bg-gray-800"
          />
          <textarea
            name="address"
            rows="3"
            placeholder="Shipping Address"
            value={form.address}
            onChange={handleChange}
            className="w-full p-2 border rounded dark:bg-gray-800"
          ></textarea>

          <div className="text-right text-lg font-semibold">
            Total: ${total.toFixed(2)}
          </div>

          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
}

export default Checkout;
