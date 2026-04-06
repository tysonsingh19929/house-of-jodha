import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { forgotPassword } from "../services/api";

export default function ForgotPassword({ cartOpen, setCartOpen, cartCount }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (!email.trim()) {
      setError("Email is required");
      setLoading(false);
      return;
    }

    try {
      await forgotPassword(email);
      setSuccess("Password reset email sent! Check your inbox.");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar cartOpen={cartOpen} setCartOpen={setCartOpen} cartCount={cartCount} />
      
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)] px-4">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6">Forgot Password</h2>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          
          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              {success}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="Enter your email"
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-pink-600 text-white py-2 px-4 rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Reset Email"}
            </button>
          </form>
          
          <div className="text-center mt-4">
            <Link to="/login" className="text-pink-600 hover:text-pink-800">
              Back to Login
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}