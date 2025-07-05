import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 mt-10">
      <div className="max-w-6xl mx-auto py-10 px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
        {/* About */}
        <div>
          <h3 className="font-bold mb-3 text-gray-800 dark:text-white">About</h3>
          <ul className="space-y-2">
            <li><Link to="#">Contact Us</Link></li>
            <li><Link to="#">About Us</Link></li>
            <li><Link to="#">Careers</Link></li>
            <li><Link to="#">Press</Link></li>
          </ul>
        </div>

        {/* Help */}
        <div>
          <h3 className="font-bold mb-3 text-gray-800 dark:text-white">Help</h3>
          <ul className="space-y-2">
            <li><Link to="#">Payments</Link></li>
            <li><Link to="#">Shipping</Link></li>
            <li><Link to="#">FAQ</Link></li>
            <li><Link to="#">Cancellation</Link></li>
          </ul>
        </div>

        {/* Policy */}
        <div>
          <h3 className="font-bold mb-3 text-gray-800 dark:text-white">Consumer Policy</h3>
          <ul className="space-y-2">
            <li><Link to="#">Return Policy</Link></li>
            <li><Link to="#">Terms Of Use</Link></li>
            <li><Link to="#">Security</Link></li>
            <li><Link to="#">Privacy</Link></li>
          </ul>
        </div>

        {/* Address / Social */}
        <div>
          <h3 className="font-bold mb-3 text-gray-800 dark:text-white">Mail Us:</h3>
          <p className="text-sm leading-6">
            ShopNest Pvt Ltd,<br />
            123 Marketplace Road,<br />
            Jaipur, Rajasthan 302001,<br />
            India
          </p>
        </div>
      </div>

      {/* Bottom line */}
      <div className="bg-gray-200 dark:bg-gray-800 text-center py-4 text-xs text-gray-600 dark:text-gray-400">
        © {new Date().getFullYear()} ShopNest | All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
