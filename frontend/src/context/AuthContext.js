import { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [authTokens, setAuthTokens] = useState(
        localStorage.getItem("authTokens") ? JSON.parse(localStorage.getItem("authTokens")) : null
    );

    useEffect(() => {
        if (authTokens) {
            axios
                .get("http://127.0.0.1:8000/api/user/", {
                    headers: { Authorization: `Bearer ${authTokens.access}` },
                })
                .then((res) => setUser(res.data))
                .catch(() => setUser(null));
        }
    }, [authTokens]);

    const login = async (username, password) => {
        const res = await axios.post("http://127.0.0.1:8000/api/login/", { username, password });
        setAuthTokens(res.data);
        localStorage.setItem("authTokens", JSON.stringify(res.data));
        axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.access}`;
        const userRes = await axios.get("http://127.0.0.1:8000/api/user/");
        setUser(userRes.data);
    };

    const logout = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem("authTokens");
        delete axios.defaults.headers.common["Authorization"];
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;