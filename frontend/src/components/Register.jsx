import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError(null);  // Clear previous errors

        try {
            const response = await axios.post("http://127.0.0.1:8000/api/register/", {
                username,
                password,
            });

            if (response.status === 201) {
                alert(response.data.message);
                navigate("/login"); // Redirect to login page after successful registration
            } else {
                throw new Error("Unexpected response status");
            }
        } catch (err) {
            console.error("Error details:", err.response); // Debugging

            if (err.response && err.response.data) {
                setError(err.response.data.error || "Registration failed");
            } else {
                setError("An error occurred. Please try again.");
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h2 className="text-3xl font-bold text-green-600 mb-6">Register</h2>
            
            {error && (
                <p className="text-red-500 text-sm mb-4">{error}</p>
            )}

            <form 
                onSubmit={handleRegister} 
                className="bg-white p-6 rounded-lg shadow-md w-80"
            >
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                <button 
                    type="submit" 
                    className="w-full bg-green-500 text-white py-2 rounded-lg shadow hover:bg-green-600 transition"
                >
                    Register
                </button>
            </form>
            <p className="mt-4 text-gray-600">
                Have an account?{" "}
                <Link to="/login" className="text-blue-500 hover:underline">
                    Login here
                </Link>
            </p>
        </div>
    );
};

export default Register;