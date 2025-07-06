import { useCart } from "../contexts/CartContext";
import { X, Plus, Minus } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { cartItems, dispatch } = useCart();
  const navigate = useNavigate();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-bold mb-4">🛒 Your Cart is Empty</h2>
        <Link
          to="/"
          className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Left: Cart Items */}
      <div className="md:col-span-2 space-y-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
          Your Cart ({cartItems.length} items)
        </h2>

        {cartItems.map((item) => (
          <div
            key={item.id}
            className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-md flex gap-4 items-center"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-24 h-24 object-contain bg-white p-2 rounded-xl"
            />

            <div className="flex-1">
              <h3 className="font-semibold text-gray-800 dark:text-white text-sm md:text-base">
                {item.title}
              </h3>
              <p className="text-blue-600 font-bold mt-1">${item.price}</p>

              {/* Quantity Controls */}
              <div className="flex items-center gap-3 mt-3">
                <button
                  onClick={() =>
                    dispatch({ type: "DECREASE_QUANTITY", payload: item.id })
                  }
                  className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded"
                >
                  <Minus size={16} />
                </button>
                <span className="w-6 text-center dark:text-white">
                  {item.quantity}
                </span>
                <button
                  onClick={() =>
                    dispatch({ type: "INCREASE_QUANTITY", payload: item.id })
                  }
                  className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Remove Item */}
            <button
              onClick={() =>
                dispatch({ type: "REMOVE_FROM_CART", payload: item.id })
              }
              className="text-red-500 hover:text-red-700"
            >
              <X size={20} />
            </button>
          </div>
        ))}
      </div>

      {/* Right: Summary */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md space-y-4 h-fit">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
          Price Summary
        </h3>
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
          <span>Subtotal</span>
          <span>₹{total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
          <span>Delivery Charges</span>
          <span className="text-green-600">Free</span>
        </div>
        <hr className="my-2 border-gray-300 dark:border-gray-600" />
        <div className="flex justify-between font-bold text-gray-800 dark:text-white text-base">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>

        <button
          onClick={() => navigate("/checkout")}
          className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded"
        >
          Place Order
        </button>
      </div>
    </div>
  );
}

export default Cart;
