import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function OTP() {
  const [otp, setOtp] = useState("");
  const { state } = useLocation();
  const navigate = useNavigate();

  const verifyOtp = (e) => {
    e.preventDefault();
    if (otp === "123456") {
      localStorage.setItem("auth", state.mobile);
      navigate("/restaurants");
    } else {
      alert("Invalid OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-100"
      >
        <div className="text-center mb-8">
          <img
            src="/fastor-logo.png"
            alt="Fastor Logo"
            className="w-16 h-16 mx-auto mb-3 drop-shadow-md"
          />
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Verify OTP 🔒
          </h1>
          <p className="text-gray-500 text-sm">
            OTP sent to{" "}
            <span className="font-semibold text-gray-700">
              {state.country} {state.mobile}
            </span>
          </p>
        </div>

        <form onSubmit={verifyOtp} className="space-y-5">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Enter 6-digit OTP
            </label>
            <input
              type="text"
              placeholder="• • • • • •"
              value={otp}
              onChange={(e) =>
                setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
              }
              className="w-full border border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-100 rounded-lg px-3 py-2 text-center tracking-widest text-lg font-semibold text-gray-700 placeholder-gray-400 outline-none transition-all"
              required
            />
          </div>

          <motion.button
            whileTap={{ scale: 0.97 }}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-lg shadow-md transition-all duration-300"
          >
            Verify
          </motion.button>
        </form>

        <div className="text-center mt-6 text-sm text-gray-500">
          Didn’t receive the code?{" "}
          <button
            type="button"
            onClick={() => alert("OTP Resent!")}
            className="text-indigo-600 font-medium hover:underline"
          >
            Resend OTP
          </button>
        </div>
      </motion.div>
    </div>
  );
}
