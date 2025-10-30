import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={verifyOtp}
        className="bg-white p-6 rounded-xl shadow-md w-80"
      >
        <h1 className="text-2xl font-semibold text-center mb-6">Enter OTP</h1>
        <p className="text-center text-gray-600 mb-4">
          OTP sent to {state.country} {state.mobile}
        </p>
        <input
          type="number"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full border p-2 rounded mb-4"
          required
        />
        <button className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700">
          Verify
        </button>
      </form>
    </div>
  );
}
