import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../context/AuthContext";

const LogoutButton = () => {
    const { authTokens, setAuthTokens } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            if (!authTokens) {
                console.error("No auth token found.");
                return;
            }

            console.log("Logging out with headers:", {
                Authorization: `Bearer ${authTokens.access}`,
                "Content-Type": "application/json",
            });

            const response = await axios.post(
                "http://127.0.0.1:8000/api/logout/",
                { refresh_token: authTokens?.refresh },
                {
                    headers: { Authorization: `Bearer ${authTokens.access}` }, 
                }
            );

            console.log("Logout successful:", response.data);

            setAuthTokens(null);
            localStorage.removeItem("authTokens");
            delete axios.defaults.headers.common["Authorization"];

            navigate("/login"); 
        } catch (error) {
            console.error("Logout failed:", error.response?.data);
        }
    };

    return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;