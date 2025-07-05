import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const avatarInitial = user?.name?.[0]?.toUpperCase() || "U";

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 w-full max-w-3xl p-8 rounded-xl shadow">
        {/* Avatar and Name */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold">
            {avatarInitial}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{user?.name}</h2>
            <p className="text-gray-600 dark:text-gray-400">{user?.email}</p>
          </div>
        </div>

        {/* Editable Info */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-white mb-2">Personal Info</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              className="px-4 py-2 rounded border dark:border-gray-700 dark:bg-gray-700 dark:text-white"
              type="text"
              placeholder="Name"
              value={user?.name}
              readOnly
            />
            <input
              className="px-4 py-2 rounded border dark:border-gray-700 dark:bg-gray-700 dark:text-white"
              type="email"
              placeholder="Email"
              value={user?.email}
              readOnly
            />
          </div>
        </div>

        {/* Order History */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-white mb-2">Order History</h3>
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded text-sm text-gray-700 dark:text-gray-300">
            <p>🧾 Order #123456 – 2 items – Delivered – 1st July 2025</p>
            <p>🧾 Order #123457 – 1 item – In Transit – 3rd July 2025</p>
          </div>
        </div>

        {/* Saved Address */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-white mb-2">Saved Address</h3>
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded text-sm text-gray-700 dark:text-gray-300">
            Abhishek Prajapat<br />
            123 Main Street,<br />
            Jaipur, Rajasthan, 302001
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded text-sm font-semibold"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;
