import { useCart } from "../contexts/CartContext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../contexts/AuthContext";

function Checkout() {
  const { cartItems, dispatch } = useCart();
  const { user, saveOrder } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    address: "",
  });

  const [error, setError] = useState("");

  // Redirect to login if not logged in
  useEffect(() => {
    if (!user) {
      toast.error("You must be logged in to checkout.");
      navigate("/login", { replace: true });
    }
  }, [user, navigate]);

  // Redirect if cart is empty
  useEffect(() => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty.");
      navigate("/");
    }
  }, [cartItems, navigate]);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.address) {
      setError("Please fill out all fields.");
      return;
    }

    setError("");

    const orderId = Math.floor(100000 + Math.random() * 900000);
    const orderDate = new Date().toISOString();

    // Save order
    saveOrder({
      id: orderId,
      date: orderDate,
      total,
      items: cartItems,
    });

    // Clear cart
    dispatch({ type: "CLEAR_CART" });

    // Success toast
    toast.success("Order placed successfully! 🎉");

    // Navigate to success page
    navigate("/order-success", {
      state: {
        name: form.name,
        orderId,
        orderDate,
      },
    });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 dark:text-white p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">🧾 Checkout</h2>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="max-w-xl mx-auto bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-2 border rounded dark:bg-gray-700"
          />
          <input
            name="email"
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            className="w-full p-2 border rounded dark:bg-gray-700"
          />
          <textarea
            name="address"
            rows="3"
            placeholder="Shipping Address"
            value={form.address}
            onChange={handleChange}
            className="w-full p-2 border rounded dark:bg-gray-700"
          ></textarea>

          <div className="text-right text-lg font-semibold">
            Total: ${total.toFixed(2)}
          </div>

          <button
            type="submit"
            className="w-full mt-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded"
          >
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
}

export default Checkout;
