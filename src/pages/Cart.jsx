import { useCart } from "../contexts/CartContext";
import { Link } from "react-router-dom";

function Cart() {
  const { cartItems, dispatch } = useCart();

  const handleRemove = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="text-center mt-10">
        <h2 className="text-2xl font-bold">🛒 Your cart is empty</h2>
        <Link
          to="/products"
          className="mt-4 inline-block text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">🛒 Your Cart</h2>
      <div className="space-y-4">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center border p-4 rounded shadow-sm"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-24 h-24 object-contain mr-4"
            />
            <div className="flex-1">
              <h3 className="font-semibold">{item.title}</h3>
              <p>Price: ${item.price}</p>
              <p>Quantity: {item.quantity}</p>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <button
                onClick={() =>
                  dispatch({ type: "DECREASE_QUANTITY", payload: item.id })
                }
                className="px-2 bg-gray-200 hover:bg-gray-300 text-lg rounded"
              >
                -
              </button>
              <span className="font-medium">{item.quantity}</span>
              <button
                onClick={() =>
                  dispatch({ type: "INCREASE_QUANTITY", payload: item.id })
                }
                className="px-2 bg-gray-200 hover:bg-gray-300 text-lg rounded"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="text-right mt-6 text-xl font-semibold">
        Total: ${total.toFixed(2)}
      </div>

      <div className="text-right mt-4">
        <Link
          to="/checkout"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}

export default Cart;
