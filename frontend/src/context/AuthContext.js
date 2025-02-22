import { createContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authTokens, setAuthTokens] = useState(
        localStorage.getItem("authTokens") ? JSON.parse(localStorage.getItem("authTokens")) : null
    );

    const login = async (username, password, navigate) => {
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/login/", { username, password });

            console.log("Login Response:", response.data);  

            setAuthTokens(response.data);
            localStorage.setItem("authTokens", JSON.stringify(response.data));
            axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.access}`;

            navigate("/"); 
        } catch (error) {
            console.error("Login failed:", error.response?.data);
        }
    };

    return (
        <AuthContext.Provider value={{ authTokens, setAuthTokens, login }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;