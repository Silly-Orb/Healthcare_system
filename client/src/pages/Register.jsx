import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "patient"
  });

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await API.post("/auth/register", form);
      alert("Registered!");
      navigate("/");
    } catch (err) {
      alert("Error");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-xl w-80 shadow-lg">
        <h2 className="text-2xl mb-4 text-center">Register</h2>

        <input
          className="w-full p-2 mb-3 rounded bg-gray-700"
          placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          className="w-full p-2 mb-3 rounded bg-gray-700"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          className="w-full p-2 mb-3 rounded bg-gray-700"
          type="password"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <select
          className="w-full p-2 mb-3 rounded bg-gray-700"
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="patient">Patient</option>
          <option value="doctor">Doctor</option>
        </select>

        <button
          className="w-full bg-green-500 p-2 rounded hover:bg-green-600"
          onClick={handleRegister}
        >
          Register
        </button>

        <p className="text-sm mt-3 text-center">
          Already have an account?{" "}
          <Link to="/" className="text-blue-400">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}