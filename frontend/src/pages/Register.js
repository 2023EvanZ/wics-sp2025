import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
        <div>
            <h2>Register</h2>
            {error && <p style={{ color: "red" }}>{error}</p>} {/* Display error */}
            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;