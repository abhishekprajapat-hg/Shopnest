import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { useState } from "react";

function Profile() {
  const { user, logout } = useAuth();

  const [localUser, setLocalUser] = useState(user);

  // Cancel Order
  const handleCancelOrder = (orderId) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this order?"
    );
    if (!confirmed) return;

    const updatedOrders = user.orders.filter((order) => order.id !== orderId);
    const updatedUser = {
      ...user,
      orders: updatedOrders,
    };

    setLocalUser(updatedUser);
    localStorage.setItem("shopnest-user", JSON.stringify(updatedUser));
    window.location.reload(); // Optional: To refresh UI
  };

  if (!user) {
    return (
      <div className="text-center mt-10">
        <h2 className="text-xl font-bold">Please log in to view profile.</h2>
        <Link to="/login" className="text-blue-600 underline mt-4 block">
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">👤 Your Profile</h2>

      <div className="max-w-2xl mx-auto bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow-md">
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>

        <button
          onClick={logout}
          className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          Logout
        </button>

        <h3 className="text-xl font-semibold mt-8 mb-2">🧾 Order History</h3>

        {user.orders && user.orders.length > 0 ? (
          <div className="space-y-4">
            {user.orders.map((order, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-700 p-4 rounded-lg border dark:border-gray-600"
              >
                <div className="flex justify-between items-center">
                  <p>
                    <strong>Order ID:</strong> #{order.id}
                  </p>

                  <button
                    onClick={() => handleCancelOrder(order.id)}
                    className="text-sm text-red-600 hover:underline"
                  >
                    Cancel Order
                  </button>
                </div>
                <p>
                  <strong>Date:</strong> {new Date(order.date).toLocaleString()}
                </p>
                <p>
                  <strong>Total:</strong> ₹{order.total.toFixed(2)}
                </p>
                <div className="mt-2">
                  <strong>Items:</strong>
                  <ul className="list-disc ml-6 mt-1">
                    {order.items.map((item) => (
                      <li key={item.id}>
                        {item.title} × {item.quantity}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 mt-4">You have no previous orders.</p>
        )}
      </div>
    </div>
  );
}

export default Profile;
