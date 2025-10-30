import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-80"
      >
        <h1 className="text-2xl font-semibold text-center mb-6">Login</h1>

        <div className="flex gap-2 mb-4">
          <CountrySelect country={country} setCountry={setCountry} />
          <input
            type="tel"
            placeholder="Enter Mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
            className="flex-1 border p-2 rounded"
            maxLength={10}
            required
          />
        </div>

        <button className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700">
          Send OTP
        </button>
      </form>
    </div>
  );
}
