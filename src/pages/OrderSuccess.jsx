import { useLocation, Link } from "react-router-dom";

function OrderSuccess() {
  const location = useLocation();
  const customerName = location.state?.name || "Customer";

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 dark:text-white p-8 text-center">
      <h2 className="text-3xl font-bold mb-4">🎉 Thank you, {customerName}!</h2>
      <p className="text-lg mb-6">Your order has been placed successfully.</p>
      <Link
        to="/products"
        className="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
      >
        Continue Shopping
      </Link>
    </div>
  );
}

export default OrderSuccess;
