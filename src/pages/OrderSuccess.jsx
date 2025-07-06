import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function OrderSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const { name, orderId, orderDate } = location.state || {};

  useEffect(() => {
    if (!location.state) {
      navigate("/");
    }
  }, [location, navigate]);

  const formattedDate = orderDate
    ? new Date(orderDate).toLocaleString()
    : "N/A";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 px-4">
      <div className="bg-green-100 dark:bg-green-900 rounded-full p-6 mb-6">
        <svg
          className="w-16 h-16 text-green-600 dark:text-green-400"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
        Order Placed Successfully!
      </h2>

      <p className="text-gray-600 dark:text-gray-300 mb-4 text-center max-w-md">
        {name
          ? `Thank you, ${name}! Your order has been placed.`
          : "Thank you! Your order has been placed."}
      </p>

      {/* Order ID and Date */}
      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl mb-6 text-sm text-gray-700 dark:text-gray-300 shadow-md w-full max-w-md">
        <div className="flex justify-between">
          <span className="font-medium">Order ID:</span>
          <span className="font-mono">{orderId}</span>
        </div>
        <div className="flex justify-between mt-2">
          <span className="font-medium">Order Date:</span>
          <span>{formattedDate}</span>
        </div>
      </div>

      <button
        onClick={() => navigate("/")}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full"
      >
        Continue Shopping
      </button>
    </div>
  );
}

export default OrderSuccess;
