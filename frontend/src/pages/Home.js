import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import LogoutButton from "../components/LogoutButton";

const Home = () => {
    const { authTokens } = useContext(AuthContext);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        if (authTokens) {
            fetch("http://127.0.0.1:8000/api/user/", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${authTokens.access}`,
                    "Content-Type": "application/json",
                },
            })
            .then(response => response.json())
            .then(data => setUserData(data))
            .catch(error => console.error("Error fetching user data:", error));
        }
    }, [authTokens]);

    return (
        <div>
            <h1>Welcome to GoLoco</h1>
            {authTokens ? (
                <>
                    <p>Welcome, {userData ? userData.username : "loading..."}</p>
                    <LogoutButton />
                </>
            ) : (
                <>
                    <p>You are not logged in.</p>
                    <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
                </>
            )}
        </div>
    );
};

export default Home;