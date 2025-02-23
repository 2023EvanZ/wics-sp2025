import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(username, password, navigate);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h2 className="text-3xl font-bold text-blue-600 mb-6">Login</h2>
            <form 
                onSubmit={handleSubmit} 
                className="bg-white p-6 rounded-lg shadow-md w-80"
            >
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button 
                    type="submit" 
                    className="w-full bg-blue-500 text-white py-2 rounded-lg shadow hover:bg-blue-600 transition"
                >
                    Login
                </button>
            </form>
            <p className="mt-4 text-gray-600">
                Don't have an account?{" "}
                <Link to="/register" className="text-blue-500 hover:underline">
                    Register here
                </Link>
            </p>
        </div>
    );
};

export default Login;