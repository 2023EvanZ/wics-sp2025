import { createContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authTokens, setAuthTokens] = useState(
        localStorage.getItem("authTokens") ? JSON.parse(localStorage.getItem("authTokens")) : null
    );

    const login = async (username, password) => {
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/login/", {
                username,
                password,
            });

            setAuthTokens(response.data);
            localStorage.setItem("authTokens", JSON.stringify(response.data));

            axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.access}`;
        } catch (error) {
            console.error("Login failed", error.response?.data);
        }
    };

    return (
        <AuthContext.Provider value={{ authTokens, login }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;