import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import CountrySelect from "../components/CountrySelect";

export default function Login() {
  const [country, setCountry] = useState("+91");
  const [mobile, setMobile] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mobile.length !== 10)
      return alert("Please enter a valid 10-digit number");
    navigate("/otp", { state: { mobile, country } });
  };

  return (
    <div className="min-h-screen flex items-center justify-center  from-blue-50 to-indigo-100 px-4">
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
            Welcome Back 👋
          </h1>
          <p className="text-gray-500 text-sm">
            Sign in with your mobile number to continue
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Mobile Number
            </label>
            <div className="flex gap-2">
              <CountrySelect country={country} setCountry={setCountry} />
              <input
                type="tel"
                placeholder="Enter mobile number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                className="flex-1 border border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-100 rounded-lg px-3 py-2 text-gray-700 placeholder-gray-400 outline-none transition-all"
                maxLength={10}
                required
              />
            </div>
          </div>

          <motion.button
            whileTap={{ scale: 0.97 }}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-lg shadow-md transition-all duration-300"
          >
            Send OTP
          </motion.button>
        </form>

        <div className="text-center mt-6 text-sm text-gray-500">
          By continuing, you agree to our{" "}
          <a href="#" className="text-indigo-600 hover:underline">
            Terms of Service
          </a>{" "}
          &{" "}
          <a href="#" className="text-indigo-600 hover:underline">
            Privacy Policy
          </a>
          .
        </div>
      </motion.div>
    </div>
  );
}
